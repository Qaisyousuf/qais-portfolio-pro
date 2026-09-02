import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
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
        <Skills />
        <Tools />
        <Solutions />
        <About />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
