// components/NavigateButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; 
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from "@/components/ui/button";

interface NavigateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale';
  asChild?: boolean;
}

export default function NavigateButton({
  href,
  children,
  className,
  variant, 
  size,
  animationType = 'fade',
  asChild = false,
  ...props
}: NavigateButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    },
    slide: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 20, opacity: 0 },
      transition: { duration: 0.3 },
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...animations[animationType]}
    >
      <Button onClick={handleClick} className={cn(className)} variant={variant} size={size} asChild={asChild} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}