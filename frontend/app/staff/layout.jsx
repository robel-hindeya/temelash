'use client';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function StaffLayout({ children }) {
  const pathname = usePathname();
  // Public staff invitation onboarding flow does not require prior staff authentication
  if (pathname && pathname.startsWith('/staff/join')) {
    return <>{children}</>;
  }

  return <AuthGuard requiredRole="staff">{children}</AuthGuard>;
}

