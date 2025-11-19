export default function ExplanationList({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ul className="block list-outside list-disc space-y-1 pl-4">{children}</ul>
	);
}

/* 
<ExplanationList>
  <li>
    Some explanation
  </li>
  <li>
    Some explanation
  </li>
  <li>
    Some explanation
  </li>
</ExplanationList>; 
*/
