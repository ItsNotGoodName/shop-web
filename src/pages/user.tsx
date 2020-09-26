import { Box, Spinner, Stack, Text } from "@chakra-ui/core";
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
        {user ? (
          <Stack>
            <Text>Username = {user.username}</Text>
            <Text>Email = {user.email}</Text>
            <Text>
              Created ={" "}
              {new Date(parseInt(user.createdAt)).toLocaleDateString()}
            </Text>
            <Text>Balance = {user.balance}</Text>
          </Stack>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </Layout>
  );
};

export default User;
