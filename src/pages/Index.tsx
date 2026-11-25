import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesOverview from "@/components/landing/FeaturesOverview";
import DetailedFeatures from "@/components/landing/DetailedFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturesOverview />
    <DetailedFeatures />
    <HowItWorks />
    <DashboardPreview />
    <PricingSection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
