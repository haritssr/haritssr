import Blog from "@/components/home/Blog";
import Contacts from "@/components/home/Contacts";
import Experiences from "@/components/home/Experiences";
import Experiments from "@/components/home/Experiments";
import OtherLinks from "@/components/home/OtherLinks";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Experiences />
        <Experiments />
        <Blog />
        <OtherLinks />
      </div>
    </section>
  );
}
