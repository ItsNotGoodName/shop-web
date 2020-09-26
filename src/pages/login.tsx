import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/core";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/layout";
import userService from "../services/userService";
import { toErrorMap } from "../utils/toErrorMap";

type LoginParameters = {
  usernameOrEmail: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  return (
    <Layout>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" } as LoginParameters}
        onSubmit={async (values: LoginParameters, { setErrors }) => {
          const data = await userService.login(values);
          if (data.errors) {
            setErrors(toErrorMap(data.errors));
            return;
          }
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Box mx="auto" w={500}>
            <Form>
              <Box mb={2}>
                <InputField
                  name="usernameOrEmail"
                  label="Username or Email"
                  type="text"
                />
              </Box>
              <Box mb={2}>
                <InputField name="password" label="Password" type="password" />
              </Box>
              <Flex>
                <Button mx="auto" isLoading={isSubmitting} type="submit">
                  Login
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
