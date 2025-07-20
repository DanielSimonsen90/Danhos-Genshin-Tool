import { Model } from "@/common/models";
import { useFavorites, getModelType } from "@/stores/RegionStore";
import Star from "./Star";

type Props = {
  model: Model;
};

export default function FavoriteStar({ model }: Props) {
  const FavoriteStore = useFavorites();
  const modelType = getModelType(model);
  
  return <Star className="favorite-star" onClick={e => {
    e.stopPropagation();
    e.preventDefault();

    if (confirm(`Are you sure you want to remove ${model.name} from favorites?`)) {
      FavoriteStore.getFavorite(modelType).remove(model as any);
    }
  }} />;
}