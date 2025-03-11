import { ModifyPriorityListPayload } from "../../PriorityListTypes";
import Select from "@/components/common/Select";
import { ModelKeys } from "@/common/models";
import { pascalCaseFromCamelCase } from "@/common/functions/strings";

type Props<TKey extends keyof ModifyPriorityListPayload> = {
  inputKey: TKey;
  defaultValue: ModifyPriorityListPayload[TKey];
}

export default function ModifyPriorityListInputGroup<TKey extends keyof ModifyPriorityListPayload>({ inputKey, ...props }: Props<TKey>) {
  const input = (() => {
    const inputProps = {
      name: inputKey,
      defaultValue: props.defaultValue as any,
      placeholder: inputKey,
    }
    switch (inputKey) {
      case 'id': return <input type="hidden" {...inputProps} value={props.defaultValue as ModifyPriorityListPayload['id']} />;
      case 'title': return <input type="text" {...inputProps} />;
      case 'model': return <Select {...inputProps} options={ModelKeys} />;
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