"use client";
import ConnectAndGrowComponent from "@/components/Connect";
import EventsPage from "@/components/EventsPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewFeatureSection from "@/components/NewFeatureSection";

export default function Home() {
  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <ConnectAndGrowComponent />
      <NewFeatureSection />
      <EventsPage />
      <Footer />
    </div>
  );
}
