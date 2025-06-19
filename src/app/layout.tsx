
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ClientWrapper from "../components/home/ClientWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Suvo Roy",
  description: "Skilled web developer with expertise in HTML, CSS, and JavaScript, crafting seamless, user-friendly interfaces. Experienced in modern web technologies like Node.js, Express.js, and MongoDB. Passionate about building innovative solutions and eager to contribute my skills, enthusiasm, and dedication to your organization's success.",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className="antialiased bg-white transition-colors dark:bg-slate-900 dark:text-white"
      >
        <ThemeProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
