import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<QueryClientProvider client={queryClient}>
			{/*<React.StrictMode> //disabled for react-dnd preview bug for now */}
			<main>
				<Component {...pageProps} />
			</main>
		</QueryClientProvider>
	);
}
