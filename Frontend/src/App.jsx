import { useState } from "react";
import LoginPage from "./components/LoginPage";
import RoleSelection from "./components/RoleSelection";
import SellerOnboarding from "./components/SellerOnboarding";
import BuyerOnboarding from "./components/BuyerOnboarding";
import Header from "./components/Header";
import BuyerExperience from "./components/BuyerExperience";
import SellerExperience from "./components/SellerExperience";
import LandingPage from "./components/LandingPage";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showLanding, setShowLanding] = useState(false); // Set showLanding to false so users see login page directly
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = (name) => {
    setUser(name);
    setShowLanding(false);
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setShowRoleSelection(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (profileData) => {
    setUserProfile(profileData);
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setUserProfile(null);
    setShowLanding(true);
    setShowRoleSelection(false);
    setShowOnboarding(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showRoleSelection) {
    return <RoleSelection userName={user} onRoleSelect={handleRoleSelect} />;
  }

  if (showOnboarding) {
    return userRole === "seller" ? (
      <SellerOnboarding userName={user} onComplete={handleOnboardingComplete} />
    ) : (
      <BuyerOnboarding userName={user} onComplete={handleOnboardingComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName={user}
        userRole={userRole}
        onLogout={handleLogout}
        cartCount={2}
        notificationCount={3}
      />
      <main className="container mx-auto px-4 py-8">
        {userRole === "buyer" ? (
          <BuyerExperience />
        ) : (
          <SellerExperience sellerName={user} />
        )}
      </main>
    </div>
  );
}

export default App;
