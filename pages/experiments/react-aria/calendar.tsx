import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import Calendar from "../../../utils/react-aria/Calendar.js";
import { today, getLocalTimeZone } from "@internationalized/date";
import ExternalLink from "@/components/ExternalLink";

export default function CalendarC() {
	return (
		<LayoutToExperiments domain="React Aria" title="Calendar">
			<SubTitle>
				<p className="text-gray-700">
					Examples of{" "}
					<strong>
						<code>Calendar</code>
					</strong>
					, and{" "}
					<strong>
						<code>RangeCalendar</code>
					</strong>{" "}
					components built with{" "}
					<ExternalLink
						href="https://react-spectrum.adobe.com/react-aria/"
						name="React Aria"
					/>
					. and{" "}
					<ExternalLink href="https://tailwindcss.com/" name="Tailwind CSS" />
				</p>
			</SubTitle>
			<div className="flex max-w-xl flex-col items-center">
				<Calendar
					minValue={today(getLocalTimeZone())}
					defaultValue={today(getLocalTimeZone())}
				/>
			</div>
		</LayoutToExperiments>
	);
}
