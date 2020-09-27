import Axios from "axios";
import { SERVER_ERROR } from "../errors";
import { ErrorType, UserType } from "../types";

type UserResponse = {
  errors?: ErrorType;
  user?: UserType;
};

export default {
  me: async (): Promise<UserResponse> => {
    try {
      const res = await Axios.get("/user/me");
      console.log(res.data);
      return res.data;
    } catch (error) {
      return SERVER_ERROR as UserResponse;
    }
  },
  login: async (data: {
    usernameOrEmail: string;
    password: string;
  }): Promise<UserResponse> => {
    try {
      const res = await Axios.post("/user/login", data);
      return res.data;
    } catch (error) {
      return SERVER_ERROR as UserResponse;
    }
  },
  register: async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserResponse> => {
    try {
      const res = await Axios.post("/user/register", data);
      return res.data;
    } catch (error) {
      return SERVER_ERROR as UserResponse;
    }
  },
  logout: async (): Promise<UserResponse> => {
    try {
      const res = await Axios.post("/user/logout");
      return res.data;
    } catch (error) {
      return SERVER_ERROR as UserResponse;
    }
  },
};
