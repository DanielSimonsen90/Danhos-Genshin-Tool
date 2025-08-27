import { ModelKeys, ModelData } from "@/common/models";
import { useMaterialRelationDataContent } from "./hooks/useMaterialRelationDataContent";

type Props<TModelKey extends ModelKeys> = {
  model: TModelKey;
  materialName: string;
  models?: ModelData<TModelKey>;
};

export default function RelationsForModel<TModelKey extends ModelKeys>({ model, materialName, models }: Props<TModelKey>) {
  const content = useMaterialRelationDataContent(model, materialName, models);

  return content ? (
    <div className="material-relations-for-model">
      {content}
    </div>
  ) : <></>;
}