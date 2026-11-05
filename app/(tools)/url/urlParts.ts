const decode = (text: string) => {
  try {
    return decodeURIComponent(text.replaceAll("+", " "));
  } catch {
    return text;
  }
};

export function normalizePastedURL(input: string) {
  const source = input.trim();
  if (
    (source.startsWith("‘") && source.endsWith("’")) ||
    (source.startsWith("“") && source.endsWith("”"))
  ) {
    return source.slice(1, -1).trim();
  }
  return source;
}

export function parseURL(input: string) {
  const source = input.trim();
  if (!source) {
    return null;
  }
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return null;
  }
  const hashIndex = source.indexOf("#");
  const beforeHash = hashIndex === -1 ? source : source.slice(0, hashIndex);
  const queryIndex = beforeHash.indexOf("?");
  const query = queryIndex === -1 ? null : beforeHash.slice(queryIndex + 1);
  return {
    base: queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex),
    fragment: hashIndex === -1 ? "" : source.slice(hashIndex),
    query,
    parameters: query === null ? [] : query.split("&"),
    pathname: url.pathname,
  };
}

export type ParsedURL = NonNullable<ReturnType<typeof parseURL>>;

export function cleanURL(
  parsed: ParsedURL | null,
  removed: ReadonlySet<number>,
  removeFragment: boolean
) {
  if (!parsed) {
    return "";
  }
  const kept = parsed.parameters.filter((_, index) => !removed.has(index));
  return `${parsed.base}${kept.length ? `?${kept.join("&")}` : ""}${removeFragment ? "" : parsed.fragment}`;
}

/** Automatic mode drops the fragment after a query or when it holds a text fragment. */
export function removeFragmentAutomatically(parsed: ParsedURL | null) {
  return (
    parsed !== null &&
    (parsed.query !== null || parseTextFragments(parsed.fragment).length > 0)
  );
}

export interface TextFragment {
  prefix: string;
  start: string;
  end: string;
  suffix: string;
}

/** Reads `text=` directives that follow `:~:` in a fragment. */
export function parseTextFragments(fragment: string): TextFragment[] {
  const marker = fragment.indexOf(":~:");
  if (marker === -1) {
    return [];
  }
  return fragment
    .slice(marker + 3)
    .split("&")
    .filter((directive) => directive.startsWith("text="))
    .map((directive) => {
      const parts = directive.slice(5).split(",");
      const prefix =
        parts[0]?.endsWith("-") && parts.length > 1 ? parts.shift() : undefined;
      const suffix =
        parts.length > 1 && parts.at(-1)?.startsWith("-") === true
          ? parts.pop()
          : undefined;
      return {
        prefix: decode(prefix?.slice(0, -1) ?? ""),
        start: decode(parts[0] ?? ""),
        end: decode(parts[1] ?? ""),
        suffix: decode(suffix?.slice(1) ?? ""),
      };
    });
}

export function parameterLabel(raw: string) {
  const index = raw.indexOf("=");
  const name = index === -1 ? raw : raw.slice(0, index);
  const value = index === -1 ? "" : raw.slice(index + 1);

  return { name: decode(name) || "(empty name)", value: decode(value) };
}
