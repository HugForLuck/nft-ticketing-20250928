import { hasEmailVerifyPath } from 'apps/portal/src/auth/auth.utils';
import { of, tap } from 'rxjs';

export function bootstrapApp() {
  const path = window.location.pathname;

  // used to bypass auth check
  if (hasEmailVerifyPath(path)) return of();

  return of('').pipe(tap(hideSplashScreen));
}

function hideSplashScreen(): void {
  const splashScreen = document.getElementById('app-splash-screen');
  if (splashScreen) {
    // 1. Füge die Fade-Out-Klasse hinzu, um die CSS-Animation zu starten.
    splashScreen.classList.add('fade-out');

    // 2. Entferne das Element nach der Animation vollständig aus dem DOM.
    setTimeout(() => {
      splashScreen.remove();
    }, 500); // Dauer muss mit der CSS-Transitions-Dauer übereinstimmen
  }
}
