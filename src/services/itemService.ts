import Axios from "axios";
import { ItemType } from "../types";

export type ItemsRepsonse = {
  items?: ItemType[];
  maxPages?: number;
  errors?: [{ field: string; msg: string }];
};

export default {
  getNewItems: async (page = 1): Promise<ItemsRepsonse> => {
    try {
      const res = await Axios.get("/item/new", { params: { page } });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return { errors: [{ field: "", msg: "" }] };
    }
  },
};
