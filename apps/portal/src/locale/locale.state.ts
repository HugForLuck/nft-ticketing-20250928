import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { InitLocales, SetActiveLocale, SetPreferedLocale } from 'apps/portal/src/locale/locale.actions';
import { localeStateOptions, SupportedLocale } from 'apps/portal/src/locale/locale.config';
import { Context, ILocaleState } from 'apps/portal/src/locale/locale.model';

@State<ILocaleState>(localeStateOptions)
@Injectable()
export class LocaleState {
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
    // const state = ctx.getState();
    // const locale = this.activeLocale;
    // if (!state) {
    //   ctx.setState({
    //     activeLocale: locale,
    //     preferedLocale: locale,
    //   });
    // } else if (state.preferedLocale) {
    // }
    // ctx.dispatch(new SetActiveLocale(this.activeLocale));
    // const preferedLocale = ctx.getState()?.preferedLocale;
    // if (!preferedLocale) {
    //   ctx.dispatch(new SetPreferedLocale(this.activeLocale));
    // }
  }

  @Action(SetActiveLocale)
  setActiveLocale(ctx: Context, { activeLocale }: SetActiveLocale) {
    const state = ctx.getState();
    const defaultActiveLocale = state.activeLocale;
    if (defaultActiveLocale !== activeLocale) {
      ctx.patchState({ activeLocale });
    }
  }

  @Action(SetPreferedLocale)
  setPreferedLocale(ctx: Context, { preferedLocale }: SetPreferedLocale) {
    const state = ctx.getState();
    if (state) {
      const activeLocale = state.activeLocale;
      ctx.setState({ ...state, activeLocale });
    }
  }

  // @Action(RedirectIfPreferedNotActive)
  // redirectIfPreferedNotActive(ctx: Context) {
  //   const state = ctx.getState();
  //   // if (!state) return;

  //   // const preferedLocale = state.preferedLocale;
  //   // const activeLocale = state.activeLocale;

  //   // if (!preferedLocale) {
  //   //   ctx.dispatch(new SetPreferedLocale(activeLocale));
  //   // } else if (preferedLocale !== activeLocale) {
  //   //   return;
  //   // }
  // }
}
