import type { ContactMessage } from "@/types/contact";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

type AdminContactMessagesSectionProps = {
  messages: ContactMessage[];
};

export default function AdminContactMessagesSection({
  messages,
}: AdminContactMessagesSectionProps) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Kontaktanfragen</h2>
        <p className="mt-1 text-sm text-gray-500">
          Hier sehen Sie Nachrichten aus dem oeffentlichen Kontaktformular.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl border bg-white p-5 text-sm text-gray-500 shadow-sm">
          Aktuell liegen keine Kontaktanfragen vor.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {message.firstName} {message.lastName}
                  </h3>
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

