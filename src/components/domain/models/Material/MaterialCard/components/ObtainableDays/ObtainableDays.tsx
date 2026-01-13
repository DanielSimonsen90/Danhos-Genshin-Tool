import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import { useAccountStore } from "@/stores";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  const AccountStore = useAccountStore();
  
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={`${AccountStore.worldRegion}-${day}`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(AccountStore, day)}>
          <span>
            {day}
          </span>
        </li>
      ))}
      <li key={`${AccountStore.worldRegion}-Sunday`} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(AccountStore, 'Sunday')}>
        <span>
          Sunday
        </span>
      </li>
    </ul>
  );
}
