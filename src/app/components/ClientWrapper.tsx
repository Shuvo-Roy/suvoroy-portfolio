"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const hiddenRoutes = ["/dashboard"];

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar if path starts with any of the hidden routes
  const showNavbar = !hiddenRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
