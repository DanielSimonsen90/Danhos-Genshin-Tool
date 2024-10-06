import { UncrontrolledProps, ControlledProps, Props } from "./Props";
import ControlledSearchableList from "./components/ControlledSearchableList";
import UncontrolledSearchableList from "./components/UncontrolledSearchableList";

export default function SearchableList<TItem>(props: Props<TItem>) {
  const isControlled = "search" in props && "setSearch" in props;
  const uncontrolledProps = props as UncrontrolledProps<TItem>;
  const controlledProps = props as ControlledProps<TItem>;

  return isControlled
    ? <UncontrolledSearchableList {...controlledProps} />
    : <ControlledSearchableList {...uncontrolledProps} />
}