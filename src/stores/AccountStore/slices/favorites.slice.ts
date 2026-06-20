import { Model } from "@/common/models";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { FavoriteModels, FavoritesCollection } from "..";
import { DEFAULT_FAVORITES } from "../AccountStoreConstants";
import accountGetSlice from "./account.get.slice";
import accountSetSlice from "./account.set.slice";

export default new StoreBuilder(DEFAULT_FAVORITES)
  .addSlice(accountGetSlice)
  .addSlice(accountSetSlice)
  .addApi(({ api }) => {
    function setFavorites(favorites: FavoritesCollection) {
      api.setAccountData({ favorites })
    }

    function getAllFavorites() {
      return api.selectedAccount.favorites ?? DEFAULT_FAVORITES;
    }

    function hasAnyFavorites() {
      const favorites = getAllFavorites();
      return Object.values(favorites).some(favList => favList.length);
    }

    function clearFavorites() {
      setFavorites(DEFAULT_FAVORITES);
    }

    function getFavorite<TFavoriteModel extends keyof FavoriteModels>(
      type: TFavoriteModel
    ) {
      return {
        add(item: FavoriteModels[TFavoriteModel]) {
          const currentFavorites = getAllFavorites();

          setFavorites({
            ...currentFavorites,
            [type]: [
              ...currentFavorites[type],
              item
            ]
          });
        },

        remove(item: FavoriteModels[TFavoriteModel]) {
          const currentFavorites = getAllFavorites();
          setFavorites({
            ...currentFavorites,
            [type]: (currentFavorites[type] as Model[]).filter((model: Model) => model.name !== item.name)
          });
        },
        isFavorite(item: FavoriteModels[TFavoriteModel] | string) {
          const currentFavorites = getAllFavorites();
          return currentFavorites[type].some(model => model.name === (typeof item === 'string' ? item : item.name)) ?? false;
        },
        getFavorites() {
          const currentFavorites = getAllFavorites();
          return currentFavorites[type] as Array<FavoriteModels[TFavoriteModel]>;
        }
      }
    }

    return {
      getAllFavorites,
      hasAnyFavorites,
      clearFavorites,
      getFavorite
    }
  })