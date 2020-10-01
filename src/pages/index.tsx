import { Box, Divider, Flex, Spinner, useToast } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import { PageType, Paginator } from "../components/Paginator";
import { Wrapper } from "../components/Wrapper";
import { TOAST_SERVER_ERROR } from "../constants";
import itemService from "../services/itemService";
import { ItemType } from "../types";

const Index: NextPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const toast = useToast();
  const [page, setPage] = useState<PageType>({
    currentPage: 1,
    maxPage: -1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    itemService
      .getNewItems(page.currentPage)
      .then(({ errors: errs, items, maxPage }) => {
        if (errs) {
          toast(TOAST_SERVER_ERROR);
        } else {
          setItems(items);
          setPage((p) => {
            p.maxPage = maxPage!;
            return p;
          });
        }
        setLoading(false);
      });
  }, [page]);

  let body = (
    <>
      {items ? (
        <>
          <Flex mb={5}>
            <Paginator setPage={setPage} page={page} mx="auto" />
          </Flex>
          <Divider />
          {items.map((item) => (
            <Box key={item.id}>
              <ItemCard
                href={`/item/${encodeURIComponent(item.id)}`}
                title={item.title}
                description={item.description}
                price={`\$${item.price.toFixed(2)}`}
                height={200}
              />
              <Divider />
            </Box>
          ))}
          <Flex my={5}>
            <Paginator setPage={setPage} page={page} mx="auto" />
          </Flex>
        </>
      ) : loading ? (
        <Flex>
          <Spinner mx="auto" />
        </Flex>
      ) : null}
    </>
  );

  return (
    <Layout>
      <Wrapper variant="wide">{body}</Wrapper>
    </Layout>
  );
};

export default Index;
