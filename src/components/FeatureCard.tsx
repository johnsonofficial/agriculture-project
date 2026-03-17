
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  onClick
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "feature-card group cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 text-primary transition-transform duration-300 group-hover:scale-110",
        iconClassName
      )}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
