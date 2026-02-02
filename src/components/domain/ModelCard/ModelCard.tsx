import { forwardRef, useMemo } from "react";

import Separator from '@/components/common/Separator';
import { classNames } from "@/common/functions/strings";
import RarityList from "../../common/media/icons/Rarity";
import { ModelCardProps } from "./types";
import { GetCardContainer, GetModelNameContainer } from "./functions";

const ModelCard = forwardRef<HTMLDivElement, ModelCardProps>(({
  model, item,
  wrapInLink, linkOnName, showRarity,

  nameTag: NameTag = 'h1',
  renderHeaderContent: HeaderContent,
  renderHeadingContent: HeadingContent,
  renderImage: Image,
  renderContent: Content,
  ...props
}, ref) => {
  if (!item.name) {
    console.log(`Model in question:`, item);
    throw new Error(`ModelCard requires a valid item with a 'name' property.`);
  }

  const routePath = `/data/${model.toLowerCase()}s/${item.name.toLowerCase()}`;
  const modelClassName = `${model.toLowerCase()}-card`;
  const className = classNames('model-card', modelClassName, props.className);

  const Container = useMemo(() => GetCardContainer(wrapInLink, routePath), [wrapInLink, routePath]);
  const ModelNameContainer = useMemo(() => GetModelNameContainer(linkOnName, routePath), [linkOnName, routePath]);

  return (
    <Container {...props} className={className} ref={ref}>
      <header>
        <Image />
        <div className={classNames('model-card__details', `${modelClassName}__details`)}>
          <NameTag className={classNames('model-card__name', `${modelClassName}__name`)} title={item.name}>
            <ModelNameContainer>
              <span className={classNames('model-card__name-text', `${modelClassName}__name-text`)}>
                {item.name}
              </span>
              {HeadingContent && (
                <>
                  <Separator show={!wrapInLink} />
                  <HeadingContent />
                </>
              )}
              {showRarity && 'rarity' in item && (
                <>
                  <Separator show={!wrapInLink} />
                  <RarityList rarity={item.rarity} />
                </>
              )}
            </ModelNameContainer>
          </NameTag>
          {HeaderContent && <HeaderContent />}
        </div>
      </header>
      <Content />
    </Container>
  );
});

ModelCard.displayName = 'ModelCard';

export default ModelCard;
