import { Dispatch, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router";

import { CharacterImage, ArtifactImage, DomainImage, MaterialImage, MobImage, WeaponImage } from "@/components/common/media/Images";
import Star, { FavoriteStar } from "@/components/common/media/icons/Star";
import Tierlist, { Entry, Tier } from "@/components/common/Tierlist";

import { FavoriteModels, useDataStore, useFavorites, useAccountData } from "@/stores";

import type { PriorityLists, PriorityList } from "../PriorityListTypes";
import { getDefaultPriorityLists, onUnsortedSearch } from "../PriorityListFunctions";
import { PriorityListTab } from "../components";

type UsePriorityListTabsProps = {
  priorityLists: PriorityLists;
  setPriorityLists: Dispatch<SetStateAction<PriorityLists>>;
  openUpdateModal: (priorityList?: PriorityList, title?: string) => void;
};

export function usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal }: UsePriorityListTabsProps) {
  const DataStore = useDataStore();
  const FavoriteStore = useFavorites();
  const { worldRegion: region } = useAccountData();
  const navigate = useNavigate();

  const onTierChange = useCallback((tierlistTitle: string) => (tiers: Array<Tier<string>>) => {
    setPriorityLists(state => ({
      ...state,
      [tierlistTitle]: {
        ...state[tierlistTitle],
        tiers
      }
    }));
  }, [setPriorityLists]);
  const onEdit = useCallback((tierlistKey: string) => {
    const priorityList = priorityLists?.[tierlistKey];
    openUpdateModal(priorityList, tierlistKey);
  }, [priorityLists, openUpdateModal]);
  const onDelete = useCallback((tab: string) => {
    if (!confirm(`Are you sure you want to delete the tab "${tab}"?`)) return;

    let { [tab]: _, ...newPriorityList } = priorityLists;
    if (!Object.keys(newPriorityList).length) newPriorityList = getDefaultPriorityLists(DataStore);
    setPriorityLists(newPriorityList);
  }, [priorityLists, DataStore, setPriorityLists]);
  const onClone = useCallback((tab: string) => {
    const priorityList = priorityLists?.[tab];
    if (!priorityList) return;

    setPriorityLists(state => ({
      ...state,
      [`${tab} (copy)`]: { ...priorityList, tiers: [...priorityList.tiers] }
    }));
  }, [priorityLists, setPriorityLists]);
  const onMove = useCallback((tab: string, direction: 'up' | 'down') => {
    const keys = Object.keys(priorityLists);
    const index = keys.indexOf(tab);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= keys.length) return;

    const updatedPriorityLists = { ...priorityLists };
    const [movedTab] = keys.splice(index, 1);
    keys.splice(newIndex, 0, movedTab);

    setPriorityLists(keys.reduce((acc, key) => {
      acc[key] = updatedPriorityLists[key];
      return acc;
    }, {} as PriorityLists));
  }, [priorityLists, setPriorityLists]);

  return Array
    .from(Object.entries(priorityLists))
    .map(([tierlistTitle, priorityList], index, array) => {
      const modelType = priorityList.model;
      const items = DataStore[`${modelType}Names`];
      const favoriteModelKey = `${modelType.toLowerCase()}s` as keyof FavoriteModels;

      const isFavorite = (modelName: string) => FavoriteStore.getFavorite(favoriteModelKey).isFavorite(modelName);
      const findModel = (modelName: string) => DataStore[`find${modelType}ByName`](modelName);

      return [
        tierlistTitle,
        {
          title: <PriorityListTab title={tierlistTitle} priorityListIndex={index} isLastIndex={index === array.length - 1}
            onEdit={() => onEdit(tierlistTitle)}
            onDelete={() => onDelete(tierlistTitle)}
            onClone={() => onClone(tierlistTitle)}
            onMove={direction => onMove(tierlistTitle, direction)}
          />,
          content: (
            <Tierlist key={`${region}-${tierlistTitle}`} {...{
              model: modelType,
              items: items,
              onSearch: onUnsortedSearch,
              defaultTiers: priorityList.tiers,
              onTierChange: onTierChange(tierlistTitle),
              renderCustomEntryContextMenuItems: (entry: Entry<string>, tier, item) => [
                item('divider', `${entry.item} Options`),
                item('option', `View ${modelType}`, () => navigate(`/data/${modelType.toLowerCase()}s/${entry.item}`), '👁️'),
                item('option', isFavorite(entry.item) ? 'Unfavorite' : 'Favorite', () => {
                  const favorite = FavoriteStore.getFavorite(favoriteModelKey);
                  const model = findModel(entry.item);
                  if (!model) throw new Error(`Model "${entry.item}" not found in DataStore using modelType "${modelType}".`);

                  if (!isFavorite(entry.item)) favorite.add(model);
                  else favorite.remove(model);
                }, <Star filled={isFavorite(entry.item)} color="var(--rarity-legendary)" />)
              ]
            }}>
              {modelName => {
                const model = findModel(modelName);
                const favorited = isFavorite(modelName);
                const ModelImage = () => {
                  switch (modelType) {
                    case 'Character': return <CharacterImage character={modelName} />;
                    case 'Artifact': return <ArtifactImage set={modelName} />;
                    case 'Domain': return <DomainImage domain={modelName} />;
                    case 'Material': return <MaterialImage material={modelName} />;
                    case 'Mob': return <MobImage mob={modelName} />;
                    case 'Weapon': return <WeaponImage weapon={modelName} />;
                    default: return <>Unknown model for {modelName}</>;
                  }
                };

                return (
                  <>
                    {favorited && model && <FavoriteStar model={model} />}
                    <ModelImage />
                  </>
                );
              }}
            </Tierlist>
          )
        }
      ] as const;
    });
}