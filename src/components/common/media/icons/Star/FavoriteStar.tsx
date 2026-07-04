import { Model } from "@/common/models";
import { useFavorites, getModelType } from "@/stores/AccountStore";
import { useConfirm } from "@/providers/ConfirmProvider";
import Star from "./Star";

type Props = {
  model: Model;
  preventClick?: boolean
};

export default function FavoriteStar({ model, preventClick }: Props) {
  const confirm = useConfirm();
  const FavoriteStore = useFavorites();
  const modelType = getModelType(model);
  const isFavorite = FavoriteStore.getFavorite(modelType).isFavorite(model);

  return <Star className="favorite-star" filled={isFavorite} onClick={async e => {
    if (preventClick) return;

    e.stopPropagation();
    e.preventDefault();

    if (!isFavorite) {
      FavoriteStore.getFavorite(modelType).add(model);
      return;
    }

    if (await confirm({
      title: 'Remove favorite',
      message: `Are you sure you want to remove ${model.name} from favorites?`,
      destructive: true,
    })) {
      FavoriteStore.getFavorite(modelType).remove(model);
    }
  }} />;
}