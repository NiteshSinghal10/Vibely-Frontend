import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Save data as JSON
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data and parse JSON
  getItem<T>(key: string): T | null {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : null;
  }

  // Remove specific item
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all local storage
  clear(): void {
    localStorage.clear();
  }

  // Check if key exists
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
