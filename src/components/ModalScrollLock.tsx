import React, { useEffect } from 'react';

interface ModalScrollLockProps {
  children: React.ReactNode;
}

export function ModalScrollLock({ children }: ModalScrollLockProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);
  return <>{children}</>;
} 