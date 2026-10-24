import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { Services } from "@/components/sections/Services";
import { Stories } from "@/components/sections/Stories";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <FeaturedWork />
      <Stories />
      <Services />
      <Testimonials />
      <InstagramStrip />
      <Contact />
    </>
  );
}
