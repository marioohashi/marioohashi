import './home/sketchbook.css';
import { ExperienceSection } from './home/ExperienceSection';
import { PaperLayers } from './home/PaperLayers';
import { Footer } from './home/Footer';
import { HeroSection } from './home/HeroSection';
import { InventorySection } from './home/InventorySection';
import { ProjectsSection } from './home/ProjectsSection';
import { Contact } from './home/Contact';
import { TopBar } from './home/TopBar';

export function Home() {
  return (
    <main className="sb-page">
      <PaperLayers />
      <TopBar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <InventorySection />
      <Contact />
      <Footer />
    </main>
  );
}
