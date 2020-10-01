import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";

type SellParameters = {
  title: string;
  description: string;
  price: number;
};

const Sell: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <Wrapper>
        <Formik
          initialValues={
            { title: "", price: 0, description: "" } as SellParameters
          }
          onSubmit={async (values: SellParameters, { setErrors }) => {
            // const data = await userService.register(values);
            // console.log(data);
            // if (data.errors) {
            //   setErrors(toErrorMap(data.errors));
            //   return;
            // }
            // router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <>
              <InputField name="title" label="Title"></InputField>
              <InputField name="price" label="Price"></InputField>
            </>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default Sell;
