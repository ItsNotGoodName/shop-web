import { Box, Button, Text, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/layout";
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
          <Box mx="auto" w={500}>
            <Form>
              <Box mb={2}>
                <InputField name="email" label="Email" type="text" />
              </Box>
              <Box mb={2}>
                <InputField name="username" label="Username" type="text" />
              </Box>
              <Box mb={2}>
                <InputField name="password" label="Password" type="password" />
              </Box>
              <Flex>
                <Button mx="auto" isLoading={isSubmitting} type="submit">
                  Register
                </Button>
              </Flex>
            </Form>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
