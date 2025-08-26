import { Dispatch, SetStateAction } from "react";

export type Props<TValue extends string> = {
  options: TValue[];
  name: string;
  
  className?: string;
  placeholder?: string;
  required?: boolean;
  floatable?: boolean;
  
  defaultValue?: TValue;
  value?: TValue;
  setValue?: Dispatch<SetStateAction<TValue>>;

  onChange?: (value: TValue) => void;
  displayValue?: (value: TValue) => string;
  internalValue?: (value: string) => TValue;
}

export type MultipleProps<TValue extends string> = Omit<Props<TValue>, 'defaultValue' | 'value' | 'setValue' | 'onChange'> & {
  defaultValue?: Array<TValue>
  value?: Array<TValue>;
  setValue?: Dispatch<SetStateAction<Array<TValue>>>;

  max?: number;
  onChange?: (value: TValue[]) => void;
  ref?: SelectRef;
  onOpen?: () => void;
};

export type PublicProps<TValue extends string> = Omit<Props<TValue>, 'options'>;
export type PublicMultipleProps<TValue extends string> = Omit<MultipleProps<TValue>, 'options'>;
export type SelectRef = React.Ref<{
  open: () => void;
  close: () => void;
}>;