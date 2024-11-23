"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
              <span className="block">Transform your workflow</span>
              <span className="block text-blue-600">with TaskFlow</span>
            </h1>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4 mb-8">
              Streamline your tasks, boost productivity, and collaborate seamlessly with your team in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch demo
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={`https://picsum.photos/32/32?random=${i}`}
                    alt={`User ${i}`}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>5.0 (2k+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            src="https://picsum.photos/1200/600"
            alt="TaskFlow Dashboard"
            width={1200}
            height={600}
            className="rounded-xl shadow-2xl border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}