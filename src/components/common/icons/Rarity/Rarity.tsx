import { Rarity } from "@/common/types";
import Star from "../Star";
import { classNames, rarityString } from "@/common/functions/strings";

type Props = {
  rarity: Rarity;
}

export default function RarityList({ rarity }: Props) {
  return (
    <ul className={classNames("rarity-list", `rarity-list--${rarityString(rarity)}`)}>
      {Array.from({ length: rarity }, (_, i) => (
        <li key={i} className="rarity-list__item">
          <Star />
        </li>
      ))}
    </ul>
  );
}