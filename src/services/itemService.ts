import Axios from "axios";
import { SERVER_ERROR } from "../errors";
import { ErrorType, ItemType } from "../types";

type ItemsResponse = {
  items?: ItemType[];
  maxPage?: number;
  errors?: ErrorType[];
};

type ItemResponse = {
  item?: ItemType;
  errors?: ErrorType[];
};

export default {
  getNewItems: async (page = 1): Promise<ItemsResponse> => {
    try {
      const res = await Axios.get("/item/new", { params: { page } });
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
    }
  },
  getItemById: async (id: number | string): Promise<ItemResponse> => {
    try {
      const res = await Axios.get("/item/id/" + id);
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
    }
  },
};
