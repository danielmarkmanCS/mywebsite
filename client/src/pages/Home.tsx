import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';
import { BlogSection } from '@/components/BlogSection';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MatrixBackground />
      <Navigation />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <InteractiveTerminal />
        <BlogSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
