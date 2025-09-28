import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { SetIsReady } from 'apps/portal/src/app/app.actions';
import { appStateOptions } from 'apps/portal/src/app/app.config';
import { Context, IAppState } from 'apps/portal/src/app/app.model';

@State<IAppState>(appStateOptions)
@Injectable()
export class AppState {
  @Action(SetIsReady)
  setIsReady(ctx: Context, { isReady }: SetIsReady) {
    ctx.patchState({ isReady });
  }
}
