import AscensionMaterial from "@/common/models/materials/AscensionMaterial";

export type Props = {
  material: AscensionMaterial;
};

export default function ObtainableDays({ material }: Props) {
  return (
    <ul className="material-card__obtainable-days">
      {material.obtainableDays.split('/').map(day => (
        <li key={day} className="material-card__obtainable-days-item">
          {day}
        </li>
      ))}
      <li className="material-card__obtainable-days-item">Sunday</li>
    </ul>
  );
}
