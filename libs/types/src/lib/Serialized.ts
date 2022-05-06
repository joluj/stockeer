export type StringyDates<T extends object> = {
  [k in keyof T]: T[k] extends Date
    ? string
    : T[k] extends object
    ? StringyDates<T[k]>
    : T[k];
};

export type Serialized<T extends object> = StringyDates<T>;
