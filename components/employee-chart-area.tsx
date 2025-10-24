"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// import { faker } from '@faker-js/faker';

export const description = "An interactive area chart";

// get chart data: date, attendance, vacancy, leave
const chartData = [
    { date: "2024-04-01", attendance: 222, vacancy: 150, leave: 33 },
    { date: "2024-04-02", attendance: 97, vacancy: 180, leave: 30 },
    { date: "2024-04-03", attendance: 167, vacancy: 120, leave: 94 },
    { date: "2024-04-04", attendance: 242, vacancy: 260, leave: 33 },
    { date: "2024-04-05", attendance: 373, vacancy: 290, leave: 53 },
    { date: "2024-04-06", attendance: 301, vacancy: 340, leave: 94 },
    { date: "2024-04-07", attendance: 245, vacancy: 180, leave: 53 },
    { date: "2024-04-08", attendance: 409, vacancy: 320, leave: 40 },
    { date: "2024-04-09", attendance: 59, vacancy: 110, leave: 95 },
    { date: "2024-04-10", attendance: 261, vacancy: 190, leave: 34 },
    { date: "2024-04-11", attendance: 327, vacancy: 350, leave: 30 },
    { date: "2024-04-12", attendance: 292, vacancy: 210, leave: 59 },
    { date: "2024-04-13", attendance: 342, vacancy: 380, leave: 24 },
    { date: "2024-04-14", attendance: 137, vacancy: 220, leave: 23 },
    { date: "2024-04-15", attendance: 120, vacancy: 170, leave: 44 },
    { date: "2024-04-16", attendance: 138, vacancy: 190, leave: 53 },
    { date: "2024-04-17", attendance: 446, vacancy: 360, leave: 13 },
    { date: "2024-04-18", attendance: 364, vacancy: 410, leave: 59 },
    { date: "2024-04-19", attendance: 243, vacancy: 180, leave: 23 },
    { date: "2024-04-20", attendance: 89, vacancy: 150, leave: 50 },
    { date: "2024-04-21", attendance: 137, vacancy: 200, leave: 43 },
    { date: "2024-04-22", attendance: 224, vacancy: 170, leave: 33 },
    { date: "2024-04-23", attendance: 138, vacancy: 230, leave: 20 },
    { date: "2024-04-24", attendance: 387, vacancy: 290, leave: 19 },
    { date: "2024-04-25", attendance: 215, vacancy: 250, leave: 53 },
    { date: "2024-04-26", attendance: 75, vacancy: 130, leave: 30 },
    { date: "2024-04-27", attendance: 383, vacancy: 420, leave: 69 },
    { date: "2024-04-28", attendance: 122, vacancy: 180, leave: 73 },
    { date: "2024-04-29", attendance: 315, vacancy: 240, leave: 50 },
    { date: "2024-04-30", attendance: 454, vacancy: 380, leave: 49 },
    { date: "2024-05-01", attendance: 165, vacancy: 220, leave: 53 },
    { date: "2024-05-02", attendance: 293, vacancy: 310, leave: 10 },
    { date: "2024-05-03", attendance: 247, vacancy: 190, leave: 40 },
    { date: "2024-05-04", attendance: 385, vacancy: 420, leave: 95 },
    { date: "2024-05-05", attendance: 481, vacancy: 390, leave: 34 },
    { date: "2024-05-06", attendance: 498, vacancy: 520, leave: 30 },
    { date: "2024-05-07", attendance: 388, vacancy: 300, leave: 59 },
    { date: "2024-05-08", attendance: 149, vacancy: 210, leave: 24 },
    { date: "2024-05-09", attendance: 227, vacancy: 180, leave: 90 },
    { date: "2024-05-10", attendance: 293, vacancy: 330, leave: 44 },
    { date: "2024-05-11", attendance: 335, vacancy: 270, leave: 53 },
    { date: "2024-05-12", attendance: 197, vacancy: 240, leave: 13 },
    { date: "2024-05-13", attendance: 197, vacancy: 160, leave: 59 },
    { date: "2024-05-14", attendance: 448, vacancy: 490, leave: 40 },
    { date: "2024-05-15", attendance: 473, vacancy: 380, leave: 95 },
    { date: "2024-05-16", attendance: 338, vacancy: 400, leave: 34 },
    { date: "2024-05-17", attendance: 499, vacancy: 420, leave: 30 },
    { date: "2024-05-18", attendance: 315, vacancy: 350, leave: 59 },
    { date: "2024-05-19", attendance: 235, vacancy: 180, leave: 24 },
    { date: "2024-05-20", attendance: 177, vacancy: 230, leave: 30 },
    { date: "2024-05-21", attendance: 82, vacancy: 140, leave: 44 },
    { date: "2024-05-22", attendance: 81, vacancy: 120, leave: 53 },
    { date: "2024-05-23", attendance: 252, vacancy: 290, leave: 13 },
    { date: "2024-05-24", attendance: 294, vacancy: 220, leave: 59 },
    { date: "2024-05-25", attendance: 201, vacancy: 250, leave: 43 },
    { date: "2024-05-26", attendance: 213, vacancy: 170, leave: 30 },
    { date: "2024-05-27", attendance: 420, vacancy: 460, leave: 29 },
    { date: "2024-05-28", attendance: 233, vacancy: 190, leave: 63 },
    { date: "2024-05-29", attendance: 78, vacancy: 130, leave: 40 },
    { date: "2024-05-30", attendance: 340, vacancy: 280, leave: 49 },
    { date: "2024-05-31", attendance: 178, vacancy: 230, leave: 23 },
    { date: "2024-06-01", attendance: 178, vacancy: 200, leave: 40 },
    { date: "2024-06-02", attendance: 470, vacancy: 410, leave: 39 },
    { date: "2024-06-03", attendance: 103, vacancy: 160, leave: 43 },
    { date: "2024-06-04", attendance: 439, vacancy: 380, leave: 30 },
    { date: "2024-06-05", attendance: 88, vacancy: 140, leave: 49 },
    { date: "2024-06-06", attendance: 294, vacancy: 250, leave: 23 },
    { date: "2024-06-07", attendance: 323, vacancy: 370, leave: 40 },
    { date: "2024-06-08", attendance: 385, vacancy: 320, leave: 39 },
    { date: "2024-06-09", attendance: 438, vacancy: 480, leave: 33 },
    { date: "2024-06-10", attendance: 155, vacancy: 200, leave: 40 },
    { date: "2024-06-11", attendance: 92, vacancy: 150, leave: 39 },
    { date: "2024-06-12", attendance: 492, vacancy: 420, leave: 43 },
    { date: "2024-06-13", attendance: 81, vacancy: 130, leave: 20 },
    { date: "2024-06-14", attendance: 426, vacancy: 380, leave: 49 },
    { date: "2024-06-15", attendance: 307, vacancy: 350, leave: 33 },
    { date: "2024-06-16", attendance: 371, vacancy: 310, leave: 40 },
    { date: "2024-06-17", attendance: 475, vacancy: 520, leave: 69 },
    { date: "2024-06-18", attendance: 107, vacancy: 170, leave: 63 },
    { date: "2024-06-19", attendance: 341, vacancy: 290, leave: 10 },
    { date: "2024-06-20", attendance: 408, vacancy: 450, leave: 29 },
    { date: "2024-06-21", attendance: 169, vacancy: 210, leave: 33 },
    { date: "2024-06-22", attendance: 317, vacancy: 270, leave: 70 },
    { date: "2024-06-23", attendance: 480, vacancy: 530, leave: 69 },
    { date: "2024-06-24", attendance: 132, vacancy: 180, leave: 33 },
    { date: "2024-06-25", attendance: 141, vacancy: 190, leave: 60 },
    { date: "2024-06-26", attendance: 434, vacancy: 380, leave: 19 },
    { date: "2024-06-27", attendance: 448, vacancy: 490, leave: 23 },
    { date: "2024-06-28", attendance: 149, vacancy: 200, leave: 40 },
    { date: "2024-06-29", attendance: 103, vacancy: 160, leave: 49 },
    { date: "2024-06-30", attendance: 446, vacancy: 400, leave: 10 },
];

