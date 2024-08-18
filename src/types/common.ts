export type SelectOptionAsObject<Value = string, Label = string> = {
   value: Value;
   label: Label;
   isDisabled?: boolean;
};

export type ListsFiltersState<Filters> = {
   isReady: boolean;
   filters: Filters;
};
