'use client';

import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface BrokenGlassOverlayProps {
  position: { x: number; y: number } | null;
  onComplete?: () => void;
}

export default function BrokenGlassOverlay({ position, onComplete }: BrokenGlassOverlayProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !position) return;

    // Create PixiJS application
    const app = new PIXI.Application();

    app.init({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight,
      backgroundAlpha: 0,
      antialias: true,
    }).then(() => {
      if (!canvasRef.current || !app.canvas) return;

      canvasRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Create a simple radial gradient representing broken glass
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Draw radial crack pattern
        const centerX = 150;
        const centerY = 150;

        // Background darkening
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 300);

        // Draw radial cracks
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;

        for (let i = 0; i < 12; i++) {
          const angle = (i * Math.PI) / 6;
          const length = 100 + Math.random() * 50;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
          );
          ctx.stroke();

          // Secondary cracks
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          const branches = 2 + Math.floor(Math.random() * 3);
          for (let j = 0; j < branches; j++) {
            const branchAngle = angle + (Math.random() - 0.5) * 0.5;
            const branchLength = length * 0.4;
            const startDist = length * 0.3 + Math.random() * length * 0.4;

            ctx.beginPath();
            ctx.moveTo(
              centerX + Math.cos(angle) * startDist,
              centerY + Math.sin(angle) * startDist
            );
            ctx.lineTo(
              centerX + Math.cos(angle) * startDist + Math.cos(branchAngle) * branchLength,
              centerY + Math.sin(angle) * startDist + Math.sin(branchAngle) * branchLength
            );
            ctx.stroke();
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2;
        }
      }

      // Create sprite from canvas
      const texture = PIXI.Texture.from(canvas);
      const sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.x = position.x;
      sprite.y = position.y;
      sprite.alpha = 0.9;

      app.stage.addChild(sprite);

      // Auto cleanup after 3 seconds
      setTimeout(() => {
        onComplete?.();
      }, 3000);
    });

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, [position, onComplete]);

  if (!position) return null;

  return (
    <div
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-40"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
