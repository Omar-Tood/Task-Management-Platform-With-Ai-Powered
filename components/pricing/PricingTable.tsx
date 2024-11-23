"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingTableProps {
  plans: PricingPlan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl ${
            plan.popular
              ? "border-2 border-blue-600 shadow-xl"
              : "border border-gray-200 shadow-sm"
          } bg-white p-8`}
        >
          {plan.popular && (
            <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white text-center">
              Most Popular
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-gray-600">{plan.description}</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
          </div>

          <ul className="mb-8 space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className={`w-full ${
              plan.popular
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  );
}