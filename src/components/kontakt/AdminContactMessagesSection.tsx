"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatDateTime } from "@/lib/date-format";
import type { ContactMessage } from "@/types/contact";

type AdminContactMessagesSectionProps = {
  messages: ContactMessage[];
};

type MessageFilter = "ALL" | "UNREAD" | "READ";

const filterOptions: Array<{ key: MessageFilter; label: string }> = [
  { key: "UNREAD", label: "Neue Nachrichten" },
  { key: "ALL", label: "Alle" },
  { key: "READ", label: "Gelesen" },
];

function buildReplyMailto(message: ContactMessage) {
  const subject = encodeURIComponent(
    `Rueckmeldung zu Ihrer Kontaktanfrage`
  );
  const body = encodeURIComponent(
    [
      `Hallo ${message.firstName} ${message.lastName},`,
      "",
      "vielen Dank fuer Ihre Nachricht.",
      "",
      "Mit freundlichen Gruessen",
      "Heilpraktiker-Zentrum Bleialf",
    ].join("\n")
  );

  return `mailto:${message.email}?subject=${subject}&body=${body}`;
}

export default function AdminContactMessagesSection({
  messages,
}: AdminContactMessagesSectionProps) {
  const [items, setItems] = useState<ContactMessage[]>(messages);
  const [filter, setFilter] = useState<MessageFilter>("UNREAD");

  useEffect(() => {
    setItems(messages);
  }, [messages]);

  const counts = useMemo(
    () => ({
      ALL: items.length,
      UNREAD: items.filter((message) => !message.isRead).length,
      READ: items.filter((message) => message.isRead).length,
    }),
    [items]
  );

  const visibleMessages = useMemo(() => {
    let next = [...items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filter === "UNREAD") {
      next = next.filter((message) => !message.isRead);
    }

    if (filter === "READ") {
      next = next.filter((message) => message.isRead);
    }

    return next;
  }, [filter, items]);

  async function setReadState(id: string, isRead: boolean) {
    try {
      const res = await fetch(`/api/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Status konnte nicht aktualisiert werden.");
      }

      const updated = (await res.json()) as ContactMessage;
      setItems((current) =>
        current.map((message) => (message.id === id ? updated : message))
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Status konnte nicht aktualisiert werden."
      );
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-col gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Kontaktanfragen</h2>
          <p className="mt-1 text-sm text-gray-500">
          Hier sehen Sie Nachrichten aus dem oeffentlichen Kontaktformular.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = filter === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFilter(option.key as MessageFilter)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {counts[option.key as MessageFilter]}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {visibleMessages.length} Nachrichten
          </span>
        </div>
      </div>

      {visibleMessages.length === 0 ? (
        <div className="rounded-2xl border bg-white p-5 text-sm text-gray-500 shadow-sm">
          Aktuell liegen keine Kontaktanfragen vor.
        </div>
      ) : (
        <div className="space-y-4">
          {visibleMessages.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md ${
                message.isRead ? "" : "border-emerald-200"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {message.firstName} {message.lastName}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        message.isRead
                          ? "bg-slate-100 text-slate-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {message.isRead ? "Gelesen" : "Neu"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{message.email}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {message.phone || "Kein Telefon angegeben"}
                  </p>
                </div>
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {formatDateTime(message.createdAt)}
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-gray-700">
                {message.message}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={buildReplyMailto(message)}
                  onClick={() => {
                    if (!message.isRead) {
                      void setReadState(message.id, true);
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Per E-Mail antworten
                </a>
                <button
                  type="button"
                  onClick={() => void setReadState(message.id, !message.isRead)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {message.isRead ? "Als neu markieren" : "Als gelesen markieren"}
                </button>
                {message.phone ? (
                  <a
                    href={`tel:${message.phone}`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Anrufen
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
