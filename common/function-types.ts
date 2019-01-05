export type Ret<T> = T extends (...args: any[]) => infer R ? R : never;
export type Args<T> = T extends (...args: infer U) => any ? U : never;
