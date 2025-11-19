/**
 * SKILLS COMPONENT
 * ================
 * Displays your technical skills organized by category in a grid layout.
 *
 * What it displays:
 * - "Technical Skills" heading
 * - Cards for each skill category (Languages, Frontend, Backend, etc.)
 * - Individual skill tags within each card
 * - Gray background to separate from other sections
 *
 * How to customize:
 * - ADD a new category: Copy lines 22-25 and add to the array
 * - EDIT skills: Change the items in the skills array (lines 18-40)
 * - REMOVE a category: Delete the entire {...} block
 * - Change category colors: Edit text-blue-600 (line 62)
 * - Change layout: grid-cols-3 means 3 columns on desktop (line 56)
 *   - grid-cols-2 = 2 columns
 *   - grid-cols-4 = 4 columns
 */

export default function Skills() {
  // EDIT YOUR SKILLS HERE
  // Add, remove, or modify categories and skills below
  const skillCategories = [
    {
      title: "Languages",  // Category name
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "R", "Swift", "PHP"]  // List of skills
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Radix UI"]
    },
    {
      title: "Backend",
      skills: ["Flask", "Django", "Spring Boot", "Node.js", "REST APIs"]
    },
    {
      title: "AI/ML",
      skills: ["LangChain", "LangGraph", "TensorFlow", "PyTorch", "Scikit-learn", "AWS Bedrock"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Docker", "DynamoDB", "Elastic Beanstalk", "Lambda", "API Gateway"]
    },
    {
      title: "Data Science",
      skills: ["Pandas", "NumPy", "Plotly", "Spark", "NLTK", "Spacy", "Beautiful Soup"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB", "Pinecone", "FAISS", "Vector Databases"]
    }
  ];

  return (
    <section id="skills" className="relative z-10 py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
