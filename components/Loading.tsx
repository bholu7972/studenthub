// components/Loading.tsx
'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-[6px]',
  };

  return (
    <div className={cn('flex justify-center items-center w-full h-full', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-primary border-t-transparent',
          sizeClasses[size]
        )}
      ></div>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: 'card' | 'list' | 'form';
}

export function LoadingSkeleton({
  className,
  count = 1,
  variant = 'card',
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'list':
        return (
          <div className="space-y-3 p-4">
            <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
          </div>
        );
      case 'form':
        return (
          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
            </div>
            <div className="h-10 bg-primary/50 rounded w-1/3 ml-auto animate-pulse"></div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className="p-4 border border-border rounded-lg shadow glassmorphic">
            <div className="h-8 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}
