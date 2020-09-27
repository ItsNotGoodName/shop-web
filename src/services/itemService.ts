import Axios from "axios";
import { SERVER_ERROR } from "../errors";
import { ErrorType, ItemType } from "../types";

export type ItemsRepsonse = {
  items?: ItemType[];
  maxPage?: number;
  errors?: ErrorType[];
};

export default {
  getNewItems: async (page = 1): Promise<ItemsRepsonse> => {
    try {
      const res = await Axios.get("/item/new", { params: { page } });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return SERVER_ERROR as ItemsRepsonse;
    }
  },
};
