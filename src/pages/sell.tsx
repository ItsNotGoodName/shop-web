import { Button, Flex, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
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
              <InputField name="title" label="Title"></InputField>
              <InputField name="price" label="Price"></InputField>
              <InputField name="description" label="description"></InputField>

              <Flex mt={4}>
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
