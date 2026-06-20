import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import { useAccountStore } from "@/stores";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  const { worldRegion, getDataTodayAttr } = useAccountStore(store => ({
    worldRegion: store.selectedAccount.worldRegion,
    getDataTodayAttr: (day: string) => material.getDataTodayAttr(store, day)
  }));
  
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={`${worldRegion}-${day}`} className="material-card__obtainable-days-item" data-today={getDataTodayAttr(day)}>
          <span>
            {day}
          </span>
        </li>
      ))}
      <li key={`${worldRegion}-Sunday`} className="material-card__obtainable-days-item" data-today={getDataTodayAttr('Sunday')}>
        <span>
          Sunday
        </span>
      </li>
    </ul>
  );
}
