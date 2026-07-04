import { Dispatch, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router";
import { useConfirm } from "@/providers/ConfirmProvider";

import { CharacterImage, ArtifactImage, DomainImage, MaterialImage, MobImage, WeaponImage } from "@/components/common/media/Images";
import { Star, FavoriteStar } from "@/components/common/media/icons";
import Tierlist, { Entry, Tier } from "@/components/common/Tierlist";

import { FavoriteModels, useDataStore, useFavorites, useAccountData } from "@/stores";

import type { PriorityLists, PriorityList } from "../PriorityListTypes";
import { getDefaultPriorityLists, onUnsortedSearch } from "../PriorityListFunctions";
import { PriorityListTab } from "../components";
import Popover from "@/components/common/Popover";
import { CharacterCard } from "@/components/domain/models/Character";
import { ArtifactCard } from "@/components/domain/models/Artifacts";
import { DomainCard } from "@/components/domain/models/Domain";
import { MaterialCard } from "@/components/domain/models/Material";
import { MobCard } from "@/components/domain/models/Mob";
import { WeaponCard } from "@/components/domain/models/Weapon";

type UsePriorityListTabsProps = {
  priorityLists: PriorityLists;
  setPriorityLists: Dispatch<SetStateAction<PriorityLists>>;
  openUpdateModal: (priorityList?: PriorityList, title?: string) => void;
};

export function usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal }: UsePriorityListTabsProps) {
  const confirm = useConfirm();
  const DataStore = useDataStore();
  const FavoriteStore = useFavorites();
  const { id: accountId } = useAccountData();
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
  
  const onDelete = useCallback(async (tab: string) => {
    if (!await confirm({ 
      title: 'Delete list',
      message: `Are you sure you want to delete the tab "${tab}"?`,
      destructive: true
    })) return;

    let { [tab]: _, ...newPriorityList } = priorityLists;

    if (!Object.keys(newPriorityList).length) newPriorityList = getDefaultPriorityLists();
    
    setPriorityLists(newPriorityList);
  }, [confirm, priorityLists, setPriorityLists]);

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
            <Tierlist key={`${accountId}-${tierlistTitle}`} {...{
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
                    case 'Character': return (
                      <Popover trigger="click" content={() => {
                        const character = DataStore.findCharacterByName(modelName);

                        return !character ? null : <CharacterCard 
                          character={character}
                          showAscensionSection
                          showCharacterPlaystyle
                          showRecommendedWeapons
                          showSignatureWeapon
                        />;
                      }}>
                        <CharacterImage character={modelName} />
                      </Popover>
                    );
                    case 'Artifact': return (
                      <Popover trigger="click" content={() => {
                        const artifact = DataStore.findArtifactByName(modelName);

                        return !artifact ? null : <ArtifactCard
                          artifact={artifact}
                          showCharacterSets
                          showCraftable
                          showDomainList
                          showDomainRewards
                          showRegion
                          showSetDescriptions
                        />
                      }}>
                        <ArtifactImage set={modelName} />
                      </Popover>
                    );
                    case 'Domain': return (
                      <Popover trigger="click" content={() => {
                        const domain = DataStore.findDomainByName(modelName);

                        return !domain ? null : <DomainCard
                          domain={domain}
                          showCharactersBenefitFromRewards
                          showDescription
                          showDetailedRewards
                          showMinRewards
                        />;
                      }}>
                        <DomainImage domain={modelName} />
                      </Popover>
                    )
                    case 'Material': return (
                      <Popover trigger="click" content={() => {
                        const material = DataStore.findMaterialByName(modelName);

                        return !material ? null : <MaterialCard
                          material={material}
                          showDetails
                          showModelAcquired
                          showModelsUsing
                          showRegion
                        />;
                      }}>
                        <MaterialImage material={modelName} />
                      </Popover>
                    );
                    case 'Mob': return (
                      <Popover trigger="click" content={() => {
                        const mob = DataStore.findMobByName(modelName);

                        return !mob ? null : <MobCard
                          mob={mob}
                          showDetails
                          showDrops
                          showRarity
                          showRegion
                          showRelations
                          showResin
                          noSeparator
                        />;
                      }}>
                        <MobImage mob={modelName} />
                      </Popover>
                    );
                    case 'Weapon': return (
                      <Popover trigger="click" content={() => {
                        const weapon = DataStore.findWeaponByName(modelName);

                        return !weapon ? null : <WeaponCard
                          weapon={weapon}
                          showDetails
                          showAscensionSection
                          showRecommendedCharacters
                          showSignatureCharacter
                          showSource
                          showStats
                          noSeparator
                        />;
                      }}>
                        <WeaponImage weapon={modelName} />
                      </Popover>
                    );
                    default: return <>Unknown model for {modelName}</>;
                  }
                };

                return (
                  <div className="model-entry">
                    {favorited && model && <FavoriteStar model={model} />}
                    <ModelImage />
                  </div>
                );
              }}
            </Tierlist>
          )
        }
      ] as const;
    });
}