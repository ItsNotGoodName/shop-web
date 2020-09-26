import { Box, Link } from "@chakra-ui/core";
import NextLink from "next/link";

export type NavItemProp = {
  href: string;
};

export const NavItem: React.FC<NavItemProp> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <Link _hover={{ bg: "gray.100" }}>
        <Box p={3}>{children}</Box>
      </Link>
    </NextLink>
  );
};
