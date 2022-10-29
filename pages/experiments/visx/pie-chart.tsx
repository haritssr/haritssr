import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

const coins = [
  { symbol: 'ADA', amount: 200, color: '#2563EB', inUSD: 1.48 },
  { symbol: 'SOL', amount: 5, color: '#10B981', inUSD: 37.6 },
  { symbol: 'BTC', amount: 0.005, color: '#F59E0B', inUSD: 37363 },
];

interface yes {
  symbol: string;
  amount: number;
  color: string;
  inUSD: number;
}

export default function PieChart() {
  const [active, setActive] = useState<yes | null>(null);

  const width = 400;
  const halfWidth = width / 2;

  console.log(active);

  return (
    <LayoutToExperiments title='Pie Chart' domain='VisX'>
      <SubTitle>
        Inspired by{' '}
        <ExternalLink href='https://www.youtube.com/watch?v=bL3P9CqQkKw' name='Leight Halliday' />{' '}
        <br />
        Hover the ring to see which and how much coin that I have.
      </SubTitle>
      <svg width={width} height={width}>
        <Group top={halfWidth} left={halfWidth}>
          <Pie
            data={coins}
            pieValue={data => data.amount * data.inUSD}
            outerRadius={halfWidth}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 40 : 30;
              return halfWidth - size;
            }}
            padAngle={0.01}
          >
            {pie => {
              return pie.arcs.map(arc => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc) as string} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          {active ? (
            <>
              <Text fill='black' textAnchor='middle' fontSize={35} dy={-20}>
                {`$${Math.floor(active.amount * active.inUSD)}`}
              </Text>
              <Text fill={active.color} textAnchor='middle' fontSize={20} dy={20}>
                {`${active.amount} 
                ${active.symbol} `}
              </Text>
            </>
          ) : (
            <>
              <Text fill='black' textAnchor='middle' fontSize={35} dy={-20}>
                {`$${Math.floor(coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0))}`}
              </Text>
              <Text fill='#6B7280' textAnchor='middle' fontSize={20} dy={20}>
                {`${coins.length} Assets`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </LayoutToExperiments>
  );
}
