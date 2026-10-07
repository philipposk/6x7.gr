import { Hero } from "@/components/Hero";
import { ProjectGalaxy } from "@/components/cards/ProjectGalaxy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 relative">
      <Hero />
      <ProjectGalaxy />
      <Contact />
      <Footer />
    </main>
  );
}
