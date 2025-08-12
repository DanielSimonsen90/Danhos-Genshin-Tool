import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import { useRegionStore } from "@/stores";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  const RegionStore = useRegionStore();
  
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={`${RegionStore.currentRegion}-${day}`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(RegionStore, day)}>
          <span>
            {day}
          </span>
        </li>
      ))}
      <li key={`${RegionStore.currentRegion}-Sunday`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(RegionStore, 'Sunday')}>
        <span>
          Sunday
        </span>
      </li>
    </ul>
  );
}
