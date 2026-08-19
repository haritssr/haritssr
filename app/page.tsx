import AI from "@/components/home/AI";
import Contacts from "@/components/home/Contacts";
import CV from "@/components/home/CV";
import Experiments from "@/components/home/Experiments";
import Newsletters from "@/components/home/Newsletters";
import Projects from "@/components/home/Projects";
import Writing from "@/components/home/Writing";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Projects />
        <Experiments />
        <CV />
        <Writing />
        <Newsletters />
        <AI />
      </div>
    </section>
  );
}
