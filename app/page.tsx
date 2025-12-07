'use client';

import NavigationHeader from '@/components/NavigationHeader';
import RobotSystem from '@/components/RobotSystem';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';

export default function Home() {
  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Navigation Header */}
      <NavigationHeader />

      {/* Main Content - Single Page Scroll with Robot Container */}
      <div className="relative w-full h-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
        {/* Robot Assistant System - Grounded on page */}
        <RobotSystem />

        <section id="home" className="snap-start">
          <HomeSection />
        </section>

        <section id="about" className="snap-start">
          <AboutSection />
        </section>

        <section id="skills" className="snap-start">
          <SkillsSection />
        </section>

        <section id="projects" className="snap-start">
          <ProjectsSection />
        </section>

        <section id="certifications" className="snap-start">
          <CertificationsSection />
        </section>
      </div>
    </div>
  );
}
