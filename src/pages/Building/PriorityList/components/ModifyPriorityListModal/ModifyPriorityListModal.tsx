import { classNames, pascalCaseFromCamelCase } from '@/common/functions/strings';

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { ModifyPriorityListPayload } from "../../PriorityListTypes";
import { useActionState } from "@/hooks/useActionState";
import ModifyPriorityListInputGroup from './ModifyPriorityListInputGroup';

type Props = ModalConsumerProps & {
  onSubmit: (value: ModifyPriorityListPayload) => void;
  modifyList?: ModifyPriorityListPayload;
  crud: "create" | "update";
};

export type ModifyPriorityListModalParentProps = Pick<Props, "modifyList" | "crud">;

export const ModifyPriorityListModal = ({ 
  onSubmit: _onSubmit, 
  modifyList: defaultValue, 
  crud,
  ...props 
}: Props) => {
  const [submitting, onSubmit] = useActionState<ModifyPriorityListPayload>(value => {
    // value.tiers = Array.from({ length: Number(value.tiers) })
    _onSubmit(value);
  });

  return (
    <Modal {...props}>
      <h2>{pascalCaseFromCamelCase(crud)} Priority List</h2>
      <form onSubmit={onSubmit} className="priority-list-form">
        {Object.entries(defaultValue ?? {}).map(([key, value]) => (
          <ModifyPriorityListInputGroup key={key} 
            inputKey={key as keyof ModifyPriorityListPayload} 
            defaultValue={value} />
        ))}
        <div className="button-panel">
          <button className={classNames('primary', crud)} type="submit" disabled={submitting}>{pascalCaseFromCamelCase(crud)}</button>
        </div>
      </form>
    </Modal>
  );
};
