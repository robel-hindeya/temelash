import { redirect } from 'next/navigation';

// Older QR codes pointed here; the landing page now lives at /p/<join reference>.
export default async function Page({ params }) {
  const { slug } = await params;
  redirect(`/p/${encodeURIComponent(slug)}`);
}
