import Contacts from "./_landing_page/Contacts";
import Experiments from "./_landing_page/Experiments";
import Misc from "./_landing_page/Misc";
import Projects from "./_landing_page/Projects";
import Writing from "./_landing_page/Writing";

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
