// Offline detection and queue management utilities

export function isOnline(): boolean {
  if (typeof window === 'undefined') {
    return true; // Assume online on server
  }
  return navigator.onLine;
}

export function addOnlineListener(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}; // No-op on server
  }

  window.addEventListener('online', callback);
  return () => {
    window.removeEventListener('online', callback);
  };
}

export function addOfflineListener(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}; // No-op on server
  }

  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('offline', callback);
  };
}

// Offline action queue
interface QueuedAction {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
}

const QUEUE_KEY = 'offline-action-queue';

export function queueAction(type: string, payload: unknown): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const queue = getQueuedActions();
    const action: QueuedAction = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      payload,
      timestamp: Date.now(),
    };
    queue.push(action);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to queue action:', error);
  }
}

export function getQueuedActions(): QueuedAction[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get queued actions:', error);
    return [];
  }
}

export function clearQueuedActions(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(QUEUE_KEY);
  } catch (error) {
    console.error('Failed to clear queued actions:', error);
  }
}

export function removeQueuedAction(actionId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const queue = getQueuedActions();
    const filtered = queue.filter((action) => action.id !== actionId);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove queued action:', error);
  }
}

// Error type for offline errors
export class OfflineError extends Error {
  constructor(message = 'You are currently offline. This action will be synced when you come back online.') {
    super(message);
    this.name = 'OfflineError';
  }
}

