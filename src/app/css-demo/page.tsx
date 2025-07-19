'use client';

import React, { useState } from 'react';
import { Button, ButtonGroup, IconButton } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  InteractiveCard,
  BentoCard,
  SkeletonCard
} from '@/components/ui/card';
import { 
  Badge, 
  BadgeGroup, 
  CountBadge, 
  IconBadge, 
  StatusBadge 
} from '@/components/ui/badge';

export default function CSSDemo() {
  const [count, setCount] = useState(5);

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="progress-bar" />

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 gradient-text">
            Cutting-Edge CSS Features
          </h1>
          <p className="text-center text-xl text-balance max-w-3xl mx-auto mb-8">
            Explore modern CSS capabilities including container queries, scroll-driven animations, 
            oklch() colors, and advanced styling techniques.
          </p>
        </div>
      </section>

      {/* Color System Demo */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Modern Color System</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['primary', 'secondary', 'accent', 'success', 'warning', 'error'].map((color) => (
            <div 
              key={color}
              className="aspect-square rounded-lg shadow-lg flex items-center justify-center text-white font-semibold capitalize scroll-scale-up"
              style={{ 
                backgroundColor: `var(--color-${color})`,
                viewTransitionName: `color-${color}` 
              }}
            >
              {color}
            </div>
          ))}
        </div>
      </section>

      {/* Button Variants */}
      <section className="py-16 bg-background-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Button Variants</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="neo">Neomorphism</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="glow">Glow Effect</Button>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Button Group</h3>
            <ButtonGroup>
              <Button variant="outline">Left</Button>
              <Button variant="outline">Center</Button>
              <Button variant="outline">Right</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Icon Buttons</h3>
            <div className="flex gap-4">
              <IconButton icon="🏠" variant="glass">Home</IconButton>
              <IconButton icon="⚙️" variant="neo">Settings</IconButton>
              <IconButton icon="❤️" variant="gradient">Favorite</IconButton>
            </div>
          </div>
        </div>
      </section>

      {/* Card Variants with Container Queries */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Card Components</h2>
        <div className="responsive-grid">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with responsive padding</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card uses container queries for responsive design.</p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Morphism</CardTitle>
              <CardDescription>Frosted glass effect with backdrop blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Modern glassmorphism design with subtle transparency.</p>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
              <CardDescription>Subtle gradient background</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Beautiful gradient effects using modern color mixing.</p>
            </CardContent>
          </Card>

          <Card variant="neo">
            <CardHeader>
              <CardTitle>Neomorphism</CardTitle>
              <CardDescription>Soft UI design style</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Elegant shadow effects for a modern look.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Interactive Cards</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InteractiveCard glowColor="var(--color-primary)" parallax>
              <CardHeader>
                <CardTitle>Parallax Effect</CardTitle>
                <CardDescription>Move your mouse over this card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card responds to mouse movement with 3D parallax effects and dynamic glow.</p>
              </CardContent>
            </InteractiveCard>

            <InteractiveCard glowColor="var(--color-accent)">
              <CardHeader>
                <CardTitle>Glow Border</CardTitle>
                <CardDescription>Animated border on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Features an animated gradient border that follows your cursor.</p>
              </CardContent>
            </InteractiveCard>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Loading States</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <SkeletonCard />
            <div className="shimmer rounded-lg bg-gray-200 p-6 h-48" />
            <div className="flex items-center justify-center">
              <div className="spinner" />
            </div>
          </div>
        </div>
      </section>

      {/* Badge Components */}
      <section className="py-16 bg-background-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Badge System</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Badge Variants</h3>
            <BadgeGroup>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="gradient">Gradient</Badge>
              <Badge variant="glass">Glass</Badge>
              <Badge variant="glow">Glow</Badge>
              <Badge variant="neo">Neo</Badge>
            </BadgeGroup>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Special Badges</h3>
            <div className="flex flex-wrap gap-4">
              <CountBadge count={count} variant="destructive" />
              <button 
                onClick={() => setCount(count + 1)}
                className="text-sm underline"
              >
                Increment ({count})
              </button>
              <IconBadge icon="🚀" variant="gradient">Launch</IconBadge>
              <StatusBadge status="online" />
              <StatusBadge status="busy" />
              <StatusBadge status="away" />
              <StatusBadge status="offline" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Badge Sizes & Shapes</h3>
            <div className="flex flex-wrap gap-4">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
              <Badge shape="square">Square</Badge>
              <Badge shape="pill">Pill Shape</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Forms */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Modern Form Styles</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div className="form-group">
              <input type="text" placeholder=" " className="peer" />
              <label>Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" placeholder=" " className="peer" />
              <label>Email Address</label>
            </div>
            <div className="form-group">
              <textarea placeholder=" " rows={4} className="peer" />
              <label>Message</label>
            </div>
            <Button variant="gradient" className="w-full" type="submit">
              Submit Form
            </Button>
          </form>
        </div>
      </section>

      {/* Grid Layouts */}
      <section className="py-16 bg-background-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Advanced Grid Layouts</h2>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Auto-fit Grid</h3>
            <div className="grid-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="modern-card">
                  <h4 className="font-semibold mb-2">Grid Item {i + 1}</h4>
                  <p className="text-sm">Responsive grid with auto-fit</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Bento Grid</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <BentoCard span="col">
                <CardHeader>
                  <CardTitle>Tall Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card spans two rows</p>
                </CardContent>
              </BentoCard>
              
              <BentoCard>
                <CardHeader>
                  <CardTitle>Regular Card</CardTitle>
                </CardHeader>
              </BentoCard>
              
              <BentoCard span="row">
                <CardHeader>
                  <CardTitle>Wide Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card spans two columns</p>
                </CardContent>
              </BentoCard>
              
              <BentoCard>
                <CardHeader>
                  <CardTitle>Another Card</CardTitle>
                </CardHeader>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Snap Demo */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Scroll Snap Gallery</h2>
        <div className="snap-x flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="snap-center flex-none w-80 aspect-video rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold"
            >
              Slide {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards with Animations */}
      <section className="py-16 bg-background-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 scroll-fade-in">Feature Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Fast Performance', desc: 'Optimized for speed' },
              { icon: '🎨', title: 'Modern Design', desc: 'Beautiful interfaces' },
              { icon: '🔒', title: 'Secure', desc: 'Built with security in mind' }
            ].map((feature, i) => (
              <div key={i} className="feature-card scroll-fade-in">
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tooltips Demo */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Modern Tooltips</h2>
        <div className="flex gap-8 justify-center">
          <div className="tooltip-container">
            <Button variant="outline" className="tooltip">Hover me</Button>
            <div className="tooltip-content">This is a CSS-only tooltip!</div>
          </div>
          
          <div className="tooltip-container">
            <Badge variant="gradient" className="tooltip">Info Badge</Badge>
            <div className="tooltip-content">Additional information here</div>
          </div>
        </div>
      </section>

      {/* Aspect Ratios */}
      <section className="py-16 bg-background-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Aspect Ratio Utilities</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white">
              1:1
            </div>
            <div className="aspect-video bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center text-white">
              16:9
            </div>
            <div className="aspect-portrait bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center text-white">
              3:4
            </div>
            <div className="aspect-landscape bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white">
              4:3
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          variant="glow" 
          size="lg" 
          className="rounded-full w-16 h-16 animate-float shadow-2xl"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </Button>
      </div>
    </div>
  );
}