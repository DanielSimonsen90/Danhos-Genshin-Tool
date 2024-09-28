import { useState } from "react";

export function useActionState<TResult extends Record<string, string>>(onSubmit: (data: TResult) => void) {
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

    onSubmit(data as TResult);
    setLoading(false);
  }

  return [loading, handleSubmit] as const;
}