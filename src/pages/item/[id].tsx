import { Box, Flex, Image } from "@chakra-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BuyNow from "../../components/buynow";
import TitleDesc from "../../components/titledesc";

export const Item: NextPage = (props) => {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query.id);
  });

  return (
    <Box mx="auto" maxW="900px" w="100%">
      <Box>
        <Flex flexWrap="wrap">
          <Image
            w={["100%", "100%", "350px"]}
            src="https://pyxis.nymag.com/v1/imgs/a03/68c/6ca516cc07d6a8549abc029dad8077f43d-Price-Kensington-stoneware.2x.h473.w710.jpg"
          />
          <TitleDesc />
          <BuyNow />
        </Flex>
      </Box>
    </Box>
  );
};

export default Item;
