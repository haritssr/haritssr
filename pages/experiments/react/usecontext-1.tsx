import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import { createContext, useContext, useState } from "react";
import { ThemeContext, AuthContext } from "../../../context/someContext";

function Button() {
	const theme = useContext(ThemeContext);
	return <div className="" />;
}

function Profil() {
	const currentUser = useContext(AuthContext);
	return <div className="" />;
}

export default function UseContext1() {
	const [theme, setTheme] = useState("light");
	const [currentUser, setCurrentUser] = useState({ name: "Taylor" });

	return (
		<ThemeContext.Provider value={theme}>
			<AuthContext.Provider value={currentUser}>
				<LayoutToExperiments domain="React" title="useContext 1">
					<SubTitle>Example</SubTitle>
				</LayoutToExperiments>
			</AuthContext.Provider>
		</ThemeContext.Provider>
	);
}
