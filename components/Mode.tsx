"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Mode() {
	const [mode, setMode] = useState(true);
	return (
		<div onClick={() => setMode(!mode)}>
			{mode ? (
				<SunIcon className="h-5 w-5 text-zinc-800 hover:text-zinc-400 cursor-pointer" />
			) : (
				<MoonIcon className="h-5 w-5 text-zinc-800 hover:text-zinc-400 cursor-pointer" />
			)}
		</div>
	);
}
