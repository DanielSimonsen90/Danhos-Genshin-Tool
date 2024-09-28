import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.baseService);

export default abstract class BaseService<TResult> {
  constructor(private _lastResult?: TResult | undefined) {}

  public get lastResult(): TResult | undefined {
    return this._lastResult;
  }
  public set lastResult(value: TResult | undefined) {
    debugLog('BaseService.lastResult update', { value });
    this._lastResult = value;
  }
}