export const notEmpty = <TValue extends any>
(value: TValue | null | undefined): value is TValue => value !== null && value !== undefined;
