import { ArtifactSet, Character, Domain, Mob, Material, Weapon, Model } from "@/common/models";
import {
  SearchableArtifactList, SearchableCharacterList,
  SearchableDomainList, SearchableMaterialList,
  SearchableMobList, SearchableWeaponList
} from "@/components/domain/SearchableList";
import { useDataStore } from "@/stores/DataStore";
import { ModelsCollection, useFavoriteStore } from "@/stores/FavoriteStore";

export default function FavoritesOverview() {
  const FavoriteStore = useFavoriteStore();

  if (!FavoriteStore.hasAnyFavorites()) return (
    <p>
      <span>You have no models marked as favorite.</span>
      <br />
      <span>When you're on a list of models, you can right click a model and select "Favorite" to push them to the top of the list.</span>
    </p>
  );

  return (
    <div className="favorites-overview">
      {Object.entries(FavoriteStore.getAll()).map(([type, favorites]) => (
        favorites.length > 0 && (
          <section key={type}>
            <h3>{type}</h3>
            <ModelComponentList
              modelType={type as keyof ModelsCollection}
              models={favorites}
            />
          </section>
        )
      ))}
    </div>
  );
}

type ModelComponentListProps = {
  modelType: keyof ModelsCollection;
  models: Array<{ name: string; }>;
};
function ModelComponentList({ modelType, models }: ModelComponentListProps) {
  const DataStore = useDataStore();
  const dataStoreKey = modelType[0].toUpperCase() + modelType.slice(1) as keyof typeof DataStore;
  const items = (DataStore[dataStoreKey] as Array<Model>)
    .filter(model => models.some(fav => fav.name === model.name));

  switch (modelType) {
    case 'artifacts': return <SearchableArtifactList items={items as Array<ArtifactSet>} cardProps={{
      wrapInLink: true
    }} />;
    case 'characters': return <SearchableCharacterList items={items as Array<Character>} cardProps={{
      wrapInLink: true
    }} />;
    case 'domains': return <SearchableDomainList items={items as Array<Domain<any>>} cardProps={{
      wrapInLink: true
    }} />;
    case 'mobs': return <SearchableMobList items={items as Array<Mob>} cardProps={{
      wrapInLink: true
    }} />;
    case 'materials': return <SearchableMaterialList items={items as Array<Material>} cardProps={{
      wrapInLink: true
    }} />;
    case 'weapons': return <SearchableWeaponList items={items as Array<Weapon>} cardProps={{
      wrapInLink: true
    }} />;
  }
}