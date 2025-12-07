'use client';

import { useState, useCallback, useEffect } from 'react';

export type RobotState = 'idle' | 'navigating' | 'repairing';

export interface RobotPosition {
  x: number; // absolute page X
  y: number; // absolute page Y
  rotation: number; // facing angle in degrees
}

interface RepairTask {
  elementId: string;
  position: RobotPosition;
  sectionId: string;
}

const ROBOT_SIZE = 250; // Robot canvas size

export function useRobotController() {
  const [state, setState] = useState<RobotState>('idle');
  const [position, setPosition] = useState<RobotPosition>({
    x: -ROBOT_SIZE, // Start off-screen left
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    rotation: 0,
  });
  const [taskQueue, setTaskQueue] = useState<RepairTask[]>([]);
  const [currentTask, setCurrentTask] = useState<RepairTask | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Add a repair task to the queue
  const addRepairTask = useCallback((task: RepairTask) => {
    console.log('🤖 Robot: Adding repair task', task);
    setTaskQueue((prev) => {
      // Limit queue size to prevent spam
      if (prev.length >= 3) {
        console.log('⚠️ Robot: Queue full, task rejected');
        return prev;
      }
      console.log('✅ Robot: Task added to queue. Queue size:', prev.length + 1);
      return [...prev, task];
    });
  }, []);

  // Process the next task in the queue
  const processNextTask = useCallback(async () => {
    if (isProcessing || taskQueue.length === 0) {
      return;
    }

    console.log('🚀 Robot: Starting to process task');
    setIsProcessing(true);
    const task = taskQueue[0];
    setCurrentTask(task);
    setTaskQueue((prev) => prev.slice(1));

    // State: Navigating
    console.log('🏃 Robot: Navigating to target');
    setState('navigating');

    // Calculate rotation to face target
    const dx = task.position.x - position.x;
    const dy = task.position.y - position.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log('📐 Robot: Distance to target:', distance, 'px');

    // Move to target position
    setPosition({
      x: task.position.x,
      y: task.position.y,
      rotation: angle,
    });

    // Wait for movement animation (distance-based delay)
    const travelTime = Math.min(Math.max(distance / 500, 0.5), 2) * 1000; // 0.5-2 seconds
    console.log('⏱️ Robot: Travel time:', travelTime, 'ms');

    await new Promise((resolve) => setTimeout(resolve, travelTime));

    // State: Repairing
    console.log('🔧 Robot: Repairing element');
    setState('repairing');

    // Brief repair pause
    await new Promise((resolve) => setTimeout(resolve, 300));

    // State: Back to idle
    console.log('😌 Robot: Repair complete, returning to idle');
    setState('idle');
    setCurrentTask(null);
    setIsProcessing(false);
  }, [isProcessing, taskQueue, position]);

  // Process queue whenever it changes
  useEffect(() => {
    if (!isProcessing && taskQueue.length > 0) {
      processNextTask();
    }
  }, [taskQueue, isProcessing, processNextTask]);

  // Drive robot onto screen on first mount
  useEffect(() => {
    console.log('🤖 Robot: Initializing...');
    const timer = setTimeout(() => {
      console.log('🚗 Robot: Driving onto screen!');
      setPosition((prev) => ({
        ...prev,
        x: 200, // Drive onto screen (more visible)
        rotation: 0,
      }));
    }, 500); // Quick entry since no loading screen

    return () => clearTimeout(timer);
  }, []);

  return {
    state,
    position,
    currentTask,
    taskQueue,
    addRepairTask,
  };
}
