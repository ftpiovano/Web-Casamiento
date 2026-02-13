import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}

export function Section({ id, children, className = "", light = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-6 flex flex-col items-center ${
        light ? "bg-background" : "bg-accent/5"
      } ${className}`}
    >
      <div className="container max-w-5xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
}

export function Typography({ children, className = "", as = "p" }: TypographyProps) {
  const Component = as;
  
  const styles = {
    h1: "text-5xl md:text-7xl font-heading mb-6 text-center",
    h2: "text-4xl md:text-5xl font-heading mb-8 text-center",
    h3: "text-2xl md:text-3xl font-heading mb-4",
    h4: "text-xl font-heading mb-2",
    p: "text-base md:text-lg leading-relaxed text-foreground/80",
  };

  return (
    <Component className={`${styles[as]} ${className}`}>
      {children}
    </Component>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-background rounded-2xl shadow-sm border border-accent/10 p-8 transition-shadow hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function Button({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary" 
}: { 
  children: ReactNode; 
  onClick?: () => void; 
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-accent text-foreground hover:bg-accent/80",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
  };

  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-medium transition-all duration-200 tracking-wide uppercase text-sm ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
