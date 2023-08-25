import Technology from "app/components/landing/Technology";
import Experiences from "app/components/landing/Experiences";
import Contacts from "app/components/landing/Contacts";
import Services from "app/components/landing/Services";
import Blog from "app/components/landing/Blog";
import DesignSystem from "app/components/landing/DesignSystem";
import Experiments from "app/components/landing/Experiments";
import HarisLabBanner from "app/components/landing/HarisLabBanner";
import "../styles/globals.css";

export default function Home() {
	return (
		<section className="mt-5 sm:mt-10">
			<Contacts />
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-16">
        <Services />
        <HarisLabBanner />
      </div> */}
			<div className="space-y-16 sm:space-y-20">
				<Experiences />
				<Experiments />
				<Blog />
				<Technology />
				<DesignSystem />
			</div>
		</section>
	);
}
