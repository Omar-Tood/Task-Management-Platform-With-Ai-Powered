"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/lib/types";
import { Users } from "lucide-react";

interface ResourceAllocationProps {
  tasks: Task[];
}

export function ResourceAllocation({ tasks }: ResourceAllocationProps) {
  const teamMembers = [
    { id: "1", name: "Abdinasir Mursal", role: "Nextjs Developer", avatar: "https://picsum.photos/32/32?random=1" },
    { id: "2", name: "Mr Sharafdin", role: "Software Engineer", avatar: "https://picsum.photos/32/32?random=2" },
    { id: "3", name: "Mc Hamouda", role: "Software Engineer", avatar: "https://picsum.photos/32/32?random=3" },
  ];

  const getTasksForMember = (memberId: string) => {
    return tasks.filter(task => task.assignedTo === memberId);
  };

  const calculateWorkload = (memberId: string) => {
    const memberTasks = getTasksForMember(memberId);
    if (memberTasks.length === 0) return 0;
    
    const totalDuration = memberTasks.reduce((sum, task) => sum + (task.estimatedDuration || 0), 0);
    return Math.min(100, (totalDuration / (480 * 5)) * 100); // 480 minutes (8 hours) * 5 workdays
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Resource Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {teamMembers.map((member) => {
            const workload = calculateWorkload(member.id);
            const memberTasks = getTasksForMember(member.id);
            
            return (
              <div key={member.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    {memberTasks.length} tasks
                  </span>
                </div>
                
                <div className="space-y-1">
                  <Progress value={workload} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Workload</span>
                    <span>{Math.round(workload)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}