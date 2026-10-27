import { redirect } from 'next/navigation';

// Printed QR stands used /join/<join reference>; every customer QR now opens the landing page.
export default async function Page({ params }) {
  const { slug } = await params;
  redirect(`/p/${encodeURIComponent(slug)}`);
}
