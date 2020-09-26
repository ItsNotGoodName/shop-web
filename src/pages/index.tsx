import { Box } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";

const Index: NextPage = () => {
  return (
    <Layout>
      <Wrapper>Hello World</Wrapper>
    </Layout>
  );
};

export default Index;
