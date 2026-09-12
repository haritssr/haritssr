"use client";

import { useDeferredValue, useMemo, useState } from "react";

import ExternalLink from "@/components/ExternalLink";

import {
  FEATURE_GROUPS,
  LAST_SYNCED,
  NOTION_DATABASE_URL,
  problemFeatureMappings,
  TOTAL_CONNECTIONS,
} from "./data";
import type { FeatureGroup, ProblemFeatureMapping } from "./data";

type FilterGroup = "All" | FeatureGroup;
type NodeId = `feature:${string}` | `problem:${string}`;

interface FeatureNode {
  group: FeatureGroup;
  id: NodeId;
  name: string;
  problemCount: number;
}

interface NodePosition {
  height: number;
  left: number;
  top: number;
  width: number;
}

const GRAPH_WIDTH = 1160;
const GRAPH_TOP_PADDING = 56;
const PROBLEM_WIDTH = 220;
const PROBLEM_HEIGHT = 70;
const PROBLEM_GAP = 14;
const FEATURE_WIDTH = 206;
const FEATURE_HEIGHT = 82;
const FEATURE_GAP = 14;
const PROBLEM_COLUMN_LEFTS = [24, 266];
const FEATURE_COLUMN_LEFTS = [718, 946];

const GROUP_STYLES: Record<
  FeatureGroup,
  { chip: string; dot: string; node: string; stroke: string }
> = {
  Analisis: {
    chip: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
    node: "border-amber-200 bg-amber-50/80 text-amber-950",
    stroke: "#f59e0b",
  },
  Bimbel: {
    chip: "border-sky-200 bg-sky-50 text-sky-800",
    dot: "bg-sky-500",
    node: "border-sky-200 bg-sky-50/80 text-sky-950",
    stroke: "#0ea5e9",
  },
  Kalkulator: {
    chip: "border-orange-200 bg-orange-50 text-orange-800",
    dot: "bg-orange-500",
    node: "border-orange-200 bg-orange-50/80 text-orange-950",
    stroke: "#f97316",
  },
  Pencarian: {
    chip: "border-slate-200 bg-slate-50 text-slate-800",
    dot: "bg-slate-500",
    node: "border-slate-200 bg-slate-50/80 text-slate-950",
    stroke: "#64748b",
  },
  Referensi: {
    chip: "border-rose-200 bg-rose-50 text-rose-800",
    dot: "bg-rose-500",
    node: "border-rose-200 bg-rose-50/80 text-rose-950",
    stroke: "#f43f5e",
  },
  Statistik: {
    chip: "border-violet-200 bg-violet-50 text-violet-800",
    dot: "bg-violet-500",
    node: "border-violet-200 bg-violet-50/80 text-violet-950",
    stroke: "#8b5cf6",
  },
  Tes: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
    node: "border-emerald-200 bg-emerald-50/80 text-emerald-950",
    stroke: "#10b981",
  },
};

function getFeatureGroup(featureName: string): FeatureGroup {
  const [group] = featureName.split("/");
  return FEATURE_GROUPS.find((candidate) => candidate === group) ?? "Referensi";
}

function getFeatureNodeId(featureName: string): NodeId {
  return `feature:${featureName}`;
}

function getProblemNodeId(problemId: string): NodeId {
  return `problem:${problemId}`;
}

function normalizeText(value: string) {
  return value.toLocaleLowerCase();
}

function formatFeatureName(featureName: string) {
  return featureName.replaceAll("/", " / ");
}

function getNodePath(source: NodePosition, target: NodePosition) {
  const sourceX = source.left + source.width;
  const sourceY = source.top + source.height / 2;
  const targetX = target.left;
  const targetY = target.top + target.height / 2;
  const curve = Math.max(68, (targetX - sourceX) * 0.5);

  return `M ${sourceX} ${sourceY} C ${sourceX + curve} ${sourceY}, ${
    targetX - curve
  } ${targetY}, ${targetX} ${targetY}`;
}

function getSelectionLabel(selectedNode: NodeId | null) {
  if (!selectedNode) {
    return "Nothing selected";
  }
  return selectedNode.startsWith("problem:")
    ? "Problem selected"
    : "Feature selected";
}

