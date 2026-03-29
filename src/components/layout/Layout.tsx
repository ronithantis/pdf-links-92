import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import ConsentModal from "@/components/ConsentModal";

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
    </div>
  );
};

export default Layout;
