import { Router } from '@angular/router';
import { AuthGuard } from "./auth-guard.service";
import { AuthenticationService } from "./authentication.service";

export const authGuardFactory = (router: Router, authService: AuthenticationService) =>
    new AuthGuard(router, authService);

export const authGuardProvider = {
    provide: AuthGuard,
    useFactory: authGuardFactory,
    deps: [Router, AuthenticationService]
  };