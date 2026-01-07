import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

// Doens't work on password type

export default function FloatingLabels() {
	return (
		<LayoutToExperiments title="Floating Labels" domain="Tailwind CSS">
			<SubTitle>Try to tap and write on input, the label will go up</SubTitle>

			<div className="relative mt-4 space-y-10">
				<div className="sm:w-1/3">
					<input
						type="email"
						id="email"
						placeholder="Email Address"
						className="peer w-full"
					/>
					<label
						htmlFor="email"
						className="-top-5 absolute left-0 cursor-text text-sm text-zinc-500 peer-placeholder-shown:top-[5.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base"
					>
						Email Address
					</label>
				</div>
				<div className="sm:w-1/3">
					<input
						type="password"
						id="password"
						placeholder="Password"
						className="peer w-full"
					/>
					<label
						htmlFor="password"
						className="absolute top-[55px] left-0 cursor-text text-sm text-zinc-500 peer-placeholder-shown:top-[80.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base"
					>
						Password
					</label>
				</div>
			</div>
		</LayoutToExperiments>
	);
}
