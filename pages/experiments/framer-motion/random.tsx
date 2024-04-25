import LayoutToExperiments from "@/components/LayoutToExperiments";
import {
	motion,
	useMotionValue,
	useTransform,
	useViewportScroll,
} from "framer-motion";

export default function FramerMotion() {
	const list = { show: { opacity: 1 } };
	const item = { hidden: { x: -10, opacity: 0.2 } };

	const x = useMotionValue(0);
	const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

	const { scrollYProgress } = useViewportScroll();

	const variants = {
		hidden: { opacity: 0.2 },
		animate: { x: 200, scale: 2, opacity: 1 },
	};

	return (
		<LayoutToExperiments domain="Framer Motion" title="Random">
			<div className="space-y-10">
				<motion.div
					className="h-10 w-10 rounded-md bg-blue-500"
					initial="initial"
					transition={{ delay: 0.5, duration: 2 }}
					animate="animate"
					variants={variants}
					//   whileHover={{ scale: 1, x: 0, opacity: 0.2 }}
					whileTap={{ x: 100, scale: 4 }}
				/>
				<motion.ul animate="show" variants={list}>
					<motion.li variants={item}> satu</motion.li>
					<motion.li variants={item}> dua</motion.li>
					<motion.li variants={item}> tiga</motion.li>
				</motion.ul>

				<motion.div
					drag="x"
					style={{ x, opacity }}
					className="h-10 w-10 bg-blue-500"
				/>

				<motion.div
					drag
					dragConstraints={{ left: -50, top: -50, right: 50, bottom: 50 }}
					className="h-10 w-10 rounded-md bg-blue-500"
				/>

				<motion.div />

				<Propagation />
			</div>
		</LayoutToExperiments>
	);
}

const Propagation = () => {
	const list = {
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.3,
			},
		},
		hidden: { opacity: 0, transition: { when: "afterChildren" } },
	};

	const item = {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -100 },
	};

	return (
		<motion.ul
			initial="hidden"
			animate="visible"
			variants={list}
			className="space-y-2"
		>
			<motion.li variants={item} className="bg-rose-200 text-blue-500">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
				labore?{" "}
			</motion.li>
			<motion.li variants={item} className="bg-rose-200 text-blue-500">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
				labore?{" "}
			</motion.li>
			<motion.li variants={item} className="bg-rose-200 text-blue-500">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
				labore?{" "}
			</motion.li>
		</motion.ul>
	);
};
