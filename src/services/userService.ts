import Axios from "axios";

type UserResponse = {
  errors?: [
    {
      field: string;
      msg: string;
    }
  ];
  user?: {
    id: number;
    username: string;
    email: string;
  };
};

const SERVER_ERROR: UserResponse = {
  errors: [{ field: "server", msg: "Could not access server" }],
};

export default {
  me: async (): Promise<UserResponse> => {
    try {
      const res = await Axios.get("/user/me");
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
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
      return SERVER_ERROR;
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
      return SERVER_ERROR;
    }
  },
  logout: async (): Promise<UserResponse> => {
    try {
      const res = await Axios.post("/user/logout");
      return res.data;
    } catch (error) {
      return SERVER_ERROR;
    }
  },
};
