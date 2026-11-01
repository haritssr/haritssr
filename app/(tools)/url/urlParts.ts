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
  return input;
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

export function parameterLabel(raw: string) {
  const index = raw.indexOf("=");
  const name = index === -1 ? raw : raw.slice(0, index);
  const value = index === -1 ? "" : raw.slice(index + 1);

  return { name: decode(name) || "(empty name)", value: decode(value) };
}
