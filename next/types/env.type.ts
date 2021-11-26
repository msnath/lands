export class NodeEnv {
  private _env: "development" | "staging" | "production" | null;

  constructor(env: string) {
    if (env === "development" || env === "staging" || env === "production") {
      this._env = env;
    } else {
      this._env = null;
    }
  }

  get environment() {
    return this._env;
  }

  get capitalized() {
    if (this._env) {
      const front = this._env.substring(0, 1).toUpperCase();
      const back = this._env.substring(1).toLowerCase();
      return front + back;
    } else {
      return null;
    }
  }

  get isValid() {
    return this._env !== null;
  }
  get isDevelopment() {
    return this._env === "development";
  }
  get isStaging() {
    return this._env === "staging";
  }
  get isProduction() {
    return this._env === "production";
  }
}
