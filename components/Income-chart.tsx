'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#036bfc"
  }
} satisfies ChartConfig;

const chartData: {month: string, amount: number}[] = [
  { month: 'Jan', amount: 186 },
  { month: 'Feb', amount: 170 },
  { month: 'May', amount: 190 },
  { month: 'Jun', amount: 155 },
  { month: 'Jul', amount: 192 }
]

export default function IncomeChart({data}: {data: any[] | undefined}) {

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={'month'}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
