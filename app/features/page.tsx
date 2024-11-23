"use client";

import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/features/FeatureCard";
import { Calendar, Users, Zap, Globe, BarChart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automatically organize and prioritize your tasks with AI-powered scheduling."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time updates and shared workspaces."
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline repetitive tasks with powerful automation workflows."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access your tasks and projects from anywhere, on any device."
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "Gain insights into team performance and project progress with detailed reports."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Keep your data safe with enterprise-grade security and compliance features."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Powerful features to boost productivity
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to manage tasks effectively and collaborate seamlessly
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of teams already using TaskFlow
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}