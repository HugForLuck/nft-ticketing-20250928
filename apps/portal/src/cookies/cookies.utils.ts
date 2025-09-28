import { COMFORT_STATES } from 'apps/portal/src/cookies/cookies.config';
import { ICookiesConsent } from 'apps/portal/src/cookies/cookies.model';

export function cookieConsented(cookies: ICookiesConsent | null, cookieToBeChecked: string) {
  if (!cookies) return false;
  const { functional, comfort } = cookies;
  return functionalConsented(functional, cookieToBeChecked) || comfortConsented(comfort, cookieToBeChecked);
}

function functionalConsented(cookieIsAllowed: boolean, cookieToBeChecked: string) {
  return cookieIsAllowed && COMFORT_STATES.includes(cookieToBeChecked);
}

function comfortConsented(cookieIsAllowed: boolean, cookieToBeChecked: string) {
  return cookieIsAllowed && COMFORT_STATES.includes(cookieToBeChecked);
}
