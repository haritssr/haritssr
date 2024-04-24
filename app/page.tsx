import Technology from "@/components/home/Technology";
import Experiences from "@/components/home/Experiences";
import About from "@/components/home/About";
import Contacts from "@/components/home/Contacts";
import Blog from "@/components/home/Blog";
import DesignSystem from "@/components/home/DesignSystem";
import Experiments from "@/components/home/Experiments";
import "../styles/globals.css";

export default function Home() {
	return (
		<section className="mt-5 sm:mt-10">
			<Contacts />
			<div className="space-y-16 sm:space-y-20">
				<Experiences />
				<Experiments />
				<Blog />
				<Technology />
				<DesignSystem />
				<About />
			</div>
		</section>
	);
}
