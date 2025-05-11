
import React from 'react';
import GeometricShapes from './GeometricShapes';
import VerticalLines from './VerticalLines';
import LightFlares from './LightFlares';
import ParticleEffect from './ParticleEffect';
import TechElements from './TechElements';
import { useIsMobile } from "@/hooks/use-mobile";

interface BackgroundEffectsProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkMode, intensity }) => {
  const isMobile = useIsMobile();
  
  // Further reduce the number of effects to improve performance
  const shouldRenderAll = !isMobile && intensity === 'extreme';
  const shouldRenderMedium = !isMobile && intensity !== 'light';
  
  // For light intensity or mobile, only render minimal effects
  const isMinimal = isMobile || intensity === 'light';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Render basic shapes with reduced density on all devices */}
      <GeometricShapes isDarkMode={isDarkMode} intensity={isMinimal ? 'light' : intensity} />
      
      {/* Render lines only on medium+ intensity and desktop */}
      {shouldRenderMedium && (
        <VerticalLines isDarkMode={isDarkMode} intensity={intensity} />
      )}
      
      {/* Light flares with reduced intensity */}
      <LightFlares isDarkMode={isDarkMode} intensity={isMinimal ? 'light' : intensity} />
      
      {/* Only render particles on desktop for heavy/extreme */}
      {(intensity === 'heavy' || intensity === 'extreme') && !isMobile && (
        <ParticleEffect isDarkMode={isDarkMode} intensity={intensity} />
      )}
      
      {/* Tech elements only on desktop for extreme intensity */}
      {shouldRenderAll && (
        <TechElements isDarkMode={isDarkMode} intensity={intensity} />
      )}
    </div>
  );
};

export default BackgroundEffects;
