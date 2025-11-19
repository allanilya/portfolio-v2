import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import MatrixBackground from '@/components/MatrixBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-900 dark:text-gray-100">
      <MatrixBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
    </div>
  );
}
