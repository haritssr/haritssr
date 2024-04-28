"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function DarkModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div>
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-zinc-800 dark:text-zinc-100 hover:text-zinc-400 cursor-pointer" />
					<span className="sr-only">Toggle theme</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-white border dark:border-zinc-700 dark:bg-zinc-800 shadow rounded-md"
			>
				<DropdownMenuItem
					className="dark:text-zinc-100 cursor-pointer outline-none hover:bg-zinc-100 dark:hover:bg-zinc-700/60 py-1 px-2"
					onClick={() => setTheme("light")}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					className="dark:text-zinc-100 cursor-pointer outline-none hover:bg-zinc-100 dark:hover:bg-zinc-700/60 py-1 px-2"
					onClick={() => setTheme("dark")}
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					className="dark:text-zinc-100 cursor-pointer outline-none hover:bg-zinc-100 dark:hover:bg-zinc-700/60 py-1 px-2"
					onClick={() => setTheme("system")}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
