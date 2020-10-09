import { Divider, Heading, Stack } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";
import { Layout } from "../components/Layout";
import RowKeyValue from "../components/RowKeyValue";
import { Wrapper } from "../components/Wrapper";
import { useUserState } from "../UserContext";

const User: NextPage = () => {
  const user = useUserState();

  return (
    <Layout>
      <Wrapper>
        <Stack>
          <Heading mx="auto" size="xl">
            Account
          </Heading>
          <Divider />
          <RowKeyValue
            title="Balance"
            isLoaded={!!user}
            value={"$" + user?.balance.toFixed(2)}
          />
          <RowKeyValue
            title="Username"
            isLoaded={!!user}
            value={user?.username}
          />
          <RowKeyValue title="Email" isLoaded={!!user} value={user?.email} />
        </Stack>
      </Wrapper>
    </Layout>
  );
};

export default User;
