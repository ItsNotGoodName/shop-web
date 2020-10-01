import {
  Divider,
  Flex,
  FlexProps,
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
  href: string;
  price: string;
  height?: number;
} & FlexProps;

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  href,
  price,
  height,
  ...props
}) => {
  return (
    <Flex height={height} {...props}>
      <Divider orientation="vertical" />
      <NextLink href={href}>
        <Link>
          <Image
            size={height}
            objectFit="scale-down"
            src="https://images-na.ssl-images-amazon.com/images/I/61Q8oyp6wHL._AC_SL1500_.jpg"
            alt="Item Picture"
          ></Image>
        </Link>
      </NextLink>
      <Divider orientation="vertical" />
      <Stack ml={2}>
        <NextLink href={href}>
          <Link>
            <Heading size="md">{title}</Heading>
          </Link>
        </NextLink>
        <Heading size="md">{price}</Heading>
        <Text>{description}</Text>
      </Stack>
    </Flex>
  );
};

export default ItemCard;
