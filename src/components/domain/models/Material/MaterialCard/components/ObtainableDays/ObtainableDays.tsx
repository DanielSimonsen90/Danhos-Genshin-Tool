import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import { useMemo } from "react";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={day} className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr(day)}>
          <span>
            {day}
          </span>
        </li>
      ))}
      <li className="material-card__obtainable-days-item" data-today={material.getDataTodayAttr('Sunday')}>
        <span>
          Sunday
        </span>
      </li>
    </ul>
  );
}
