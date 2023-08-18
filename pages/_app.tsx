import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {/*<React.StrictMode> //disabled for react-dnd preview bug for now */}
      <DndProvider backend={HTML5Backend}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
      </DndProvider>
    </QueryClientProvider>
  );
}
