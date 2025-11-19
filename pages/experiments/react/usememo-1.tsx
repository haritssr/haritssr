import {
	createContext,
	memo,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function UseMemo1() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");

	return (
		<LayoutToExperiments domain="React" title="useMemo 1">
			<SubTitle>
				useMemo lets you skip re-rendering components when the props are
				unchanged
			</SubTitle>
			<NameInputAddress
				name={name}
				address={address}
				onChangeName={(e: { target: { value: SetStateAction<string> } }) =>
					setName(e.target.value)
				}
				onChangeAddress={(e: { target: { value: SetStateAction<string> } }) =>
					setAddress(e.target.value)
				}
			/>
			<Greeting name={name} />
			<ThemeYeah name={name} />
		</LayoutToExperiments>
	);
}

function NameInputAddress({ name, address, onChangeName, onChangeAddress }) {
	return (
		<div className="border p-2">
			<div className="">
				Name:
				<input type="text" value={name} onChange={onChangeName} />
			</div>
			<div className="">
				Address:
				<input type="text" value={address} onChange={onChangeAddress} />
			</div>
		</div>
	);
}

const Greeting = memo(function Greeting({ name }: { name: string }) {
	console.log("Greeting was rendered at", new Date().toLocaleTimeString());
	const [greeting, setGreeting] = useState("Hello");
	return (
		<>
			<h3>
				{greeting} {name && ","}
				{name}!
			</h3>
			<GreetingSelector value={greeting} onChange={setGreeting} />
		</>
	);
});

function GreetingSelector({ value, onChange }) {
	return (
		<div className="flex flex-col border p-2">
			<label>
				<input
					type="radio"
					value={value}
					onChange={(_e) => onChange("Hello")}
					checked={value === "Hello"}
				/>
				Regular greeting
			</label>
			<label>
				<input
					type="radio"
					value={value}
					onChange={(_e) => onChange("Hello and welcome")}
					checked={value === "Hello and welcome"}
				/>
				Enthutiastic greeting
			</label>
		</div>
	);
}

const ThemeContext = createContext<string | undefined>(undefined);

function ThemeYeah({ name }: { name: string }) {
	const [theme, setTheme] = useState("text-black bg-zinc-50");
	function handleClick() {
		setTheme(
			theme === "text-black bg-zinc-50"
				? "text-white bg-zinc-700"
				: "text-black bg-zinc-50",
		);
	}
	return (
		<ThemeContext.Provider value={theme}>
			<div className="border p-2">
				<button type="button" onClick={handleClick}>
					Switch theme
				</button>
				<GreetingTheme name={name} />
			</div>
		</ThemeContext.Provider>
	);
}

const GreetingTheme = memo(function GreetingTheme({ name }: { name: string }) {
	console.log(
		"Greeting Theme was rendered at",
		new Date().toLocaleDateString(),
	);
	const theme = useContext(ThemeContext);
	return (
		<h3 className={`${theme} rounded p-1`}>
			Hello{name && ","} {name}!
		</h3>
	);
});
