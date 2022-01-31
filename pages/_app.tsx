import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Auth from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}

export default MyApp;
