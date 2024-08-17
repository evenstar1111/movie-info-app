export type SelectOptionAsObject<Value = string, Label = string> = {
   value: Value;
   label: Label;
   isDisabled?: boolean;
};
