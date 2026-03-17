import AppointmentSecondaryCTAButton from "@/components/appointments/AppointmentSecondaryCTAButton";

export default function BehandlungenCTA() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-semibold mb-4">
          Sie sind unsicher, welche Behandlung zu Ihnen passt?
        </h2>

        <p className="text-gray-600 mb-8">
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
