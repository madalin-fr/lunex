import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'gradient' | 'glass' | 'glow' | 'neo' | 'status';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'square' | 'pill';
  icon?: React.ReactNode;
  animated?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ 
  className, 
  variant = 'default', 
  size = 'md', 
  shape = 'rounded', 
  icon, 
  animated = false,
  children,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center px-2.5 py-0.5 text-xs font-semibold 
    transition-all duration-300 relative overflow-hidden
    before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
    before:opacity-0 before:transition-opacity before:duration-300
  `;
  
  const variants = {
    default: `
      border-transparent bg-primary text-primary-foreground 
      hover:bg-primary/80 hover:scale-105
      before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      hover:before:opacity-100
    `,
    secondary: `
      border-transparent bg-secondary text-secondary-foreground 
      hover:bg-secondary/80 hover:scale-105
    `,
    destructive: `
      border-transparent bg-destructive text-destructive-foreground 
      hover:bg-destructive/80 hover:scale-105
      animate-pulse-subtle
    `,
    outline: `
      text-foreground border border-current
      hover:bg-accent hover:scale-105
    `,
    gradient: `
      border-transparent gradient-text font-bold
      bg-gradient-to-r from-primary via-secondary to-accent
      hover:scale-105
      before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
      hover:before:opacity-100
    `,
    glass: `
      glass text-foreground
      hover:scale-105
      hover:shadow-sm
    `,
    glow: `
      border-transparent bg-primary text-primary-foreground
      shadow-glow animate-glow-pulse
      hover:scale-105
    `,
    neo: `
      neo-button text-foreground text-xs
      hover:translate-y-[-1px]
    `,
    status: `
      bg-gray-500 text-white
    `
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };
  
  const shapes = {
    rounded: "rounded-full",
    square: "rounded-md",
    pill: "rounded-full px-4",
  };
  
  return (
    <div 
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        shapes[shape],
        animated && "animate-float",
        className
      )} 
      {...props}
    >
      {icon && (
        <span className="mr-1.5 -ml-0.5 animate-spin-slow">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </div>
  )
});
Badge.displayName = "Badge";

// Badge Group Component
const BadgeGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex flex-wrap gap-2",
      "container-type-inline",
      "@container-sm:gap-3",
      className
    )}
    style={{ containerType: 'inline-size' }}
    {...props}
  >
    {children}
  </div>
));
BadgeGroup.displayName = "BadgeGroup";

// Animated Badge with Number
const CountBadge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & { count: number; max?: number }
>(({ count, max = 99, className, ...props }, ref) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge
      ref={ref}
      className={cn(
        "min-w-[2rem] justify-center",
        "transition-all duration-300",
        count > 0 && "scale-100 opacity-100",
        count === 0 && "scale-0 opacity-0",
        className
      )}
      {...props}
    >
      <span className="tabular-nums">{displayCount}</span>
    </Badge>
  );
});
CountBadge.displayName = "CountBadge";

// Icon Badge
const IconBadge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & { icon: React.ReactNode }
>(({ icon, className, children, ...props }, ref) => (
  <Badge
    ref={ref}
    className={cn(
      "group",
      "[&>svg]:w-3 [&>svg]:h-3",
      "[&>svg]:transition-transform [&>svg]:duration-300",
      "hover:[&>svg]:scale-110",
      className
    )}
    icon={icon}
    {...props}
  >
    {children}
  </Badge>
));
IconBadge.displayName = "IconBadge";

// Status Indicator Badge
const StatusBadge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & { 
    status: 'online' | 'offline' | 'busy' | 'away';
    pulse?: boolean;
  }
>(({ status, pulse = true, className, children, ...props }, ref) => {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-orange-500",
    away: "bg-yellow-500"
  };

  return (
    <Badge
      ref={ref}
      className={cn(
        "relative pl-6",
        className
      )}
      {...props}
    >
      <span 
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
          statusColors[status],
          pulse && status === 'online' && "animate-pulse"
        )}
      >
        {pulse && status === 'online' && (
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
        )}
      </span>
      {children || status}
    </Badge>
  );
});
StatusBadge.displayName = "StatusBadge";

// Add custom animations to globals.css
const customStyles = `
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 10px var(--color-primary), 0 0 20px var(--color-primary);
  }
  50% {
    box-shadow: 0 0 20px var(--color-primary), 0 0 30px var(--color-primary);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}
`;

export { 
  Badge,
  BadgeGroup,
  CountBadge,
  IconBadge,
  StatusBadge,
  customStyles 
}