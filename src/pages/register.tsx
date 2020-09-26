import { Link, Box, Button, Text, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import userService from "../services/userService";
import { toErrorMap } from "../utils/toErrorMap";

type RegisterParameters = {
  email: string;
  username: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  return (
    <Layout>
      <Wrapper>
        <Formik
          initialValues={
            { email: "", username: "", password: "" } as RegisterParameters
          }
          onSubmit={async (values: RegisterParameters, { setErrors }) => {
            const data = await userService.register(values);
            console.log(data);
            if (data.errors) {
              setErrors(toErrorMap(data.errors));
              return;
            }
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Box>
              <Form>
                <Box mb={2}>
                  <InputField name="email" label="Email" type="text" />
                </Box>
                <Box mb={2}>
                  <InputField name="username" label="Username" type="text" />
                </Box>
                <Box mb={2}>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <NextLink href="/login">
                  <Flex>
                    <Link ml="auto">Login</Link>
                  </Flex>
                </NextLink>
                <Flex>
                  <Button mx="auto" isLoading={isSubmitting} type="submit">
                    Register
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

export default Register;
