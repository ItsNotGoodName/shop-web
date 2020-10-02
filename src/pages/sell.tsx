import { Box, Button, Flex, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/Form/InputField";
import { TextareaField } from "../components/Form/TextareaField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { TOAST_SERVER_ERROR } from "../constants";
import itemService, { SellParams } from "../services/itemService";
import { toErrorMap } from "../utils/toErrorMap";

const Sell: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  return (
    <Layout>
      <Wrapper>
        <Formik
          initialValues={{ title: "", price: 0, description: "" } as SellParams}
          onSubmit={async (values, { setErrors }) => {
            const data = await itemService.sell(values);
            console.log(data);
            if (data.errors) {
              const errorMap = toErrorMap(data.errors);
              if (errorMap.server) {
                toast(TOAST_SERVER_ERROR);
              }
              setErrors(errorMap);
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={4}>
                <InputField name="title" label="Title" />
              </Box>
              <Box mb={4}>
                <InputField name="price" label="Price" type="number" />
              </Box>
              <Box mb={4}>
                <TextareaField
                  type="textarea"
                  name="description"
                  label="Description"
                />
              </Box>
              <Flex>
                <Button mx="auto" isLoading={isSubmitting} type="submit">
                  Sell
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default Sell;
