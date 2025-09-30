import { StateContext } from '@ngxs/store';

export type Context = StateContext<IAppState>;

export type Theme = 'light' | 'dark';

export interface IAppState {
  isLoading: boolean;
  theme: Theme;
}
