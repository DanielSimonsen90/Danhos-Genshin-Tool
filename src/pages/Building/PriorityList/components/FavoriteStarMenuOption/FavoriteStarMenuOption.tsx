import { ModelKeys } from "@/common/models";

import Star from "@/components/common/media/icons/Star";
import FavoriteStar from "@/components/common/media/icons/Star/FavoriteStar";
import { Entry } from "@/components/common/Tierlist";

import { FavoriteModels, useDataStore, useFavorites } from "@/stores";

type Props<TModelKeys extends ModelKeys> = {
  modelType: TModelKeys;
  entry: Entry<string>;
}

export default function FavoriteStarMenuOption<TModelKeys extends ModelKeys>({ modelType, entry }: Props<TModelKeys>) {
  const DataStore = useDataStore();
  const model = DataStore[`find${modelType}ByName`](entry.item);
  const { isFavorite } = useFavorites(model
    ? `${modelType.toLowerCase()}s` as keyof FavoriteModels
    : 'characters'
  )
  
  if (model === undefined) return (
    <div className="favorite-star-menu-option">
      <Star />
      Unknown {modelType}
    </div>
  );

  return (
    <div className="favorite-star-menu-option">
      <FavoriteStar model={model} />
      {isFavorite(model) ? 'Unfavorite' : 'Favorite'}
    </div>
  );
}