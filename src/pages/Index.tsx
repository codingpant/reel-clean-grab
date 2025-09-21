import { HeroSection } from "@/components/HeroSection";
import { HowToSection } from "@/components/HowToSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Instagram Reels Downloader",
            "description": "Download Instagram Reels in HD quality for free. Fast, secure, and works on all devices.",
            "url": "https://your-domain.com",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "HD Quality Downloads",
              "No Registration Required", 
              "Works on All Devices",
              "Lightning Fast Processing",
              "100% Safe & Secure"
            ]
          })
        }}
      />
      
      <div id="hero">
        <HeroSection />
      </div>
      <HowToSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
