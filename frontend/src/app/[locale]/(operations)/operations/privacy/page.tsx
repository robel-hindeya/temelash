import { redirect } from "next/navigation";
import { OpsFrame } from "@/features/operations/page-frame";
import { assertLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, "nav.overview");

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);
  redirect(`/${locale}/operations`);
  return (
    <OpsFrame
      locale={locale}
      path="/operations/privacy"
      titleKey="nav.overview"
      subtitleKey="ops.overviewSubtitle"
    >
      <div />
    </OpsFrame>
  );
}
