import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectSection from '../components/ProjectSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default Home; 