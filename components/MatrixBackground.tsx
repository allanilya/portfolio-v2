'use client';

/**
 * MATRIX BACKGROUND COMPONENT
 * ===========================
 * Creates the iconic "Matrix digital rain" effect with falling characters.
 *
 * What it displays:
 * - Animated falling characters in columns
 * - Green text on dark background (classic Matrix style)
 * - Canvas-based animation running at 60fps
 *
 * How to customize:
 * - Speed: Change fontSize on line 25 (smaller = faster fall)
 * - Density: Change columns calculation on line 32 (divide by smaller number = more columns)
 * - Characters: Edit the characters string on line 19
 * - Color: Change fillStyle on line 59 ('rgba(0, 255, 0, ...)' = green)
 * - Fade speed: Change trail opacity on line 50 (higher = faster fade)
 */

import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use in the rain (Matrix-style: Japanese katakana, Latin letters, numbers)
    const characters = 'アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const charactersArray = characters.split('');

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1);

    function draw() {
      if (!ctx || !canvas) return;

      // Create fade effect by drawing semi-transparent black rectangle
      // Lower alpha = longer trails (try 0.03 for longer trails, 0.1 for shorter)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; // Green color (change RGB values for different colors)
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character from array
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly to create continuous rain
        // Lower number = more frequent resets = more rain
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33); // ~30fps (change to 16 for 60fps, 50 for 20fps)

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: '#000', zIndex: 0 }}
    />
  );
}
