import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppErrorHandlerService } from './core/app-error-handler';
import { customInterceptor } from './core/interceptors/custom.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationService } from './core/services/authentication.service';
import { LOCAL_STORAGE } from './core/models/localStorage';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './core/services/storage.service';
import { PlatformService } from './core/services/platform.service';
/* In your application configurations, provide different implementations 
for LOCAL_STORAGE depending on the platform. */
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(JwtModule.forRoot({})),
    provideAnimations(),
    provideHttpClient(withFetch(), 
    withInterceptors([customInterceptor])), 
    { provide: ErrorHandler, useClass:AppErrorHandlerService } ,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    { provide: LOCAL_STORAGE, 
      useFactory: (platformId: object) => {
        if (isPlatformBrowser(platformId)) {
          return {};
        }
        return StorageService;
      },
      deps: ['PLATFORM_ID'] 
    },
    AuthGuard,
    AuthenticationService,
    StorageService,
    PlatformService,
    { provide: 'PLATFORM_ID', useValue: PLATFORM_ID }
 ]
};
