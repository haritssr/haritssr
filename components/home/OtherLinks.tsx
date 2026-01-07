import InternalLinkWithoutArrow from "../InternalLinkWithoutArrow";

export default function OtherLinks() {
  return (
    <section>
      <div className="mb-3 select-none font-semibold text-2xl text-zinc-800">
        Others
      </div>
      <ul className="list-inside space-y-1">
        <li>
          <InternalLinkWithoutArrow href="/pure" name="Pure Design System" />
        </li>
        <li>
          <InternalLinkWithoutArrow href="/times-table" name="Times Table" />
        </li>
        <li>
          <InternalLinkWithoutArrow
            href="/new-experiments"
            name="New Experiments"
          />
        </li>
      </ul>
    </section>
  );
}
