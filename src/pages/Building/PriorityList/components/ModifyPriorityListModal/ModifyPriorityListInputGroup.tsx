import { useState } from "react";
import ObjectUtils from "@/common/functions/object";
import { ModifyPriorityListPayload } from "../../PriorityListTypes";
import { Select } from "@/components/common/FormItems";
import { ModelKeys } from "@/common/models";
import { pascalCaseFromCamelCase } from "@/common/functions/strings";
import { AREAS, NO_PRESET } from "../../PriorityListConstants";

type Props<TKey extends keyof ModifyPriorityListPayload> = {
  inputKey: TKey;
  defaultValue: ModifyPriorityListPayload[TKey];
}

export default function ModifyPriorityListInputGroup<TKey extends keyof ModifyPriorityListPayload>({ inputKey, ...props }: Props<TKey>) {
  const [shouldShowCustomTitle, setShouldShowCustomTitle] = useState(!!props.defaultValue);
  
  const input = (() => {
    const inputProps = {
      name: inputKey,
      defaultValue: props.defaultValue as any,
      placeholder: inputKey,
      required: true
    }
    switch (inputKey) {
      case 'id': return <input type="hidden" {...ObjectUtils.exclude(inputProps, 'defaultValue')} value={props.defaultValue as ModifyPriorityListPayload['id']} />;
      case 'title': return (
        <div className="title-wrapper">
          <Select {...inputProps} 
            options={[NO_PRESET, ...AREAS]} 
            placeholder="Select a title" 
            name={`preset-${inputKey}`} 
            onChange={value => setShouldShowCustomTitle(value === NO_PRESET)} 
          />
          {shouldShowCustomTitle && <input type="text" {...inputProps} placeholder="Write the title of your new priority list..." />}
        </div>
      );
      case 'model': return <Select {...inputProps} options={ModelKeys} placeholder="Select a model for your priority list" />;
      // case 'tiers': return <input type="number" name={`${inputKey}Length`} defaultValue={(props.defaultValue as ModifyPriorityListPayload['tiers']).length} />;
      case 'tiers': return null;
      default: {
        console.error(`Unknown input key ${inputKey}`);
        return null;
      }
    }
  })();
  
  return (
    !input ? null : (
      <div className="input-group">
        {input.props.type === 'hidden' ? null : (
          <label htmlFor={inputKey}>
            {pascalCaseFromCamelCase(inputKey)}
          </label>
        )}
        {input}
      </div>
    )
  )
}