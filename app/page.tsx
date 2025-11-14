import Blog from "@/components/home/Blog";
import Contacts from "@/components/home/Contacts";
import Experiments from "@/components/home/Experiments";
import Experiences from "@/components/home/Experiences";
import Others from "@/components/home/Others";

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
