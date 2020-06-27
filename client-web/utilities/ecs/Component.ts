export type ComponentType = number;

export type Component = {
  type: ComponentType;
  [key: string]: string | number;
};
