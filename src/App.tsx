import { useState, useEffect } from "react";
import { Layout } from "./index";
import { HomePage, ComponentsPage } from "./pages";
import Dashboard from "./components/pages/Dashboard";
import type { SimpleTopNavItem } from "./components/atoms/SimpleTopNav/SimpleTopNav";

function AppContent() {
  // Simple routing state
  const [currentPage, setCurrentPage] = useState("home");

  // Effect to reset theme to PulseUI Base when on home page
  useEffect(() => {
    if (currentPage === "home") {
      // Reset to default brand (PulseUI Base)
      const root = document.documentElement;
      root.setAttribute("data-brand", "default");
      localStorage.setItem("pulseui-brand", "default");

      // Keep the current theme (light/dark) but ensure it's applied
      const currentTheme = localStorage.getItem("pulseui-theme") || "light";
      root.setAttribute("data-theme", currentTheme);
      root.setAttribute("data-mode", currentTheme);
    }
  }, [currentPage]);

  // Navigation items with routing functionality
  const navItems: SimpleTopNavItem[] = [
    {
      id: "home",
      label: "Home",
      active: currentPage === "home",
      onClick: () => setCurrentPage("home"),
    },
    {
      id: "components",
      label: "Components",
      active: currentPage === "components",
      onClick: () => setCurrentPage("components"),
    },
    {
      id: "docs",
      label: "Multibrand Demo",
      active: currentPage === "docs",
      onClick: () => setCurrentPage("docs"),
    },
    {
      id: "contact",
      label: "Contact",
      active: currentPage === "contact",
      onClick: () => setCurrentPage("contact"),
    },
  ];

  // Function to render current page content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "components":
        return <ComponentsPage />;
      case "docs":
        return (
          <div style={{ padding: "32px 16px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h1>Multibrand Demo</h1>
              <p>Explore different brand layouts and configurations</p>
            </div>

            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border-secondary)",
                borderRadius: "var(--radius-lg)",
                padding: "32px",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                style={{
                  marginBottom: "32px",
                  backgroundColor: "var(--color-surface-secondary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-primary)",
                  overflow: "hidden",
                  height: "900px",
                }}
              >
                <div
                  style={{
                    padding: "16px 24px",
                    backgroundColor: "var(--color-surface-tertiary)",
                    borderBottom: "1px solid var(--color-border-primary)",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "var(--color-text-primary)",
                      fontSize: "16px",
                      fontWeight: "var(--font-weight-semibold)",
                    }}
                  >
                    Dashboard Preview
                  </h3>
                </div>
                <div
                  style={{ height: "calc(100% - 60px)", overflow: "visible" }}
                >
                  <Dashboard />
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div style={{ textAlign: "center", padding: "64px 16px" }}>
            <h1>Contact</h1>
            <p>Contact page coming soon...</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout
      navItems={navItems}
      topNavConfig={{
        useDynamicBrandLogo: true,
        brandLogoSize: "md",
        showBrandText: false,
        brandName: "PulseUI",
        brandTitle: "Component Library",
        onLogoClick: () => setCurrentPage("home"),
        versionSelector: {
          version: "1.6.0",
          versions: ["1.5.0", "1.6.0", "1.7.0"],
          onVersionChange: () => {},
          show: true,
        },
        brandSwitcher: {
          show: currentPage === "components",
          size: "sm",
          showDescription: false,
        },
        showThemeSwitcher: true,
      }}
      applyContentPadding={true}
      minFullHeight={true}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

function App() {
  return <AppContent />;
}

export default App;
