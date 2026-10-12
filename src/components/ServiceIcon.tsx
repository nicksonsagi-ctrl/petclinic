import React from 'react';
import {
  Stethoscope,
  Syringe,
  Scissors,
  Sparkles,
  Activity,
  Apple,
  Microscope,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Stethoscope':
      return <Stethoscope className={className} />;
    case 'Syringe':
      return <Syringe className={className} />;
    case 'Scissors':
      return <Scissors className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Apple':
      return <Apple className={className} />;
    case 'Microscope':
      return <Microscope className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
};
