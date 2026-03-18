import Image from "next/image";
import BehandlungAccordion from "./BehandlungAccordion";

type Treatment = {
  title: string;
  description: string;
};

type Props = {
  id: string;
  title: string;
  intro: string;
  items: Treatment[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  lightBackground?: boolean;
};

export default function BehandlungSection({
  id,
  title,
  intro,
  items,
  imageSrc,
  imageAlt,
  reverse = false,
  lightBackground = false,
}: Props) {
  return (
    <section
      id={id}
      className={`py-20 md:py-24 ${
        lightBackground ? "bg-gradient-to-b from-emerald-50/80 to-white" : "bg-white"
      }`}
    >
      <div
        className="mx-auto grid max-w-6xl gap-10 px-6 md:gap-12 lg:grid-cols-2 lg:items-center"
      >
        {/* TEXTO */}
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-400" />
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Behandlungen
            </p>
          </div>

          <h2 className="mb-4 text-3xl font-semibold text-emerald-700 md:text-4xl">{title}</h2>

          <p className="text-gray-600 mb-8 leading-relaxed">{intro}</p>

          <BehandlungAccordion items={items} />
        </div>

        {/* IMAGEM */}
        {imageSrc && (
          <div
            className={`group relative h-[320px] w-full overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-md sm:h-[360px] lg:h-[420px] ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
