import { Box, Button, Flex, Link, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import userService from "../services/userService";
import { toErrorMap } from "../utils/toErrorMap";

type RegisterParameters = {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
};

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string().min(3, "Too Short!").required("Required"),
  passwordCheck: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  return (
    <Layout>
      <Wrapper>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={RegisterSchema}
          initialValues={
            {
              email: "",
              username: "",
              password: "",
              passwordCheck: "",
            } as RegisterParameters
          }
          onSubmit={async (values: RegisterParameters, { setErrors }) => {
            const data = await userService.register(values);
            console.log(data);
            if (data.errors) {
              setErrors(toErrorMap(data.errors));
              return;
            }
            router.push("/");
            toast({
              title: "Account Created",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          {({ isSubmitting, setValues, values }) => (
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
                <Box mb={2}>
                  <InputField
                    name="passwordCheck"
                    label="Repeat Password"
                    type="password"
                    validate={(value) => {
                      let error;
                      if (value !== values.password) {
                        console.log(value);
                        error = "Passwords do not match";
                      }
                      return error;
                    }}
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
