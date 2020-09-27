import { Box, Spinner } from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import itemService from "../services/itemService";
import { ItemType } from "../types";

const Index: NextPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    itemService.getNewItems().then(({ errors, items, maxPages }) => {
      if (errors || !items) {
        return;
      }
      setItems(items);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <Wrapper variant="wide">
        {items ? (
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
          <Spinner />
        )}
      </Wrapper>
    </Layout>
  );
};

export default Index;
