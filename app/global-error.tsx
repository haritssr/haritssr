import GlobalNavigation from "@/components/GlobalNavigation";
import "../styles/globals.css";
import Footer from "@/components/Footer";
import GlobalNavigationMobile from "app/components/GlobalNavigationMobile";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html lang="en" className={inter.className}>
			<body>
				<GlobalNavigation />
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
				<Footer />
				<GlobalNavigationMobile />
			</body>
		</html>
	);
}
