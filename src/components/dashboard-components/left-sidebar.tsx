"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import {
  AppWindow,
  Book,
  FileText,
  LayoutDashboard,
  MoonIcon,
  Settings,
  SunIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[250px]">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default LeftSidebar;

const DashboardSidebar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-xl font-bold">Suvo Roy</span>
        </Link>
      </div>

      <nav>
        <Link href="/dashboard">
          <Button variant={"ghost"} className="w-full justify-start">
            <LayoutDashboard className="w-6 h-5 mr-2" />
            Overview
          </Button>
        </Link>
        <Link href="/dashboard/blogs">
          <Button variant={"ghost"} className="w-full justify-start">
            <FileText className="w-6 h-5 mr-2" />
            Blogs
          </Button>
        </Link>
        <Link href="/dashboard/projects">
          <Button variant={"ghost"} className="w-full justify-start">
            <AppWindow className="w-6 h-5 mr-2" />
            Projects
          </Button>
        </Link>
        <Link href="/dashboard/educations">
          <Button variant={"ghost"} className="w-full justify-start">
            <Book className="w-6 h-5 mr-2" />
            Educations
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant={"ghost"} className="w-full justify-start">
            <Settings className="w-6 h-5 mr-2" />
            Settings
          </Button>
        </Link>
        <div className="flex flex-col gap-4">
          <Button
            onClick={toggleTheme}
            className="cursor-pointer dark:bg-background dark:hover:bg-slate-900 bg-background hover:bg-gray-100 justify-start"
          >
            {theme === "dark" ? (
              <>
                <SunIcon className="w-12 h-12 dark:text-amber-300 mr-2" />
                <span className="dark:text-white text-md">Light</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-12 h-12 text-slate-900 mr-2" />
                <span className="text-slate-900 text-md">Dark</span>
              </>
            )}
          </Button>
          <SignedIn>
            <SignOutButton>
              <Button variant="destructive" className="justify-start">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};
