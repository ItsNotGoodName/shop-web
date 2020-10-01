import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import { Layout } from "../../components/Layout";
import QuantitySelect from "../../components/QuantitySelect";
import { Wrapper } from "../../components/Wrapper";
import itemService from "../../services/itemService";
import { ItemType } from "../../types";

export const Item: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<ItemType>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (typeof id === "string") {
      itemService.getItemById(id).then((res) => {
        if (res.errors) {
          return;
        }
        setItem(res.item);
        setLoading(false);
      });
    }
  }, [id]);

  let body;
  if (!loading) {
    if (item) {
      body = (
        <>
          <Flex wrap="wrap" p={4}>
            <Flex flexGrow={1} w={["100%", 0]}>
              <Image
                src="https://images-na.ssl-images-amazon.com/images/I/61Q8oyp6wHL._AC_SL1500_.jpg"
                alt={item.title}
                objectFit="scale-down"
              />
            </Flex>
            <Flex
              pl={[0, 5]}
              pt={[5, 0]}
              ml="auto"
              minH={[0, 450]}
              w={["100%", 300]}
            >
              <Stack p={4} w="100%" border="solid #EEF1F6 1px">
                <Heading>{item.title}</Heading>
                <Heading size="lg">${item.price}</Heading>
                <Text>{item.sellor.username}</Text>
                <Text wordBreak="break-word">{item.description}</Text>
                <Stack w="100%" mx="auto" mt="auto">
                  <QuantitySelect
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      setQuantity(parseInt(event.target.value));
                    }}
                    quantity={quantity}
                  />
                  <AddToCartButton quantity={quantity} itemId={item.id}>
                    Add To Cart
                  </AddToCartButton>
                  <Button>Buy</Button>
                </Stack>
              </Stack>
            </Flex>
          </Flex>
          <Divider />
        </>
      );
    }
  } else {
    body = (
      <Flex>
        <Spinner mx="auto" />
      </Flex>
    );
  }

  return (
    <Layout>
      <Wrapper variant="wide">{body}</Wrapper>
    </Layout>
  );
};

export default Item;
