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

    const form = [...event.currentTarget.querySelectorAll('[name]').values()].map(el => ({
      name: el.getAttribute('name'),
      value: (() => {
        if (el instanceof HTMLInputElement) return el.checked ?? el.value ?? el.defaultValue ?? el.defaultChecked;
        if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) return el.value ?? ('defaultValue' in el ? el.defaultValue : null);
        console.error('Unhandled element type', { el });
        return null;
      })()
    }))
    const data: Record<string, any> = { _form: form };
    Object.values(form).forEach(({ name, value }) => {
      if (name.includes('[')) {
        const arrKey = name.split('[')[0];
        if (!data[arrKey]) data[arrKey] = [];
        data[arrKey].push(value);

      } else if (name.includes('.')) {
        const [objKey, objProp] = name.split('.');
        if (!data[objKey]) data[objKey] = {};
        data[objKey][objProp] = value;
        
      } else data[name] = value === 'on' ? true : value === 'off' ? false : value;
    });

    if (expectedPropertyLength !== -1 && Object.keys(data).length !== expectedPropertyLength + 1) { // +1 for '_form'
      console.error('Invalid data recieved - expectedPropertyLength exeeds returned data length', data);
      setLoading(false);
      return;
    }

    debugLog('useActionState submit', data);
    onSubmit(data as SubmitData<TResult>);
    setLoading(false);
  }

  debugLog('useActionState update', { loading, props: { expectedPropertyLength } });

  return [loading, handleSubmit] as const;
}