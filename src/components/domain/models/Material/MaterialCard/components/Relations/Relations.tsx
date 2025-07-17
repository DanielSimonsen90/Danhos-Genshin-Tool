import TabBar from "@/components/common/TabBar";
import { Material } from "@/common/models";
import { useRelationsTabs } from "./useRelationsTabs";

export type Props = {
  material: Material,
  showModelsUsing?: boolean;
  showModelAquired?: boolean;
};

export default function Relations({
  material,
  showModelsUsing,
  showModelAquired
}: Props) {
  const { usedByTabs, acquiredFromTabs, hasUsedByTabs, hasAcquiredFromTabs } = useRelationsTabs(material);

  if (!showModelsUsing && !showModelAquired) return null;
  return (
    <section>
      {showModelsUsing && hasUsedByTabs && (
        <div className="material-card__models-using">
          <h2>Used by</h2>
          <TabBar tabs={usedByTabs} />
        </div>
      )}
      {showModelAquired && hasAcquiredFromTabs && (
        <div className="material-card__model-acquired">
          <h2>Acquired from</h2>
          <TabBar tabs={acquiredFromTabs} />
        </div>
      )}
    </section>
  );
}
