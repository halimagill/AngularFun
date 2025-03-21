import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { debug } from 'console';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  //const token = inject(StorageService).getItem('token');
  const token = localStorage.getItem('token');
  console.log(token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
