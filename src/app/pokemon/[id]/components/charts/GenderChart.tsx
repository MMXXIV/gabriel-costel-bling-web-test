import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

export const description = "A radial chart with stacked sections"


const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(203,92%,65%)",
  },
  female: {
    label: "Female",
    color: "hsl(315,80%,83%)",
  },
} satisfies ChartConfig


interface GenderChartProps{
  genderRatio:number
}
export function GenderChart({genderRatio}:GenderChartProps) {

  const totalParts = 8;
  const femaleRatio = (genderRatio / totalParts) * 100; 
  const maleRatio = ((totalParts - genderRatio) / totalParts) * 100; 

  const chartData = [{ male: maleRatio, female: femaleRatio }]

 return (
    <div className=" rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-full h-full flex flex-col min-w-full min-h-full justify-between">
      <CardHeader className="items-start pb-0">
        <CardTitle>Gender ratio </CardTitle>
        <CardDescription>The chance of getting a female pokemon of this species</CardDescription>
      </CardHeader>
      <ChartContainer
          config={chartConfig}
          className="translate-y-5 "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {genderRatio/totalParts * 100}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Ratio
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="male"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-male)"
              className="translate-y-5 stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="female"
              fill="var(--color-female)"
              stackId="a"
              cornerRadius={5}
              className="translate-y-5 stroke-transparent stroke-2"
            />
          </RadialBarChart>
      </ChartContainer>
    </div>
  )
}