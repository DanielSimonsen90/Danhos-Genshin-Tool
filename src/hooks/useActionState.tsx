import { useState } from "react";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.useActionState);

type SubmitData<TData> = TData & {
  _form: FormData
}

export function useActionState<TResult extends Record<string, any>>(
  expectedPropertyLength: number,
  onSubmit: (data: SubmitData<TResult>) => void
) {
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data: Record<string, any> = {
      _form: [...formData.entries()]
    };
    formData.forEach((value, key) => {
      if (key.includes('[')) {
        const arrKey = key.split('[')[0];
        if (!data[arrKey]) data[arrKey] = [];
        data[arrKey].push(value);
      } else data[key] = value.toString();
    });

    if (Object.keys(data).length !== expectedPropertyLength + 1) { // +1 for '_form'
      console.error('Invalid data:', data);
      setLoading(false);
      return;
    }

    onSubmit(data as SubmitData<TResult>);
    setLoading(false);
  }

  debugLog('useActionState update', { loading, props: { expectedPropertyLength } });

  return [loading, handleSubmit] as const;
}