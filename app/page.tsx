import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { FeatureCard } from "@/components/features/FeatureCard";
import { TestimonialCard } from "@/components/features/TestimonialCard";
import { Calendar, Users, Zap, Globe } from "lucide-react";

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
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content: "TaskFlow has transformed how our team collaborates. The smart scheduling feature alone has saved us countless hours in project planning.",
    rating: 5,
    imageId: 10
  },
  {
    name: "James Wilson",
    role: "Engineering Lead",
    company: "InnovateLabs",
    content: "The automation capabilities are game-changing. We've reduced our project setup time by 60% since implementing TaskFlow.",
    rating: 5,
    imageId: 11
  },
  {
    name: "Maria Rodriguez",
    role: "Operations Director",
    company: "GlobalTech",
    content: "Finally, a task management solution that actually makes sense. The interface is intuitive and our team adopted it immediately.",
    rating: 5,
    imageId: 12
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful features to help you manage tasks, collaborate with your team, and achieve your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Loved by teams worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              See what our customers have to say about TaskFlow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}