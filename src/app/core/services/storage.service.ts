import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LOCAL_STORAGE } from '../models/localStorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) { }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
  getItem<T>(key: string): T | null {
    debugger;
    const storedValue = this.storage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  }
  removeItem(key: string): void {
    debugger;
    this.storage.removeItem(key);
  }
}