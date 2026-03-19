import BehandlungenHero from "@/components/behandlungen/BehandlungenHero";
import BehandlungenNav from "@/components/behandlungen/BehandlungenNav";
import BehandlungSection from "@/components/behandlungen/BehandlungSection";
import BehandlungenCTA from "@/components/behandlungen/BehandlungenCTA";

const psychologischeBeratung = [
  {
    title: "Ängste",
    description:
      "Wir begleiten Menschen, die unter Ängsten, innerer Unruhe oder belastenden Gedanken leiden. Ziel ist es, mehr Stabilität, Sicherheit und Vertrauen im Alltag zu entwickeln.",
  },
  {
    title: "Stress und Druck",
    description:
      "Anhaltender Stress kann sich sowohl körperlich als auch emotional bemerkbar machen. Wir unterstützen Sie dabei, Belastungen besser zu verstehen und individuelle Wege zur Entlastung zu finden.",
  },
  {
    title: "Schwierige Lebensereignisse",
    description:
      "Veränderungen, Verluste oder belastende Erfahrungen können das innere Gleichgewicht stark beeinflussen. In einem geschützten Rahmen unterstützen wir Sie bei der Verarbeitung und Neuorientierung.",
  },
  {
    title: "Selbstwertprobleme",
    description:
      "Ein geschwächtes Selbstwertgefühl kann viele Lebensbereiche beeinflussen. Wir helfen dabei, eigene Stärken wieder bewusster wahrzunehmen und mehr innere Sicherheit zu entwickeln.",
  },
  {
    title: "Paarberatung",
    description:
      "In der Paarberatung schaffen wir Raum für Verständnis, Kommunikation und neue Perspektiven. Ziel ist es, Konflikte besser einzuordnen und gemeinsame Wege zu entwickeln.",
  },
];

const lerntherapie = [
  {
    title: "Legasthenie",
    description:
      "Bei Lese- und Rechtschreibschwierigkeiten unterstützen wir Kinder und Jugendliche mit gezielten, individuell abgestimmten Förderansätzen, um Sicherheit und Motivation im Lernprozess zu stärken.",
  },
  {
    title: "Dyskalkulie",
    description:
      "Rechenschwierigkeiten können das schulische Selbstvertrauen deutlich belasten. Durch gezielte Förderung helfen wir dabei, mathematische Grundlagen verständlicher und zugänglicher zu machen.",
  },
  {
    title: "Lerntherapeutisches Training",
    description:
      "Das lerntherapeutische Training verbindet strukturierte Förderung mit individueller Begleitung. Ziel ist es, Lernblockaden zu lösen und langfristig positive Lernerfahrungen zu ermöglichen.",
  },
];

const koerpertherapie = [
  {
    title: "Faszientherapie",
    description:
      "Die Faszientherapie kann helfen, Spannungen, Bewegungseinschränkungen und körperliche Beschwerden gezielt zu behandeln. Sie unterstützt die Beweglichkeit und das körperliche Wohlbefinden.",
  },
  {
    title: "Stress- und Schmerzresilienz",
    description:
      "Chronischer Stress und wiederkehrende Schmerzen beeinflussen häufig den gesamten Alltag. Wir arbeiten daran, körperliche und mentale Widerstandskraft nachhaltig zu stärken.",
  },
  {
    title: "Physiotherapie",
    description:
      "Die Physiotherapie unterstützt die Wiederherstellung, Verbesserung und Erhaltung von Beweglichkeit und Funktion. Die Behandlung orientiert sich individuell an Ihren Beschwerden und Zielen.",
  },
];

const naturheilverfahren = [
  {
    title: "Iridologie",
    description:
      "Die Iridologie betrachtet die Iris als Hinweisgeber für individuelle Zusammenhänge im Organismus. Sie wird im Rahmen einer ganzheitlichen Betrachtung eingesetzt.",
  },
  {
    title: "Homöopathie",
    description:
      "Die Homöopathie verfolgt einen individuellen Ansatz und betrachtet den Menschen in seiner Gesamtheit. Die Auswahl der Mittel erfolgt abgestimmt auf die persönliche Situation.",
  },
  {
    title: "Vegacheck",
    description:
      "Der Vegacheck dient der ganzheitlichen Analyse individueller Belastungen und energetischer Ungleichgewichte. Er kann helfen, therapeutische Zusammenhänge besser einzuordnen.",
  },
  {
    title: "VNS-Analyse",
    description:
      "Die VNS-Analyse betrachtet die Regulationsfähigkeit des vegetativen Nervensystems. Sie kann wertvolle Hinweise auf Stressbelastung, Regeneration und innere Balance geben.",
  },
];

