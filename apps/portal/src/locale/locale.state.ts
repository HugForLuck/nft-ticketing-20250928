import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { SetPreferedLocale } from 'apps/portal/src/locale/locale.actions';
import { localeStateOptions, SupportedLocale } from 'apps/portal/src/locale/locale.config';
import { Context, ILocaleState } from 'apps/portal/src/locale/locale.model';

@State<ILocaleState>(localeStateOptions)
@Injectable()
export class LocaleState {
  @Selector()
  static preferedLocale(state: ILocaleState): SupportedLocale | null {
    return state.preferedLocale;
  }

  @Action(SetPreferedLocale)
  setLocale(ctx: Context, { preferedLocale }: SetPreferedLocale) {
    ctx.patchState({ preferedLocale });
  }
}
