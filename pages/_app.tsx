import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/*<React.StrictMode> //disabled for react-dnd preview bug for now */}
      <main>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
