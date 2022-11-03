//still confuse what it is actually, it has so many possible props
import { Bar } from '@visx/shape';
// <g/>
import { Group } from '@visx/group';
//
import { localPoint } from '@visx/event';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { defaultStyles, useTooltip, TooltipWithBounds } from '@visx/tooltip';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

import useMeasure from 'react-use-measure';
import { timeFormat } from 'd3-time-format';
import { TouchEvent, MouseEvent } from 'react';

import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import LayoutToExperiments from '@/components/LayoutToExperiments';

const data = appleStock.slice(0, 20);
const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100;
const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: 'black',
  color: 'white',
  fontFamily: 'inherit',
};

export default function BarChart() {
  const [ref, bounds] = useMeasure();
  // console.log(bounds);
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<AppleStock>();
  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width;
  const innerHeight = height - margin;

  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: data.map(getXValue),
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [Math.min(...data.map(getYValue)) - 1, Math.max(...data.map(getYValue)) + 1],
  });

  return (
    <LayoutToExperiments title='Bar Chart' domain='VisX'>
      <SubTitle>
        Inspired by
        <ExternalLink
          href='https://www.youtube.com/playlist?list=PLIHT2Jhq922bBwhH07uT_QRaPCaKZGgR_'
          name='Oh My Function'
        />{' '}
        <br />
        Bar Chart of Apple Stock.
        <br />
        Hover the bar to see details.
      </SubTitle>
      <svg ref={ref} className='w-full' viewBox={`0 0 ${width} ${height}`}>
        <Group>
          {data.map(datum => {
            const xValue = getXValue(datum);
            const barWidht = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getYValue(datum)) ?? 0);
            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;
            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barWidht}
                height={barHeight}
                fill='royalblue'
                onMouseMove={(event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
                  const point = localPoint(event);
                  if (!point) return;
                  showTooltip({
                    tooltipData: datum,
                    tooltipLeft: point.x,
                    tooltipTop: point.y,
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            );
          })}
        </Group>
        <Group>
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={date => timeFormat('%m/%d/%y')(new Date(date))}
          />
        </Group>
        <Group>
          <AxisLeft left={margin} scale={yScale} />
        </Group>
        <Group>Axis Bottom</Group>
      </svg>
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <b>{timeFormat('%b %d, %y ')(new Date(getXValue(tooltipData)))}</b> :{' '}
          {getYValue(tooltipData)}
        </TooltipWithBounds>
      ) : null}
    </LayoutToExperiments>
  );
}
