import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { useInView } from "react-intersection-observer";

export default function ScrollTitle() {
	const { ref, inView } = useInView();
	return (
		<LayoutToExperiments domain="Browser" title="Scroll Title">
			<SubTitle>Scroll Title iOS</SubTitle>
			<nav className="sticky top-[90px] flex justify-between bg-blue-100/80 p-2 saturate-150 backdrop-blur">
				<div className="flex w-1/3 items-center space-x-1 text-action">
					<Left />
					Kembali
				</div>
				<div
					className={`w-1/3 text-center font-semibold ${
						inView ? "hidden" : "block"
					}`}
				>
					Title
				</div>
				<div className="flex w-1/3 justify-end text-action">
					<GlobalTools />
				</div>
			</nav>
			<h1 ref={ref} className={`mt-20 text-3xl font-bold`}>
				Title
			</h1>
			<p className="text-zinc-600">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae maiores
				fugiat dolor nisi debitis! Sunt repellendus quaerat voluptatem explicabo
				exercitationem error eveniet magnam nesciunt quam minus est
				necessitatibus delectus eius quo laborum rem porro in aperiam quos nobis
				magni ipsum, dolorem ea quae. Soluta cum, ratione maiores reiciendis
				dicta voluptatem quos saepe iusto explicabo architecto voluptates. Vel
				natus, officia voluptates accusamus repudiandae totam tempore, provident
				a quidem sint quo fugit sapiente voluptate incidunt cumque cupiditate
				culpa excepturi, earum quam id quasi voluptas veniam. Quis, nostrum
				dolorum. Enim nulla repellat labore voluptatem voluptates aliquam
				dolorem esse ut quae non. Ratione reiciendis quae deleniti. Veritatis
				ratione enim dolorem nesciunt, totam deserunt expedita architecto
				debitis quam repudiandae nostrum culpa repellat deleniti odit quis
				labore voluptates iste quas dolores quidem cupiditate praesentium
				laboriosam fugit. Accusamus, veritatis ex voluptas quibusdam vel ducimus
				voluptatibus cupiditate eius quidem? Alias nisi debitis ab porro
				quisquam. Officia totam provident quam earum quo sit autem explicabo
				beatae vitae natus doloremque tempora, libero ut, mollitia, sequi ullam
				animi laborum. Voluptatibus quidem molestiae eveniet recusandae odio
				consequuntur dolor perferendis hic voluptatem quos labore vitae
				accusantium ut molestias, aliquam sapiente sit quaerat explicabo eum
				possimus eius et distinctio eaque at. Placeat modi repellendus eius
				rerum! Magnam molestias alias rem, sit obcaecati consequuntur tempora
				tempore voluptatum vel facilis atque, consequatur cumque animi totam
				quaerat modi! Obcaecati dignissimos reiciendis quia sint ex. Iure, sed
				ut, maxime impedit minima expedita eum laboriosam explicabo blanditiis
				perferendis aut, illum nobis unde. Illum iure, corrupti voluptatum vel
				eos error cumque aspernatur natus fugit quam similique consequatur
				eveniet assumenda nemo? Delectus, impedit! Eligendi optio, ipsam
				accusantium beatae officiis laboriosam praesentium qui velit repellendus
				ratione et, rerum quaerat sit magnam numquam nobis! Molestias ipsam
				natus nisi nihil quidem, eligendi libero explicabo minima ullam, officia
				tempore vel voluptatem. Autem necessitatibus provident recusandae illum
				cupiditate, quo placeat atque animi, enim voluptatibus aliquid voluptas
				nihil quam qui eveniet! Asperiores veniam debitis ipsa expedita porro
				molestiae eos minima. Eius quod nam mollitia laudantium possimus
				accusantium, corporis libero blanditiis sequi porro incidunt,
				repellendus odio enim reiciendis cum sint aut tenetur cupiditate,
				excepturi debitis a recusandae impedit maiores! Repudiandae, sequi! Id
				aspernatur amet nihil debitis laborum ratione voluptate corrupti
				explicabo totam ea vel incidunt beatae ex corporis, ipsum optio iure.
				Unde odit exercitationem accusamus autem fugiat voluptatum architecto
				officia libero repudiandae fugit necessitatibus quo laborum et porro,
				iste harum cumque animi quasi assumenda. Facere rem quaerat ex
				distinctio explicabo ducimus, repellat praesentium, totam a ea quam
				consequatur sequi hic voluptatibus harum iste adipisci suscipit
				sapiente. Eum officia, nemo quas sed incidunt vel tempore consectetur
				officiis excepturi quo ratione odit sunt similique corporis dolorem
				minus. Dolorem dignissimos magni quibusdam voluptate incidunt
				voluptatibus sequi sint consequuntur unde quod quas eius illum labore,
				dolor dicta aut quis aliquam similique, ducimus optio veniam quaerat hic
				debitis! Recusandae ratione fuga tempore, culpa tempora maxime eum
				pariatur totam dolorem quod assumenda ducimus nemo iste voluptatem animi
				minus earum. Autem architecto neque fugit deleniti animi quae odio
				mollitia esse excepturi, iure, quibusdam, dolor id.
			</p>
		</LayoutToExperiments>
	);
}

const Left = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 19.5L8.25 12l7.5-7.5"
			/>
		</svg>
	);
};

const GlobalTools = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
};
