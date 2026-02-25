import AI from "@/components/home/AI";
import Blog from "@/components/home/Blog";
import Contacts from "@/components/home/Contacts";
import CV from "@/components/home/CV";
import Experiences from "@/components/home/Experiences";
import Experiments from "@/components/home/Experiments";

export default function Home() {
  return (
    <section className="mt-5 sm:mt-10">
      <Contacts />
      <div className="space-y-16 sm:space-y-24">
        <Experiences />
        <Experiments />
        <Blog />
        <AI />
        <CV />
      </div>
    </section>
  );
}
