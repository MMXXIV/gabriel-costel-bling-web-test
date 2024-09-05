"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useMemo } from "react"

export const description = "A line chart with a label"


const chartConfig = {
  value: {
    label: "Stat",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const statNameMap: { [key: string]: string } = {
  hp: "HP",
  attack: "ATT",
  defense: "DEF",
  speed: "SPD",
  "special-attack": "SpATT",
  "special-defense": "SpDEF",
};

interface EffortCharttProps {
  baseStats: Array<{
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}


export function EffortChart({ baseStats }:EffortCharttProps) {

  const chartData = useMemo(() => {
    return baseStats.map((item) => ({
      stat: statNameMap[item.stat.name.toLowerCase()] || item.stat.name,
      value: item.effort = 0 ? 1 : item.effort +1,
    }));
  }, [baseStats]);

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Effort stats</CardTitle>
        <CardDescription>The amount of experience gained when defeating this species</CardDescription>
      </CardHeader>
      <CardContent className="mb-5">
      <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <PolarGrid gridType="circle" radialLines={true} />
            <PolarAngleAxis dataKey="stat"  orientation="outer"/>
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.26}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


/*

"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle fill"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 203 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Grid Circle - No lines</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" radialLines={false} />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}


*/