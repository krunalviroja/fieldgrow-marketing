import { Hero } from "@/components/hero/Hero";
import { TickerSection } from "@/components/sections/TickerSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { GrowthLoopSection } from "@/components/sections/GrowthLoopSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { InsightSection } from "@/components/sections/InsightSection";
import { ExperienceLab } from "@/components/experience/ExperienceLab";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { LoginSection } from "@/components/sections/LoginSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerSection />
      <SystemSection />
      <GrowthLoopSection />
      <ProblemSection />
      <ProductSection />
      <InsightSection />
      <ExperienceLab />
      <ComparisonSection />
      <IndustriesSection />
      <ResourcesSection />
      <LoginSection />
    </>
  );
}
