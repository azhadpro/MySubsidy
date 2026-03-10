import React, { useState, useRef } from 'react';
import { Button, Input, Card, Header } from '../components/Components';
import { checkEligibility, extractMyKadDetails } from '../services/geminiService';
import { User, UserRole } from '../types';

interface Props {
  onComplete: (user: User) => void;
  onBack: () => void;
}

export const CitizenOnboarding: React.FC<Props> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Scan, 2: Confirm
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Data State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<{ icNumber: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        processImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64Image: string) => {
    setLoading(true);
    setLoadingText('Scanning MyKad...');
    try {
      const details = await extractMyKadDetails(base64Image);
      if (details.icNumber) {
        setExtractedData(details);
        setStep(2);
      } else {
        alert("Could not detect a valid MyKad. Please try again with better lighting.");
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);
      alert("Error scanning card. Please try manually or retake photo.");
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerify = async () => {
    if (!extractedData?.icNumber) return;
    
    setLoading(true);
    setLoadingText('Verifying with PADU...');
    try {
      const result = await checkEligibility(extractedData.icNumber);
      
      const newUser: User = {
        icNumber: extractedData.icNumber,
        name: extractedData.name || "Citizen",
        role: UserRole.CITIZEN,
        subsidyTier: result.tier as any,
        monthlyQuota: result.quota,
        currentUsage: 0
      };

      onComplete(newUser);
    } catch (e) {
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setImagePreview(null);
    setExtractedData(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      <Header title="MyKad Verification" onBack={onBack} />
      
      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col">
        
        {/* Step 1: Scan Interface */}
        {step === 1 && (
          <div className="flex-1 flex flex-col space-y-6 fade-in">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Scan MyKad</h2>
              <p className="text-gray-500 text-sm mt-2">
                Position your MyKad within the frame to automatically extract your details.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              {/* Card Frame */}
              <div 
                className="relative w-full aspect-[1.58/1] bg-gray-200 rounded-2xl border-2 border-dashed border-gray-400 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => !loading && fileInputRef.current?.click()}
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-3 animate-pulse">
                    <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
                    <span className="text-brand-blue font-medium text-sm">{loadingText}</span>
                  </div>
                ) : imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="text-gray-500 font-medium">Tap to Scan Card</span>
                  </>
                )}

                {/* Corner Markers */}
                {!imagePreview && !loading && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-brand-blue rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-brand-blue rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-brand-blue rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-brand-blue rounded-br-lg" />
                  </>
                )}
              </div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3 text-sm">
              <svg className="w-5 h-5 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-yellow-800">Ensure your MyKad is well-lit and the text is clearly readable.</p>
            </div>
          </div>
        )}

        {/* Step 2: Confirm Details */}
        {step === 2 && extractedData && (
           <div className="flex-1 flex flex-col space-y-6 fade-in">
             <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Confirm Details</h2>
              <p className="text-gray-500 text-sm mt-2">
                We extracted the following information from your card.
              </p>
            </div>

            <Card className="space-y-4">
              <div className="flex justify-center mb-4">
                 <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative">
                    <img src={imagePreview!} alt="Scan" className="w-full h-full object-cover opacity-75" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-black/50 p-2 rounded-full text-white">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                       </div>
                    </div>
                 </div>
              </div>
              
              <Input 
                label="Full Name" 
                value={extractedData.name} 
                onChange={(e) => setExtractedData({...extractedData, name: e.target.value})}
              />
              <Input 
                label="MyKad Number" 
                value={extractedData.icNumber} 
                onChange={(e) => setExtractedData({...extractedData, icNumber: e.target.value})}
              />
            </Card>

            <div className="space-y-3 pt-4">
              <Button 
                fullWidth 
                onClick={handleVerify} 
                isLoading={loading}
              >
                {loading ? loadingText : "Verify Eligibility"}
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={handleRetake}
                disabled={loading}
              >
                Retake Photo
              </Button>
            </div>
           </div>
        )}

      </div>
    </div>
  );
};