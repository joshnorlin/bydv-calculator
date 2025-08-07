import { useEffect, useState, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Smooth scroll to the new component after animation starts
      if (elementRef.current && delay > 0) {
        setTimeout(() => {
          elementRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 300); // Wait a bit for the animation to start
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
