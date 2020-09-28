import {
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Spinner,
  Divider,
  Button,
  Stack,
} from "@chakra-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { Layout } from "../../components/Layout";
import QuantitySelect from "../../components/QuantitySelect";
import { Wrapper } from "../../components/Wrapper";
import itemService from "../../services/itemService";
import { ItemType } from "../../types";

export const Item: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<ItemType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(router.query);
    setLoading(true);
    if (typeof id === "string") {
      itemService.getItemById(id).then((res) => {
        if (res.errors) {
          return;
        }

        setItem(res.item);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  let body;
  if (!loading) {
    if (item) {
      body = (
        <>
          <Flex wrap="wrap" p={4}>
            <Image
              w={["100%", "60%"]}
              src="https://images-na.ssl-images-amazon.com/images/I/61Q8oyp6wHL._AC_SL1500_.jpg"
              alt={item.title}
              objectFit="scale-down"
            />
            <Flex
              pl={[0, 5]}
              pt={[5, 0]}
              ml="auto"
              minH={450}
              w={["100%", "40%"]}
            >
              <Stack p={4} w="100%" border="solid #EEF1F6 1px">
                <Heading>{item.title}</Heading>
                <Heading size="lg">${item.price}</Heading>
                <Text>{item.sellor.username}</Text>
                <Text wordBreak="break-word">{item.description}</Text>
                <Stack w="100%" mx="auto" mt="auto">
                  <QuantitySelect />
                  <Button>Add to Cart</Button>
                  <Button>Buy</Button>
                </Stack>
              </Stack>
            </Flex>
          </Flex>
          <Divider />
        </>
      );
    } else {
      body = (
        <Banner
          status="error"
          message="I HAVE NO IDEA WHATS GOING ON"
          title="???"
        />
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
