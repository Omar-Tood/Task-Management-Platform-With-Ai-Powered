"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export function SolutionCard({ icon: Icon, title, description, features }: SolutionCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-gray-600">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/dashboard">Learn More</Link>
      </Button>
    </div>
  );
}