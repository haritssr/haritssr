interface OpenGraphCardProps {
  title: string;
  description: string;
  path: string;
  background: string;
}

const sections: Record<string, { label: string; action: string }> = {
  blog: { label: "Blog", action: "Read the writing" },
  projects: { label: "Projects", action: "Explore the work" },
  experiments: { label: "Experiments", action: "Explore the experiment" },
  design: { label: "Design", action: "Explore the design system" },
};

function getHeadlineFontSize(title: string): number {
  if (title.length > 85) {
    return 50;
  }
  if (title.length > 45) {
    return 60;
  }
  return 76;
}

export default function OpenGraphCard({
  title,
  description,
  path,
  background,
}: OpenGraphCardProps) {
  const section = sections[path.split("/")[1] ?? ""];
  const [name, role] = title.split(" — ");
  const headline = path === "/" ? (name ?? title) : title;
  const fontSize = getHeadlineFontSize(headline);
  const subtitle = path === "/" && role !== undefined ? role : description;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "52px 64px",
        overflow: "hidden",
        backgroundColor: "#FAFCF2",
        backgroundImage: `url(${background})`,
        backgroundSize: "100% 100%",
        color: "#204C5D",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 23,
        }}
      >
        <span>Harits Syah / {section?.label ?? "Portfolio"}</span>
        <span>haritssr.com</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 42,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            lineClamp: 3,
            wordBreak: "break-word",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 26,
            lineHeight: 1.4,
            lineClamp: 2,
            wordBreak: "break-word",
          }}
        >
          {subtitle}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 64,
          bottom: 142,
          alignItems: "center",
          gap: 20,
          border: "2px solid #204C5D",
          borderRadius: 40,
          padding: "14px 24px",
          backgroundColor: "#FAFCF2",
          fontSize: 23,
        }}
      >
        <span>
          {section?.action ?? "Explore projects, experiments & writing"}
        </span>
        <svg
          aria-hidden="true"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M5 19 19 5M5 5h14v14"
            stroke="#204C5D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
