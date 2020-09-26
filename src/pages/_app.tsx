import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import Axios from "axios";
import theme from "../theme";

Axios.defaults.baseURL = "http://localhost:4000";
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
