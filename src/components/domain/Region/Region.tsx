import { classNames } from '@/common/functions/strings';
import { Arrayable } from '@/common/types';
import { Region as RegionType } from '@/common/types/genshin';

type Props = {
  region: Arrayable<RegionType>;
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
  const regions = (Array.isArray(region) ? region : [region]).filter(Boolean) as RegionType[];

  // No regions to display
  if (regions.length === 0) return null;

  // Single region as simple tag
  if (regions.length === 1 && Tag !== 'ul') {
    return (
      <Tag
        className={classNames('region', 'region-item', className)}
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
  const wrapperClassName = classNames(
    isUl ? 'regions' : 'region',
    className
  )

  return (
    <WrapperTag className={wrapperClassName} id={id}>
      {regions.map((regionValue, index) => (
        <ItemTag
          key={`${keyPrefix}-${regionValue}-${index}`}
          className={classNames('region-item', itemClassName)}
          data-region={regionValue}
        >
          {regionValue}
        </ItemTag>
      ))}
    </WrapperTag>
  );
}
