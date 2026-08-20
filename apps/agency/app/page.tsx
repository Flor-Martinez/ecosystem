import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/NavBar';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <CTA />
      </main>

      <Footer />
    </>
  );
}