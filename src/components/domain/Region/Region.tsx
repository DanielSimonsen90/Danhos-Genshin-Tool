import React from 'react';
import { Region as RegionType } from '@/common/types/genshin';

type Props = {
  region: RegionType | RegionType[];
  className?: string;
  itemClassName?: string;
  tag?: 'p' | 'span' | 'div' | 'ul' | 'li';
  itemTag?: 'li' | 'span' | 'div' | 'p';
  id?: string;
  keyPrefix?: string;
};

export default function Region({
  region,
  className = '',
  itemClassName = '',
  tag: Tag = 'p',
  itemTag: ItemTag = 'li',
  id,
  keyPrefix = 'region',
}: Props) {
  const regions = Array.isArray(region) ? region : [region];

  // Single region as simple tag
  if (regions.length === 1 && Tag !== 'ul') {
    return (
      <Tag
        className={`region ${className}`.trim()}
        data-region={regions[0]}
        id={id}
      >
        {regions[0]}
      </Tag>
    );
  }
  // Multiple regions or ul tag requested
  const isUl = Tag === 'ul';
  const WrapperTag = isUl ? 'ul' : Tag;
  const wrapperClassName = isUl ? `regions ${className}`.trim() : `region ${className}`.trim();

  return (
    <WrapperTag className={wrapperClassName} id={id}>
      {regions.map((regionValue, index) => (
        <ItemTag
          key={`${keyPrefix}-${regionValue}-${index}`}
          className={`region-item ${itemClassName}`.trim()}
          data-region={regionValue}
        >
          {regionValue}
        </ItemTag>
      ))}
    </WrapperTag>
  );
}
