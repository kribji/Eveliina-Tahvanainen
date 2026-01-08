import Hero from '@/components/Hero';
import WorkCategoryCarousel from '@/components/WorkCategoryCarousel';
import FrontIntro from '@/components/FrontIntro';
import FrontLogo from '@/components/FrontLogo';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#e1c2a1] to-[#b19074]">
      <Hero />
      <FrontIntro />
      <WorkCategoryCarousel />
      <FrontLogo />
      <CTA />
    </div>
  );
}
