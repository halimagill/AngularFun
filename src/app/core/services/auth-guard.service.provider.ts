import { Router } from '@angular/router';
import { AuthGuard } from "./auth-guard.service";
import { AuthenticationService } from "./authentication.service";
import { PlatformService } from './platform.service';
import { platform } from 'os';

export const authGuardFactory = (router: Router, authService: AuthenticationService, platformService: PlatformService) =>
    new AuthGuard(router, authService, platformService);

export const authGuardProvider = {
    provide: AuthGuard,
    useFactory: authGuardFactory,
    deps: [Router, AuthenticationService, PlatformService]
  };