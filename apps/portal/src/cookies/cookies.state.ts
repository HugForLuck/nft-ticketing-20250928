import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { cookiesStateOptions } from 'apps/portal/src/cookies/cookies.config';
import { ICookiesConsent, ICookiesState } from 'apps/portal/src/cookies/cookies.model';

@State<ICookiesState | null>(cookiesStateOptions)
@Injectable()
export class CookiesState {
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
}
