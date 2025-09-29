export class BootstrapApp {
  static readonly type = '[App] Bootstrap';
}

export class SetIsReady {
  static readonly type = '[App] Set is ready';
  constructor(public isReady: boolean) {}
}
