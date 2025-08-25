import { useMemo } from "react";
import TabBar from "@/components/common/TabBar";
import { Material } from "@/common/models";
import { useDataStore } from "@/stores";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import Collapsible from "@/components/common/Collapsible";
import MaterialRelationsForModel from "../RelationsForModel";
import Region from "@/components/domain/Region";
import { Billet } from "@/common/models/materials/Billet";

export type Props = {
  material: Material,
  showModelsUsing?: boolean;
  showModelAcquired?: boolean;
};

export default function Relations({
  material,
  showModelsUsing,
  showModelAcquired
}: Props) {
  const DataStore = useDataStore();
  const modelKeys = useMemo(() => DataStore.getModelKeysUsingMaterial(material.name), [DataStore, material.name]);
  const hasUsedByTabs = modelKeys.includes('Character') || modelKeys.includes('Weapon');
  const hasAcquiredFromTabs = (
    modelKeys.includes('Mob')
    || modelKeys.includes('Domain')
    || LocalSpecialty.isLocalSpecialty(material)
  );

  if (!showModelsUsing && !showModelAcquired) return null;
  return (
    <section>
      {showModelsUsing && hasUsedByTabs && (
        <div className="material-card__models-using">
          <Collapsible title="Used by" defaultOpen>
            {modelKeys.includes('Character') && <MaterialRelationsForModel model="Character" materialName={material.name} />}
            {modelKeys.length > 2 && <hr />}
            {modelKeys.includes('Weapon') && <MaterialRelationsForModel model="Weapon" materialName={material.name} />}
          </Collapsible>
        </div>
      )}
      {showModelAcquired && hasAcquiredFromTabs && (
        <div className="material-card__model-acquired">
          <Collapsible title="Acquired from" defaultOpen>
            {modelKeys.includes('Mob') && <MaterialRelationsForModel model="Mob" materialName={material.name} />}
            {modelKeys.includes('Domain') && <MaterialRelationsForModel model="Domain" materialName={material.name} />}
            {LocalSpecialty.isLocalSpecialty(material) && (
              <div className="local-specialty">
                The wilderness of <Region
                  region={
                    Billet.isBillet(material)
                      ? material.regions
                      : material.region || 'Unknown'
                  }
                  tag="span"
                />.
              </div>
            )}
          </Collapsible>
        </div>
      )}
    </section>
  );
}
