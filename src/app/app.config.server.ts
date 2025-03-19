import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { LOCAL_STORAGE } from './core/models/localStorage';

/* In the server configuration, LOCAL_STORAGE is provided 
with methods that do nothing, preventing errors when accessed during SSR. */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {}
      }),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
