import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import Axios from "axios";
import { API_URL } from "../constants";
import theme from "../theme";

Axios.defaults.baseURL = API_URL;
Axios.defaults.headers = {
  "Content-Type": "application/json",
};
Axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
