import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { SetActiveTheme, ToggleActiveTheme } from 'apps/portal/src/core/theme.actions';
import { defaultTheme, Theme, themeStateOptions } from 'apps/portal/src/core/theme.config';
import { IThemeState } from 'apps/portal/src/core/theme.model';
import { ThemeService } from 'apps/portal/src/core/theme.service';

@State<IThemeState>(themeStateOptions)
@Injectable()
export class ThemeState implements NgxsOnInit {
  private themeService = inject(ThemeService);

  ngxsOnInit(ctx: StateContext<IThemeState>) {
    ctx.dispatch(new SetActiveTheme(defaultTheme));
  }
  /**
   * Ein Selector, um das aktuell aktive Theme aus dem Store zu lesen.
   */
  @Selector()
  static activeTheme(state: IThemeState): Theme {
    return state.activeTheme;
  }

  /**
   * Reagiert auf die `SetTheme`-Action und aktualisiert den Zustand.
   */
  @Action(SetActiveTheme)
  setActiveTheme(ctx: StateContext<IThemeState>, { activeTheme }: SetActiveTheme) {
    ctx.patchState({ activeTheme });
  }

  @Action(ToggleActiveTheme)
  toggleActiveTheme(ctx: StateContext<IThemeState>) {
    const state = ctx.getState();
    const activeTheme = state.activeTheme === 'light' ? 'dark' : 'light';
    ctx.patchState({ activeTheme });
  }
}
