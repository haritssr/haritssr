import SharedToggleList from "@/components/ToggleList";

const nodes = [
  {
    id: "subject",
    label: "Subjek: Matematika",
    children: [
      {
        id: "domain",
        label: "Domain: Fondasi Matematika",
        children: [
          {
            id: "chapter",
            label: "Bab: Himpunan",
            children: [
              { id: "notation", label: "Notasi dan Jenis Himpunan" },
              { id: "operations", label: "Operasi Himpunan" },
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
