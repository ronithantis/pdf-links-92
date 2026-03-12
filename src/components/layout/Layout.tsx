import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AccessibilityMenu />
    </div>
  );
};

export default Layout;