const tcm = [
  {
    title: "TCM – Traditionelle chinesische Medizin",
    description:
      "Die Traditionelle chinesische Medizin versteht Gesundheit als dynamisches Gleichgewicht von Körper, Geist und Energiefluss. Ziel ist es, Ursachen ganzheitlich zu betrachten und individuell zu behandeln.",
  },
  {
    title: "Akupunktur",
    description:
      "Die Akupunktur ist ein zentraler Bestandteil der TCM und wird zur Unterstützung bei verschiedenen funktionellen und stressbedingten Beschwerden eingesetzt.",
  },
  {
    title: "Schröpfen",
    description:
      "Schröpfen ist ein traditionelles Ausleitungsverfahren, das zur Förderung der Durchblutung und Entlastung verspannter Gewebe angewendet wird.",
  },
];

const spezielleBehandlungen = [
  {
    title: "CMD-Kieferbehandlung",
    description:
      "Die CMD-Kieferbehandlung richtet sich an Beschwerden im Bereich des Kiefers, der Muskulatur und angrenzender Strukturen. Sie kann bei Spannungen, Dysbalancen und funktionellen Problemen unterstützen.",
  },
  {
    title: "Funktionelle Osteopathie und Integration (FOI)",
    description:
      "FOI ist ein funktioneller Behandlungsansatz, der Zusammenhänge im gesamten Bewegungsapparat berücksichtigt. Ziel ist es, ursächliche Ketten im Körper besser zu erkennen und zu behandeln.",
  },
  {
    title: "Chiropraxis",
    description:
      "Die Chiropraxis beschäftigt sich mit funktionellen Störungen des Bewegungsapparats, insbesondere der Wirbelsäule und Gelenke. Ziel ist es, Beweglichkeit und Balance im Körper zu fördern.",
  },
];

export default function BehandlungenPage() {
  return (
    <main>
      <BehandlungenHero />
      <BehandlungenNav />

      <BehandlungSection
        id="psychologische-beratung"
        title="Psychologische Beratung"
        intro="Wir begleiten Menschen in belastenden Lebensphasen mit Empathie, fachlicher Kompetenz und einem ganzheitlichen Blick auf individuelle Herausforderungen."
        items={psychologischeBeratung}
        imageSrc="/images/behandlungen/psychologische.png"
        imageAlt="Psychologische Beratung in ruhiger Praxisatmosphäre"
      />

      <BehandlungSection
        id="lerntherapie"
        title="Lerntherapie"
        intro="Im Bereich der Lerntherapie fördern wir Kinder und Jugendliche gezielt bei schulischen Herausforderungen und unterstützen sie dabei, wieder mehr Sicherheit im Lernen zu gewinnen."
        items={lerntherapie}
        imageSrc="/images/behandlungen/lerntherapie.png"
        imageAlt="Lerntherapie mit Kind und Therapeutin"
        reverse={false}
        lightBackground={true}
      />

      <BehandlungSection
        id="koerpertherapie"
        title="Körpertherapie"
        intro="Körperliche Beschwerden, Spannungen und funktionelle Einschränkungen betrachten wir nicht isoliert, sondern im Zusammenhang mit Bewegung, Belastung und individueller Regulation."
        items={koerpertherapie}
        imageSrc="/images/behandlungen/koerpertherapie.png"
        imageAlt="Körpertherapie in heller Praxis"
        reverse={true}
      />

      <BehandlungSection
        id="naturheilverfahren"
        title="Naturheilverfahren"
        intro="Unsere naturheilkundlichen Verfahren ergänzen den ganzheitlichen Blick auf den Menschen und können wertvolle Impulse für Diagnostik, Begleitung und Regulation geben."
        items={naturheilverfahren}
        imageSrc="/images/behandlungen/akupunktur.jpg"
        imageAlt="Naturheilverfahren mit Kräutern und therapeutischen Materialien"
        reverse={false}
        lightBackground={true}
      />

      <BehandlungSection
        id="tcm"
        title="TCM – Traditionelle chinesische Medizin"
        intro="Die Traditionelle chinesische Medizin bietet eine bewährte, ganzheitliche Sichtweise auf Gesundheit und verbindet diagnostische und therapeutische Verfahren zu einem individuellen Behandlungskonzept."
        items={tcm}
        imageSrc="/images/behandlungen/naturheilverfahren.png"
        imageAlt="Traditionelle chinesische Medizin mit Akupunktur und Kräutern"
        reverse={true}
      />

      <BehandlungSection
        id="spezielle-behandlungen"
        title="Spezielle Behandlungen"
        intro="Ergänzend bieten wir spezialisierte Behandlungsmethoden an, die gezielt auf funktionelle Beschwerden und komplexe Zusammenhänge im Körper eingehen."
        items={spezielleBehandlungen}
        imageSrc="/images/behandlungen/spezielle-behandlungen.png"
        imageAlt="Spezielle Behandlungen in ruhiger Therapiepraxis"
        reverse={false}
        lightBackground={true}
      />

      <BehandlungenCTA />
    </main>
  );
}
