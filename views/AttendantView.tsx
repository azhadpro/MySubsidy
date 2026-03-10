import React, { useState } from 'react';
import { Button, Header, Card } from '../components/Components';
import { UserRole } from '../types';

interface Props {
  onLogout: () => void;
}

export const AttendantView: React.FC<Props> = ({ onLogout }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<'idle' | 'success' | 'fail'>('idle');
  const [scannedData, setScannedData] = useState<any>(null);

  // Simulate scanning process
  const startScan = () => {
    setScanning(true);
    setResult('idle');
    
    // Fake scan delay
    setTimeout(() => {
      setScanning(false);
      setResult('success');
      setScannedData({
        name: "Ahmad Bin Abdullah",
        ic: "890101-14-1234",
        tier: "B40",
        eligible: true,
        maxLiters: 45
      });
    }, 2000);
  };

  const handleApprove = () => {
      alert("Pump #4 Authorized for Subsidy Fuel");
      setResult('idle');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
       <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 z-10">
         <h1 className="font-bold text-lg">Station Terminal #04</h1>
         <button onClick={onLogout} className="text-xs text-gray-400 hover:text-white">Exit</button>
       </div>

       <div className="flex-1 p-6 flex flex-col items-center justify-center">
         
         {result === 'idle' && !scanning && (
           <div className="w-full max-w-sm text-center space-y-8">
             <div className="w-48 h-48 mx-auto border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-gray-800/50">
               <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             </div>
             
             <div>
               <h2 className="text-xl font-bold mb-2">Ready to Scan</h2>
               <p className="text-gray-400 text-sm">Align citizen's QR code within the frame to verify subsidy eligibility.</p>
             </div>

             <Button fullWidth onClick={startScan}>Activate Scanner</Button>
           </div>
         )}

         {scanning && (
           <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
             {/* Simulated Camera Feed */}
             <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <span className="text-xs tracking-widest text-gray-500 uppercase">Camera Active</span>
             </div>
             
             {/* Scan Line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-[scan_2s_linear_infinite]" />
             
             <div className="absolute bottom-6 left-0 w-full text-center">
               <span className="bg-black/50 px-3 py-1 rounded-full text-xs font-mono">Scanning...</span>
             </div>
           </div>
         )}

         {result === 'success' && scannedData && (
           <div className="w-full max-w-sm animate-in zoom-in duration-300">
              <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-green-600 p-4 text-white flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Eligible Citizen</h3>
                    <p className="text-xs text-green-100">Verified by MySubsidi</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Name</span>
                    <span className="font-semibold text-right">{scannedData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">MyKad (Last 4)</span>
                    <span className="font-mono font-semibold text-right">....{scannedData.ic.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Tier</span>
                    <span className="font-bold text-brand-blue text-right">{scannedData.tier}</span>
                  </div>
                   <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-medium">Approved Quota</span>
                    <span className="text-xl font-bold text-green-600">{scannedData.maxLiters}L</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 grid grid-cols-2 gap-3">
                   <Button variant="outline" onClick={() => setResult('idle')}>Cancel</Button>
                   <Button onClick={handleApprove}>Authorize Pump</Button>
                </div>
              </div>
           </div>
         )}
       </div>
    </div>
  );
};
