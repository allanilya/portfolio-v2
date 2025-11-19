/**
 * ABOUT COMPONENT
 * ===============
 * Brief biography section that appears after the Hero section.
 *
 * What it displays:
 * - "About Me" heading
 * - 2-3 paragraphs about your background
 * - White card with shadow on light mode, gray card on dark mode
 *
 * How to customize:
 * - Change the text in the <p> tags (lines 23-34)
 * - Add more paragraphs by copying the <p> tag structure
 * - Adjust card color: Change bg-white and dark:bg-gray-800
 * - Adjust text size: Change text-lg to text-base (smaller) or text-xl (larger)
 * - Adjust padding: Change p-8 to p-6 (less) or p-10 (more)
 */

export default function About() {
  return (
    <section id="about" className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          {/* Paragraph 1 - Edit your background here */}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I'm a Graduate Student pursuing an MS in Data Science and BS in Computer Science at St. John's University,
            graduating in May 2026 and May 2025 respectively. Currently working as a Graduate Research Assistant,
            I specialize in building AI-powered applications and scalable cloud infrastructure.
          </p>

          {/* Paragraph 2 - Edit your expertise here */}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            My expertise spans full-stack development, machine learning, and AWS cloud services. I've led the development
            of Codify AI, an AI-powered programming tutor, and won multiple hackathons for innovative AI solutions.
          </p>

          {/* Paragraph 3 - Edit personal interests here */}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            When I'm not coding, I'm contributing to Uncle Edik's Pickles, a startup I helped grow from a home-based
            operation to a national brand.
          </p>
        </div>
      </div>
    </section>
  );
}
