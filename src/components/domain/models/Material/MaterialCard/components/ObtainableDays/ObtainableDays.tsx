import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import { useAccountStore } from "@/stores";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  const RegionStore = useAccountStore();
  
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={`${RegionStore.worldRegion}-${day}`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(RegionStore, day)}>
          <span>
            {day}
          </span>
        </li>
      ))}
      <li key={`${RegionStore.worldRegion}-Sunday`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(RegionStore, 'Sunday')}>
        <span>
          Sunday
        </span>
      </li>
    </ul>
  );
}
