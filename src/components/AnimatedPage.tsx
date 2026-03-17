import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'fade-up';
}

const AnimatedPage = ({ children, className, animation = 'fade-in' }: AnimatedPageProps) => {
  return (
    <div className={cn(
      'min-h-screen w-full transition-all duration-300',
      `animate-${animation}`,
      className
    )}>
      {children}
    </div>
  );
};

export default AnimatedPage;