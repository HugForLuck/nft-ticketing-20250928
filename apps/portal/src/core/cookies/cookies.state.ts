import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { cookiesStateOptions } from 'apps/portal/src/core/cookies/cookies.config';
import { ICookiesConsent, ICookiesState } from 'apps/portal/src/core/cookies/cookies.model';

@State<ICookiesState | null>(cookiesStateOptions)
@Injectable()
export class CookiesState {
  // TODO: timestamped to be checked via firebase claims
  /**
   * Cookies are set and not outdated
   * @param state
   * @returns
   */
  @Selector()
  static cookiesAreValid(state: ICookiesState): boolean {
    return !!state;
  }

  @Selector()
  static allowedCookies(state: ICookiesState | null): ICookiesConsent | null {
    if (!state) return null;
    const functional = state?.functional;
    const comfort = state?.comfort;

    return { functional, comfort };
  }

  @Selector()
  static functionalConsented(state: ICookiesState | null): boolean {
    if (!state) return false;
    return state?.functional;
  }
}
