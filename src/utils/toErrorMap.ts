export type FieldError = {
  field: string;
  msg: string;
};

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, msg }) => {
    errorMap[field] = msg;
  });
  return errorMap;
};
