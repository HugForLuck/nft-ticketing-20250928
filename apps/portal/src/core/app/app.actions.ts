export class BootstrapApp {
  static readonly type = '[App] Bootstrap';
}

export class SetIsLoading {
  static readonly type = '[App] Set is loading';
  constructor(public isLoading: boolean) {}
}
