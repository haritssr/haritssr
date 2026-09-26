import Blog from "./_HomeSections/Blog";
import Contacts from "./_HomeSections/Contacts";
import Experiments from "./_HomeSections/Experiments";
import More from "./_HomeSections/More";
import Projects from "./_HomeSections/Projects";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Projects />
        <Experiments />
        <Blog />
        <More />
      </div>
    </section>
  );
}
