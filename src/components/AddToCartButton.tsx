import { Button, ButtonProps } from "@chakra-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import cartService from "../services/cartService";

type IAddToCartButtonProps = {
  itemId: string;
  quantity: number;
} & ButtonProps;

const AddToCartButton: React.FunctionComponent<IAddToCartButtonProps> = ({
  itemId,
  quantity,
  ...props
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      onClick={() => {
        setLoading(true);
        cartService
          .setCart({ itemId, quantity })
          .then(({ errors, success }) => {
            if (!errors && success) {
              router.push("/cart");
            } else {
              setLoading(false);
            }
          });
      }}
      isLoading={loading}
      {...props}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
