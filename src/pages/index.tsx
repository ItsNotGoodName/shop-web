import { Flex, Spinner } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import { PageType, Paginator } from "../components/Paginator";
import { Wrapper } from "../components/Wrapper";
import itemService from "../services/itemService";
import { ErrorType, ItemType } from "../types";

const Index: NextPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const [page, setPage] = useState<PageType>({
    currentPage: 1,
    maxPage: -1,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorType[]>();

  useEffect(() => {
    setLoading(true);
    itemService
      .getNewItems(page.currentPage)
      .then(({ errors: errs, items, maxPage }) => {
        if (errs) {
          setErrors(errs);
          return;
        }

        setItems(items);
        setPage((p) => {
          p.maxPage = maxPage ? maxPage : -1;
          return p;
        });
        setLoading(false);
      });
  }, [page]);

  let body;
  if (errors) {
    body = errors.map((e) => (
      <Banner
        key={e.field}
        status="error"
        title={e.field.toUpperCase()}
        message={e.msg}
      />
    ));
  } else {
    body = (
      <>
        {!loading && items ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              href="/user"
              title={item.title}
              description={item.description}
              price={item.price}
              username={item.sellor.username}
            ></ItemCard>
          ))
        ) : (
          <Flex>
            <Spinner mx="auto" />
          </Flex>
        )}
        {items ? (
          <Flex my={5}>
            <Paginator setPage={setPage} page={page} mx="auto" />
          </Flex>
        ) : null}
      </>
    );
  }

  return (
    <Layout>
      <Wrapper variant="wide">{body}</Wrapper>
    </Layout>
  );
};

export default Index;
