import Material from "@/common/models/materials/Material";

export type Props = {
  materialName: string;
  craftingTree: Material[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
};

export default function Pagination({
  materialName,
  craftingTree,
  currentIndex,
  onIndexChange
}: Props) {
  return (
    <div className="material-card__pagination">
      {craftingTree.map((_, index) => (
        <label key={index}
          className="material-card__pagination-item"
          onClick={e => e.stopPropagation()}
        >
          <input
            type="radio"
            name={`material-${materialName}-pagination`}
            checked={currentIndex === index}
            onChange={() => onIndexChange(index)}
            className="material-card__pagination-radio"
          />
        </label>
      ))}
    </div>
  );
}
