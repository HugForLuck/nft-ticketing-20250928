import { Theme } from 'apps/portal/src/core/app/app.model';

// Eine Action, um das Theme zu wechseln.
export class SetActiveTheme {
  static readonly type = '[Theme] Set Theme';
  constructor(public activeTheme: Theme) {}
}

export class ToggleActiveTheme {
  static readonly type = '[Theme] Toggle Theme';
}
