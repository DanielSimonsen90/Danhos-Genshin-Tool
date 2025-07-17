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
        const type = el.getAttribute('type');
        const input = el.tagName === 'INPUT' ? (el as HTMLInputElement) : null;
        const select = el.tagName === 'SELECT' ? (el as HTMLSelectElement) : null;
        const textarea = el.tagName === 'TEXTAREA' ? (el as HTMLTextAreaElement) : null;

        if (type === 'checkbox') return input?.checked ? input.value || true : null;
        if (type === 'radio') return input?.checked ? input.value : null;

        const formElement = input || select || textarea;
        if (formElement) return (
          formElement.value 
          || ('defaultValue' in formElement ? formElement.defaultValue : null) 
          || ('checked' in formElement ? formElement.checked : null)
        );

        console.error('Unhandled element type', { el });
        return null;
      })()
    }))
    const data: Record<string, any> = { _form: form };
    let hasPlaceholder = false;
    Object.values(form).forEach(({ name, value }) => {
      if (value === '<placeholder>') {
        hasPlaceholder = true;
        return;
      }

      if (name.includes('[')) {
        const arrKey = name.split('[')[0];
        if (!data[arrKey]) data[arrKey] = []; 
        if (value !== null && value !== undefined) data[arrKey].push(value);

      } else if (name.includes('.')) {
        const [objKey, objProp] = name.split('.');
        if (!data[objKey]) data[objKey] = {};
        data[objKey][objProp] = value;
        
      } else data[name] = value === 'on' ? true : value === 'off' ? false : value;
    });

    if (hasPlaceholder) {
      console.error('Invalid data received - placeholder value', data);
      setLoading(false);
      return;
    } else if (expectedPropertyLength !== -1 && Object.keys(data).length !== expectedPropertyLength + 1) { // +1 for '_form'
      console.error('Invalid data received - expectedPropertyLength exceeds returned data length', data);
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