
import React from "react";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingTier from "@/components/pricing/PricingTier";
import PricingHeader from "@/components/pricing/PricingHeader";
import CustomSolutionCard from "@/components/pricing/CustomSolutionCard";
import TrustedOrganizations from "@/components/pricing/TrustedOrganizations";
import { pricingPlans } from "@/data/pricingPlans";

const Pricing = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Background gradient overlay with reduced intensity */}
      <div className={`fixed inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-brand-primary/5 via-transparent to-background/60'
          : 'bg-gradient-to-br from-brand-primary/3 via-transparent to-background/30'
      }`}></div>
      
      {/* Background grid pattern with reduced opacity */}
      <div className={`fixed inset-0 mercor-grid ${
        isDarkMode ? 'opacity-5' : 'opacity-20'
      }`}></div>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-16">
        <div className="container mx-auto">
          <PricingHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingTier
                key={plan.title}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                buttonVariant={plan.buttonVariant}
                buttonText={plan.buttonText}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
          
          <CustomSolutionCard />
          <TrustedOrganizations />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
