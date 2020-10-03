import { Button, ButtonProps, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { TOAST_GENERIC_ERROR, TOAST_LOGIN_PLEASE } from "../constants";
import cartService from "../services/cartService";
import { toErrorMap } from "../utils/toErrorMap";

type IAddToCartButtonProps = {
  itemId: string | number;
  quantity: number;
} & ButtonProps;

const AddToCartButton: React.FunctionComponent<IAddToCartButtonProps> = ({
  itemId,
  quantity,
  children,
  ...props
}) => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      onClick={() => {
        setLoading(true);
        cartService.setCart({ itemId, quantity }).then(({ errors }) => {
          if (!errors) {
            router.push("/cart");
          } else {
            const errorMap = toErrorMap(errors);
            if (errorMap.login) {
              router.push("/login?redirect=" + router.asPath);
              toast(TOAST_LOGIN_PLEASE);
            } else {
              toast(TOAST_GENERIC_ERROR);
            }
            setLoading(false);
          }
        });
      }}
      isLoading={loading}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddToCartButton;
