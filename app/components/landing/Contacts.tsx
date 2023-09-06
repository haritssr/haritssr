import InternalLink from "@/components/InternalLink";
import Image from "next/image";

export default function Contacts() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-4 md:items-center gap-8 md:gap-5 pt-5 mb-16">
			<section className="lg:col-span-2 space-y-5 md:mb-0 rounded-md lg:border lg:border-zinc-400/60 lg:h-full lg:self-center lg:grid">
				<div className="grid lg:border-white rounded-md lg:border">
					<div className="self-center space-y-2">
						<div className="justify-center w-full flex ">
							<section className="flex justify-center select-none">
								<Image
									priority
									src="/images/blur.jpg"
									height="165"
									width="165"
									className="z-10 rounded-full aspect-ratio h-32 w-32"
									alt="Harits Syah"
									blurDataURL="/images/blur.jpg"
									// placeholder='blur'
								/>
							</section>
						</div>
						<div className="">
							<div className="text-zinc-800 w-full text-center text-lg font-semibold">Harits Syah</div>
						</div>
					</div>
				</div>
			</section>
			{/* lg:pt-2 lg:px-4 */}
			<section className="lg:col-span-2 border border-zinc-400/60 rounded-md">
				<div className="divide-y divide-zinc-200">
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-800 text-tiny sm:text-base">Roles</span>
						<span className=" col-span-2 flex items-center space-x-2">
							<span className="text-zinc-800 text-tiny sm:text-base">Web Product Engineer</span>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://leerob.io/blog/product-engineers"
								title="Product engineers consider the frontend, backend, design, and everything in between to create a great user experience."
							>
								<svg
									className="w-4 h-4 text-zinc-400 hover:text-action active:scale-90"
									fill="none"
									shapeRendering="geometricPrecision"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
									<path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
									<circle cx="12" cy="17" r=".5" />
								</svg>
							</a>
						</span>
					</div>

					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-white font-medium ">Role</span>
						<span className="text-zinc-800 col-span-2 text-tiny sm:text-base">Math Physics Teacher</span>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-800 text-tiny sm:text-base">At</span>
						<span className="text-zinc-800 col-span-2">
							<cite className="group not-italic">
								<a
									title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
									href="https://www.harislab.com"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-block w-fit cursor-pointer items-center text-zinc-800 hover:underline group-hover:text-zinc-800"
								>
									<span className="flex items-center">
										<span className="text-tiny sm:text-base">Haris Lab</span>
										{/* External Link Icon */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 ml-1  text-zinc-400 mt-0.5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={1.7}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</span>
								</a>
							</cite>
						</span>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-800 text-tiny sm:text-base">Email</span>
						<a
							title="Send me an email"
							href="mailto:haritssr@gmail.com"
							className="text-zinc-800 col-span-2 hover:underline hover:text-zinc-800 text-tiny sm:text-base"
						>
							haritssr@gmail.com
						</a>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-800 text-tiny sm:text-base">Location</span>
						<a
							target="_blank"
							rel="noopener noreferrer"
							title="See South Tangerang at Google Maps"
							href="https://www.google.com/maps/place/Tangerang+Selatan,+Kota+Tangerang+Selatan,+Banten/data=!4m2!3m1!1s0x2e69fab10419c095:0x8706481c2c4aafe4?sa=X&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgPEAA&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgQEAI"
							className="text-zinc-800 col-span-2 hover:underline hover:text-zinc-800 text-tiny sm:text-base"
						>
							South Tangerang, Indonesia
						</a>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<InternalLink href="/about" name="Details" />
					</div>
				</div>
			</section>
		</section>
	);
}
