/**
 * HERO COMPONENT
 * ===============
 * The main landing section that appears first when users visit your portfolio.
 *
 * What it displays:
 * - Profile photo (circular)
 * - Your name in large gradient text
 * - Your professional title
 * - Social media links (LinkedIn, GitHub, Resume)
 * - Scroll indicator at bottom
 *
 * How to customize:
 * - Profile photo: See detailed comments below
 * - Name: Line 50-52 (change "ALLAN ILYASOV")
 * - Title: Line 55-57 (change "AI/ML Engineer & Full-Stack Developer")
 * - Social links: Lines 61-88 (update URLs)
 * - Colors: Change blue-600, purple-600 to other Tailwind colors
 */

import { LucideGithub, LucideLinkedin, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* PROFILE PHOTO */}
        <div className="mb-8 flex justify-center">
          {/*
            ADJUSTING IMAGE SIZE:
            Change w-70 h-70 on line 37 to:
            - w-32 h-32 = small (128px)
            - w-40 h-40 = medium-small (160px)
            - w-48 h-48 = medium (192px)
            - w-56 h-56 = medium-large (224px)
            - w-64 h-64 = large (256px)
            - w-72 h-72 = extra-large (288px)
            - w-80 h-80 = huge (320px)
          */}
          <div className="relative w-72 h-72  overflow-hidden rounded-full">
            {/*
              ADJUSTING IMAGE POSITION WITHIN CIRCLE:

              The objectPosition value controls where the image is positioned.
              Format: 'horizontal% vertical%'

              To move image LEFT: Use a LOWER first number (horizontal)
              - '0% 50%' = far left, centered vertically
              - '20% 50%' = slightly left
              - '50% 50%' = centered (default)
              - '80% 50%' = slightly right
              - '100% 50%' = far right

              To move image UP/DOWN: Change second number (vertical)
              - '50% 0%' = centered horizontally, at top
              - '50% 30%' = centered horizontally, slightly up
              - '50% 50%' = perfectly centered
              - '50% 70%' = centered horizontally, slightly down
              - '50% 100%' = centered horizontally, at bottom

              Your current value '10% 10%' means:
              - Image is shifted LEFT (10% from left edge)
              - Image is shifted UP (10% from top edge)

              To move MORE to the left, use a SMALLER first number like '0% 10%'

              ZOOM:
              - scale(1.0) = normal size
              - scale(1.2) = zoom in 20%
              - scale(1.5) = zoom in 50%
              - scale(0.8) = zoom out 20%
            */}
            <img
              src="profilepic.jpeg"
              alt="Allan Ilyasov"
              className="h-full object-cover"
              style={{
                width: '100%',  // Make image wider than container so horizontal positioning works
                transform: 'scale(1.1)',
                objectPosition: '0% 0%'  // NOW both values work! First = left/right, Second = up/down
              }}
            />
          </div>
        </div>

        {/* NAME - Change your name here */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Allan Ilyasov
        </h1>

        {/* TITLE - Change your professional title here */}
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
          AI/ML Engineer & Full-Stack Developer
        </p>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mb-8">
          <a
            href="https://linkedin.com/in/allanily"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <LucideLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/allanilya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
          >
            <LucideGithub className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="/Allan Ilyasov Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
