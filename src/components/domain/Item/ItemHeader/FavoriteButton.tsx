import { Model } from "@/common/models";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { getModelType } from "@/stores/RegionStore/model-type";
import { useFavorite } from "@/stores/RegionStore/RegionStoreHooks";

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
      <FavoriteStar model={item} />
      <span>{favorites.isFavorite(item) ? 'Unfavorite' : 'Favorite'}</span>
    </button>
  )
}