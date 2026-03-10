import React from 'react';
import { User } from '../types';
import { Button, Card, Header } from '../components/Components';

interface Props {
  user: User;
  onShowQR: () => void;
  onLogout: () => void;
}

export const CitizenDashboard: React.FC<Props> = ({ user, onShowQR, onLogout }) => {
  const percentageUsed = (user.currentUsage / user.monthlyQuota) * 100;
  
  return (
    <div className="min-h-screen bg-brand-light flex flex-col pb-20">
      <Header title="MySubsidi" showProfile />
      
      <div className="p-6 max-w-md mx-auto w-full space-y-6">
        
        {/* User Status Card */}
        <Card className="bg-gradient-to-br from-brand-blue to-blue-900 text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
                <h2 className="text-2xl font-bold">{user.name}</h2>
              </div>
              <div className="px-2 py-1 bg-white/20 rounded text-xs font-semibold backdrop-blur-sm border border-white/20">
                {user.subsidyTier}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-100">Monthly Quota</span>
                <span className="font-mono font-bold">{user.currentUsage}L / {user.monthlyQuota}L</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-3 backdrop-blur-sm border border-white/10 overflow-hidden">
                <div 
                  className="bg-brand-yellow h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${percentageUsed}%` }}
                />
              </div>
              <p className="text-xs text-blue-300 text-right mt-1">Resets in 12 days</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Fuel Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onShowQR}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-4H8m13-4V7a1 1 0 00-1-1H4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">Claim Fuel</span>
            </button>
            <button className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">History</span>
            </button>
          </div>
        </div>

        {/* Information Section */}
        <Card className="space-y-4">
           <div className="flex items-start gap-3">
             <div className="p-2 bg-brand-yellow/10 rounded-lg shrink-0">
               <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
               <h4 className="font-semibold text-gray-800 text-sm">Fuel Price Update</h4>
               <p className="text-xs text-gray-500 mt-1">RON95 is currently RM2.05/L for eligible citizens. Unsubsidized price is RM3.45/L.</p>
             </div>
           </div>
        </Card>

        <Button variant="outline" className="mt-8 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300" fullWidth onClick={onLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
