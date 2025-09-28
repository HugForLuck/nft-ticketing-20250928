import { emailVerifyPath } from 'apps/portal/src/auth/auth.config';

export function hasEmailVerifyPath(path: string) {
  return path.includes(emailVerifyPath);
}