// function formatYMD(d: { getFullYear: () => any; getMonth: () => number; getDate: () => any }) {
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${y}-${m}-${day}`;
// }

// function generateChartData(startDateStr = '2024-04-01', count = 100) {
//   const out = [];
//   const start = new Date(startDateStr);

//   for (let i = 0; i < count; i++) {
//     const d = new Date(start);         // clone
//     d.setDate(d.getDate() + i);
//     const date = formatYMD(d);

//       const attendance = faker.number.int({ min: 0, max: 400 });
//       const vacancy = faker.number.int({ min: 0, max: 400 });
//       const leave = faker.number.int({ min: 0, max: 20 });
//       out.push({ date, attendance, vacancy, leave });
//   }

//   return out;
// }

// const chartData = generateChartData('2024-02-01', 180);

const chartConfig = {
    employees: {
        label: "Employees",
    },
    attendance: {
        label: "Attendance",
        color: "var(--chart-1)", //you can also use hash values like #2563eb
    },
    vacancy: {
        label: "Vacancy",
        color: "var(--chart-2)",
    },
    leave: {
        label: "Leave",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;

export function EmployeeChartArea() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("90d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    console.log(chartData);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    console.log(filteredData);

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Employee Analytics</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Employee attendance, vacancies, and leaves for the last{" "}
                        {timeRange === "90d"
                            ? "3 months"
                            : timeRange === "30d"
                            ? "30 days"
                            : "7 days"}
                    </span>
                    <span className="@[540px]/card:hidden">
                        Last{" "}
                        {timeRange === "90d"
                            ? "3 months"
                            : timeRange === "30d"
                            ? "30 days"
                            : "7 days"}
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">
                            Last 3 months
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d">
                            Last 30 days
                        </ToggleGroupItem>
                        <ToggleGroupItem value="7d">
                            Last 7 days
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] min-h-[200px] w-full"
                    //min-h-[VALUE] added on the ChartContainer component to make it responsive
                >
                    <AreaChart accessibilityLayer data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillAttendance"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-attendance)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-attendance)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillVacancy"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-vacancy)"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-vacancy)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillLeave"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-leave)"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-leave)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="attendance"
                            type="natural"
                            // fill="var(--color-attendance)"
                            fill="url(#fillAttendance)"
                            fillOpacity={0.1}
                            stroke="var(--color-attendance)"
                            // stackId="a" //stacks with all others that share the stackId (i.e. componentA + componentB + ... where all components have the same stackId)
                        />
                        <Area
                            dataKey="vacancy"
                            type="natural"
                            // fill="var(--color-vacancy)"
                            fill="url(#fillVacancy)"
                            fillOpacity={0.4}
                            stroke="var(--color-vacancy)"
                            // stackId="b" //assign differing stackIds or not use them at all
                        />
                        <Area
                            dataKey="leave"
                            type="natural"
                            // fill="var(--color-leave)"
                            fill="url(#fillLeave)"
                            fillOpacity={0.4}
                            stroke="var(--color-leave)"
                            // stackId="c"
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent payload={chartConfig} />
                            }
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
