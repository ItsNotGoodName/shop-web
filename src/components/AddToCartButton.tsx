import { Button, ButtonProps, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { TOAST_GENERIC_ERROR } from "../constants";
import cartService from "../services/cartService";

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
            setLoading(false);
            toast(TOAST_GENERIC_ERROR);
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
