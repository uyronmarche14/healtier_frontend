import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NewFeatureBadgeProps {
  feature: 'fitness' | 'mental' | 'nutrition' | 'general';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  className?: string;
  showPulse?: boolean;
  text?: string;
}

const badgeVariants = {
  fitness: {
    default: 'bg-green-500 text-white hover:bg-green-600',
    destructive: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border-green-500 text-green-700 hover:bg-green-50',
    secondary: 'bg-green-100 text-green-800 hover:bg-green-200'
  },
  mental: {
    default: 'bg-purple-500 text-white hover:bg-purple-600',
    destructive: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border-purple-500 text-purple-700 hover:bg-purple-50',
    secondary: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
  },
  nutrition: {
    default: 'bg-orange-500 text-white hover:bg-orange-600',
    destructive: 'bg-orange-600 text-white hover:bg-orange-700',
    outline: 'border-orange-500 text-orange-700 hover:bg-orange-50',
    secondary: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  },
  general: {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    destructive: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-blue-500 text-blue-700 hover:bg-blue-50',
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  }
};

const sizeClasses = {
  sm: 'h-4 px-1 text-xs',
  md: 'h-5 px-2 text-sm',
  lg: 'h-6 px-3 text-base'
};

export function NewFeatureBadge({ 
  feature, 
  size = 'md', 
  variant = 'default',
  className,
  showPulse = true,
  text = 'NEW'
}: NewFeatureBadgeProps) {
  return (
    <Badge 
      className={cn(
        'font-bold uppercase tracking-wider',
        badgeVariants[feature][variant],
        sizeClasses[size],
        showPulse && 'animate-pulse',
        className
      )}
    >
      {text}
    </Badge>
  );
}

interface FeatureAnnouncementProps {
  features: Array<{
    id: string;
    name: string;
    description: string;
    feature: 'fitness' | 'mental' | 'nutrition' | 'general';
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  onDismiss: () => void;
  className?: string;
}

export function FeatureAnnouncement({ 
  features, 
  onDismiss, 
  className 
}: FeatureAnnouncementProps) {
  return (
    <div className={cn(
      'fixed bottom-4 right-4 w-96 bg-background border rounded-lg shadow-lg p-4 z-50',
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">🎉 New Features Available!</h3>
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{feature.name}</h4>
                  <NewFeatureBadge 
                    feature={feature.feature} 
                    size="sm" 
                    showPulse={false}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onDismiss}
        className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        Got it!
      </button>
    </div>
  );
}

interface FeatureHighlightProps {
  children: React.ReactNode;
  feature: 'fitness' | 'mental' | 'nutrition' | 'general';
  className?: string;
}

export function FeatureHighlight({ 
  children, 
  feature, 
  className 
}: FeatureHighlightProps) {
  const gradients = {
    fitness: 'from-green-50 to-emerald-50 border-green-200',
    mental: 'from-purple-50 to-violet-50 border-purple-200',
    nutrition: 'from-orange-50 to-red-50 border-orange-200',
    general: 'from-blue-50 to-cyan-50 border-blue-200'
  };

  return (
    <div className={cn(
      'relative p-4 rounded-lg border bg-gradient-to-r',
      gradients[feature],
      className
    )}>
      <div className="absolute top-2 right-2">
        <NewFeatureBadge feature={feature} size="sm" />
      </div>
      {children}
    </div>
  );
}