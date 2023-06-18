import { NavContext } from "@/components/context/navProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [numberPag, setNumberPag] = useState<number>(0);

  return (
    <NavContext.Provider value={{ numberPag, setNumberPag }}>
      <Component {...pageProps} />
    </NavContext.Provider>
  );
}
