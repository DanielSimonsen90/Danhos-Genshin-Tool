import { CharacterCard } from "@/components/domain/Character";
import ItemsPage from "../_Layout/ItemsPage";

export default function Characters() {
  return <ItemsPage itemsKey="Characters" Card={({ item }) => <CharacterCard character={item} wrapInLink />} />;
}