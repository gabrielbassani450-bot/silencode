import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SILENCODE",
  description:
    "Presença Digital & Posicionamento Local. Transformamos empresas em referências regionais com sites premium, Google Maps e otimizações estratégicas.",
  url: "https://silencode.com.br/",
  logo: "https://silencode.com.br/og-image.png",
  image: "https://silencode.com.br/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: [
    "Presença Digital",
    "Posicionamento Local",
    "Sites Premium",
    "Google Maps",
    "SEO Local",
  ],
};
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { DifferentialsSection } from "@/components/DifferentialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StatsSection } from "@/components/StatsSection";
import { GrainOverlay, Marquee, GlowLine, DigitalPulseWave } from "@/components/BackgroundEffects";
import { ScrollVideoSection } from "@/components/ScrollVideoSection";
import { AuroraSection } from "@/components/AuroraSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { BlueprintMesh } from "@/components/BlueprintMesh";
import { DataFlowColumns } from "@/components/DataFlowColumns";
import { DigitalEcosystem } from "@/components/DigitalEcosystem";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  useEffect(() => {
    supabase.functions.invoke("pushcut-notify").catch(() => {});
  }, []);

  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("silencode_splash_shown");
  });
  const [splashDone, setSplashDone] = useState(() => {
    return !!sessionStorage.getItem("silencode_splash_shown");
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setSplashDone(true);
    sessionStorage.setItem("silencode_splash_shown", "1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-clip">
      <Helmet>
        <link rel="canonical" href="https://silencode.com.br/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {/* Navbar outside visibility gate so #navbar-logo can be measured during splash */}
      <Navbar hidden={showSplash} />
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          visibility: splashDone ? "visible" : "hidden",
          transition: "opacity 0.6s ease-out, visibility 0s linear " + (splashDone ? "0s" : "0.6s"),
        }}
      >
        <ParallaxBackground />
        <BlueprintMesh />
        <DataFlowColumns />
        <DigitalPulseWave />
        <GrainOverlay />
        <main>
          <HeroSection graphReady={splashDone} />
          <GlowLine />
          <StatsSection />
          <GlowLine />
          <Marquee />
          <AuroraSection />
          <GlowLine />
          <AboutSection />
          <GlowLine />
          <DigitalEcosystem />
          <GlowLine />
          <ServicesSection />
          <GlowLine />
          <Marquee />
          <ScrollVideoSection />
          <GlowLine />
          <DifferentialsSection />
          <GlowLine />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
