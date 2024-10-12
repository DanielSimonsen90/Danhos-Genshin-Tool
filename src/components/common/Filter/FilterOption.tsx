import { pascalCaseFromCamelCase } from "@/common/functions/strings";

type FilterOptionProps = {
  name: string,
  i: number,
  option: string,
  value: boolean,

  onSelect: (option: string) => void,
};

export default function FilterOption({
  name, i, option, value,
  onSelect,
}: FilterOptionProps) {
  return (
    <li onClick={() => onSelect(option)} className="select__option">
      <input
        name={`${name}[${i}]`}
        type="checkbox"
        value={option}
        checked={value}
        onChange={() => { }}
      />
      <label>
        {pascalCaseFromCamelCase(option)}
      </label>
    </li>
  );
}