import Hero from "./components/Hero";
import Projects from "./components/Projects";
import { Blogs } from "./components/Blogs";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Hero/>
    <Projects/>
    <Blogs/>
    <Newsletter/>
    <Footer/>
    </>
  );
}
