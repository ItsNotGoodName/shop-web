import { Button, ButtonProps, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import cartService from "../services/cartService";

type IAddToCartButtonProps = {
  itemId: string | number;
  quantity: number;
} & ButtonProps;

const AddToCartButton: React.FunctionComponent<IAddToCartButtonProps> = ({
  itemId,
  quantity,
  ...props
}) => {
  const router = useRouter();
  const toast = useToast();
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
              toast({
                duration: 5000,
                status: "error",
                description: "Something went wrong",
              });
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
