import { useMemo } from "react";
import Material from "@/common/models/materials/Material";
import { Billet } from "@/common/models/materials/Billet";

type Props<TMaterial extends Material> = {
  material: TMaterial;
};

export default function MaterialRegion<TMaterial extends Material>({ material }: Props<TMaterial>) {
  const regions = useMemo(() => (
    Billet.isBillet(material) 
      ? material.regions 
      : [material.region]
  ), [material]);

  return (
    <ul className="regions">
      {regions.map((region) => (
        <li data-region={region} key={`material-region-${material.name}-${region}`}>{region}</li>
      ))}
    </ul>
  );
}