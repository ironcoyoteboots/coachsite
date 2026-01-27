// components/coach/CoachProvider.tsx
"use client";

import { createContext, useContext } from "react";
import type { CoachPageModel } from "@/lib/coachConfig";

interface CoachContextValue {
  coach: CoachPageModel;
}

const CoachContext = createContext<CoachContextValue | null>(null);

interface CoachProviderProps {
  coach: CoachPageModel;
  children: React.ReactNode;
}

export function CoachProvider({ coach, children }: CoachProviderProps) {
  return (
    <CoachContext.Provider value={{ coach }}>
      {children}
    </CoachContext.Provider>
  );
}

export function useCoach() {
  const ctx = useContext(CoachContext);
  if (!ctx) {
    throw new Error("useCoach must be used within a CoachProvider");
  }
  return ctx.coach;
}
