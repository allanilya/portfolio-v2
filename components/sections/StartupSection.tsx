'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

export default function StartupSection() {
  const achievements = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Growth',
      value: 'Home → National Brand',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Team',
      value: 'Key Contributor',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Reach',
      value: 'Nationwide Distribution',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Impact',
      value: 'Award-Winning Product',
    },
  ];

  return (
    <section className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
        >
          Startup Experience
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                🥒
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-3 text-gray-100">Uncle Edik's Pickles</h3>
              <p className="text-xl text-green-400 font-semibold mb-4">Key Growth Contributor</p>
              <p className="text-gray-300 leading-relaxed">
                Instrumental in transforming Uncle Edik's Pickles from a home-based operation into
                a nationally recognized brand. Contributed to strategic growth, operational excellence,
                and brand development that established the company as a leader in artisanal food products.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-200"
              >
                <div className="flex justify-center mb-2 text-green-400">
                  {achievement.icon}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {achievement.label}
                </p>
                <p className="text-sm font-semibold text-gray-100">{achievement.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h4 className="text-lg font-semibold mb-3 text-gray-100">Key Contributions</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-1">✓</span>
              <span>Scaled operations from local to nationwide distribution</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-1">✓</span>
              <span>Developed strategies for brand recognition and market penetration</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-1">✓</span>
              <span>Contributed to operational efficiency and quality standards</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
