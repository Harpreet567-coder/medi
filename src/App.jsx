import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HospitalProvider } from "./context/HospitalContext";
import { LandingPage } from "./pages/LandingPage";
import { DashboardManager } from "./pages/DashboardManager";
import { AuthModal } from "./components/common/AuthModal";
import { LegalModal } from "./components/common/LegalModal";
import { ToastContainer } from "./components/common/ToastContainer";

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState("landing");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState("login");
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState("terms");

  const handleOpenAuth = (tab = "login") => {
    if (isAuthenticated) {
      setView("dashboard");
    } else {
      setAuthDefaultTab(tab);
      setAuthModalOpen(true);
    }
  };

  const handleOpenLegal = (type = "terms") => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setView("dashboard");
  };

  return (
    <>
      {view === "dashboard" && isAuthenticated ? (
        <DashboardManager onReturnLanding={() => setView("landing")} />
      ) : (
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onOpenLegal={handleOpenLegal}
        />
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authDefaultTab}
        onLoginSuccess={handleLoginSuccess}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalType}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HospitalProvider>
          <MainApp />
        </HospitalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
