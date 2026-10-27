import Screen from '@/components/Screen';

export const metadata = { title: 'Customer flow — scan to reward' };

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <Screen name="CustomerFlow" slug={resolvedParams?.slug} />;
}
