"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Alert, Button, ButtonLink, ConfirmDialog, useToast } from "@/components/ui";
import { WalletButton } from "@/features/wallet/wallet-button";
import { toApiError } from "@/lib/errors/api-error";
import { describeApiError } from "@/lib/errors/messages";
import { useI18n } from "@/lib/i18n/client";
import { cardClient } from "../card-client";

/** Refresh the card's data when the customer comes back to it, at most this often. */
const AUTO_REFRESH_AFTER_MS = 30_000;

/**
 * Buttons under the card. Refresh re-reads the card from the server (also done automatically when the phone is
 * unlocked and the page comes back to the front, so a stamp added a moment ago shows). Stopping marketing and
 * removing the card both ask first; neither touches the membership, stamps or rewards.
 */
export function CardActions({
  cardId,
  walletHref,
  showWallet,
}: {
  cardId: string;
  walletHref: string;
  showWallet: boolean;
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const toast = useToast();
  const [refreshing, startRefresh] = useTransition();
  const [confirm, setConfirm] = useState<"marketing" | "remove" | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [savingGoogle, setSavingGoogle] = useState(false);
  const [googleSuccess, setGoogleSuccess] = useState(false);
  const [googleProblem, setGoogleProblem] = useState<string | null>(null);

  async function addToGoogleWallet() {
    setGoogleProblem(null);
    setGoogleSuccess(false);
    setSavingGoogle(true);
    try {
      const link = await cardClient.walletLink("GOOGLE", cardId);
      if (link.url && /^https:\/\//.test(link.url)) {
        setGoogleSuccess(true);
        window.location.assign(link.url);
        return;
      }
      setGoogleProblem(t("wallet.linkFailed"));
    } catch (e) {
      setGoogleProblem(
        toApiError(e).kind === "conflict" ? t("wallet.notOfferedNow") : t("wallet.linkFailed"),
      );
    } finally {
      setSavingGoogle(false);
    }
  }

  useEffect(() => {
    let hiddenAt: number | null = null;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
      } else if (hiddenAt !== null && Date.now() - hiddenAt > AUTO_REFRESH_AFTER_MS) {
        hiddenAt = null;
        router.refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [router]);

  async function stopMarketing() {
    setProblem(null);
    try {
      await cardClient.stopMarketing(cardId);
      setConfirm(null);
      toast.show({ tone: "success", title: t("card.stopMarketingDone") });
    } catch (e) {
      setConfirm(null);
      setProblem(describeApiError(toApiError(e), t).description);
    }
  }

  async function removeCard() {
    setProblem(null);
    try {
      await cardClient.forget(cardId);
      setConfirm(null);
      // Back to the card page, which now shows another card or the "no card on this phone" screen.
      router.replace(`/${locale}/card`);
      router.refresh();
    } catch (e) {
      setConfirm(null);
      setProblem(describeApiError(toApiError(e), t).description);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {problem ? <Alert tone="danger">{problem}</Alert> : null}
      <Button
        variant="secondary"
        fullWidth
        loading={refreshing}
        loadingLabel={t("card.refreshing")}
        onClick={() => startRefresh(() => router.refresh())}
      >
        {t("card.refresh")}
      </Button>
      {showWallet ? (
        <div className="flex flex-col gap-2">
          {googleProblem ? <Alert tone="danger">{googleProblem}</Alert> : null}
          {googleSuccess ? <Alert tone="success">{t("wallet.statusAdded")}</Alert> : null}
          <WalletButton
            provider="GOOGLE"
            label={t("wallet.addGoogle")}
            loading={savingGoogle}
            onClick={() => void addToGoogleWallet()}
          />
          <ButtonLink href={walletHref} variant="secondary" fullWidth>
            {t("card.addToWallet")}
          </ButtonLink>
        </div>
      ) : null}
      <div className="flex flex-col gap-1 border-t border-border pt-3">
        <Button variant="ghost" fullWidth onClick={() => setConfirm("marketing")}>
          {t("card.stopMarketing")}
        </Button>
        <Button variant="ghost" fullWidth onClick={() => setConfirm("remove")}>
          {t("card.removeCard")}
        </Button>
      </div>

      <ConfirmDialog
        open={confirm === "marketing"}
        title={t("card.stopMarketingTitle")}
        description={t("card.stopMarketingBody")}
        confirmLabel={t("card.stopMarketing")}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setConfirm(null)}
        onConfirm={stopMarketing}
      />
      <ConfirmDialog
        open={confirm === "remove"}
        tone="danger"
        title={t("card.removeTitle")}
        description={t("card.removeBody")}
        confirmLabel={t("card.removeCard")}
        cancelLabel={t("ui.cancel")}
        onCancel={() => setConfirm(null)}
        onConfirm={removeCard}
      />
    </div>
  );
}
