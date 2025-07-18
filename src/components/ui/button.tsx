import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'glass' | 'neo' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-md font-medium 
      transition-all duration-300 ease-smooth
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
      disabled:opacity-50 disabled:pointer-events-none 
      ring-offset-background relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
      before:opacity-0 before:transition-opacity before:duration-300
    `;
    
    const variants = {
      default: `
        bg-primary text-primary-foreground 
        hover:bg-primary/90 hover:transform hover:scale-105
        active:scale-95
        before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        hover:before:opacity-100
      `,
      outline: `
        border-2 border-input bg-transparent
        hover:bg-accent hover:text-accent-foreground hover:border-accent
        active:scale-95
      `,
      ghost: `
        hover:bg-accent hover:text-accent-foreground
        active:scale-95
      `,
      glass: `
        glass text-foreground
        hover:transform hover:scale-105
        active:scale-95
        before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
        hover:before:opacity-100
      `,
      neo: `
        neo-button text-foreground
        hover:transform hover:translate-y-[-2px]
        active:transform active:translate-y-0
      `,
      gradient: `
        gradient-text font-bold
        bg-gradient-to-r from-primary via-secondary to-accent
        hover:transform hover:scale-105
        active:scale-95
        before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
        hover:before:opacity-100
      `,
      glow: `
        bg-primary text-primary-foreground
        hover:shadow-glow hover:transform hover:scale-105
        active:scale-95
        animation-glow
      `
    };

    const sizes = {
      sm: "h-9 px-3 text-sm gap-1",
      md: "h-10 px-4 py-2 gap-2",
      lg: "h-11 px-8 text-lg gap-3"
    };

    // Add CSS custom properties for advanced animations
    const style = {
      '--button-hover-scale': variant === 'neo' ? '1' : '1.05',
      '--button-active-scale': '0.95',
      ...props.style
    } as React.CSSProperties;

    if (asChild) {
      return (
        <span 
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          style={style}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        style={style}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'glow' && (
          <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary via-secondary to-accent opacity-0 blur-xl transition-opacity duration-300 hover:opacity-50" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Modern Button Group Component with Container Queries
const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex gap-1 p-1 bg-background/50 backdrop-blur-sm rounded-lg",
      "border border-foreground/10",
      "[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
      "[&>*:not(:first-child):not(:last-child)]:rounded-none",
      className
    )}
    style={{ containerType: 'inline-size' }}
    {...props}
  >
    {children}
  </div>
));

ButtonGroup.displayName = "ButtonGroup";

// Icon Button with Advanced Hover Effects
const IconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { icon: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      "group relative",
      "[&_.icon]:transition-transform [&_.icon]:duration-300",
      "hover:[&_.icon]:rotate-12 hover:[&_.icon]:scale-110",
      className
    )}
    {...props}
  >
    <span className="icon">{icon}</span>
    {children && <span>{children}</span>}
  </Button>
));

IconButton.displayName = "IconButton";

export { Button, ButtonGroup, IconButton };