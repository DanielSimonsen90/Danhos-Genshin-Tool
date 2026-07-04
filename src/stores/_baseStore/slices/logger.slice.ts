import { DebugLog } from "@/common/functions/dev";
import StoreBuilder from "../StoreBuilder";

export default function (name: keyof typeof DebugLog.DEBUGS) {
  const debugLog = DebugLog(name)
  
  return new StoreBuilder()
    .addApi(() => ({
      debugLog
    }))
}