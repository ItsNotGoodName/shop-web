import { Box, Button, Flex, Link, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { InputField } from "../components/Form/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { TOAST_SERVER_ERROR } from "../constants";
import userService from "../services/userService";
import { toErrorMap } from "../utils/toErrorMap";

type LoginParameters = {
  usernameOrEmail: string;
  password: string;
};

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const { redirect } = router.query;
  console.log(redirect);

  return (
    <Layout>
      <Wrapper>
        <Formik
          validationSchema={LoginSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={
            { usernameOrEmail: "", password: "" } as LoginParameters
          }
          onSubmit={async (values: LoginParameters, { setErrors }) => {
            const data = await userService.login(values);
            if (data.errors) {
              const errorMap = toErrorMap(data.errors);
              if (errorMap.server) {
                toast(TOAST_SERVER_ERROR);
              }
              setErrors(errorMap);
              return;
            }
            toast({
              title: "Successfully Logged In",
              status: "success",
              duration: 5000,
            });
            if (typeof redirect == "string") {
              router.push(redirect);
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Box>
              <Form>
                <Box mb={2}>
                  <InputField
                    name="usernameOrEmail"
                    label="Username or Email"
                    type="text"
                  />
                </Box>
                <Box mb={2}>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <NextLink href="/register">
                  <Flex>
                    <Link ml="auto">Register</Link>
                  </Flex>
                </NextLink>
                <Flex>
                  <Button mx="auto" isLoading={isSubmitting} type="submit">
                    Login
                  </Button>
                </Flex>
              </Form>
            </Box>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default Login;
