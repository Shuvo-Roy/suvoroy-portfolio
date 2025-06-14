import Hero from "../components/home/Hero";
import Projects from "../components/home/Projects";
import { Blogs } from "../components/home/Blogs";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";

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
