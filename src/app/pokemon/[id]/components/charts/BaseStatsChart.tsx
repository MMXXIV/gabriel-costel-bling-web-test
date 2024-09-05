"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";



const chartConfig = {
  value: {
    label: "Stat",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const statNameMap: { [key: string]: string } = {
  hp: "HP",
  attack: "ATT",
  defense: "DEF",
  speed: "SPD",
  "special-attack": "SpATT",
  "special-defense": "SpDEF",
};

interface BaseStatsChartProps {
  baseStats: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

export function BaseStatsChart({ baseStats }: BaseStatsChartProps) {

  const chartData = useMemo(() => {
    return baseStats.map((item) => ({
      stat: statNameMap[item.stat.name.toLowerCase()] || item.stat.name,
      value: item.base_stat,
    }));
  }, [baseStats]);

  return (
    <Card className="w-full h-full flex-col  justify-between flex">
      <CardHeader>
        <CardTitle>Base stats</CardTitle>
        <CardDescription>Basic info about species strengths & weaknesses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="stat"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Stats can be increased by leveing up
        </div>
      </CardFooter>
    </Card>
  );
}
