import React from 'react';
import { Button } from '../components/Components';
import { UserRole } from '../types';

interface LandingProps {
  onSelectRole: (role: UserRole) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-yellow/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="z-10 w-full max-w-md flex flex-col items-center text-center space-y-8">
        <div className="mb-4">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
             <svg className="w-10 h-10 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">MySubsidi</h1>
          <p className="text-blue-100">Malaysia's National Fuel Subsidy</p>
        </div>

        <div className="w-full space-y-4">
          <Button variant="secondary" fullWidth onClick={() => onSelectRole(UserRole.CITIZEN)}>
            Login as Citizen
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" fullWidth onClick={() => onSelectRole(UserRole.ATTENDANT)}>
            Station Attendant
          </Button>
        </div>

        <p className="text-xs text-white/40 mt-12">
          © 2025 Government of Malaysia. All rights reserved.
        </p>
      </div>
    </div>
  );
};
