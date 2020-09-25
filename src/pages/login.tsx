import { Box, Button, FormControl, FormLabel } from "@chakra-ui/core";
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

type LoginResponse = {
  errors?: { field: string; msg: string }[];
  success?: boolean;
};

const Login = () => {
  const router = useRouter();
  return (
    <Layout>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" } as LoginParameters}
        onSubmit={async (values: LoginParameters, { setErrors }) => {
          const res = await Axios.post("/user/login", values);
          const data: LoginResponse = res.data;
          if (data.errors) {
            setErrors(toErrorMap(data.errors));
          } else if (data.success) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Box mx="auto" w={500}>
            <Form>
              <Box mb={4}>
                <InputField
                  name="usernameOrEmail"
                  label="Username or Email"
                  type="text"
                />
              </Box>
              <Box mb={4}>
                <InputField name="password" label="Password" type="password" />
              </Box>
              <Button isLoading={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
