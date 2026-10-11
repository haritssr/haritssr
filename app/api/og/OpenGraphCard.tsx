interface OpenGraphCardProps {
  title: string;
  path: string;
}

function getHierarchy(path: string): string {
  const parents = path.split("/").filter(Boolean).slice(0, -1);
  return parents.length === 0
    ? ""
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

function getSingleLineFontSize(text: string, maximum: number): number {
  return Math.min(maximum, Math.floor(1000 / (text.length * 0.7)));
}

export default function OpenGraphCard({ title, path }: OpenGraphCardProps) {
  const experimentTitle = path.startsWith("/experiments/")
    ? /^(?<headline>.+) \| (?<subtitle>.+ Experiments)$/u.exec(title)
    : null;
  const headline =
    experimentTitle?.groups?.headline ??
    (path === "/" ? title.split(" — ")[0] : title);
  const subtitle = experimentTitle?.groups?.subtitle ?? "";
  const hierarchy = getHierarchy(path);

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
      {hierarchy ? (
        <div style={{ display: "flex", fontSize: 34, lineHeight: 1.2 }}>
          {hierarchy}
        </div>
      ) : null}
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
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: subtitle
              ? getSingleLineFontSize(headline, 104)
              : getHeadlineFontSize(headline),
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            wordBreak: "break-word",
          }}
        >
          <div style={{ whiteSpace: subtitle ? "nowrap" : "normal" }}>
            {headline}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: getSingleLineFontSize(subtitle, 56),
                fontWeight: 400,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {subtitle}
            </div>
          ) : null}
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
