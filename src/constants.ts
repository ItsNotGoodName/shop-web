import { useToastOptions } from "@chakra-ui/core";

export const TOAST_SERVER_ERROR: useToastOptions = {
  duration: 5000,
  status: "error",
  description: "Could not access server",
};

export const TOAST_GENERIC_ERROR: useToastOptions = {
  duration: 5000,
  status: "error",
  description: "Something went wrong",
};
