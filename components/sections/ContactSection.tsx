'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      label: 'Email',
      value: 'allanilyasov@gmail.com',
      href: 'mailto:allanilyasov@gmail.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/allanily',
      href: 'https://linkedin.com/in/allanily',
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: <Github className="w-8 h-8" />,
      label: 'GitHub',
      value: 'github.com/allanilya',
      href: 'https://github.com/allanilya',
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      label: 'Resume',
      value: 'Download PDF',
      href: '/Allan Resume Portfolio.pdf',
      color: 'from-purple-600 to-purple-700',
    },
  ];

  return (
    <section className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-slate-300 via-gray-200 to-zinc-100 bg-clip-text text-transparent"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
        >
          I'm always open to discussing new projects, opportunities, or just having a chat
          about technology and innovation.
        </motion.p>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-700 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 p-4 bg-gradient-to-br ${method.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{method.label}</h3>
                  <p className="text-gray-600 truncate group-hover:text-gray-800 transition-colors">
                    {method.value}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100"
        >
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Currently Available For</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Full-Time Opportunities', 'Consulting Projects', 'Collaborations', 'Speaking Engagements'].map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
