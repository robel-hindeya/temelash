import PublicLandingPage from '@/components/screens/customer/PublicLandingPage';

export const metadata = {
  title: 'Merchant Landing Page — Temelash Card',
  description: 'Connect with your local business, collect digital stamps, and redeem rewards.',
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <PublicLandingPage slug={resolvedParams?.slug} />;
}
