"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const hiddenRoutes = ["/dashboard"];

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar if path starts with any of the hidden routes
  const showNavbar = !hiddenRoutes.some(route => pathname.startsWith(route));
  const showFooter = !hiddenRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showNavbar && <Footer />}
    </>
  );
}
