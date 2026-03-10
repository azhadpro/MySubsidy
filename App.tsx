import React, { useState } from 'react';
import { User, UserRole, AppScreen } from './types';
import { Landing } from './views/Landing';
import { CitizenOnboarding } from './views/CitizenOnboarding';
import { CitizenDashboard } from './views/CitizenDashboard';
import { QRScreen } from './views/QRScreen';
import { AttendantView } from './views/AttendantView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    if (role === UserRole.CITIZEN) {
      setCurrentScreen(AppScreen.ONBOARDING_INPUT);
    } else if (role === UserRole.ATTENDANT) {
      setCurrentScreen(AppScreen.ATTENDANT_SCANNER);
    }
  };

  const handleOnboardingComplete = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen(AppScreen.LANDING);
  };

  return (
    <div className="antialiased font-sans text-gray-900 bg-gray-100 min-h-screen flex justify-center">
       {/* Mobile Container wrapper to simulate phone on desktop */}
      <div className="w-full max-w-lg bg-white min-h-screen shadow-2xl relative overflow-hidden">
        
        {currentScreen === AppScreen.LANDING && (
          <Landing onSelectRole={handleRoleSelect} />
        )}

        {currentScreen === AppScreen.ONBOARDING_INPUT && (
          <CitizenOnboarding 
            onComplete={handleOnboardingComplete} 
            onBack={() => setCurrentScreen(AppScreen.LANDING)}
          />
        )}

        {currentScreen === AppScreen.DASHBOARD && currentUser && (
          <CitizenDashboard 
            user={currentUser} 
            onShowQR={() => setCurrentScreen(AppScreen.QR_CODE)}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === AppScreen.QR_CODE && currentUser && (
          <QRScreen 
            user={currentUser}
            onClose={() => setCurrentScreen(AppScreen.DASHBOARD)}
          />
        )}

        {currentScreen === AppScreen.ATTENDANT_SCANNER && (
          <AttendantView onLogout={handleLogout} />
        )}

      </div>
    </div>
  );
}
