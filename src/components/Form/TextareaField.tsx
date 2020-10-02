import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Textarea,
} from "@chakra-ui/core";
import { FieldValidator, useField } from "formik";
import React from "react";

type TextareaFieldProps = InputProps<HTMLTextAreaElement> & {
  label: string;
  name: string;
} & { validate?: FieldValidator };

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
