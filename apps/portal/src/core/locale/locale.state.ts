import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { InitLocales, SetActiveLocale, SetPreferedLocale } from 'apps/portal/src/core/locale/locale.actions';
import { localeStateOptions, SupportedLocale } from 'apps/portal/src/core/locale/locale.config';
import { Context, ILocaleState } from 'apps/portal/src/core/locale/locale.model';
import { LocaleService } from 'apps/portal/src/core/locale/locale.service';

@State<ILocaleState>(localeStateOptions)
@Injectable()
export class LocaleState {
  activeLocale = inject(LOCALE_ID) as SupportedLocale;
  private localeService = inject(LocaleService);

  @Selector()
  static preferedLocale(state: ILocaleState): SupportedLocale | null {
    return state.preferedLocale;
  }

  @Selector()
  static activeLocale(state: ILocaleState): SupportedLocale {
    return state.activeLocale;
  }

  @Action(InitLocales)
  InitLocales(ctx: Context) {
    const state = ctx.getState();
    const preferedLocale = state.preferedLocale;

    if (!preferedLocale) {
      ctx.dispatch(new SetPreferedLocale(this.activeLocale));
    }
  }

  @Action(SetActiveLocale)
  setActiveLocale(ctx: Context, { userLocale, isBrowser }: SetActiveLocale) {
    const activeLocale = this.localeService.getActiveLocale(userLocale, isBrowser);
    ctx.patchState({ activeLocale });
  }

  @Action(SetPreferedLocale)
  setPreferedLocale(ctx: Context, { preferedLocale }: SetPreferedLocale) {
    const state = ctx.getState();
    if (state) {
      const activeLocale = state.activeLocale;
      ctx.setState({ ...state, activeLocale });
    }
  }
}
