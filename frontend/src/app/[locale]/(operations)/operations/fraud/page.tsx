import { FraudWorkspace } from "@/features/fraud/components/fraud-workspace";
import { OpsFrame } from "@/features/operations/page-frame";
import { assertLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, "nav.fraud");

/**
 * Fraud monitoring: the flags raised across merchants, one-time review verdicts, and threshold limits.
 */
export default async function FraudPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);
  return (
    <OpsFrame
      locale={locale}
      path="/operations/fraud"
      titleKey="nav.fraud"
      subtitleKey="ops.fraudSubtitle"
    >
      <FraudWorkspace canManage={true} />
    </OpsFrame>
  );
}
