import { Model } from "@/common/models";
import { useFavoriteStore } from "@/stores/FavoriteStore/FavoriteStoreHooks";
import { getModelType } from "@/stores/FavoriteStore/model-type";
import Star from "./Star";

type Props = {
  model: Model;
};

export default function FavoriteStar({ model }: Props) {
  const favoriteStore = useFavoriteStore();
  const modelType = getModelType(model);
  
  return <Star className="favorite-star" onClick={e => {
    e.stopPropagation();
    e.preventDefault();

    if (confirm(`Are you sure you want to remove ${model.name} from favorites?`)) {
      favoriteStore.remove(modelType, model as any);
    }
  }} />;
}