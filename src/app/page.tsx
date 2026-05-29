"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { ProjectGalaxy } from "@/components/cards/ProjectGalaxy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const MascotDock = dynamic(
  () => import("@/components/mascot/MascotDock").then((m) => m.MascotDock),
  { ssr: false, loading: () => null },
);

export default function Home() {
  return (
    <main className="flex flex-col flex-1 relative">
      <Hero />
      <ProjectGalaxy />
      <Contact />
      <Footer />
      <MascotDock />
    </main>
  );
}
