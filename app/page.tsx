import AI from "@/components/home/AI";
import Blog from "@/components/home/Blog";
import Contacts from "@/components/home/Contacts";
import CV from "@/components/home/CV";
import Experiments from "@/components/home/Experiments";
import Projects from "@/components/home/Projects";
import SubscribedNewsletters from "@/components/home/SubscribedNewsletters";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Projects />
        <Experiments />
        <Blog />
        <SubscribedNewsletters />
        <CV />
        <AI />
      </div>
    </section>
  );
}
