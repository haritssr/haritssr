"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

export default function Destination({ link }: { link: string }) {
  const pathname = usePathname();

  const [, CurrentPageBaseRoute] = pathname.split("/");

  let color: string;

  if (pathname === `/${link}`) {
    color = "text-action";
  } else if (CurrentPageBaseRoute === link) {
    color = "text-action";
  } else {
    color = "text-zinc-800 hover:text-zinc-500";
  }

  return (
    <li>
      <Link className={color} href={`/${link}`}>
        {capitalizeFirstLetter(link)}
      </Link>
    </li>
  );
}
