'use client';

import { useState, useCallback } from 'react';

export type RobotMode = 'idle' | 'cleaning' | 'working' | 'loading';
export type Section = 'home' | 'about' | 'skills' | 'projects' | 'certifications';

export const SECTIONS: Section[] = ['home', 'about', 'skills', 'projects', 'certifications'];

interface NavigationState {
  currentSection: Section;
  robotMode: RobotMode;
  isTransitioning: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useRobotNavigation() {
  const [state, setState] = useState<NavigationState>({
    currentSection: 'home',
    robotMode: 'loading',
    isTransitioning: false,
  });

  const finishLoading = useCallback(async () => {
    await delay(2000); // Robot works for 2 seconds
    setState(prev => ({ ...prev, robotMode: 'idle' }));
  }, []);

  const navigateTo = useCallback(async (targetSection: Section) => {
    if (state.isTransitioning || targetSection === state.currentSection) {
      return;
    }

    setState(prev => ({ ...prev, isTransitioning: true, robotMode: 'cleaning' }));
    await delay(400);

    // Change content
    setState(prev => ({
      ...prev,
      currentSection: targetSection,
    }));
    await delay(600);

    // Robot finishes and goes idle
    setState(prev => ({
      ...prev,
      robotMode: 'idle',
      isTransitioning: false,
    }));
  }, [state.isTransitioning, state.currentSection]);

  return {
    currentSection: state.currentSection,
    robotMode: state.robotMode,
    isTransitioning: state.isTransitioning,
    navigateTo,
    finishLoading,
  };
}
