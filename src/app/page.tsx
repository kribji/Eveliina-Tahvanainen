import Hero from '@/components/Hero';
import FrontGallery from '@/components/FrontGallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#e1c2a1] to-[#b19074]">
      <Hero />
      <FrontGallery />
      <Footer />
    </div>
  );
}
