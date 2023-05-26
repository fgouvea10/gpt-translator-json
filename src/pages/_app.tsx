import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { Header } from "@/components/header";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen overflow-y-auto lg:overflow-y-hidden">
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
