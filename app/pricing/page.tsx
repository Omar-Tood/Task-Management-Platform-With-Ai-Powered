"use client";

import { Header } from "@/components/layout/Header";
import { PricingTable } from "@/components/pricing/PricingTable";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for individuals getting started",
    features: [
      "Up to 10 tasks",
      "Basic task management",
      "Personal dashboard",
      "7-day task history",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "12",
    description: "Ideal for professionals and small teams",
    features: [
      "Unlimited tasks",
      "Advanced analytics",
      "Team collaboration",
      "30-day task history",
      "Priority support",
      "Custom categories",
      "Recurring tasks",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For organizations requiring advanced features",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Advanced security",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom reporting",
      "Training sessions"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that best fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          
          <PricingTable plans={plans} />

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              All plans include
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Secure data encryption",
                "99.9% uptime guarantee",
                "Regular backups",
                "Mobile app access",
                "Real-time sync",
                "Community support"
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}