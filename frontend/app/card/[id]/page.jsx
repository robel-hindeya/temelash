import Screen from '@/components/Screen';

export const metadata = {
  title: 'Web card — customer view',
  description: 'Your digital stamp card with rewards.',
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <Screen name="WebCard" id={resolvedParams?.id} />;
}
