import HealthCheckWizard from "@/components/health-check/HealthCheckWizard";

export default function GesundheitsCheckPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-4xl space-y-6 text-center">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
            Gesundheits-Check
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Finden Sie in wenigen Schritten heraus, wie es Ihrem Körper aktuell geht
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
            Beantworten Sie 8 kurze Fragen zu Ihrem Wohlbefinden. Ihr persönliches
            Ergebnis und passende Empfehlungen erhalten Sie nach der Registrierung.
          </p>
        </div>

        <HealthCheckWizard />
      </section>
    </main>
  );
}