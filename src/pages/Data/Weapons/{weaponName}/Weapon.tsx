import { WeaponCard } from "@/components/domain/Weapon";
import ItemPage from "@/pages/_Layout/ItemPage";

export default function Weapon() {
  return <ItemPage itemKeys="Weapons" Card={({ item }) => <WeaponCard weapon={item}
    showStats
    showRarity
    showDetails
    showSource
    showSignatureCharacter
  />} />;
}
