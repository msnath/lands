import "@/styles/_app.scss";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { useReduxStore } from "@/hooks/useRedux.hook";
import { Provider } from "react-redux";
import S from "@/styles/_app.styled";
import smoothscroll from "smoothscroll-polyfill";
import FilesContext, { useFilesContext } from "@/contexts/Files.context";
import Toast from "@/components/atoms/Toast/Toast";
import ToastContext, { useToastContextValue } from "@/contexts/Toast.context";

const ReactQueryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useReduxStore(pageProps.initialReduxState);

  const { visible, state, message, setToast } = useToastContextValue();
  const loadingContextValue = { setToast };
  const filesContextValue = useFilesContext();

  React.useEffect(() => smoothscroll.polyfill(), []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContext.Provider value={loadingContextValue}>
          <FilesContext.Provider value={filesContextValue}>
            <QueryClientProvider client={ReactQueryClient}>
              <div id="_app">
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <script
                    defer
                    src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
                  ></script>
                </Head>
                <Component {...pageProps} />
                <S.Tooltip clickable />

                <Toast visible={visible} state={state} message={message} />
              </div>
            </QueryClientProvider>
          </FilesContext.Provider>
        </ToastContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

export default MyApp;
