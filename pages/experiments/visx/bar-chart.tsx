//still confuse what it is actually, it has so many possible props

import { AxisBottom, AxisLeft } from "@visx/axis";
//
import { localPoint } from "@visx/event";
// <g/>
import { Group } from "@visx/group";
import appleStock, {
  type AppleStock,
} from "@visx/mock-data/lib/mocks/appleStock";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { defaultStyles, TooltipWithBounds, useTooltip } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import type { MouseEvent, TouchEvent } from "react";
import useMeasure from "react-use-measure";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

const data = appleStock.slice(0, 20);
const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100;
const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "black",
  color: "white",
  fontFamily: "inherit",
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
    domain: [
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1,
    ],
  });

  return (
    <LayoutToExperiments domain="VisX" title="Bar Chart">
      <SubTitle>
        Inspired by
        <ExternalLink
          href="https://www.youtube.com/playlist?list=PLIHT2Jhq922bBwhH07uT_QRaPCaKZGgR_"
          name="Oh My Function"
        />{" "}
        <br />
        Bar Chart of Apple Stock.
        <br />
        Hover the bar to see details.
      </SubTitle>
      <svg className="w-full" ref={ref} viewBox={`0 0 ${width} ${height}`}>
        <title>IDK</title>
        <Group>
          {data.map((datum) => {
            const xValue = getXValue(datum);
            const barWidht = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getYValue(datum)) ?? 0);
            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;
            return (
              <Bar
                fill="royalblue"
                height={barHeight}
                key={`bar-${xValue}`}
                onMouseLeave={() => hideTooltip()}
                onMouseMove={(
                  event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
                ) => {
                  const point = localPoint(event);
                  if (!point) return;
                  showTooltip({
                    tooltipData: datum,
                    tooltipLeft: point.x,
                    tooltipTop: point.y,
                  });
                }}
                width={barWidht}
                x={barX}
                y={barY}
              />
            );
          })}
        </Group>
        <Group>
          <AxisBottom
            scale={xScale}
            tickFormat={(date) => timeFormat("%m/%d/%y")(new Date(date))}
            top={innerHeight}
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
          left={tooltipLeft}
          style={tooltipStyles}
          top={tooltipTop}
        >
          <b>{timeFormat("%b %d, %y ")(new Date(getXValue(tooltipData)))}</b> :{" "}
          {getYValue(tooltipData)}
        </TooltipWithBounds>
      ) : null}
    </LayoutToExperiments>
  );
}
