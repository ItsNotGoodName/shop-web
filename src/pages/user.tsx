import { Flex, Spinner, Text } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import userService from "../services/userService";
import { UserType } from "../types";

const User: NextPage = () => {
  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    userService
      .me()
      .then((data) => {
        if (data.errors) {
          return;
        }
        setUser(data.user);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Flex wrap="wrap">
          {user ? (
            <Text wordBreak="break-word">{JSON.stringify(user)}</Text>
          ) : (
            <Spinner mx="auto" />
          )}
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default User;
