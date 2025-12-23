import { Model } from "@/common/models";
import { useFavorites, getModelType } from "@/stores/AccountStore";
import Star from "./Star";

type Props = {
  model: Model;
  preventClick?: boolean
};

export default function FavoriteStar({ model, preventClick }: Props) {
  const FavoriteStore = useFavorites();
  const modelType = getModelType(model);
  const isFavorite = FavoriteStore.getFavorite(modelType).isFavorite(model);
  
  return <Star className="favorite-star" filled={isFavorite} onClick={e => {
    if (preventClick) return;
    
    e.stopPropagation();
    e.preventDefault();

    if (!isFavorite) {
      FavoriteStore.getFavorite(modelType).add(model);
      return;
    }

    const confirmed = confirm(`Are you sure you want to remove ${model.name} from favorites?`);
    if (confirmed) FavoriteStore.getFavorite(modelType).remove(model);
  }} />;
}