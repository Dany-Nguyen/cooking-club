import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-primary hover:bg-primary/80 text-primary-foreground',
      secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
      destructive: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
      outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
