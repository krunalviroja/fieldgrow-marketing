"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ExperienceTabId, IndustryId } from "@/lib/content";

type ExperienceContextValue = {
  activeTab: ExperienceTabId;
  setActiveTab: (tab: ExperienceTabId) => void;
  completedLabs: ExperienceTabId[];
  markComplete: (tab: ExperienceTabId) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  industry: IndustryId;
  setIndustry: (industry: IndustryId) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ExperienceTabId>("social");
  const [completedLabs, setCompletedLabs] = useState<ExperienceTabId[]>([]);
  const [businessName, setBusinessName] = useState("ABC AC Services");
  const [industry, setIndustry] = useState<IndustryId>("ac");

  const markComplete = useCallback((tab: ExperienceTabId) => {
    setCompletedLabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
  }, []);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      completedLabs,
      markComplete,
      businessName,
      setBusinessName,
      industry,
      setIndustry,
    }),
    [activeTab, completedLabs, markComplete, businessName, industry],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
