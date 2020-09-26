import { Box, Text } from "@chakra-ui/core";
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
        {user ? <Box>{user.username}</Box> : <Text>Loading Profile...</Text>}
      </Wrapper>
    </Layout>
  );
};

export default User;
