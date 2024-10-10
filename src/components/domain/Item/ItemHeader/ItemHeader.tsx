import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import Chevron from "@/components/common/icons/Chevron";
import { useNavigate } from "react-router-dom";

type Props = {
  itemName: string;
  item: {
    name: string;
  }
}
export default function ItemHeader({ item, itemName }: Props) {
  const navigate = useNavigate();
  
  return (
    <header className={`item-page-header ${itemName.toLowerCase()}-page-header`}>
      <a href="#" onClick={() => navigate(-1)}>
        <Chevron point="left" />
        <span>Back</span>
      </a>
      <h1>{item.name}</h1>
      <button onClick={() => console.log(item)}>Log {pascalCaseFromSnakeCase(itemName)}</button>
    </header>
  );
}