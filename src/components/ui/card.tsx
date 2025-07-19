import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'gradient' | 'neo' | 'hover-3d'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm",
    glass: "glass rounded-xl text-foreground",
    gradient: "rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border border-white/20",
    neo: "neo-button rounded-xl",
    'hover-3d': "rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl transform-style-3d perspective-1000"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        "container-type-inline",
        variants[variant],
        variant === 'hover-3d' && "hover:rotate-y-5 hover:rotate-x-5",
        className
      )}
      style={{
        containerType: 'inline-size',
        transformStyle: variant === 'hover-3d' ? 'preserve-3d' : undefined,
        perspective: variant === 'hover-3d' ? '1000px' : undefined
      }}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6",
      "@container-sm:p-8 @container-md:p-10",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      "@container-sm:text-3xl @container-md:text-4xl",
      "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-500",
      "@container-sm:text-base",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "p-6 pt-0",
      "@container-sm:p-8 @container-sm:pt-0",
      "@container-md:p-10 @container-md:pt-0",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      "@container-sm:p-8 @container-sm:pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Advanced Interactive Card Component
const InteractiveCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowColor?: string;
    parallax?: boolean;
  }
>(({ className, glowColor = 'var(--color-primary)', parallax = false, children, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = React.useMemo(() => {
    if (!ref) return cardRef;
    if (typeof ref === 'function') {
      return (node: HTMLDivElement | null) => {
        ref(node);
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      };
    }
    return cardRef;
  }, [ref]);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const card = cardRef.current;
    if (!card || !parallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0.5, y: 0.5 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [parallax]);

  const style = {
    '--glow-color': glowColor,
    '--mouse-x': `${mousePosition.x * 100}%`,
    '--mouse-y': `${mousePosition.y * 100}%`,
    '--rotation-x': parallax ? `${(mousePosition.y - 0.5) * 10}deg` : '0deg',
    '--rotation-y': parallax ? `${(mousePosition.x - 0.5) * -10}deg` : '0deg',
  } as React.CSSProperties;

  return (
    <div
      ref={mergedRef}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-background to-background/80",
        "border border-foreground/10",
        "transition-all duration-300 ease-smooth",
        "hover:border-foreground/20",
        parallax && "transform-gpu hover:transform",
        className
      )}
      style={{
        ...style,
        transform: parallax 
          ? `perspective(1000px) rotateX(var(--rotation-x)) rotateY(var(--rotation-y))` 
          : undefined,
        transformStyle: parallax ? 'preserve-3d' : undefined,
      }}
      {...props}
    >
      {/* Gradient glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}22, transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-[-2px] rounded-xl"
          style={{
            background: `conic-gradient(from 0deg at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent, ${glowColor})`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  );
});
InteractiveCard.displayName = "InteractiveCard"

// Bento Grid Card with Container Queries
const BentoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    span?: 'row' | 'col' | 'both';
  }
>(({ className, span = 'col', ...props }, ref) => {
  const spanClasses = {
    row: "@container-md:col-span-2",
    col: "@container-md:row-span-2",
    both: "@container-md:col-span-2 @container-md:row-span-2"
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "group relative overflow-hidden",
        "transition-all duration-300 hover:scale-[1.02]",
        spanClasses[span],
        className
      )}
      {...props}
    />
  );
});
BentoCard.displayName = "BentoCard"

// Skeleton Card for Loading States
const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "relative overflow-hidden",
      "before:absolute before:inset-0",
      "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:animate-shimmer",
      className
    )}
    {...props}
  >
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
      </div>
    </CardContent>
  </Card>
));
SkeletonCard.displayName = "SkeletonCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  InteractiveCard,
  BentoCard,
  SkeletonCard
}