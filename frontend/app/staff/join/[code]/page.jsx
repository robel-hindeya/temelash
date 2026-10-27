import StaffJoinFlow from '@/components/screens/staff/StaffJoinFlow';

export const metadata = { title: 'Join Staff Team — Temelash Card' };

export default async function Page({ params }) {
  const resolvedParams = await params;
  const code = resolvedParams?.code || '';
  return <StaffJoinFlow initialCode={code} />;
}
