import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

// Doens't work on password type

export default function FloatingLabels() {
  return (
    <LayoutToExperiments domain="Tailwind CSS" title="Floating Labels">
      <SubTitle>Try to tap and write on input, the label will go up</SubTitle>

      <div className="relative mt-4 space-y-10">
        <div className="sm:w-1/3">
          <input
            className="peer w-full"
            id="email"
            placeholder="Email Address"
            type="email"
          />
          <label
            className="absolute -top-5 left-0 cursor-text text-sm text-zinc-500 peer-placeholder-shown:top-[5.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base"
            htmlFor="email"
          >
            Email Address
          </label>
        </div>
        <div className="sm:w-1/3">
          <input
            className="peer w-full"
            id="password"
            placeholder="Password"
            type="password"
          />
          <label
            className="absolute top-[55px] left-0 cursor-text text-sm text-zinc-500 peer-placeholder-shown:top-[80.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base"
            htmlFor="password"
          >
            Password
          </label>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
