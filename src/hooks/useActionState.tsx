import { useState } from "react";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.useActionState);

export type SubmitData<TData> = TData & {
  _form: FormData
}

export function useActionState<TResult extends Record<string, any>>(
  onSubmit: (data: SubmitData<TResult>) => void,
  expectedPropertyLength: number = -1,
) {
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data: Record<string, any> = { _form: [...formData.entries()] };
    formData.forEach((value, key) => {
      if (key.includes('[')) {
        const arrKey = key.split('[')[0];
        if (!data[arrKey]) data[arrKey] = [];
        data[arrKey].push(value);
      } else if (key.includes('.')) {
        const [objKey, objProp] = key.split('.');
        if (!data[objKey]) data[objKey] = {};
        data[objKey][objProp] = value;
      } else data[key] = value === 'on' ? true : value === 'off' ? false : value;
    });

    if (expectedPropertyLength !== -1 && Object.keys(data).length !== expectedPropertyLength + 1) { // +1 for '_form'
      console.error('Invalid data recieved - expectedPropertyLength exeeds returned data length', data);
      setLoading(false);
      return;
    }

    onSubmit(data as SubmitData<TResult>);
    setLoading(false);
  }

  debugLog('useActionState update', { loading, props: { expectedPropertyLength } });

  return [loading, handleSubmit] as const;
}