import { PortfolioItem } from '../data/contentData';

const DB_NAME = 'velora_media_vault';
const DB_VERSION = 1;
const STORE_PROJECTS = 'custom_projects';
const STORE_MEDIA = 'project_overrides';

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
        db.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_MEDIA)) {
        db.createObjectStore(STORE_MEDIA, { keyPath: 'projectId' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

// Track generated ObjectURLs to clean them up when replaced
const activeObjectUrls = new Map<string, string[]>();

export function registerObjectUrl(ownerId: string, url: string) {
  const current = activeObjectUrls.get(ownerId) || [];
  current.push(url);
  activeObjectUrls.set(ownerId, current);
}

export function revokeOwnerUrls(ownerId: string) {
  const list = activeObjectUrls.get(ownerId);
  if (list) {
    list.forEach((u) => {
      if (u.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      }
    });
    activeObjectUrls.delete(ownerId);
  }
}

// ================= CUSTOM USER PROJECTS =================

export async function saveCustomProject(project: PortfolioItem): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.put(project);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Fallback saving custom project to localStorage:', err);
    try {
      const key = `velora_custom_projects_list`;
      const existingStr = localStorage.getItem(key);
      const existing: PortfolioItem[] = existingStr ? JSON.parse(existingStr) : [];
      const index = existing.findIndex((p) => p.id === project.id);
      if (index >= 0) existing[index] = project;
      else existing.unshift(project);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {}
  }
}

export async function getCustomProjects(): Promise<PortfolioItem[]> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readonly');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    try {
      const key = `velora_custom_projects_list`;
      const existingStr = localStorage.getItem(key);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  }
}

export async function deleteCustomProject(id: string): Promise<void> {
  revokeOwnerUrls(id);
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}

  try {
    const key = `velora_custom_projects_list`;
    const existingStr = localStorage.getItem(key);
    if (existingStr) {
      const existing: PortfolioItem[] = JSON.parse(existingStr);
      const filtered = existing.filter((p) => p.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  } catch {}
}

// ================= PROJECT MEDIA OVERRIDES (VIDEOS & PHOTOS) =================

export interface MediaOverride {
  projectId: string;
  videoBlob?: Blob;
  galleryBlobs?: Blob[];
  videoUrlString?: string;
  galleryUrlStrings?: string[];
  updatedAt: number;
}

export async function saveProjectMediaOverride(
  projectId: string,
  override: Partial<MediaOverride>
): Promise<void> {
  try {
    const db = await getDB();
    const existing = (await getProjectMediaOverride(projectId)) || {
      projectId,
      updatedAt: Date.now(),
    };

    const updated: MediaOverride = {
      ...existing,
      ...override,
      projectId,
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readwrite');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.put(updated);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not save media override to IndexedDB:', err);
  }
}

export async function getProjectMediaOverride(
  projectId: string
): Promise<MediaOverride | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readonly');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.get(projectId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function deleteProjectMediaOverride(projectId: string): Promise<void> {
  revokeOwnerUrls(projectId);
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readwrite');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.delete(projectId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}
}
