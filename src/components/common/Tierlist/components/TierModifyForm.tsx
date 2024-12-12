import { generateRandomColor } from "@/common/functions/random";
import Switch from "../../Switch";
import { Tier } from "../TierlistTypes";
import { useActionState } from "@/hooks/useActionState";
import { classNames } from "@/common/functions/strings";
import { useRef, useState } from "react";

export type FormTier = Omit<Partial<Tier> & Pick<Tier, 'id'>, 'items'>;

type Props = {
  tier: FormTier;
  onTierUpdate: (id: string, newTier: Partial<Tier>) => void;

  submitText?: string;
  add?: boolean;
  
};
export default function TierModifyForm({ tier, submitText, onTierUpdate, add }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const invertRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(tier.title ?? '');
  const [color, setColor] = useState(tier.color ?? generateRandomColor());
  const [inverted, setInverted] = useState(tier.invert ?? false);

  const [submitting, onSubmit] = useActionState<Tier>(data => {
    delete data._form;
    data.items = [];
    onTierUpdate(data.id, data);

    setTitle('');
    if (titleRef.current) titleRef.current.value = '';

    setColor(generateRandomColor());
    if (colorRef.current) colorRef.current.value = '';

    setInverted(false);
    if (invertRef.current) invertRef.current.checked = false
  });

  return (
    <form id={`modify-tier--${tier.id}`} className={classNames('tier', add && 'add')} onSubmit={onSubmit} style={{ backgroundColor: color }}>
      <input type="hidden" name="id" defaultValue={tier.id} />
      <div className="input-group">
        <label htmlFor="color">Color</label>
        <input ref={colorRef} type="color" name="color" defaultValue={color} onChange={e => setColor(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="invert">Invert</label>
        <Switch ref={invertRef} defaultChecked={tier.invert} onChange={setInverted} name="invert" />
      </div>

      <header className="tier__header">
        <input ref={titleRef} className={classNames('tier__title', inverted && 'inverted')} 
          type="text" name="title" defaultValue={tier.title} placeholder="Tier title"
          onChange={e => setTitle(e.target.value)}
        />
      </header>
      {submitText && <button className={classNames(add && 'primary success')} type="submit" disabled={submitting || !title}>{submitText}</button>}
    </form>
  );
}