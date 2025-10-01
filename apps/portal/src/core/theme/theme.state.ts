import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Theme } from 'apps/portal/src/core/app/app.model';
import { SetActiveTheme, ToggleActiveTheme } from 'apps/portal/src/core/theme/theme.actions';
import { themeStateOptions } from 'apps/portal/src/core/theme/theme.config';
import { IThemeState } from 'apps/portal/src/core/theme/theme.model';
import { ThemeService } from 'apps/portal/src/core/theme/theme.service';

@State<IThemeState>(themeStateOptions)
@Injectable()
export class ThemeState implements NgxsOnInit {
  private themeService = inject(ThemeService);

  ngxsOnInit(ctx: StateContext<IThemeState>) {}
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
