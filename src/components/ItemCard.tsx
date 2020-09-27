import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

type ItemCardProps = {
  title: string;
  description: string;
  username: string;
  href: string;
  price: number;
  height?: number;
};

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  href,
  price,
  height = 200,
}) => {
  return (
    <Box>
      <Flex h={height}>
        <NextLink href={href}>
          <Link>
            <Image
              size={height}
              objectFit="scale-down"
              src="https://images-na.ssl-images-amazon.com/images/I/61PIjLe6SVL._AC_SL1500_.jpg"
              alt="Item Picture"
            ></Image>
          </Link>
        </NextLink>
        <Stack ml={2}>
          <NextLink href={href}>
            <Link>
              <Heading size="md">{title}</Heading>
            </Link>
          </NextLink>
          <Heading size="md">${price.toFixed(2)}</Heading>
          <Text>{description}</Text>
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
};

export default ItemCard;
