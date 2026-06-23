import { useMemo } from "react";
import { rarityString } from "@/common/functions/strings";
import { Character, List } from "@/common/models";

import RarityList from "@/components/common/media/icons/Rarity";
import { ElementImage, WeaponImage } from "@/components/common/media/Images";
import { ModelRarityTabGroup } from "@/components/domain/ModelCard";

import { RecommendedWeaponForCharacter } from "@/services/SearchService/weapon/types";
import { useWeaponData } from "@/stores";
import { Badge } from "@/components/common/media/icons";
import TabBar from "@/components/common/TabBar";
import { SearchableWeaponList } from "@/components/domain/SearchableList";
import { WeaponSearchService } from "@/services/SearchService";

type Props = {
  character: Character;
  showRecommendedWeapons: boolean | undefined;
  showSignatureWeapon: boolean | undefined;
};

export default function RecommendedWeapons({
  character,
  showRecommendedWeapons,
  showSignatureWeapon,
}: Props) {
  const WeaponsStore = useWeaponData();

  const signatureWeapon = useMemo(() => WeaponsStore.getSignatureWeaponFor(character.name), [character.name, WeaponsStore]);

  const recommendedWeapons = useMemo(() => (
    showRecommendedWeapons
      ? WeaponsStore.getRecommendedWeaponsForCharacter(character.name)
      : undefined
  ), [character.name, WeaponsStore, showRecommendedWeapons]);

  const weapons = useMemo(() => {
    if (!recommendedWeapons) return List.from([]);

    const result: ModelRarityTabGroup<RecommendedWeaponForCharacter> = new Map();

    if (signatureWeapon && showSignatureWeapon) {
      const signatureWeaponResult = recommendedWeapons
        .get(signatureWeapon.rarity)
        ?.find(w => w.weapon.name === signatureWeapon.name);

      if (signatureWeaponResult) {
        result.set('signature', {
          title: (
            <>
              <ElementImage element={character.element} />
              <p>Signature</p>
            </>
          ),
          items: [signatureWeaponResult],
          color: 'var(--element)',
          rarity: signatureWeapon.rarity
        });
      }
    }

    if (showRecommendedWeapons) {
      for (const [rarity, weapons] of recommendedWeapons.entries()) {
        result.set(rarityString(rarity), {
          title: (
            <>
              <RarityList rarity={rarity} onlyOne />
              <p>{rarityString(rarity)}</p>
            </>
          ),
          items: weapons,
          color: `var(--rarity)`,
          rarity
        });
      }
    }

    const list = List.from(result);

    list.unshift(['All Weapons', {
      title: (
        <>
          <WeaponImage weaponType={character.weapon} />
          <p>All Weapons</p>
        </>
      ),
      items: list
        .flatMap(([key, { items }]) => items)
        .unique(result => result.weapon.name)
        .flat()
        .sort((a, b) => b.score - a.score),
      color: 'var(--text)',
      rarity: 0
    }]);

    return list;
  }, [character.element, recommendedWeapons, signatureWeapon, showRecommendedWeapons, showSignatureWeapon]);

  const tabs = useMemo(() => weapons.mapToArray(([key, { title, items, color, rarity }]) => ([
    key,
    {
      title: (
        <div data-rarity={rarityString(rarity)} style={{ color }}>
          {title}
        </div>
      ),
      content: <SearchableWeaponList items={items.map(result => result.weapon)}
        cardProps={{
          wrapInLink: true,
          showDetails: true,
          showStats: true,
          showSource: true,
          hideWeaponType: true,
          children: (props) => {
            const weaponResult = items.find(r => r.weapon.name === props.weapon.name);
            if (!weaponResult) return null;

            const scoreColor = WeaponSearchService.getScoreColor(weaponResult.score);

            return (
              <p style={{ color: scoreColor }}>
                Recommended Score: <b>{weaponResult.score}</b>
              </p>
            );
          }
        }}
      />
    }
  ] as const)), [weapons]);

  return !weapons.length ? null : (
    <div className="character-recommended-weapons">
      <h3>
        <Badge variant="beta" />
        Recommended Weapons
      </h3>
      <TabBar cacheContent tabs={tabs} />
    </div>
  );
}
