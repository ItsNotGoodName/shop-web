import { Box } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import userService from "../services/userService";

const Index = () => {
  const [welcome, setWelcome] = useState("Loading...");

  useEffect(() => {
    userService.test();
  });

  return (
    <Layout>
      <Box>{welcome}</Box>
    </Layout>
  );
};

export default Index;
