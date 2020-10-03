import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/core";
import { NextPage } from "next";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import QuantitySelect from "../components/QuantitySelect";
import { Wrapper } from "../components/Wrapper";
import { TOAST_GENERIC_ERROR } from "../constants";
import cartService from "../services/cartService";
import { CartType } from "../types";

const Cart: NextPage = () => {
  const toast = useToast();
  const [cart, setCart] = useState<CartType | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    cartService.getCart().then(({ errors, cart }) => {
      if (errors) {
        toast(TOAST_GENERIC_ERROR);
      } else {
        setCart(cart);
      }
      setLoading(false);
    });
  }, []);

  let body = cart ? (
    cart.cartItems.map(({ item, quantity }) => {
      return (
        <Box key={item.id}>
          <Flex>
            <Flex flexGrow={1} mr={4} wrap="wrap">
              <ItemCard
                w={["100%", "auto"]}
                flexGrow={1}
                href={"/item/" + item.id}
                description=""
                height={100}
                price={`\$${item.price.toFixed(2)}`}
                title={item.title}
              />
              <QuantitySelect
                isDisabled={loading}
                onChange={async (
                  event: React.ChangeEvent<HTMLSelectElement>
                ) => {
                  const newQuantity = parseInt(event.target.value);
                  setLoading(true);
                  const data = await cartService.setCart({
                    itemId: item.id,
                    quantity: newQuantity,
                  });
                  if (data.errors) {
                    toast(TOAST_GENERIC_ERROR);
                  } else {
                    setCart(data.cart);
                  }
                  setLoading(false);
                }}
                quantity={quantity}
                w={["100%", "150px"]}
              />
            </Flex>
            <Flex>
              <IconButton
                variantColor="red"
                aria-label="Remove item"
                icon="close"
                size="sm"
                onClick={async () => {
                  setLoading(true);
                  const data = await cartService.setCart({
                    itemId: item.id,
                    quantity: 0,
                  });
                  if (data.errors) {
                    toast(TOAST_GENERIC_ERROR);
                  } else {
                    setCart(data.cart);
                  }
                  setLoading(false);
                }}
              />
            </Flex>
          </Flex>
          <Divider />
        </Box>
      );
    })
  ) : loading ? (
    <Spinner mx="auto" />
  ) : null;
  return (
    <Layout>
      <Wrapper variant="wide">
        <Stack p={4} border="solid #EEF1F6 1px">
          <Heading size="lg" mb={4}>
            Shopping Cart
          </Heading>
          <Divider />
          {body}
          <Skeleton mr="auto" isLoaded={!loading}>
            <Heading size="lg">Total ${cart?.total.toFixed(2)}</Heading>
          </Skeleton>
          <Divider />
          <NextLink href="/checkout">
            <Button isDisabled={loading} w="50%" mx="auto">
              Checkout
            </Button>
          </NextLink>
        </Stack>
      </Wrapper>
    </Layout>
  );
};

export default Cart;
