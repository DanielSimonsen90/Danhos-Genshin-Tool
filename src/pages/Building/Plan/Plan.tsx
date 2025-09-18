import Collapsible from "@/components/common/Collapsible";
import usePlannedCharacterGroups from "./hooks/usePlannedCharacterGroups";
import { SearchableCharacterList } from "@/components/domain/SearchableList";
import { classNames } from "@/common/functions/strings";

export default function Plan() {
  const groups = usePlannedCharacterGroups();

  return (
    <>
      {!groups.hasPlannedCharacters() && <p className="muted">There are no characters marked as planned.</p>}
      {groups.map((group, i) => (
        group.characters.length > 0 && (
          <Collapsible key={group.title} title={group.title} defaultOpen={!groups.hasPlannedCharacters() || i !== groups.length - 1}>
            <SearchableCharacterList className="searchable-character-list" items={group.characters} cardProps={{
              children: character => {
                const isPlanned = groups.isPlannedCharacter(character.name);

                return (
                  <button type="button" className={classNames(isPlanned ? 'update' : 'create', 'secondary')}>
                    {isPlanned ? 'Update plan' : 'Create plan'} for {character.name}
                  </button>
                );
              }
            }} />
          </Collapsible>
        )
      ))}
    </>
  );
}