import { CharacterImage } from "@/components/Images";
import { useParams } from "react-router-dom";
import type * as Characters from "@/data/characters";

export default function SearchQuery() {
  const { query } = useParams<Record<string, keyof typeof Characters>>();

  return (
    <div> 
      Search Query: {query}
      <div>
        <CharacterImage character={query} />
      </div>
    </div>
  );
}