import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { SocialProof } from "@/components/home/SocialProof";
import { Skills } from "@/components/home/Skills";
import { Solutions } from "@/components/home/Solutions";
import { Tools } from "@/components/home/Tools";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Projects } from "@/components/projects/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="page-container">
        <Projects />
        <SocialProof />
        <Skills />
        <Tools />
        <Solutions />
        <About />
        <Process />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
