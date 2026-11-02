import { Hero } from "@/components/hero/Hero";
import { LiveOpsFeed } from "@/components/effects/LiveOpsFeed";
import { TrustSection } from "@/components/sections/TrustSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GrowthLoopSection } from "@/components/sections/GrowthLoopSection";
import { RevenueSimulator } from "@/components/sections/RevenueSimulator";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { ExperienceLab } from "@/components/experience/ExperienceLab";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveOpsFeed />
      <TrustSection />
      <PlatformSection />
      <WorkflowSection />
      <FeaturesSection />
      <GrowthLoopSection />
      <RevenueSimulator />
      <ProblemSection />
      <ProductSection />
      <ExperienceLab />
      <IndustriesSection />
      <TestimonialsSection />
      <ComparisonSection />
      <ResourcesSection />
    </>
  );
}
