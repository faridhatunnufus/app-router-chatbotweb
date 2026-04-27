import Layout from "@/components/Layout/Layout"; // Import Layout
import HeroSection from "@/components/HeroSection/HeroSection";
import JourneySection from "@/components/JourneySection/JourneySection";
import LocationSection from "@/components/LocationSection/LocationSection";
import MissionSection from "@/components/MissionSection/MissionSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import React from "react";
import Chatbot from "@/components/Chatbot/Chatbot";

const LandingPage = () => {
  return (
    <Layout>
      {/* Tidak perlu ada <main> lagi di sini */}
      <HeroSection />
      <div id="programkami">
        <JourneySection />
      </div>

      <LocationSection />
      <MissionSection />

      <div id="testimonial">
        <TestimonialsSection />
      </div>

      <Chatbot/>
    </Layout>
  );
};

export default LandingPage;
