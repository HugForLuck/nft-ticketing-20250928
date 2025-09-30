import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, Store } from '@ngxs/store';
import { BootstrapApp, SetIsLoading } from 'apps/portal/src/core/app/app.actions';
import { appStateDefaults } from 'apps/portal/src/core/app/app.config';
import { Context, IAppState } from 'apps/portal/src/core/app/app.model';
import { AppService } from 'apps/portal/src/core/app/app.service';

@State<IAppState>({
  name: 'app',
  defaults: appStateDefaults,
})
@Injectable()
export class AppState {
  private store = inject(Store);
  private appService = inject(AppService);

  ngxsOnInit(ctx: Context) {
    ctx.dispatch(new SetIsLoading(true));
  }
  @Selector()
  static isLoading(state: IAppState) {
    return state.isLoading;
  }

  @Action(BootstrapApp)
  bootstrap(ctx: Context) {
    // const functionalConsented = this.store.selectSnapshot(CookiesState.functionalConsented);
    // let userLocale = null;
    // if (functionalConsented && !isPathEmailVerify()) {
    //   // TODO: login user with firebase (authState)
    //   // TODO: load `dbLocale` fromDB (localeState)
    //   // userLocale = dbLocale;
    // }
    // this.store.dispatch(new SetActiveLocale(userLocale, this.appService.isBrowser));
  }

  @Action(SetIsLoading)
  setIsLoading(ctx: Context, { isLoading }: SetIsLoading) {
    const state = ctx.getState();
    ctx.setState({ ...state, isLoading });
  }
}
