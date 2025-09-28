import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';
import { SetIsReady } from 'apps/portal/src/app/app.actions';
import { appStateDefaults } from 'apps/portal/src/app/app.config';
import { Context, IAppState } from 'apps/portal/src/app/app.model';

@State<IAppState>({
  name: 'app',
  defaults: appStateDefaults,
})
@Injectable()
export class AppState {
  @Selector()
  static isReady(state: IAppState) {
    return state.isReady;
  }

  @Action(SetIsReady)
  setIsReady(ctx: Context, { isReady }: SetIsReady) {
    ctx.patchState({ isReady });
  }
}
