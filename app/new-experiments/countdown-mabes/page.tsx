"use client";

import { useCallback, useEffect, useState } from "react";

export default function CountdownMabes() {
	const timeCell = "border border-zinc-300 rounded-md p-2";
	const numberStyle = "text-3xl font-semibold";
	const timeStyle = "text-zinc-500";
	const rupiahStyle = "font-medium text-3xl";

	const today = 0;
	const lastDate = 82;
	const totalDaysBetweenTodayAndLastDate = lastDate - today;
	const restMonths = Math.floor(totalDaysBetweenTodayAndLastDate / 30);
	const restDays = totalDaysBetweenTodayAndLastDate - 30 * restMonths;
	const restHours = 14;
	const restSeconds = 30;

	const target = 3_000_000;
	const saldo = 200_000;
	const defisit = 2_800_000;
	const dailySaving = Math.floor(defisit / lastDate);

	function thousandify(number: number): string {
		// Convert number to string
		const numString = number.toString();

		// Split the string into parts
		const parts = numString.split(".");
		let integerPart = parts[0];
		const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

		// Insert dots as separators for thousands
		integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

		// Concatenate integer and decimal parts
		return integerPart + decimalPart;
	}

	return (
		<>
			<CountdownTimer />

			{/* <div className="mt-20">
				<section className="mb-20">
					<h1 className="text-4xl font-semibold">Countdown Keluar Mabes</h1>
					<p className="text-zinc-700 mt-3">Statistic that I need to aware until leave mabes</p>
				</section>
				<section className="mb-20">
					<h2 className="font-medium text-3xl mb-3">Waktu Tersisa</h2>
					<div className="border-b border-zinc-200 mb-4" />
					<div className="grid grid-cols-5 gap-5">
						<div className={timeCell}>
							<div className={numberStyle}>{restMonths}</div>
							<div className={timeStyle}>Bulan</div>
						</div>
						<div className={timeCell}>
							<div className={numberStyle}>{restDays}</div>
							<div className={timeStyle}>Hari</div>
						</div>
						<div className={timeCell}>
							<div className={numberStyle}>{restHours}</div>
							<div className={timeStyle}>Jam</div>
						</div>
						<div className={timeCell}>
							<div className={numberStyle}>{restHours}</div>
							<div className={timeStyle}>Menit</div>
						</div>
						<div className={timeCell}>
							<SecondTick numberStyle={numberStyle} />
							<div className={timeStyle}>Detik</div>
						</div>
					</div>
				</section>
				<section className="mb-20">
					<h2 className="font-medium text-3xl mb-3">Tabungan</h2>
					<div className="border-b border-zinc-200 mb-4" />
					<div className="space-y-4">
						<div>
							<h3 className="text-zinc-400">Target</h3>
							<div className={rupiahStyle}>Rp{thousandify(target)}</div>
						</div>
						<div>
							<h3 className="text-zinc-400">Tabungan Sekarang</h3>
							<div className={rupiahStyle}>Rp{thousandify(saldo)}</div>
						</div>
						<div>
							<h3 className="text-zinc-400">Defisit</h3>
							<div className="font-medium text-3xl text-red-600">-Rp{thousandify(defisit)}</div>
						</div>
						<div>
							<h3 className="text-zinc-400">Rerata Per Hari</h3>
							<div className={rupiahStyle}>Rp{thousandify(dailySaving)}</div>
						</div>
						<button className="bg-zinc-800 text-zinc-100 px-3.5 py-1.5 rounded-md hover:bg-zinc-700">+ Tambah Tabungan</button>
					</div>
				</section>
			</div> */}
		</>
	);
}

function SecondTick({ numberStyle }: { numberStyle: string }) {
	const [second, setSecond] = useState<number>(10);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSecond((second) => second - 1);
		}, 1000);

		if (second === 0) {
			setSecond(10);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [second]);

	return <div className={numberStyle}>{second}</div>;
}

function CountdownTimer() {
	const [targetDate] = useState(new Date("2024-04-10T00:00:00"));
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft: {
			hours: number;
			minutes: number;
			seconds: number;
			difference: number;
		} = { hours: 0, minutes: 0, seconds: 0, difference: 0 };
		if (difference > 0) {
			timeLeft = {
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
				difference: difference,
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	});

	const formatTime = (time: number) => {
		return time < 10 ? `0${time}` : time;
	};

	return (
		<div>
			<span>{formatTime(timeLeft.hours)}</span>:
			<span>{formatTime(timeLeft.minutes)}</span>:
			<span>{formatTime(timeLeft.seconds)}</span>
			<div>{formatTime(timeLeft.hours)}</div>
			<div>{formatTime(timeLeft.minutes)}</div>
			<div>{formatTime(timeLeft.seconds)}</div>
			<div>{formatTime(timeLeft.difference)}</div>
		</div>
	);
}

// export default CountdownTimer;
