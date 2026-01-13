'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import WorkCategoryCarousel from '@/components/WorkCategoryCarousel';
import FrontIntro from '@/components/FrontIntro';
import FrontLogo from '@/components/FrontLogo';
import CTA from '@/components/CTA';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#e1c2a1] to-[#b19074]">
      <Hero />
      <FrontIntro />
      <WorkCategoryCarousel />

      <CTA onClick={() => setOpen(true)} />
      <ContactModal open={open} onClose={() => setOpen(false)} />

      <FrontLogo />
    </div>
  );
}
