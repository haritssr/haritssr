"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useId, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface PrerequisiteGraphNodeData {
  id: string;
  kind: "base" | "derived";
  label: string;
  symbol: ReactNode;
}

export interface PrerequisiteGraphEdgeData {
  from: string;
  to: string;
}

interface NodePosition {
  left: number;
  top: number;
}

interface GraphLayout {
  height: number;
  positions: Map<string, NodePosition>;
  width: number;
}

type GraphStyle = CSSProperties & Record<`--${string}`, string>;

const NODE_HEIGHT = 60;
const NODE_WIDTH = 164;
const COLUMN_GAP = 72;
const GRAPH_PADDING = 24;
const MAX_NODES_PER_COLUMN = 12;
const ROW_GAP = 14;

export default function PrerequisiteGraph({
  edges,
  nodes,
}: {
  edges: readonly PrerequisiteGraphEdgeData[];
  nodes: readonly PrerequisiteGraphNodeData[];
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const nodeById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );
  const prerequisitesByNode = useMemo(
    () => createPrerequisiteMap(edges),
    [edges]
  );
  const layout = useMemo(() => createGraphLayout(nodes, edges), [edges, nodes]);
  const activeNodeDepths = useMemo(() => {
    if (selectedNodeId === null) {
      return null;
    }

    const depths = new Map([[selectedNodeId, 0]]);
    const pending = [selectedNodeId];

    while (pending.length > 0) {
      const currentNodeId = pending.pop();

      if (currentNodeId === undefined) {
        continue;
      }

      const currentDepth = depths.get(currentNodeId) ?? 0;

      for (const prerequisiteId of prerequisitesByNode.get(currentNodeId) ??
        []) {
        const nextDepth = currentDepth + 1;
        const previousDepth = depths.get(prerequisiteId);

        if (previousDepth !== undefined && previousDepth <= nextDepth) {
          continue;
        }

        depths.set(prerequisiteId, nextDepth);
        pending.push(prerequisiteId);
      }
    }

    return depths;
  }, [prerequisitesByNode, selectedNodeId]);
  const activeNodeIds = useMemo(
    () => (activeNodeDepths === null ? null : new Set(activeNodeDepths.keys())),
    [activeNodeDepths]
  );
  const activeEdgeKeys = useMemo(() => {
    if (activeNodeIds === null) {
      return null;
    }

    return new Set(
      edges
        .filter(
          (edge) => activeNodeIds.has(edge.from) && activeNodeIds.has(edge.to)
        )
        .map(getEdgeKey)
    );
  }, [activeNodeIds, edges]);
  const selectedNode =
    selectedNodeId === null ? undefined : nodeById.get(selectedNodeId);

  function resetSelection() {
    setSelectedNodeId(null);
  }

  function selectNode(nodeId: string) {
    setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
  }

  return (
    <Dialog.Root>
      <div className="border-border bg-background overflow-hidden rounded-2xl border">
        <GraphToolbar
          onReset={resetSelection}
          selectedNode={selectedNode}
          showFullViewButton
        />
        <GraphStatus
          activeNodeIds={activeNodeIds}
          selectedNode={selectedNode}
        />
        <GraphViewport
          activeEdgeKeys={activeEdgeKeys}
          activeNodeDepths={activeNodeDepths}
          activeNodeIds={activeNodeIds}
          edges={edges}
          layout={layout}
          nodes={nodes}
          onSelectNode={selectNode}
          selectedNodeId={selectedNodeId}
        />
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/30 fixed inset-0 z-90 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="bg-background text-foreground fixed inset-0 z-90 flex min-h-0 flex-col outline-hidden">
          <div className="border-border flex shrink-0 items-center justify-between border-b px-3 py-2.5">
            <Dialog.Title className="text-sm font-medium">
              Graf Prasyarat
            </Dialog.Title>
            <Dialog.Close
              aria-label="Tutup tampilan penuh"
              className="text-foreground/60 hover:bg-interface-hover hover:text-foreground focus-visible:outline-action inline-flex size-9 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2"
              type="button"
            >
              <XMarkIcon aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <GraphToolbar
            onReset={resetSelection}
            selectedNode={selectedNode}
            showFullViewButton={false}
          />
          <GraphStatus
            activeNodeIds={activeNodeIds}
            selectedNode={selectedNode}
          />
          <GraphViewport
            activeEdgeKeys={activeEdgeKeys}
            activeNodeDepths={activeNodeDepths}
            activeNodeIds={activeNodeIds}
            edges={edges}
            fullView
            layout={layout}
            nodes={nodes}
            onSelectNode={selectNode}
            selectedNodeId={selectedNodeId}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function getEdgeKey(edge: PrerequisiteGraphEdgeData) {
  return `${edge.from}->${edge.to}`;
}

function getEdgePath(source: NodePosition, target: NodePosition) {
  if (source.left === target.left) {
    const sourceX = source.left + NODE_WIDTH / 2;
    const sourceIsAbove = source.top < target.top;
    const sourceY = source.top + (sourceIsAbove ? NODE_HEIGHT : 0);
    const targetY = target.top + (sourceIsAbove ? 0 : NODE_HEIGHT);
    const curve = Math.max(28, Math.abs(targetY - sourceY) * 0.4);

    return `M ${sourceX} ${sourceY} C ${sourceX} ${sourceY + (sourceIsAbove ? curve : -curve)}, ${sourceX} ${targetY - (sourceIsAbove ? curve : -curve)}, ${sourceX} ${targetY}`;
  }

  const sourceIsLeft = source.left < target.left;
  const sourceX = source.left + (sourceIsLeft ? NODE_WIDTH : 0);
  const targetX = target.left + (sourceIsLeft ? 0 : NODE_WIDTH);
  const sourceY = source.top + NODE_HEIGHT / 2;
  const targetY = target.top + NODE_HEIGHT / 2;
  const direction = sourceIsLeft ? 1 : -1;
  const curve = Math.max(28, Math.abs(targetX - sourceX) * 0.45);

  return `M ${sourceX} ${sourceY} C ${sourceX + direction * curve} ${sourceY}, ${targetX - direction * curve} ${targetY}, ${targetX} ${targetY}`;
}

function createGraphLayout(
  nodes: readonly PrerequisiteGraphNodeData[],
  edges: readonly PrerequisiteGraphEdgeData[]
): GraphLayout {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const prerequisitesByNode = new Map<string, string[]>();

  for (const edge of edges) {
    const prerequisites = prerequisitesByNode.get(edge.to) ?? [];
    prerequisites.push(edge.from);
    prerequisitesByNode.set(edge.to, prerequisites);
  }

  const layerByNode = new Map<string, number>();

  function getLayer(nodeId: string, path = new Set<string>()): number {
    const cachedLayer = layerByNode.get(nodeId);
    if (cachedLayer !== undefined) {
      return cachedLayer;
    }

    if (path.has(nodeId)) {
      return 0;
    }

    const node = nodeById.get(nodeId);
    if (node === undefined || node.kind === "base") {
      return 0;
    }

    const nextPath = new Set([...path, nodeId]);
    let layer = 1;

    for (const prerequisiteId of prerequisitesByNode.get(nodeId) ?? []) {
      layer = Math.max(layer, getLayer(prerequisiteId, nextPath) + 1);
    }

    layerByNode.set(nodeId, layer);
    return layer;
  }

  const nodesByLayer = new Map<number, PrerequisiteGraphNodeData[]>();

  for (const node of nodes) {
    const layer = getLayer(node.id);
    const layerNodes = nodesByLayer.get(layer) ?? [];
    layerNodes.push(node);
    nodesByLayer.set(layer, layerNodes);
  }

  const columns: PrerequisiteGraphNodeData[][] = [];

  for (const layer of [...nodesByLayer.keys()].toSorted((a, b) => a - b)) {
    const layerNodes = nodesByLayer.get(layer) ?? [];

    for (
      let index = 0;
      index < layerNodes.length;
      index += MAX_NODES_PER_COLUMN
    ) {
      columns.push(layerNodes.slice(index, index + MAX_NODES_PER_COLUMN));
    }
  }

  const positions = new Map<string, NodePosition>();
  let maxRows = 1;

  for (const [columnIndex, column] of columns.entries()) {
    maxRows = Math.max(maxRows, column.length);

    for (const [rowIndex, node] of column.entries()) {
      positions.set(node.id, {
        left: GRAPH_PADDING + columnIndex * (NODE_WIDTH + COLUMN_GAP),
        top: GRAPH_PADDING + rowIndex * (NODE_HEIGHT + ROW_GAP),
      });
    }
  }

  return {
    height: GRAPH_PADDING * 2 + maxRows * NODE_HEIGHT + (maxRows - 1) * ROW_GAP,
    positions,
    width:
      GRAPH_PADDING * 2 +
      columns.length * NODE_WIDTH +
      Math.max(columns.length - 1, 0) * COLUMN_GAP,
  };
}

function createPrerequisiteMap(edges: readonly PrerequisiteGraphEdgeData[]) {
  const prerequisitesByNode = new Map<string, string[]>();

  for (const edge of edges) {
    const prerequisites = prerequisitesByNode.get(edge.to) ?? [];
    prerequisites.push(edge.from);
    prerequisitesByNode.set(edge.to, prerequisites);
  }

  return prerequisitesByNode;
}

function GraphToolbar({
  onReset,
  selectedNode,
  showFullViewButton,
}: {
  onReset: () => void;
  selectedNode: PrerequisiteGraphNodeData | undefined;
  showFullViewButton: boolean;
}) {
  return (
    <div className="border-border flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-3 py-2.5 text-xs">
      <span className="text-foreground/70 flex items-center gap-1.5">
        <span className="bg-surface-hover border-border size-2.5 rounded-full border" />
        Besaran pokok
      </span>
      <span className="text-foreground/70 flex items-center gap-1.5">
        <span className="bg-background border-border size-2.5 rounded-full border" />
        Besaran turunan
      </span>
      <span className="text-foreground/70 flex items-center gap-1.5">
        <span className="bg-action size-2.5 rounded-full" />
        Prasyarat langsung
      </span>
      <span className="text-foreground/70 flex items-center gap-1.5">
        <span className="bg-action-hover size-2.5 rounded-full" />
        Prasyarat lanjutan
      </span>
      {selectedNode || showFullViewButton ? (
        <div className="ml-auto flex items-center gap-3">
          {selectedNode ? (
            <button
              className="text-action hover:text-action-hover cursor-pointer"
              onClick={onReset}
              type="button"
            >
              Hapus sorotan
            </button>
          ) : null}
          {showFullViewButton ? (
            <Dialog.Trigger
              aria-label="Lihat penuh"
              className="inline-flex cursor-pointer items-center gap-1.5"
              type="button"
            >
              <ArrowsPointingOutIcon aria-hidden="true" className="size-4" />
            </Dialog.Trigger>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function GraphStatus({
  activeNodeIds,
  selectedNode,
}: {
  activeNodeIds: ReadonlySet<string> | null;
  selectedNode: PrerequisiteGraphNodeData | undefined;
}) {
  return (
    <div className="border-border border-b px-3 py-2 text-xs">
      <output aria-live="polite" className="text-foreground/60">
        {selectedNode
          ? `${selectedNode.label} dan ${Math.max((activeNodeIds?.size ?? 1) - 1, 0)} prasyarat disorot.`
          : "Klik sebuah besaran untuk menyorot seluruh prasyaratnya."}
      </output>
    </div>
  );
}

function GraphViewport({
  activeEdgeKeys,
  activeNodeDepths,
  activeNodeIds,
  edges,
  fullView = false,
  layout,
  nodes,
  onSelectNode,
  selectedNodeId,
}: {
  activeEdgeKeys: ReadonlySet<string> | null;
  activeNodeDepths: ReadonlyMap<string, number> | null;
  activeNodeIds: ReadonlySet<string> | null;
  edges: readonly PrerequisiteGraphEdgeData[];
  fullView?: boolean;
  layout: GraphLayout;
  nodes: readonly PrerequisiteGraphNodeData[];
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}) {
  const markerId = useId().replaceAll(":", "");
  const markerPrefix = `prerequisite-arrow-${markerId}`;
  const graphCanvasStyle: GraphStyle = {
    "--graph-height": `${layout.height}px`,
    "--graph-width": `${layout.width}px`,
  };

  return (
    <div
      className={`${fullView ? "min-h-0 flex-1" : "max-h-128"} overflow-auto p-2 sm:p-3`}
    >
      <div
        className="relative h-(--graph-height) w-(--graph-width)"
        style={graphCanvasStyle}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          width={layout.width}
        >
          <defs>
            {[
              ["direct", "var(--color-action)"],
              ["indirect", "var(--color-action-hover)"],
              ["muted", "var(--color-border)"],
            ].map(([name, color]) => (
              <marker
                id={`${markerPrefix}-${name}`}
                key={name}
                markerHeight="8"
                markerUnits="userSpaceOnUse"
                markerWidth="8"
                orient="auto"
                refX="8"
                refY="4"
                viewBox="0 0 8 8"
              >
                <path d="M 0 0 L 8 4 L 0 8 Z" fill={color} />
              </marker>
            ))}
          </defs>
          {edges.map((edge) => {
            const source = layout.positions.get(edge.from);
            const target = layout.positions.get(edge.to);

            if (source === undefined || target === undefined) {
              return null;
            }

            const isActive =
              activeEdgeKeys !== null && activeEdgeKeys.has(getEdgeKey(edge));
            const isDirect = isActive && activeNodeDepths?.get(edge.to) === 0;
            let edgeColor = "var(--color-border)";
            let markerName = "muted";
            let edgeStrokeWidth = 1.5;

            if (isDirect) {
              edgeColor = "var(--color-action)";
              markerName = "direct";
              edgeStrokeWidth = 2.5;
            } else if (isActive) {
              edgeColor = "var(--color-action-hover)";
              markerName = "indirect";
              edgeStrokeWidth = 2;
            }
            let edgeOpacity = 0.14;

            if (activeEdgeKeys === null) {
              edgeOpacity = 0.8;
            } else if (isActive) {
              edgeOpacity = 1;
            }

            return (
              <path
                className="transition-all duration-200"
                d={getEdgePath(source, target)}
                key={getEdgeKey(edge)}
                markerEnd={`url(#${markerPrefix}-${markerName})`}
                opacity={edgeOpacity}
                stroke={edgeColor}
                strokeLinecap="round"
                strokeWidth={edgeStrokeWidth}
                fill="none"
              />
            );
          })}
        </svg>
        {nodes.map((node) => {
          const position = layout.positions.get(node.id);

          if (position === undefined) {
            return null;
          }

          const isSelected = selectedNodeId === node.id;
          const isActive = activeNodeIds === null || activeNodeIds.has(node.id);
          let stateStyles = "opacity-30";

          if (isSelected) {
            stateStyles = "border-action bg-action text-background shadow-md";
          } else if (isActive) {
            stateStyles = "hover:border-action";
          }

          let kindStyles = "border-border bg-background";

          if (isSelected) {
            kindStyles = "";
          } else if (node.kind === "base") {
            kindStyles = "border-border bg-surface-hover";
          }

          const nodeStyle: GraphStyle = {
            "--node-left": `${position.left}px`,
            "--node-top": `${position.top}px`,
            "--node-width": `${NODE_WIDTH}px`,
          };

          return (
            <button
              aria-label={`Sorot prasyarat ${node.label}`}
              aria-pressed={isSelected}
              className={`focus-visible:outline-action absolute top-(--node-top) left-(--node-left) flex h-15 w-(--node-width) flex-col items-center justify-center overflow-hidden rounded-xl border px-2 text-center transition-[opacity,border-color,background-color,box-shadow] duration-200 focus-visible:z-10 focus-visible:outline-2 ${kindStyles} ${stateStyles}`}
              key={node.id}
              onClick={() => {
                onSelectNode(node.id);
              }}
              style={nodeStyle}
              title={node.label}
              type="button"
            >
              <span className="max-w-full truncate text-xs">{node.label}</span>
              <span
                className={`mt-1 max-w-full truncate text-xs ${isSelected ? "text-background/80" : "text-foreground/70"}`}
              >
                {node.symbol}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
