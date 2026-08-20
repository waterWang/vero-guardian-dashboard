"use client";

import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QuickAction {
  id: string;
  labelKey: string;
  available: boolean;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: "network-status", labelKey: "actions.networkStatus", available: false },
  { id: "stake", labelKey: "actions.stake", available: false },
  { id: "rewards", labelKey: "actions.rewards", available: false },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-1 gap-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={!action.available}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={t(action.labelKey)}
            aria-disabled={!action.available}
          >
            <span className="font-medium">{t(action.labelKey)}</span>
            <span className="flex items-center gap-2">
              {action.available ? (
                <ArrowRight
                  className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t("actions.comingSoon")}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}