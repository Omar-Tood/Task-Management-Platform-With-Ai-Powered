"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { Task } from "@/lib/types";
import { CustomTooltip } from "./CustomTooltip";

interface CompletionTrendChartProps {
  tasks: Task[];
}

export function CompletionTrendChart({ tasks }: CompletionTrendChartProps) {
  const completionTrend = useMemo(() => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return last7Days.map(date => {
      const dayTasks = tasks.filter(task => 
        format(new Date(task.createdAt!), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );

      return {
        date: format(date, 'MMM dd'),
        total: dayTasks.length,
        completed: dayTasks.filter(task => task.completed).length,
      };
    });
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" role="img" aria-label="Task completion trend chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={completionTrend}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={8}
                stroke="currentColor"
                height={50}
                padding={{ left: 0, right: 0 }}
                scale="point"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={8}
                stroke="currentColor"
                width={40}
                padding={{ top: 10, bottom: 0 }}
                scale="linear"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                name="Total Tasks"
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                name="Completed Tasks"
                type="monotone"
                dataKey="completed"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}