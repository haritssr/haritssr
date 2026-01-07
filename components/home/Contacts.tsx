import Image from "next/image";
import InternalLink from "@/components/InternalLink";
import ContactList from "../ContactList";

export default function Contacts() {
	return (
		<section className="mb-16 grid grid-cols-1 gap-8 pt-5 md:items-center md:gap-5 lg:grid-cols-4">
			<section className="corner-squircle grid grid-cols-1 gap-5 rounded-2xl border-zinc-300 sm:grid-cols-2 sm:gap-0 md:mb-0 lg:col-span-2 lg:h-full lg:border">
				<div className="flex flex-col self-center">
					<section className="flex select-none justify-center">
						<Image
							priority
							src="/images/blur.jpg"
							height="165"
							width="165"
							className="z-10 mb-4 aspect-ratio h-32 w-32 rounded-full"
							alt="Harits Syah"
							blurDataURL="/images/blur.jpg"
							// placeholder='blur'
						/>
					</section>
					<div className="text-center font-semibold text-xl text-zinc-800">
						Harits Syah
					</div>
				</div>
				<ContactList />
			</section>
			<section className="corner-squircle rounded-2xl border border-zinc-300 lg:col-span-2">
				<div className="divide-y divide-zinc-200">
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-tiny text-zinc-500 sm:text-base">
							Roles :
						</span>
						<span className="col-span-2 flex items-center space-x-2">
							<span className="col-span-2 text-zinc-500">
								<cite className="group not-italic">
									<a
										title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
										href="https://leerob.io/blog/product-engineers"
										target="_blank"
										rel="noopener noreferrer"
										className="group inline-block w-fit cursor-pointer items-center text-zinc-500"
									>
										<span className="flex items-center">
											<span className="text-tiny group-hover:text-action sm:text-base">
												Web Product Engineer
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="mt-0.5 ml-1 h-4 w-4 text-zinc-500 group-hover:text-action"
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
						<span className="col-span-2 text-tiny text-zinc-500 sm:text-base">
							Math Physics Teacher
						</span>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-tiny text-zinc-500 sm:text-base">At :</span>
						<span className="col-span-2 text-zinc-500">
							<cite className="group not-italic">
								<a
									title="harislab.com | Haris Lab : Reference, analyze, and test math-physics for high school students"
									href="https://www.harislab.com"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-block w-fit cursor-pointer items-center text-zinc-500"
								>
									<span className="flex items-center">
										<span className="text-tiny group-hover:text-action sm:text-base">
											Haris Lab
										</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="mt-0.5 ml-1 h-4 w-4 text-zinc-500 group-hover:text-action"
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
						<span className="text-tiny text-zinc-500 sm:text-base">
							Email :
						</span>
						<a
							title="Send me an email"
							href="mailto:haritssr@gmail.com"
							className="col-span-2 text-tiny text-zinc-500 hover:text-action sm:text-base"
						>
							haritssr@gmail.com
						</a>
					</div>
					<div className="grid grid-cols-3 py-2 pl-3.5">
						<span className="text-tiny text-zinc-500 sm:text-base">
							Location :
						</span>
						<a
							target="_blank"
							rel="noopener noreferrer"
							title="See South Tangerang at Google Maps"
							href="https://www.google.com/maps/place/Tangerang+Selatan,+Kota+Tangerang+Selatan,+Banten/data=!4m2!3m1!1s0x2e69fab10419c095:0x8706481c2c4aafe4?sa=X&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgPEAA&ved=2ahUKEwjHuNjfgMKAAxXIw6ACHUSwDMwQ8gF6BAgQEAI"
							className="col-span-2 text-tiny text-zinc-500 hover:text-action sm:text-base"
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
