import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { BootstrapApp, SetIsLoading } from 'apps/portal/src/core/app/app.actions';
import { appStateDefaults } from 'apps/portal/src/core/app/app.config';
import { Context, IAppState } from 'apps/portal/src/core/app/app.model';

@State<IAppState>({
  name: 'app',
  defaults: appStateDefaults,
})
@Injectable()
export class AppState {
  ngxsOnInit(ctx: Context) {
    ctx.dispatch(new SetIsLoading(true));
  }
  @Selector()
  static isLoading(state: IAppState) {
    return state.isLoading;
  }

  @Action(BootstrapApp)
  bootstrap(ctx: Context) {
    setTimeout(() => {
      ctx.dispatch(new SetIsLoading(false));
    }, 1000);
  }

  @Action(SetIsLoading)
  setIsLoading(ctx: Context, { isLoading }: SetIsLoading) {
    ctx.patchState({ isLoading });
  }
}
