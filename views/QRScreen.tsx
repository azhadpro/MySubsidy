import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Components';

interface Props {
  user: User;
  onClose: () => void;
}

export const QRScreen: React.FC<Props> = ({ user, onClose }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    // Increase screen brightness logic would go here in a native app
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate a realistic looking QR URL based on user data
  // Using a public API for QR generation for the prototype
  const qrData = JSON.stringify({ ic: user.icNumber, tier: user.subsidyTier, timestamp: Date.now() });
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=0E2F56`;

  return (
    <div className="fixed inset-0 bg-brand-blue z-50 flex flex-col items-center justify-between p-6">
      <div className="w-full flex justify-end">
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-1">Scan at Pump</h2>
          <p className="text-blue-200 text-sm">Show this QR code to the reader or attendant</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full aspect-square flex items-center justify-center relative overflow-hidden">
           {/* Moving bar to simulate "Secure" state */}
           <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow animate-[loading_2s_ease-in-out_infinite]" />
           
           <img src={qrUrl} alt="Subsidy QR" className="w-full h-full object-contain mix-blend-multiply" />
           
           <div className="absolute bottom-3 text-[10px] text-gray-400 font-mono tracking-widest">
             {user.icNumber.slice(0,6)} •••• {user.icNumber.slice(-4)}
           </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-full flex items-center justify-between border border-white/10">
          <div className="flex flex-col">
             <span className="text-xs text-blue-200 uppercase font-semibold">Remaining Quota</span>
             <span className="text-xl font-bold text-white font-mono">{user.monthlyQuota - user.currentUsage}L</span>
          </div>
          <div className="h-8 w-px bg-white/20 mx-4" />
          <div className="flex flex-col items-end">
             <span className="text-xs text-blue-200 uppercase font-semibold">Refresh in</span>
             <span className="text-xl font-bold text-brand-yellow font-mono">{timer}s</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <p className="text-xs text-center text-white/40 mb-4">
          This QR code is valid for one-time use only. Do not share screenshots.
        </p>
      </div>
    </div>
  );
};
