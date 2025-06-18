"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignOutButton,
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
import DashboardSidebar from "./DashboardSidebar";

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