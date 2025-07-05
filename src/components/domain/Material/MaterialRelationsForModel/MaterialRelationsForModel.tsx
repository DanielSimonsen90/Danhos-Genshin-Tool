import { ModelKeys } from "@/common/models";
import { useMaterialRelationDataContent } from "./hooks/useMaterialRelationDataContent";

type Props<TModelKey extends ModelKeys> = {
  model: TModelKey;
  materialName: string;
};

export default function MaterialRelationsForModel<TModelKey extends ModelKeys>({ model, materialName }: Props<TModelKey>) {
  const content = useMaterialRelationDataContent(model, materialName);

  return content ? (
    <div className="material-relations-for-model">
      {content}
    </div>
  ) : undefined;
}