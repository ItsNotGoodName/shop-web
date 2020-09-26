import { Box } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import userService from "../services/userService";
import { toErrorMap } from "../utils/toErrorMap";

const Index = () => {
  const [welcome, setWelcome] = useState("Loading...");

  useEffect(() => {
    userService.me().then((res) => {
      console.log(res);
      if (res.errors) {
        const err = toErrorMap(res.errors);
        if (err["login"]) {
          setWelcome(err["login"]);
        }
        return;
      }
      setWelcome(res.user!.username);
    });
  });

  return (
    <Layout>
      <Box>{welcome}</Box>
    </Layout>
  );
};

export default Index;
