'use client';

import { motion } from 'framer-motion';

export default function CertificationsSection() {
  const certifications = [
    {
      name: 'AWS Academy Graduate - Cloud Foundations',
      image: '/aws-academy-graduate-cloud-foundations-training-bad.png',
      link: 'https://www.credly.com/badges/82f8f7b0-1d0e-42b8-a393-42d133ba1bb5/print',
    },
    {
      name: 'AWS Academy Graduate - Machine Learning Foundations',
      image: '/aws-academy-graduate-machine-learning-foundations-t.png',
      link: 'https://www.credly.com/badges/0554d3d1-4cf0-45ae-b7b9-f41477c6dada/print',
    },
    {
      name: 'Databricks Fundamentals',
      image: '/Databrick-fundamentals-badge.png',
      link: 'https://credentials.databricks.com/307cb6f5-a9e0-4c69-a446-845527a6a0e1#acc.3w4lyiBh',
    },
  ];

  return (
    <div className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-100"
        >
          <span data-breakable>Certifications</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full border border-gray-700"
            >
              <div className="w-64 h-64 flex items-center justify-center mb-4 flex-shrink-0">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-300 mt-auto">
                {cert.name}
              </p>
              <p className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                View Credential →
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
