import SubTitle from "@/components/SubTitle";
import ExternalLink from "@/components/ExternalLink";
import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function EditProfile() {
	const { width, height } = useWindowSize();
	return (
		<LayoutToExperiments domain="React" title="Edit Profile">
			<SubTitle>
				From <ExternalLink href="https://beta.reactjs.org/learn/  reacting-to-input-with-state#challenges" name="beta.reactjs.org" /> <br />
				<ExplanationList>
					<li>Try to edit the profile and save to see the result of change.</li>
				</ExplanationList>
			</SubTitle>
			<Confetti height={height} width={width} />
		</LayoutToExperiments>
	);
}
