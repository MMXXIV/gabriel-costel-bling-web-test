'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
interface DimensionsChartProps {
  dimensions: {
    weight: number;
    height: number;
  };
}
export function DimensionsChart({ dimensions }: DimensionsChartProps) {
  const { weight, height } = dimensions;
  return (
    <div className=" w-full h-full flex  flex-col flex-wrap items-start justify-center gap-6 sm:flex-row">
      <div className="w-full flex">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Dimensions</CardTitle>
            <CardDescription>The overall size of the pokemon.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {height < 100 ? height / 10 : height}
                <span className="text-sm font-normal text-muted-foreground">
                  {height < 100 ? 'm' : 'cm'}
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: 'Steps',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: '2024',
                      steps: 12435,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="white"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {weight > 1000 ? weight / 100 : weight / 10}
                <span className="text-sm font-normal text-muted-foreground">
                  {weight > 1000 ? 't' : 'kg'}
                </span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: 'Steps',
                    color: 'hsl(var(--muted))',
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: 'Weight',
                      steps: 10103,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="steps" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
