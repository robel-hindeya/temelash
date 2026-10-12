"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  ConfirmationScreen,
  FormField,
  Input,
  PhoneInput,
} from "@/components/ui";
import { useHydrated } from "@/hooks/use-hydrated";
import { getBrowserApi } from "@/lib/api/browser";
import type { WalletOption } from "@/lib/api/contract";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import { createEnrollmentSchema, toE164, type EnrollmentValues } from "@/lib/validation/enrollment";
import { EnrollmentDone } from "./enrollment-done";

interface Props {
  joinReference: string;
  /** The consent text version the customer is shown; sent back so a changed text is never agreed to unseen. */
  consentVersion: string;
  /** Program terms exactly as the business wrote them. */
  terms: { text: string; lang: string } | null;
}

type Outcome =
  | { kind: "form" }
  | { kind: "created"; token: string; wallet: WalletOption[] }
  | { kind: "existing" };

const FIELD_MESSAGE = {
  phone: "enrollment.phoneInvalid",
  firstName: "enrollment.nameCharacters",
  email: "enrollment.emailInvalid",
  acceptTerms: "enrollment.consentRequired",
} as const;

export function EnrollmentFlow({ joinReference, consentVersion, terms: _terms }: Props) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const schema = useMemo(() => createEnrollmentSchema(t), [t]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "", phone: "", acceptTerms: true, marketingConsent: false },
  });
  const [outcome, setOutcome] = useState<Outcome>({ kind: "form" });
  const [problem, setProblem] = useState<string | null>(null);
  const [maybeSent, setMaybeSent] = useState(false);
  // One submission at a time, even if a second tap lands before React has re-rendered the disabled button.
  const inFlight = useRef(false);
  const hydrated = useHydrated();

  const submit = handleSubmit(async (values) => {
    setProblem(null);
    setMaybeSent(false);
    try {
      const result = await getBrowserApi().enrollment.enroll(joinReference, {
        phone: toE164(values.phone),
        firstName: values.firstName.trim(),
        email: values.email.trim().toLowerCase(),
        preferredLanguage: locale === "am" ? "AM" : "EN",
        acceptTerms: true,
        marketingConsent: values.marketingConsent,
        consentVersion,
      });
      if (result.status === "CREATED" && result.card) {
        setOutcome({ kind: "created", token: result.card.token, wallet: result.wallet });
      } else {
        setOutcome({ kind: "existing" });
      }
      window.scrollTo({ top: 0 });
    } catch (e) {
      const error = toApiError(e);
      if (error.code === "CONSENT_VERSION_STALE") {
        // The terms changed while the page was open: reload them and make the customer agree again.
        setValue("acceptTerms", false);
        setProblem(t("enrollment.consentStale"));
        router.refresh();
        return;
      }
      let shownAtField = false;
      for (const [field, message] of Object.entries(FIELD_MESSAGE)) {
        if (field in error.fieldErrors) {
          setError(field as keyof typeof FIELD_MESSAGE, { message: t(message) });
          shownAtField = true;
        }
      }
      setProblem(shownAtField ? t("errors.validation") : describeApiError(error, t).description);
      // If the request may have been processed before the connection failed, say what to do.
      setMaybeSent(error.kind === "network" || error.kind === "timeout");
    }
  });

  if (outcome.kind === "created") {
    return <EnrollmentDone token={outcome.token} wallet={outcome.wallet} />;
  }

  if (outcome.kind === "existing") {
    return (
      <div data-testid="enrollment-existing">
        <ConfirmationScreen
          headingLevel="h2"
          tone="neutral"
          title={t("enrollment.existingTitle")}
          description={t("enrollment.existingBody")}
        />
      </div>
    );
  }

  const languageName =
    locale === "am" ? t("enrollment.languageAmharic") : t("enrollment.languageEnglish");

  return (
    <form
      onSubmit={(event) => {
        // A second tap that lands before the button has re-rendered as disabled is ignored.
        if (inFlight.current) {
          event.preventDefault();
          return;
        }
        inFlight.current = true;
        void submit(event).finally(() => {
          inFlight.current = false;
        });
      }}
      noValidate
      data-hydrated={hydrated}
      aria-busy={isSubmitting || undefined}
      aria-labelledby="form-title"
      className="mt-6 flex flex-col gap-5"
    >
      <h2 id="form-title" className="text-xl font-bold text-green-900">
        {t("enrollment.title")}
      </h2>
      <p className="-mt-3 text-charcoal-700">{t("enrollment.intro")}</p>

      {problem ? (
        <Alert tone="danger">
          <p>{problem}</p>
          {maybeSent ? <p className="mt-2">{t("enrollment.maybeSent")}</p> : null}
        </Alert>
      ) : null}

      <FormField label={t("enrollment.firstName")} error={errors.firstName?.message} required>
        <Input
          autoComplete="given-name"
          autoCapitalize="words"
          maxLength={60}
          disabled={isSubmitting}
          {...register("firstName")}
        />
      </FormField>

      <FormField
        label={t("enrollment.email")}
        hint={t("enrollment.emailHint")}
        error={errors.email?.message}
        required
      >
        <Input
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={120}
          disabled={isSubmitting}
          {...register("email")}
        />
      </FormField>

      <FormField
        label={t("enrollment.phone")}
        hint={t("enrollment.phoneHint")}
        error={errors.phone?.message}
        required
      >
        <PhoneInput disabled={isSubmitting} {...register("phone")} />
      </FormField>

      <p className="text-sm text-muted">
        {t("enrollment.messageLanguage", { language: languageName })}
      </p>

      <Button
        type="submit"
        size="lg"
        fullWidth
        // Disabled until the page is interactive, so a tap or Enter before then cannot submit natively.
        disabled={!hydrated}
        loading={isSubmitting}
        loadingLabel={t("enrollment.submitting")}
      >
        {t("enrollment.submit")}
      </Button>
    </form>
  );
}
