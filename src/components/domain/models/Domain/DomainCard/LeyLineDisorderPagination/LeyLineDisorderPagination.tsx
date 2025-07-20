import { romanNumerals } from "@/common/functions/strings";
import { useState } from "react";

export type Props = {
  domainName: string;
  leyLineDisorder: Record<number, string>;
};

const parseDescription = (description: string) => {
  const match = description.match(/\(([^)]+)\)/);
  if (!match) return { text: description, elements: [] };

  return { 
    text: description.replace(/\s*\([^)]+\)\s*$/, '').trim(), 
    elements: match[1].split('/').map(element => element.trim())
  };
};

export default function LeyLineDisorderPagination({
  domainName,
  leyLineDisorder
}: Props) {
  const levels = Object.keys(leyLineDisorder).map(Number).sort((a, b) => a - b);
  const [currentLevel, setCurrentLevel] = useState(levels[levels.length - 1] || 1);
  if (levels.length === 0) return null;

  const { text, elements } = parseDescription(leyLineDisorder[currentLevel]);

  return (
    <div className="leyline-disorder-pagination">
      <div className="leyline-disorder-pagination__controls">
        {levels.map(level => (
          <label
            key={level}
            className="leyline-disorder-pagination__control-item"
            onClick={e => e.stopPropagation()}
          >
            <input
              type="radio"
              name={`domain-${domainName}-leyline-disorder`}
              checked={currentLevel === level}
              onChange={() => setCurrentLevel(level)}
              className="leyline-disorder-pagination__radio"
            />
            <span className="leyline-disorder-pagination__level">
              Level <span className="roman-numerals">{romanNumerals(level)}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="leyline-disorder-pagination__content">
        <h4 className="leyline-disorder-pagination__title">
          Ley Line Disorder - Level <span className="roman-numerals">{romanNumerals(currentLevel)}</span>
        </h4>
        <div className="leyline-disorder-pagination__description">
          <p>{text}</p>
          {elements.length > 0 && (
            <ul>
              {elements.map((element, index) => (
                <li key={index} data-element={element}>
                  {element}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
