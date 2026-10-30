import { Hero } from "@/components/hero/Hero";
import { ExperienceLab } from "@/components/experience/ExperienceLab";
import { GrowthLoopSection } from "@/components/sections/GrowthLoopSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceLab />
      <GrowthLoopSection />
      <ProblemSection />
      <ComparisonSection />
      <IndustriesSection />
      <ResourcesSection />
    </>
  );
}