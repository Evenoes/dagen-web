import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="nb">
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`/web-design/dagen-logo/dagen_at.svg?v=2`}
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
