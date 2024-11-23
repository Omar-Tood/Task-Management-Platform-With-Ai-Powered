"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">TaskFlow</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/solutions" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Solutions</Link>
            <Link href="/resources" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Resources</Link>
            <Link href="/pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Dashboard</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Button className="w-full" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}