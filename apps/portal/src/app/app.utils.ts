import { hasEmailVerifyPath } from 'apps/portal/src/auth/auth.utils';
import { of } from 'rxjs';

export function bootstrapApp() {
  const path = window.location.pathname;

  // used to bypass auth check
  if (hasEmailVerifyPath(path)) return of();

  return of();
}
