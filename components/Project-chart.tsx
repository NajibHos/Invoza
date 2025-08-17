'use client';

import { Pie, PieChart } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const chartConfig = {
  completed: {
    label: 'Completed',
    color: '#53d95a'
  },
  pending: {
    label: 'Pending',
    color: '#3085fd'
  },
  cancelled: {
    label: 'Cancelled',
    color: '#f53855'
  }
} satisfies ChartConfig;

export default function ProjectChart({data}: {data: any[] | undefined}) {

  return (
  <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <PieChart>
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Pie data={data} dataKey={'count'} nameKey={'status'} stroke="0" />
    </ PieChart>
  </ChartContainer>
  )
}
