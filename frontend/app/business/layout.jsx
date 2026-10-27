import AuthGuard from '@/components/AuthGuard';

export const metadata = {
  title: 'Business Dashboard — Temelash Card',
};

export default function BusinessLayout({ children }) {
  return <AuthGuard requiredRole="owner">{children}</AuthGuard>;
}
