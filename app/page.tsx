import Contacts from "./_HomeSections/Contacts";
import Experiments from "./_HomeSections/Experiments";
import Misc from "./_HomeSections/Misc";
import Projects from "./_HomeSections/Projects";
import Writing from "./_HomeSections/Writing";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Projects />
        <Experiments />
        <Writing />
        <Misc />
      </div>
    </section>
  );
}
