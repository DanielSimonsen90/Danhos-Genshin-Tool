import { pascalCaseFromCamelCase } from "@/common/functions/strings";
import FilterSwitch from "../FilterSwitch";

type FilterOptionProps = {
  name: string,
  i: number,
  option: string,
  value: boolean | undefined,

  onSelect: (value: boolean | undefined) => void,
};

export default function FilterOption({
  option, value,
  onSelect,
}: FilterOptionProps) {
  return (
    <li className="select__option filter-option">
      <FilterSwitch
        value={value}
        onChange={onSelect}
      />
      <label>
        {pascalCaseFromCamelCase(option)}
      </label>
    </li>
  );
}