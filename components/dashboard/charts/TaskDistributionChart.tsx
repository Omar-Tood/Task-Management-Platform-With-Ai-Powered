"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { CustomTooltip } from "./CustomTooltip";

interface TaskDistributionChartProps {
  tasks: Task[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export function TaskDistributionChart({ tasks }: TaskDistributionChartProps) {
  const taskDistribution = useMemo(() => {
    const total = tasks.length;
    if (total === 0) return [];

    const completed = tasks.filter(task => task.completed).length;
    return [
      { name: 'Completed', value: completed },
      { name: 'Active', value: total - completed },
    ];
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" role="img" aria-label="Task distribution pie chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
                labelLine={false}
                startAngle={90}
                endAngle={-270}
              >
                {taskDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {taskDistribution.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}