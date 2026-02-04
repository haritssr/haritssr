"use client";

import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

const coins = [
  { symbol: "ADA", amount: 200, color: "#2563EB", inUSD: 1.48 },
  { symbol: "SOL", amount: 5, color: "#10B981", inUSD: 37.6 },
  { symbol: "BTC", amount: 0.005, color: "#F59E0B", inUSD: 37_363 },
];

interface yes {
  symbol: string;
  amount: number;
  color: string;
  inUSD: number;
}

export default function VisxPieChartDemo() {
  const [active, setActive] = useState<yes | null>(null);

  const width = 400;
  const halfWidth = width / 2;

  // console.log(active);

  return (
    <>
      <SubTitle>
        Inspired by{" "}
        <ExternalLink
          href="https://www.youtube.com/watch?v=bL3P9CqQkKw"
          name="Leight Halliday"
        />{" "}
        <br />
        Hover the ring to see which and how much coin that I have.
      </SubTitle>
      <svg height={width} width={width}>
        <title>IDK</title>
        <Group left={halfWidth} top={halfWidth}>
          <Pie
            data={coins}
            innerRadius={({ data }) => {
              const size = active && active.symbol === data.symbol ? 40 : 30;
              return halfWidth - size;
            }}
            outerRadius={halfWidth}
            padAngle={0.01}
            pieValue={(data) => data.amount * data.inUSD}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  // biome-ignore lint/a11y/useSemanticElements: SVG group cannot be replaced with button element
                  <g
                    aria-label={`${arc.data.symbol} segment`}
                    key={arc.data.symbol}
                    onBlur={() => setActive(null)}
                    onFocus={() => setActive(arc.data)}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                    role="button"
                    tabIndex={0}
                  >
                    <path d={pie.path(arc) as string} fill={arc.data.color} />
                  </g>
                );
              });
            }}
          </Pie>
          {active ? (
            <>
              <Text dy={-20} fill="black" fontSize={35} textAnchor="middle">
                {`$${Math.floor(active.amount * active.inUSD)}`}
              </Text>
              <Text
                dy={20}
                fill={active.color}
                fontSize={20}
                textAnchor="middle"
              >
                {`${active.amount} 
                ${active.symbol} `}
              </Text>
            </>
          ) : (
            <>
              <Text dy={-20} fill="black" fontSize={35} textAnchor="middle">
                {`$${Math.floor(
                  coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                )}`}
              </Text>
              <Text dy={20} fill="#6B7280" fontSize={20} textAnchor="middle">
                {`${coins.length} Assets`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </>
  );
}
