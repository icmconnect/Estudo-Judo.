import React from 'react';
import { TheoryVideosGallery } from '../components/TheoryVideosGallery';
import { Navigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

export const TheoryVideosPage: React.FC = () => {
  const { isActive, isFree } = useSubscription();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#07090E] pt-6 sm:pt-10 px-4">
      <TheoryVideosGallery />
    </div>
  );
};
