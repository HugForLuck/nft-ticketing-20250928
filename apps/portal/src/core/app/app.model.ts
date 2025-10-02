import { StateContext } from '@ngxs/store';

export type Context = StateContext<IAppState>;

export interface IAppState {
  isLoading: boolean;
}
