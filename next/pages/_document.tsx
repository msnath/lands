import { NextRouter } from "next/dist/client/router";
import { AppPropsType, AppType } from "next/dist/shared/lib/utils";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

type EnhancedAppProps = React.PropsWithChildren<AppPropsType<NextRouter, {}>>;

const EnhancedApp = (App: AppType, sheet: ServerStyleSheet) => {
  const app: React.FC<EnhancedAppProps> = (props: EnhancedAppProps) =>
    sheet.collectStyles(<App {...props} />);
  app.displayName = "EnhancedApp";
  return app;
};

class MyDocument extends Document {
  // for styled-components to work
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => EnhancedApp(App, sheet),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://picsum.photos" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://ucpbucket.s3.us-east-2.amazonaws.com"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
