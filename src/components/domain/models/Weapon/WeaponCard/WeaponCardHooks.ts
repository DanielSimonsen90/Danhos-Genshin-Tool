import { Weapon } from "@/common/models";
import { useMemo } from "react";

export function useWeaponDescription({ description, name }: Weapon, showDetails?: boolean) {
  return useMemo(() => {
      if (!showDetails) return '';
  
      return description.value.replace(/\$[0-9]+/g, (match) => {
        const index = parseInt(match.slice(1), 10);
        if (index < 0 || index >= description.refinements.length) {
          console.warn(`Invalid refinement index ${index} for weapon ${name}`, description.refinements);
          return `<span>${match}</span>`;
        }

        const refinementHighlight = description.refinements[index];
        if (refinementHighlight.match(/(\d%\/){1,}/g) && !refinementHighlight.match(/^\(.*\)$/)) {
          console.warn(`${name}'s refinement description contains multiple percentage symbols.`, refinementHighlight)
        }

        
        return `<b>${refinementHighlight}</b>`;
      });
    }, [showDetails, description]);
}