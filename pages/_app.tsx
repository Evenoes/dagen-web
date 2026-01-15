import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Roboto_Mono, IBM_Plex_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div 
    className={`${robotoMono.variable} ${ibmPlexMono.variable} flex flex-col min-h-screen`}
>
      <div
        className="page-background"
        style={{ backgroundImage: `url('${base}/web-design/at_background.png')` }}
      />
      <Header />
      <div className="grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
