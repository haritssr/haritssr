import { Command } from "cmdk";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import { useEffect, useState } from "react";

export default function CommandMenu() {
	const [open, setOpen] = useState(false);

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: {
			key: string;
			metaKey: unknown;
			ctrlKey: unknown;
			preventDefault: () => void;
		}) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<LayoutToExperiments domain="React" title="CMDK">
			<SubTitle>Fast, composable, unstyled command menu for React.</SubTitle>
			<Command.Dialog
				open={open}
				onOpenChange={setOpen}
				label="Global Command Menu"
			>
				<Command.Input>Type some input</Command.Input>
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>

					<Command.Group heading="Letters">
						<Command.Item>a</Command.Item>
						<Command.Item>b</Command.Item>
						<Command.Separator />
						<Command.Item>c</Command.Item>
					</Command.Group>

					<Command.Item>Apple</Command.Item>
				</Command.List>
			</Command.Dialog>
		</LayoutToExperiments>
	);
}
