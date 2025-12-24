import Image from "next/image";
import InternalLink from "@/components/InternalLink";
import ContactList from "../ContactList";

export default function Contacts() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-4 md:items-center gap-8 md:gap-5 pt-5 mb-16">
			<section className="lg:col-span-2 md:mb-0 rounded-2xl corner-squircle lg:h-full lg:border border-zinc-300 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0">
				<div className="flex-col flex self-center">
					<section className="select-none justify-center flex">
						<Image
							priority
							src="/images/blur.jpg"
							height="165"
							width="165"
							className="z-10 rounded-full aspect-ratio h-32 w-32 mb-4"
							alt="Harits Syah"
							blurDataURL="/images/blur.jpg"
							// placeholder='blur'
						/>
					</section>
					<div className="text-zinc-800 font-semibold text-center text-xl">
						Harits Syah
					</div>
				</div>
				<ContactList />
			</section>
			<section className="lg:col-span-2 border border-zinc-300 rounded-2xl corner-squircle">
				<div className="divide-y divide-zinc-200">
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-500 text-tiny sm:text-base">
							Roles :
						</span>
						<span className=" col-span-2 flex items-center space-x-2">
							<span className="text-zinc-500 col-span-2">
								<cite className="group not-italic">
									<a
										title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
										href="https://leerob.io/blog/product-engineers"
										target="_blank"
										rel="noopener noreferrer"
										className="group inline-block w-fit cursor-pointer items-center text-zinc-500 "
									>
										<span className="flex items-center">
											<span className="text-tiny sm:text-base group-hover:text-action">
												Web Product Engineer
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 ml-1  text-zinc-500 group-hover:text-action mt-0.5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={1.7}
											>
												<title>External Link Icon</title>
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
						</span>
					</div>

					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-white">Role</span>
						<span className="text-zinc-500 col-span-2 text-tiny sm:text-base">
							Math Physics Teacher
						</span>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-500 text-tiny sm:text-base">At :</span>
						<span className="text-zinc-500 col-span-2">
							<cite className="group not-italic">
								<a
									title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
									href="https://www.harislab.com"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-block w-fit cursor-pointer items-center text-zinc-500 "
								>
									<span className="flex items-center">
										<span className="text-tiny sm:text-base group-hover:text-action">
											Haris Lab
										</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 ml-1  text-zinc-500 group-hover:text-action mt-0.5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={1.7}
										>
											<title>External Link Icon</title>
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
						<span className="text-zinc-500 text-tiny sm:text-base">
							Email :
						</span>
						<a
							title="Send me an email"
							href="mailto:haritssr@gmail.com"
							className="text-zinc-500 col-span-2 hover:text-action text-tiny sm:text-base"
						>
							haritssr@gmail.com
						</a>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-zinc-500 text-tiny sm:text-base">
							Location :
						</span>
						<a
							target="_blank"
							rel="noopener noreferrer"
							title="See South Tangerang at Google Maps"
							href="https://www.google.com/maps/place/Tangerang+Selatan,+Kota+Tangerang+Selatan,+Banten/data=!4m2!3m1!1s0x2e69fab10419c095:0x8706481c2c4aafe4?sa=X&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgPEAA&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgQEAI"
							className="text-zinc-500 col-span-2 hover:text-action text-tiny sm:text-base"
						>
							South Tangerang, Indonesia
						</a>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<InternalLink href="/about">More</InternalLink>
					</div>
				</div>
			</section>
		</section>
	);
}
