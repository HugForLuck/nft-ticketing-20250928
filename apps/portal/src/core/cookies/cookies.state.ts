import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateCookieSettings } from 'apps/portal/src/core/cookies/cookies.action';
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

  @Selector()
  static getCookieSettings(state: ICookiesState | null): ICookiesConsent | null {
    if (!state) return null;
    return { functional: state?.functional, comfort: state?.comfort };
  }

  @Action(UpdateCookieSettings)
  updateCookieSettings(ctx: StateContext<ICookiesState | null>, { settings }: UpdateCookieSettings) {
    const state = ctx.getState();
    ctx.setState({ ...state, ...settings });
  }
}
