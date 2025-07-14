import { useEffect, useRef, useState } from "react";

import { generateRandomColor, colorConvert } from "@/common/functions/colors";
import { classNames } from "@/common/functions/strings";
import { useActionState } from "@/hooks/useActionState";

import Switch from "../../Switch";
import { Tier } from "../TierlistTypes";

export type FormTier<T> = Omit<Partial<Tier<T>> & Pick<Tier<T>, 'id'>, 'entries'>;

type Props<T> = {
  tier: FormTier<T>;
  onTierUpdate: (id: string, newTier: Partial<Tier<T>>) => void;

  submitText?: string;
  add?: boolean;

};
export default function TierModifyForm<T>({ tier, submitText, onTierUpdate, add }: Props<T>) {
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const invertRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(tier.title);
  const [color, setColor] = useState(tier.color);
  const [inverted, setInverted] = useState(tier.invert);

  const [submitting, onSubmit] = useActionState<Tier<T>>(data => {
    delete data._form;
    // console.log('TierModifyForm', data);
    onTierUpdate(data.id, data);

    setTitle('');
    if (titleRef.current) titleRef.current.value = '';

    setColor(generateRandomColor());
    if (colorRef.current) colorRef.current.value = '';

    setInverted(false);
    if (invertRef.current) invertRef.current.checked = false;
  });

  useEffect(() => {
    if (titleRef.current && tier.title) titleRef.current.value = tier.title;
    if (colorRef.current && tier.color) colorRef.current.value = tier.color?.includes('#') ? tier.color : colorConvert(tier.color, 'hsl', 'hex');
    if (invertRef.current && tier.invert !== undefined) invertRef.current.checked = tier.invert;

    setTitle(tier.title);
    setColor(tier.color);
    setInverted(tier.invert);
  }, [tier])

  return (
    <form id={`modify-tier--${tier.id}`} className={classNames('tier', add && 'add')} onSubmit={onSubmit} style={{ backgroundColor: color }}>
      <input type="hidden" name="id" defaultValue={tier.id} />
      <header className="tier__header">
        <input ref={titleRef} className={classNames('tier__title', inverted && 'inverted')}
          type="text" name="title" defaultValue={tier.title} placeholder="Tier title"
          onChange={e => setTitle(e.target.value)}
        />
      </header>
      <div className="input-group">
        <label htmlFor="color">Color</label>
        <input ref={colorRef} type="color" name="color" 
          defaultValue={color && color.includes('#') ? color : colorConvert(color, 'hsl', 'hex')}
          onChange={e => setColor(e.target.value)} 
        />
      </div>
      <div className="input-group">
        <label htmlFor="invert">Invert</label>
        <Switch ref={invertRef} defaultChecked={tier.invert} onChange={setInverted} name="invert" />
      </div>
      {submitText && <button className={classNames(add && 'primary success')} type="submit" disabled={submitting || !title}>{submitText}</button>}
    </form>
  );
}