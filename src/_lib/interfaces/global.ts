export interface ActionResponse<T = any> {
  message: string;
  data?: T;
  error?: any;
}

export type ActionResult = {
  errors?: ActionErrors;
  data?: any;
};

export type ActionErrors = {
  fieldErrors?: FieldErrors;
  formErrors?: string[];
};

export type FieldErrors = {
  [x: string]: string | undefined;
  [x: number]: string | undefined;
  [x: symbol]: string | undefined;
};
