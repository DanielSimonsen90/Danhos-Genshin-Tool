import { forwardRef, Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@/common/functions/strings";
import { Model, ModelKeys } from "@/common/models";
import RarityList from "../../common/media/icons/Rarity";
import { ElementImage } from "@/components/common/media/Images";
import { Element } from "@/common/types";

// Shared properties for all model cards
export interface BaseModelCardProps {
  wrapInLink?: boolean;
  linkOnName?: boolean;
  nameTag?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b'>;
  showRarity?: boolean;
  className?: string;
}

export interface ModelCardProps<TModel extends Model = Model> extends BaseModelCardProps {
  // Required model-based configuration
  model: ModelKeys;
  item: TModel;

  // Required render props for core card structure
  renderImage: () => JSX.Element;
  renderHeaderContent?: () => JSX.Element;
  renderHeadingContent?: () => JSX.Element;
  renderContent: () => JSX.Element | undefined;
}

function GetCardContainer(
  wrapInLink: boolean,
  route: string,
) {
  return forwardRef<HTMLElement, any>((props, ref) => {
    return wrapInLink
      ? <Link to={route} {...props} className={classNames("clickable", props.className)} ref={ref} />
      : <div {...props} ref={ref} />;
  });
}

function GetModelNameContainer(
  linkOnName: boolean,
  route: string,
) {
  return (props: any) => linkOnName
    ? <Link to={route} {...props} className={classNames("model-card__name-text", props.className)} />
    : <Fragment {...props} />;
}

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
              {'data-element' in props && (
                <span className="element-image-container">
                  <ElementImage element={props['data-element'] as Element} />
                </span>
              )}
              {HeadingContent && <HeadingContent />}
              {showRarity && 'rarity' in item && <RarityList rarity={item.rarity} />}
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
