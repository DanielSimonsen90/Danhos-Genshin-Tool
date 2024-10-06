import { useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";

export default function ControlledSearchableList<TItem>({ items, ...props }: UncrontrolledProps<TItem> & OptionalProps<TItem>) {
  const [search, setSearch] = useState('');
  const results = useMemo(() => items.filter(item => props.onSearch(search, item)), [items, search]);
  const render = 'children' in props ? props.children : props.renderItem;

  return <UncontrolledSearchableList 
    search={search} setSearch={setSearch} 
    {...props} 
    children={results.map(result => [render(result), result])} 
  />
}