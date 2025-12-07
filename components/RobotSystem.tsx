'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import RobotAssistant from './RobotAssistant';
import BrokenGlassOverlay from './BrokenGlassOverlay';
import { useBreakableText } from '@/lib/useBreakableText';
import { useRobotController } from '@/lib/useRobotController';

// const SECTIONS = ['home', 'about', 'skills', 'projects', 'certifications']; // Not needed for click mode

export default function RobotSystem() {
  // Only importing what we need for click mode - text glitching disabled
  const { repairElement, currentBroken } = useBreakableText();

  const { state, position, addRepairTask, currentTask } = useRobotController();

  const [glassPosition, setGlassPosition] = useState<{ x: number; y: number } | null>(null);
  const isRepairing = useRef(false);

  // COMMENTED OUT - Text glitching disabled for now
  // const triggerGlitchInSection = useCallback(
  //   (sectionId: string) => {
  //     console.log('🎯 Attempting to trigger glitch in section:', sectionId);
  //     // Prevent triggering same section twice in a row
  //     if (lastTriggeredSection.current === sectionId || isRepairing.current) {
  //       console.log('⚠️ Skipping - already triggered or repairing');
  //       return;
  //     }
  //     // Try to break an element immediately (no need to rescan each time)
  //     console.log('🔧 Breaking element in section:', sectionId);
  //     const brokenId = breakRandomInSection(sectionId);
  //     if (!brokenId) {
  //       console.log('❌ No element found to break in section:', sectionId);
  //       // Reset so we can try again later
  //       lastTriggeredSection.current = '';
  //       return;
  //     }
  //     console.log('✅ Broke element:', brokenId);
  //     // Only mark as triggered if we successfully broke something
  //     lastTriggeredSection.current = sectionId;
  //     // Get position of broken element
  //     const pos = getElementPosition(brokenId);
  //     if (!pos) {
  //       console.log('❌ Could not get position for element:', brokenId);
  //       return;
  //     }
  //     console.log('📍 Element position:', pos);
  //     // Show broken glass overlay at this position
  //     setGlassPosition({ x: pos.x, y: pos.y });
  //     // Add repair task to robot
  //     addRepairTask({
  //       elementId: brokenId,
  //       position: { x: pos.x, y: pos.y, rotation: 0 },
  //       sectionId,
  //     });
  //     console.log('🤖 Added repair task to robot');
  //   },
  //   [breakRandomInSection, getElementPosition, addRepairTask]
  // );

  // Handle click/tap on background to create glass cracks
  const handleBackgroundClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Ignore if robot is currently working
      if (state !== 'idle') {
        console.log('⚠️ Robot is busy, ignoring click');
        return;
      }

      let clientX: number, clientY: number;

      if ('touches' in event) {
        // Touch event
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        // Mouse event
        clientX = event.clientX;
        clientY = event.clientY;
      }

      // Calculate absolute page position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      const absoluteX = clientX + scrollLeft;
      const absoluteY = clientY + scrollTop;

      console.log('💥 Glass crack at:', { x: absoluteX, y: absoluteY });

      // Show glass crack effect
      setGlassPosition({ x: absoluteX, y: absoluteY });

      // Send robot to fix it
      addRepairTask({
        elementId: `crack-${Date.now()}`,
        position: { x: absoluteX, y: absoluteY, rotation: 0 },
        sectionId: 'user-click',
      });
    },
    [state, addRepairTask]
  );

  // Section detection disabled - using click mode instead

  // Add click/tap listeners to background
  useEffect(() => {
    const handleClick = (e: MouseEvent) => handleBackgroundClick(e);
    const handleTouch = (e: TouchEvent) => handleBackgroundClick(e);

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [handleBackgroundClick]);

  // Remove glass effect when robot reaches it
  useEffect(() => {
    if (state === 'repairing' && currentTask) {
      isRepairing.current = true;
      // Remove glass after a brief pause
      const timer = setTimeout(() => {
        // Only repair text if it was a text element (not user click)
        if (currentBroken) {
          repairElement(currentTask.elementId);
        }
        setGlassPosition(null); // Remove glass overlay
        isRepairing.current = false;
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [state, currentTask, currentBroken, repairElement]);

  // Initial glitch disabled - using click mode instead

  return (
    <>
      <RobotAssistant robotState={state} position={position} />
      <BrokenGlassOverlay
        position={glassPosition}
        onComplete={() => setGlassPosition(null)}
      />
    </>
  );
}
