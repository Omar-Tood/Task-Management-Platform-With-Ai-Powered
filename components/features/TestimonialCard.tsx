"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageId: number;
}

export function TestimonialCard({ name, role, company, content, rating, imageId }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6">{content}</p>
      <div className="flex items-center">
        <Image
          src={`https://picsum.photos/48/48?random=${imageId}`}
          alt={name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role} at {company}</p>
        </div>
      </div>
    </div>
  );
}