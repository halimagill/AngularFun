import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { debug } from 'console';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const storage = inject(StorageService);
  const token = storage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
