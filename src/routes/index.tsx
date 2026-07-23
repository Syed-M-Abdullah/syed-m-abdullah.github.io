import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CountryTicker, TrustTicker } from "@/components/trust-ticker";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { CaseStudies } from "@/components/case-studies";
import { GlobalReach, Industries } from "@/components/global-industries";
import { TechStack } from "@/components/tech-stack";
import { Experience, WhyMe } from "@/components/experience";
import { CTA, Contact } from "@/components/cta-contact";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="bg-background">
      <Nav />
      <main>
        <Hero />
        <CountryTicker />
        <TrustTicker />
        <Services />
        <Process />
        <CaseStudies />
        <GlobalReach />
        <Industries />
        <TechStack />
        <Experience />
        <WhyMe />
        <CTA />
        <Booking />
        <Contact />

      </main>
      <Footer />
    </div>
  );
}
