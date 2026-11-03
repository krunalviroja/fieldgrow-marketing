import { ControlRoomHero } from "@/components/marketing/ControlRoomHero";
import { OperatorStory } from "@/components/marketing/OperatorStory";
import { MigrationSection } from "@/components/marketing/MigrationSection";
import { GrowthLoopSection } from "@/components/sections/GrowthLoopSection";
import { RevenueSimulator } from "@/components/sections/RevenueSimulator";
import { ExperienceLab } from "@/components/experience/ExperienceLab";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export default function HomePage() {
  return (
    <>
      <ControlRoomHero />
      <OperatorStory />
      <GrowthLoopSection />
      <RevenueSimulator />
      <ExperienceLab />
      <MigrationSection />
      <TestimonialsSection />
      <ResourcesSection />
    </>
  );
}
