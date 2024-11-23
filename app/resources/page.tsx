"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { FileText, Video, Book, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const resources = [
  {
    category: "Guides",
    items: [
      {
        title: "Getting Started with TaskFlow",
        description: "Learn the basics of task management and team collaboration",
        icon: FileText,
        link: "#"
      },
      {
        title: "Advanced Workflow Tips",
        description: "Master advanced features and boost your productivity",
        icon: FileText,
        link: "#"
      }
    ]
  },
  {
    category: "Video Tutorials",
    items: [
      {
        title: "TaskFlow Fundamentals",
        description: "Video series covering all essential features",
        icon: Video,
        link: "#"
      },
      {
        title: "Team Collaboration Best Practices",
        description: "Learn how to work effectively with your team",
        icon: Video,
        link: "#"
      }
    ]
  },
  {
    category: "Documentation",
    items: [
      {
        title: "API Documentation",
        description: "Comprehensive API guides and references",
        icon: Book,
        link: "#"
      },
      {
        title: "Integration Guides",
        description: "Connect TaskFlow with your favorite tools",
        icon: Book,
        link: "#"
      }
    ]
  },
  {
    category: "Community",
    items: [
      {
        title: "Community Forums",
        description: "Connect with other TaskFlow users",
        icon: Users,
        link: "#"
      },
      {
        title: "User Stories",
        description: "Learn from successful implementations",
        icon: Users,
        link: "#"
      }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Resources & Support
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to succeed with TaskFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resources.map((section) => (
              <div key={section.category} className="bg-white rounded-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
                <div className="space-y-6">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need help getting started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to help you succeed
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}