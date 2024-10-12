import { CharacterCard } from "@/components/domain/Character";
import ItemPage from "@/pages/_Layout/ItemPage";

export default function Character() {
  return <ItemPage itemKeys="Characters" Card={({ item }) => <CharacterCard character={item} showDetails />} />;
}