import Contacts from "./_components/home/Contacts";
import Experiments from "./_components/home/Experiments";
import Misc from "./_components/home/Misc";
import Newsletters from "./_components/home/Newsletters";
import Projects from "./_components/home/Projects";
import Writing from "./_components/home/Writing";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Projects />
        <Experiments />
        <Writing />
        <Newsletters />
        <Misc />
      </div>
    </section>
  );
}
