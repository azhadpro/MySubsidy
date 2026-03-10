export enum UserRole {
  CITIZEN = 'CITIZEN',
  ATTENDANT = 'ATTENDANT',
  GUEST = 'GUEST'
}

export interface User {
  icNumber: string;
  name: string;
  role: UserRole;
  subsidyTier?: 'B40' | 'M40' | 'T20';
  monthlyQuota: number; // in Liters
  currentUsage: number;
}

export interface SubsidyStatus {
  eligible: boolean;
  reason: string;
  tier: string;
  suggestedQuota: number;
}

export enum AppScreen {
  LANDING = 'LANDING',
  ONBOARDING_INPUT = 'ONBOARDING_INPUT',
  ONBOARDING_VERIFY = 'ONBOARDING_VERIFY',
  DASHBOARD = 'DASHBOARD',
  QR_CODE = 'QR_CODE',
  ATTENDANT_SCANNER = 'ATTENDANT_SCANNER',
  ATTENDANT_RESULT = 'ATTENDANT_RESULT'
}
