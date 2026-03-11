import BehandlungItem from "./BehandlungItem";

type Treatment = {
  title: string;
  description: string;
};

type BehandlungAccordionProps = {
  items: Treatment[];
};

export default function BehandlungAccordion({
  items,
}: BehandlungAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <BehandlungItem
          key={item.title}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}