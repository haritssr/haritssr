export const HTTP_METHOD_COLORS: Record<string, string> = {
  GET: "bg-[#00d1ad]/10 text-[#008c75]",
  POST: "bg-[#72c4ef]/10 text-[#167ba9]",
  PUT: "bg-[#dc8be9]/10 text-[#a13db1]",
  PATCH: "bg-[#b7a0f3]/10 text-[#7753c3]",
  DELETE: "bg-[#f18ba6]/10 text-[#c04468]",
};

export default function HttpMethodBadge({ method }: { method: string }) {
  return (
    <span
      className={`rounded-md px-2 py-0 font-mono text-sm leading-6 font-medium ${HTTP_METHOD_COLORS[method] ?? ""}`}
    >
      {method}
    </span>
  );
}
