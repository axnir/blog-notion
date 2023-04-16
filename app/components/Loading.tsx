'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '../static/lottie/loading-dots.json';

export default function Loading({ className }: { className?: string }) {
  return (
    <Lottie
      className={className}
      animationData={loadingAnimation}
      loop={true}
    />
  );
}
