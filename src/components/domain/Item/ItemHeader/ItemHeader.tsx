import { useNavigate } from "react-router-dom";
import Chevron from "@/components/common/media/icons/Chevron";
import { List, Model } from "@/common/models";
import FavoriteButton from "./FavoriteButton";

type Props = {
  itemName: string;
  item: Model | List<Model>;
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
      {!(item instanceof List) && <FavoriteButton item={item} />}
    </header>
  );
}