function SelectionDetails({
  featureById,
  mappingById,
  onSelect,
  selectedNode,
}: {
  featureById: Map<NodeId, FeatureNode>;
  mappingById: Map<string, ProblemFeatureMapping>;
  onSelect: (nodeId: NodeId) => void;
  selectedNode: NodeId | null;
}) {
  const selectedProblem = selectedNode?.startsWith("problem:")
    ? mappingById.get(selectedNode.slice("problem:".length))
    : undefined;
  const selectedFeature = selectedNode?.startsWith("feature:")
    ? featureById.get(selectedNode)
    : undefined;

  if (selectedProblem) {
    return (
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
            Student problem
          </p>
          <h2 className="text-lg leading-snug font-semibold text-zinc-900">
            {selectedProblem.problem}
          </h2>
        </div>
        <p className="text-sm leading-6 text-zinc-600">
          {selectedProblem.transformation}
        </p>
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
            Connected features
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedProblem.features.map((featureName) => {
              const feature = featureById.get(getFeatureNodeId(featureName));
              if (!feature) {
                return null;
              }
              return (
                <button
                  className={`rounded-full border px-2.5 py-1 text-left text-xs transition hover:-translate-y-px ${GROUP_STYLES[feature.group].chip}`}
                  key={feature.name}
                  onClick={() => {
                    onSelect(feature.id);
                  }}
                  type="button"
                >
                  {formatFeatureName(feature.name)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <ExternalLink
            href={selectedProblem.mappingUrl}
            name="Open mapping in Notion"
          />
          <ExternalLink
            href={selectedProblem.linkedPageUrl}
            name="Open related page"
          />
        </div>
      </div>
    );
  }

  if (selectedFeature) {
    const relatedProblems = [...mappingById.values()].filter((mapping) =>
      mapping.features.includes(selectedFeature.name)
    );

    return (
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
            HL feature
          </p>
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${GROUP_STYLES[selectedFeature.group].dot}`}
            />
            <h2 className="text-lg leading-snug font-semibold text-zinc-900">
              {formatFeatureName(selectedFeature.name)}
            </h2>
          </div>
          <p className="text-sm text-zinc-500">
            Connected to {selectedFeature.problemCount} student problem
            {selectedFeature.problemCount === 1 ? "" : "s"}.
          </p>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
            Problems it addresses
          </p>
          <div className="space-y-1.5">
            {relatedProblems.map((mapping) => (
              <button
                className="block w-full rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                key={mapping.id}
                onClick={() => {
                  onSelect(getProblemNodeId(mapping.id));
                }}
                type="button"
              >
                {mapping.problem}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-48 flex-col justify-between gap-8">
      <div>
        <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
          {getSelectionLabel(selectedNode)}
        </p>
        <h2 className="text-lg font-semibold text-zinc-900">Explore the map</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Select any problem or feature to highlight its connections and inspect
          the transformation described in the database.
        </p>
      </div>
      <p className="text-sm text-zinc-400">
        Tip: search for a phrase like “lupa” or filter by a feature family.
      </p>
    </div>
  );
}

export default function GraphView() {
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<FilterGroup>("All");
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const deferredQuery = useDeferredValue(normalizeText(query.trim()));

  const featureNodes = useMemo<FeatureNode[]>(() => {
    const problemCounts = new Map<string, number>();

    for (const mapping of problemFeatureMappings) {
      for (const featureName of mapping.features) {
        problemCounts.set(
          featureName,
          (problemCounts.get(featureName) ?? 0) + 1
        );
      }
    }

    return [...problemCounts.keys()].map((name) => ({
      group: getFeatureGroup(name),
      id: getFeatureNodeId(name),
      name,
      problemCount: problemCounts.get(name) ?? 0,
    }));
  }, []);

  const featureById = useMemo(
    () => new Map(featureNodes.map((feature) => [feature.id, feature])),
    [featureNodes]
  );

  const mappingById = useMemo(
    () =>
      new Map(problemFeatureMappings.map((mapping) => [mapping.id, mapping])),
    []
  );

  const { visibleFeatures, visibleMappings } = useMemo(() => {
    const directProblemMatches = new Set<string>();
    const directFeatureMatches = new Set<string>();

    if (deferredQuery) {
      for (const mapping of problemFeatureMappings) {
        const searchableProblem = normalizeText(
          `${mapping.problem} ${mapping.transformation}`
        );
        if (searchableProblem.includes(deferredQuery)) {
          directProblemMatches.add(mapping.id);
        }
      }
      for (const feature of featureNodes) {
        if (normalizeText(feature.name).includes(deferredQuery)) {
          directFeatureMatches.add(feature.name);
        }
      }
    }

    const mappings = problemFeatureMappings.filter((mapping) => {
      const groupMatches =
        selectedGroup === "All" ||
        mapping.features.some(
          (featureName) => getFeatureGroup(featureName) === selectedGroup
        );
      const queryMatches =
        !deferredQuery ||
        directProblemMatches.has(mapping.id) ||
        mapping.features.some((featureName) =>
          directFeatureMatches.has(featureName)
        );

      return groupMatches && queryMatches;
    });

    const features = featureNodes.filter((feature) => {
      const groupMatches =
        selectedGroup === "All" || feature.group === selectedGroup;
      const queryMatches =
        !deferredQuery ||
        directFeatureMatches.has(feature.name) ||
        mappings.some(
          (mapping) =>
            directProblemMatches.has(mapping.id) &&
            mapping.features.includes(feature.name)
        );

      return groupMatches && queryMatches;
    });

    return { visibleFeatures: features, visibleMappings: mappings };
  }, [deferredQuery, featureNodes, selectedGroup]);

  const graphLayout = useMemo(() => {
    const problemPositions = new Map<NodeId, NodePosition>();
    const featurePositions = new Map<NodeId, NodePosition>();

    for (const [index, mapping] of visibleMappings.entries()) {
      const column = index % 2;
      const row = Math.floor(index / 2);
      problemPositions.set(getProblemNodeId(mapping.id), {
        height: PROBLEM_HEIGHT,
        left: PROBLEM_COLUMN_LEFTS[column],
        top: GRAPH_TOP_PADDING + row * (PROBLEM_HEIGHT + PROBLEM_GAP),
        width: PROBLEM_WIDTH,
      });
    }

    for (const [index, feature] of visibleFeatures.entries()) {
      const column = index % 2;
      const row = Math.floor(index / 2);
      featurePositions.set(feature.id, {
        height: FEATURE_HEIGHT,
        left: FEATURE_COLUMN_LEFTS[column],
        top: GRAPH_TOP_PADDING + row * (FEATURE_HEIGHT + FEATURE_GAP),
        width: FEATURE_WIDTH,
      });
    }

    const problemRows = Math.ceil(visibleMappings.length / 2);
    const featureRows = Math.ceil(visibleFeatures.length / 2);
    const contentHeight = Math.max(
      problemRows * (PROBLEM_HEIGHT + PROBLEM_GAP),
      featureRows * (FEATURE_HEIGHT + FEATURE_GAP),
      180
    );

    return {
      featurePositions,
      graphHeight: GRAPH_TOP_PADDING + contentHeight + 24,
      problemPositions,
    };
  }, [visibleFeatures, visibleMappings]);

  const visibleFeatureIds = useMemo(
    () => new Set(visibleFeatures.map((feature) => feature.name)),
    [visibleFeatures]
  );

  const visibleRelationCount = useMemo(
    () =>
      visibleMappings.reduce(
        (count, mapping) =>
          count +
          mapping.features.filter((featureName) =>
            visibleFeatureIds.has(featureName)
          ).length,
        0
      ),
    [visibleFeatureIds, visibleMappings]
  );

  const selectedProblemId = selectedNode?.startsWith("problem:")
    ? selectedNode.slice("problem:".length)
    : null;
  const selectedFeatureName = selectedNode?.startsWith("feature:")
    ? selectedNode.slice("feature:".length)
    : null;

  function isProblemActive(mapping: ProblemFeatureMapping) {
    if (!selectedNode) {
      return true;
    }
    if (selectedProblemId) {
      return selectedProblemId === mapping.id;
    }
    return Boolean(
      selectedFeatureName && mapping.features.includes(selectedFeatureName)
    );
  }

  function isFeatureActive(feature: FeatureNode) {
    if (!selectedNode) {
      return true;
    }
    if (selectedFeatureName) {
      return selectedFeatureName === feature.name;
    }
    return Boolean(
      selectedProblemId &&
      mappingById.get(selectedProblemId)?.features.includes(feature.name)
    );
  }

  function isRelationActive(
    mapping: ProblemFeatureMapping,
    featureName: string
  ) {
    if (!selectedNode) {
      return true;
    }
    return (
      selectedProblemId === mapping.id || selectedFeatureName === featureName
    );
  }

  function handleNodeSelect(nodeId: NodeId) {
    setSelectedNode((previous) => (previous === nodeId ? null : nodeId));
  }

  const explorerClassName = isExpanded
    ? "fixed inset-0 z-50 grid gap-5 overflow-y-auto overscroll-contain bg-white p-3 sm:p-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:items-start"
    : "grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start";
  const detailsClassName = isExpanded
    ? "h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-6"
    : "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-5";

  return (
    <div className="pb-24">
      <ExternalLink href={NOTION_DATABASE_URL} name="Open source database" />
      <div className="mb-5" />
      <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        <Stat label="Problems" value={problemFeatureMappings.length} />
        <Stat label="Features" value={featureNodes.length} />
        <Stat label="Connections" value={TOTAL_CONNECTIONS} />
        <div className="hidden rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-3 sm:block">
          <p className="text-[11px] tracking-wide text-zinc-400 uppercase">
            Synced
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-800">
            {LAST_SYNCED}
          </p>
        </div>
      </div>

      <div className="mb-5 space-y-4">
        <label className="block">
          <span className="sr-only">
            Search problems, transformations, or features
          </span>
          <input
            aria-label="Search problems, transformations, or features"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-sm transition outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
            onChange={(event) => {
              setQuery(event.currentTarget.value);
            }}
            placeholder="Search problems, transformations, or features…"
            type="search"
            value={query}
          />
        </label>
        <fieldset
          aria-label="Filter by feature family"
          className="flex flex-wrap gap-2"
        >
          <legend className="sr-only">Filter by feature family</legend>
          {(["All", ...FEATURE_GROUPS] as FilterGroup[]).map((group) => {
            const isSelected = selectedGroup === group;
            const style = group === "All" ? null : GROUP_STYLES[group];
            let filterClassName =
              "rounded-full border px-3 py-1.5 text-xs transition";
            if (isSelected) {
              filterClassName += " border-zinc-900 bg-zinc-900 text-white";
            } else if (style) {
              filterClassName += ` ${style.chip} hover:-translate-y-px`;
            } else {
              filterClassName +=
                " border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900";
            }
            return (
              <button
                aria-pressed={isSelected}
                className={filterClassName}
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                }}
                type="button"
              >
                {group}
              </button>
            );
          })}
        </fieldset>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-500">
        <p>
          Showing{" "}
          <span className="font-medium text-zinc-800">
            {visibleMappings.length}
          </span>{" "}
          of {problemFeatureMappings.length} problems and{" "}
          <span className="font-medium text-zinc-800">
            {visibleRelationCount}
          </span>{" "}
          connections
        </p>
        {selectedNode ? (
          <button
            className="text-action hover:text-action-hover hover:underline"
            onClick={() => {
              setSelectedNode(null);
            }}
            type="button"
          >
            Clear selection
          </button>
        ) : null}
      </div>

      <div className={explorerClassName}>
        <section
          aria-label={
            isExpanded
              ? "Expanded problem to feature graph"
              : "Problem to feature graph"
          }
          className="min-w-0 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-2 shadow-sm sm:p-3"
          id="problem-to-feature-graph"
        >
          <div className="mb-2 flex items-center justify-between gap-3 px-2 pt-1">
            <span className="text-[11px] tracking-[0.14em] text-zinc-400 uppercase">
              Student problems
            </span>
            <button
              aria-controls="problem-to-feature-graph"
              aria-pressed={isExpanded}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
              onClick={() => {
                setIsExpanded((expanded) => !expanded);
              }}
              title={isExpanded ? "Close expanded graph" : "Expand graph"}
              type="button"
            >
              {isExpanded ? "Close expanded view" : "Expand graph"}
            </button>
            <span className="text-[11px] tracking-[0.14em] text-zinc-400 uppercase">
              HL features
            </span>
          </div>
          {visibleMappings.length > 0 ? (
            <div className="scrollbar-hide overflow-x-auto rounded-xl border border-zinc-200 bg-white">
              <div
                className="relative mx-auto"
                style={{ height: graphLayout.graphHeight, width: GRAPH_WIDTH }}
              >
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${GRAPH_WIDTH} ${graphLayout.graphHeight}`}
                >
                  {visibleMappings.flatMap((mapping) => {
                    const source = graphLayout.problemPositions.get(
                      getProblemNodeId(mapping.id)
                    );
                    if (!source) {
                      return [];
                    }
                    return mapping.features.flatMap((featureName) => {
                      if (!visibleFeatureIds.has(featureName)) {
                        return [];
                      }
                      const target = graphLayout.featurePositions.get(
                        getFeatureNodeId(featureName)
                      );
                      if (!target) {
                        return [];
                      }
                      const active = isRelationActive(mapping, featureName);
                      return (
                        <path
                          d={getNodePath(source, target)}
                          fill="none"
                          key={`${mapping.id}-${featureName}`}
                          opacity={active ? 0.62 : 0.08}
                          stroke={
                            GROUP_STYLES[getFeatureGroup(featureName)].stroke
                          }
                          strokeLinecap="round"
                          strokeWidth={active ? 2.2 : 1.2}
                        />
                      );
                    });
                  })}
                </svg>

                {visibleMappings.map((mapping, index) => {
                  const position = graphLayout.problemPositions.get(
                    getProblemNodeId(mapping.id)
                  );
                  if (!position) {
                    return null;
                  }
                  const active = isProblemActive(mapping);
                  const selected = selectedProblemId === mapping.id;
                  return (
                    <button
                      aria-label={`Student problem: ${mapping.problem}`}
                      aria-pressed={selected}
                      className={`absolute flex flex-col justify-center rounded-xl border px-3 text-left shadow-sm transition duration-150 hover:-translate-y-px hover:shadow-md ${
                        selected
                          ? "z-10 border-zinc-900 bg-white ring-2 ring-zinc-900/10"
                          : "border-zinc-200 bg-white"
                      } ${active ? "opacity-100" : "opacity-30"}`}
                      key={mapping.id}
                      onClick={() => {
                        handleNodeSelect(getProblemNodeId(mapping.id));
                      }}
                      style={{
                        height: position.height,
                        left: position.left,
                        top: position.top,
                        width: position.width,
                      }}
                      title={mapping.problem}
                      type="button"
                    >
                      <span className="mb-1 flex items-center gap-1.5 text-[10px] tracking-wide text-zinc-400 uppercase">
                        <span className="font-semibold text-zinc-500">
                          P{index + 1}
                        </span>
                        <span>·</span>
                        <span>{mapping.features.length} features</span>
                      </span>
                      <span className="line-clamp-2 text-[13px] leading-4 font-medium text-zinc-800">
                        {mapping.problem}
                      </span>
                    </button>
                  );
                })}

                {visibleFeatures.map((feature) => {
                  const position = graphLayout.featurePositions.get(feature.id);
                  if (!position) {
                    return null;
                  }
                  const active = isFeatureActive(feature);
                  const selected = selectedFeatureName === feature.name;
                  const style = GROUP_STYLES[feature.group];
                  return (
                    <button
                      aria-label={`HL feature: ${formatFeatureName(feature.name)}`}
                      aria-pressed={selected}
                      className={`absolute flex flex-col justify-center rounded-xl border px-3 text-left shadow-sm transition duration-150 hover:-translate-y-px hover:shadow-md ${
                        selected
                          ? "z-10 border-zinc-900 ring-2 ring-zinc-900/10"
                          : style.node
                      } ${active ? "opacity-100" : "opacity-30"}`}
                      key={feature.id}
                      onClick={() => {
                        handleNodeSelect(feature.id);
                      }}
                      style={{
                        height: position.height,
                        left: position.left,
                        top: position.top,
                        width: position.width,
                      }}
                      title={formatFeatureName(feature.name)}
                      type="button"
                    >
                      <span className="mb-1 flex items-center gap-1.5 text-[10px] tracking-wide uppercase">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                        />
                        <span className="text-zinc-500">{feature.group}</span>
                      </span>
                      <span className="line-clamp-2 text-[13px] leading-4 font-medium">
                        {formatFeatureName(feature.name)}
                      </span>
                      <span className="mt-1 text-[11px] text-zinc-500">
                        {feature.problemCount} problem
                        {feature.problemCount === 1 ? "" : "s"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 text-center">
              <div>
                <p className="font-medium text-zinc-800">
                  No connections found
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Try a different search term or feature family.
                </p>
              </div>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 px-2 pb-1 text-xs text-zinc-500">
            {FEATURE_GROUPS.map((group) => (
              <span className="flex items-center gap-1.5" key={group}>
                <span
                  className={`h-2 w-2 rounded-full ${GROUP_STYLES[group].dot}`}
                />
                {group}
              </span>
            ))}
          </div>
        </section>

        <aside className={detailsClassName}>
          <SelectionDetails
            featureById={featureById}
            mappingById={mappingById}
            onSelect={handleNodeSelect}
            selectedNode={selectedNode}
          />
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-3">
      <p className="text-[11px] tracking-wide text-zinc-400 uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg font-medium text-zinc-800">{value}</p>
    </div>
  );
}
