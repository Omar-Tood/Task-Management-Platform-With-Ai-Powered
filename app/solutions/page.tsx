"use client";

import { Header } from "@/components/layout/Header";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { TestimonialCard } from "@/components/features/TestimonialCard";
import { Briefcase, Users, Brush, Code, Lightbulb, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const solutions = [
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Streamline project workflows, track milestones, and deliver results on time.",
    features: [
      "Gantt charts and timelines",
      "Resource allocation",
      "Project templates",
      "Progress tracking"
    ]
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enable seamless team coordination and communication across departments.",
    features: [
      "Real-time updates",
      "Team workspaces",
      "Task delegation",
      "Performance analytics"
    ]
  },
  {
    icon: Brush,
    title: "Creative Teams",
    description: "Manage creative projects with visual tools and feedback systems.",
    features: [
      "Asset management",
      "Review workflows",
      "Version control",
      "Client approvals"
    ]
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Track sprints, bugs, and feature requests with developer-friendly tools.",
    features: [
      "Sprint planning",
      "Bug tracking",
      "Code integration",
      "Release management"
    ]
  },
  {
    icon: Lightbulb,
    title: "Marketing Teams",
    description: "Plan and execute marketing campaigns with precision and insight.",
    features: [
      "Campaign planning",
      "Content calendar",
      "Performance metrics",
      "Social media scheduling"
    ]
  },
  {
    icon: Building,
    title: "Enterprise",
    description: "Scale task management across large organizations with advanced controls.",
    features: [
      "Custom workflows",
      "Advanced security",
      "API access",
      "Enterprise support"
    ]
  }
];

const caseStudies = [
  {
    name: "David Kim",
    role: "CTO",
    company: "TechStart Inc.",
    content: "TaskFlow has revolutionized how our development team handles sprints. We've seen a 40% increase in on-time deliveries.",
    rating: 5,
    imageId: 15
  },
  {
    name: "Emily Chen",
    role: "Creative Director",
    company: "DesignHub",
    content: "The visual workflow tools have made it so much easier to manage our design projects and get client approval.",
    rating: 5,
    imageId: 16
  },
  {
    name: "Michael Scott",
    role: "Marketing Manager",
    company: "GrowthCo",
    content: "Managing multiple marketing campaigns has never been easier. The analytics help us make data-driven decisions.",
    rating: 5,
    imageId: 17
  }
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Solutions for every team
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover how TaskFlow can help your team achieve more with less effort
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Try TaskFlow Free</Link>
            </Button>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} {...solution} />
            ))}
          </div>

          {/* Case Studies */}
          <div className="bg-white rounded-2xl p-8 mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how teams are using TaskFlow to transform their workflows
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-blue-600 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of teams already using TaskFlow to achieve more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-blue-700" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}