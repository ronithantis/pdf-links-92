import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import AdvisorSearchBar from "./AdvisorSearchBar";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import ConsentModal from "@/components/ConsentModal";
import PresentationModal from "@/components/PresentationModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  // Hide on home (which already has its own hero+advisor), on the advisor tab itself, and on auth
  const hideAdvisorBar = pathname === "/" || pathname.startsWith("/auth");
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <a href="#main-content" className="skip-to-content">דלג לתוכן הראשי</a>
      <Header />
      <Breadcrumbs />
      {!hideAdvisorBar && (
        <div className="border-b bg-muted/30">
          <div className="container py-2 flex justify-end">
            <AdvisorSearchBar variant="compact" />
          </div>
        </div>
      )}
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <Footer />
      <AccessibilityMenu />
      <ConsentModal />
      <PresentationModal />
    </div>
  );
};

export default Layout;
