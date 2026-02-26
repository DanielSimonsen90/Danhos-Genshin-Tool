import { Rarity } from "@/common/types";
import { Star } from "../Star";
import { classNames, rarityString } from "@/common/functions/strings";

type Props = {
  rarity: Rarity;
  onlyOne?: boolean;
};

export default function RarityList({ rarity, onlyOne }: Props) {
  return (
    <ul className={classNames("rarity-list", `rarity-list--${rarityString(rarity)}`)}>
      {Array.from({ length: onlyOne ? 1 : rarity }, (_, i) => (
        <li key={i} className="rarity-list__item">
          <Star />
        </li>
      ))}
    </ul>
  );
}