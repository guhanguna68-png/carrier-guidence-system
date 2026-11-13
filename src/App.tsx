import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GuidanceEngine } from './components/GuidanceEngine';
import { ProblemFormulation } from './components/ProblemFormulation';
import { MethodologySection } from './components/MethodologySection';
import { SdgImpactSection } from './components/SdgImpactSection';
import { ReportArchiveSection } from './components/ReportArchiveSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Navbar onLaunchProfiler={() => scrollToSection('engine')} />

      <main className="flex-1">
        <HeroSection
          onLaunchProfiler={() => scrollToSection('engine')}
          onExploreMethodology={() => scrollToSection('methodology')}
        />
        <GuidanceEngine />
        <ProblemFormulation />
        <MethodologySection />
        <SdgImpactSection />
        <ReportArchiveSection />
      </main>

      <Footer />
    </div>
  );
}
