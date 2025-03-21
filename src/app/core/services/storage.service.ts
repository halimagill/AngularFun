import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LOCAL_STORAGE } from '../models/localStorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) { }
  get(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
//   constructor(@Inject(LOCAL_STORAGE) private storage: Storage) { }

//   setItem(key: string, value: any): void {
//     this.storage.setItem(key, JSON.stringify(value));
//   }
//   getItem<T>(key: string): T | null {
//     debugger;
//     const storedValue = this.storage.getItem(key);
//     return storedValue ? (JSON.parse(storedValue) as T) : null;
//   }
//   removeItem(key: string): void {
//     debugger;
//     this.storage.removeItem(key);
//   }
// }