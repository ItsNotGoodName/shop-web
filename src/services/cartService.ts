import Axios from "axios";
import { SERVER_ERROR } from "../errors";
import { CartType, ErrorType } from "../types";

type CartResponse = {
  errors?: ErrorType[];
  cart?: CartType;
};

export default {
  getCart: async (): Promise<CartResponse> => {
    try {
      const res = await Axios.get("/cart");
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
    }
  },
  setCart: async (params: {
    itemId: string | number;
    quantity: number;
  }): Promise<CartResponse> => {
    try {
      const res = await Axios.post("/cart", params);
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
    }
  },
};
