import AppointmentSecondaryCTAButton from "@/components/appointments/AppointmentSecondaryCTAButton";

export default function BehandlungenCTA() {
  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
          Sie sind unsicher, welche Behandlung zu Ihnen passt?
        </h2>

        <p className="mb-8 text-base leading-7 text-gray-600 md:text-lg">
          Kontaktieren Sie uns – wir beraten Sie gerne persönlich
          und finden gemeinsam den passenden Weg.
        </p>

        <AppointmentSecondaryCTAButton
          defaultTreatment="Akupunktur"
          preferredTreatments={["Akupunktur", "Psychotherapie", "Lerntherapeutisches Training"]}
        />

      </div>
    </section>
  )
}
