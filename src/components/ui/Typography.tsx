import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4";
  as?: React.ElementType;
  /** Allow framer-motion props and other dynamic attributes */
  [key: string]: any;
}

/**
 * Standard Heading component for Solvefy.
 * Centralizes heading styles for easier maintenance.
 */
export const Heading = ({ 
  variant = "h2", 
  as,
  className, 
  children, 
  ...props 
}: HeadingProps) => {
  const Tag = as || variant;
  
  // Base classes that can be tweaked in one place
  const baseClasses = {
    h1: "text-4xl md:text-6xl font-bold tracking-tight leading-tight",
    h2: "text-3xl md:text-5xl font-normal tracking-tight leading-tight",
    h3: "text-xl md:text-2xl font-normal tracking-tight",
    h4: "text-lg md:text-xl font-normal tracking-tight",
  };

  return (
    <Tag 
      className={cn(baseClasses[variant], className)} 
      {...props}
    >
      {children}
    </Tag>
  );
};

interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  /** Allow framer-motion props and other dynamic attributes */
  [key: string]: any;
}

/**
 * Standard Section Subtitle component for Solvefy.
 */
export const SectionSubtitle = ({ 
  as: Tag = "p",
  className, 
  children, 
  ...props 
}: SubtitleProps) => {
  return (
    <Tag 
      className={cn("section-subtitle", className)} 
      style={{ color: "#1e1e1e", ...props.style }}
      {...props}
    >
      {children}
    </Tag>
  );
};
