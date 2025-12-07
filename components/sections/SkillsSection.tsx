'use client';

import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "R", "Swift", "PHP"]
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
    <div className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-100"
        >
          <span data-breakable>Technical</span> <span data-breakable>Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                <span data-breakable>{category.title}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
