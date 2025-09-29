import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { RedirectIfPreferedNotActive, SetActiveLocale, SetPreferedLocale } from 'apps/portal/src/locale/locale.actions';
import { localeStateOptions, SupportedLocale } from 'apps/portal/src/locale/locale.config';
import { Context, ILocaleState } from 'apps/portal/src/locale/locale.model';

@State<ILocaleState>(localeStateOptions)
@Injectable()
export class LocaleState {
  activeLocale = inject(LOCALE_ID) as SupportedLocale;

  ngxsOnInit(ctx: Context) {
    ctx.dispatch(new SetActiveLocale(this.activeLocale));
  }

  @Selector()
  static preferedLocale(state: ILocaleState): SupportedLocale | null {
    return state.preferedLocale;
  }

  @Selector()
  static activeLocale(state: ILocaleState): SupportedLocale {
    return state.activeLocale;
  }

  @Action(SetActiveLocale)
  setActiveLocale(ctx: Context, { activeLocale }: SetActiveLocale) {
    ctx.patchState({ activeLocale });
  }

  @Action(SetPreferedLocale)
  setLocale(ctx: Context, { preferedLocale }: SetPreferedLocale) {
    ctx.patchState({ preferedLocale });
  }

  @Action(RedirectIfPreferedNotActive)
  redirectIfPreferedNotActive(ctx: Context) {
    const state = ctx.getState();
    if (!state) return;

    const preferedLocale = state.preferedLocale;
    const activeLocale = state.activeLocale;

    if (!preferedLocale) {
      ctx.dispatch(new SetPreferedLocale(activeLocale));
    } else if (preferedLocale !== activeLocale) {
      // const win = document.defaultView;
      // if (!win) return;
      return;

      // redirect to url/preferedLocale
    }
  }
}
