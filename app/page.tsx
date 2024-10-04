import Experiences from "@/components/home/Experiences";
import Contacts from "@/components/home/Contacts";
import Blog from "@/components/home/Blog";
import Experiments from "@/components/home/Experiments";
import Others from "@/components/home/Others";
import "../styles/globals.css";

export default function Home() {
	return (
		<section className="mt-5 sm:mt-10">
			<Contacts />
			<div className="space-y-16 sm:space-y-24">
				<Experiences />
				<Experiments />
				<Blog />
				<Others />
			</div>
		</section>
	);
}
