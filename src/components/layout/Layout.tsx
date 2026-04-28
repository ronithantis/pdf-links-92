import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import ConsentModal from "@/components/ConsentModal";
import PresentationModal from "@/components/PresentationModal";

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
      <ConsentModal />
      <PresentationModal />
    </div>
  );
};

export default Layout;
