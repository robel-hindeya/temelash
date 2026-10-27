import AuthGuard from '@/components/AuthGuard';

export const metadata = {
  title: 'Staff App — Temelash Card',
};

export default function StaffLayout({ children }) {
  return <AuthGuard requiredRole="staff">{children}</AuthGuard>;
}
