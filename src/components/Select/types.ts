export type Props<TValue extends string> = {
  options: TValue[];
  name: string;
  
  className?: string;
  defaultValue?: TValue;
  placeholder?: string;
  required?: boolean;
  
  onChange?: (value: TValue) => void;
  displayValue?: (value: TValue) => string;
  internalValue?: (value: string) => TValue;
}

export type MultipleProps<TValue extends string> = Omit<Props<TValue>, 'defaultValue'> & {
  defaultValue?: Array<TValue>
  max?: number;
  onChange?: (value: TValue[]) => void;
};

export type PublicProps<TValue extends string> = Omit<Props<TValue>, 'options'>;
export type PublicMultipleProps<TValue extends string> = Omit<MultipleProps<TValue>, 'options'>;