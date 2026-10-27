import SharedToggleList from "@/components/ToggleList";

const nodes = [
  {
    id: "subject",
    label: "Subjek: Fisika",
    children: [
      {
        id: "domain",
        label: "Domain: Fluida",
        children: [
          {
            id: "chapter",
            label: "Bab: Fluida Statis",
            children: [
              { id: "density", label: "Massa Jenis" },
              { id: "pressure", label: "Tekanan" },
              { id: "hydrostatic-pressure", label: "Tekanan Hidrostatis" },
              { id: "pascal", label: "Hukum Pascal" },
              { id: "archimedes", label: "Hukum Archimedes" },
              { id: "surface-tension", label: "Tegangan Permukaan" },
              { id: "capillarity", label: "Kapilaritas" },
            ],
          },
        ],
      },
    ],
  },
];

export default function ToggleList() {
  return <SharedToggleList label="Example reference hierarchy" nodes={nodes} />;
}
