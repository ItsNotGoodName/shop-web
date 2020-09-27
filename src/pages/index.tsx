import { Flex, Spinner } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import { PageType, Paginator } from "../components/Paginator";
import { Wrapper } from "../components/Wrapper";
import itemService from "../services/itemService";
import { ItemType } from "../types";

const Index: NextPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const [page, setPage] = useState<PageType>({
    currentPage: 1,
    maxPage: -1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    itemService
      .getNewItems(page.currentPage)
      .then(({ errors, items, maxPage }) => {
        if (errors || !items) {
          return;
        }
        console.log("hi");
        setItems(items);
        setPage((p) => {
          p.maxPage = maxPage ? maxPage : -1;
          return p;
        });
        setLoading(false);
      });
  }, [page]);

  return (
    <Layout>
      <Wrapper variant="wide">
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
      </Wrapper>
      <Flex mb={5}>
        <Paginator setPage={setPage} page={page} mx="auto" />
      </Flex>
    </Layout>
  );
};

export default Index;
