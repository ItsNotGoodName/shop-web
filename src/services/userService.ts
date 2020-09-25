import Axios from "axios";

export default {
  login: async (username: String, password: String) => {
    const data = await Axios.post("/user/login");
  },
  test: async () => {
    try {
      const res = await Axios.get("/user");
      return res.data;
    } catch (error) {
      return { errors: [{ msg: "Test Error" }] };
    }
  },
};
