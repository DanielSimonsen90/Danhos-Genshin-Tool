import { useNavigate } from "react-router-dom";
import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import Chevron from "@/components/common/icons/Chevron";
import { IS_DEVELOPMENT_ENVIRONMENT } from "@/common/constants/dev";

type Props = {
  itemName: string;
  item: any
  showItemName?: boolean;
}
export default function ItemHeader({ item, itemName, showItemName }: Props) {
  const navigate = useNavigate();
  
  return (
    <header className={`item-page-header ${itemName.toLowerCase()}-page-header`}>
      <a href="#" onClick={() => navigate(-1)}>
        <Chevron point="left" />
        <span>Back</span>
      </a>
      {showItemName && <h1 className="item-name">{itemName}</h1>}
      {IS_DEVELOPMENT_ENVIRONMENT && <button onClick={() => console.log(item)}>Log {pascalCaseFromSnakeCase(itemName)}</button>}
    </header>
  );
}