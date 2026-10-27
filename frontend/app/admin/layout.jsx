import AuthGuard from '@/components/AuthGuard';

export const metadata = {
  title: 'Admin — Temelash Card',
};

export default function AdminLayout({ children }) {
  return <AuthGuard requiredRole="admin">{children}</AuthGuard>;
}
