import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import Axios from "axios";
import { API_URL } from "../constants";
import theme from "../theme";
import { UserProvider } from "../UserContext";

Axios.defaults.baseURL = API_URL;
Axios.defaults.headers = {
  "Content-Type": "application/json",
};
Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default MyApp;
