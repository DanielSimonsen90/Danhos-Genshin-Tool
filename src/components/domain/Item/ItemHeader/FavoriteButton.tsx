import { Model } from "@/common/models";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { getModelType } from "@/stores/AccountStore/model-type";
import { useFavorite } from "@/stores/AccountStore/AccountStoreHooks";

type Props = {
  item: Model
}

export default function FavoriteButton({ item }: Props) {
  const modelType = getModelType(item);
  const favorites = useFavorite(modelType);

  return (
    <button
      className='favorite-button'
      onClick={() => {
        if (favorites.isFavorite(item)) favorites.remove(item);
        else favorites.add(item);
      }}
    >
      <FavoriteStar model={item} preventClick />
      <span>{favorites.isFavorite(item) ? 'Unfavorite' : 'Favorite'}</span>
    </button>
  )
}