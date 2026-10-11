interface OpenGraphCardProps {
  title: string;
  path: string;
}

function getHierarchy(path: string): string {
  const parents = path.split("/").filter(Boolean).slice(0, -1);
  return parents.length === 0
    ? "Home"
    : parents
        .map((segment) =>
          segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
        .join(" / ");
}

function getHeadlineFontSize(title: string): number {
  if (title.length > 140) {
    return 52;
  }
  if (title.length > 85) {
    return 64;
  }
  if (title.length > 45) {
    return 80;
  }
  return 104;
}

export default function OpenGraphCard({ title, path }: OpenGraphCardProps) {
  const headline = path === "/" ? title.split(" — ")[0] : title;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "100px 72px",
        backgroundColor: "#DDEFFF",
        backgroundImage:
          "linear-gradient(120deg, #F0F7FF 0%, #C5E5FF 55%, #7DC8FF 80%, #1B85FF 100%)",
        color: "#082C66",
      }}
    >
      <div style={{ display: "flex", fontSize: 34, lineHeight: 1.2 }}>
        {getHierarchy(path)}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          padding: "24px 0",
        }}
      >
        <div
          style={{
            fontSize: getHeadlineFontSize(headline),
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            wordBreak: "break-word",
          }}
        >
          {headline}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 32,
          lineHeight: 1.2,
        }}
      >
        <span style={{ fontWeight: 700 }}>haritssr.com</span>
        <span>· By Harits Syah</span>
      </div>
    </div>
  );
}
