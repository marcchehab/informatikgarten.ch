import type { Graph, GraphNode, GraphEdge } from '../types/DijkstraTypes'

function generateNodePositions(
  count: number,
  width: number,
  height: number
): Array<{ x: number; y: number }> {
  const padding = 60
  const positions: Array<{ x: number; y: number }> = []

  if (count <= 20) {
    // Circular layout with some randomness for smaller graphs
    const cx = width / 2
    const cy = height / 2
    const radius = Math.min(width, height) / 2 - padding

    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2
      const r = radius * (0.75 + Math.random() * 0.25)
      positions.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      })
    }
  } else {
    // Grid-based layout with jitter for larger graphs
    const cols = Math.ceil(Math.sqrt(count * (width / height)))
    const rows = Math.ceil(count / cols)
    const cellWidth = (width - 2 * padding) / cols
    const cellHeight = (height - 2 * padding) / rows

    for (let i = 0; i < count; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      positions.push({
        x: padding + cellWidth * (col + 0.5) + (Math.random() - 0.5) * cellWidth * 0.3,
        y: padding + cellHeight * (row + 0.5) + (Math.random() - 0.5) * cellHeight * 0.3
      })
    }
  }

  return positions
}

function edgeExists(
  edges: GraphEdge[],
  source: string,
  target: string,
  isDirected: boolean
): boolean {
  return edges.some(
    e =>
      (e.source === source && e.target === target) ||
      (!isDirected && e.source === target && e.target === source)
  )
}

export function generateRandomGraph(
  nodeCount: number,
  isDirected: boolean,
  width: number,
  height: number
): Graph {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Generate node positions
  const positions = generateNodePositions(nodeCount, width, height)

  // Create nodes with labels (A-Z for small graphs, numbers for larger)
  for (let i = 0; i < nodeCount; i++) {
    const pos = positions[i]
    if (!pos) continue
    nodes.push({
      id: `node-${i}`,
      x: pos.x,
      y: pos.y,
      label: nodeCount <= 26 ? String.fromCharCode(65 + i) : String(i)
    })
  }

  // First, create a spanning tree to guarantee connectivity
  const firstNode = nodes[0]
  if (!firstNode) return { nodes, edges, isDirected }

  const connected = new Set<string>([firstNode.id])
  const unconnected = new Set(nodes.slice(1).map(n => n.id))

  while (unconnected.size > 0) {
    const connectedArr = Array.from(connected)
    const unconnectedArr = Array.from(unconnected)
    const from = connectedArr[Math.floor(Math.random() * connectedArr.length)]
    const to = unconnectedArr[Math.floor(Math.random() * unconnectedArr.length)]

    if (from && to) {
      edges.push({
        id: `edge-${edges.length}`,
        source: from,
        target: to,
        weight: Math.floor(Math.random() * 9) + 1 // 1-9
      })

      connected.add(to)
      unconnected.delete(to)
    } else {
      break
    }
  }

  // Add additional random edges (about 0.5 per node on average)
  const additionalEdges = Math.floor(nodeCount * 0.5)
  for (let i = 0; i < additionalEdges; i++) {
    const sourceIdx = Math.floor(Math.random() * nodeCount)
    const targetIdx = Math.floor(Math.random() * nodeCount)
    const sourceNode = nodes[sourceIdx]
    const targetNode = nodes[targetIdx]

    if (
      sourceNode &&
      targetNode &&
      sourceIdx !== targetIdx &&
      !edgeExists(edges, sourceNode.id, targetNode.id, isDirected)
    ) {
      edges.push({
        id: `edge-${edges.length}`,
        source: sourceNode.id,
        target: targetNode.id,
        weight: Math.floor(Math.random() * 9) + 1
      })
    }
  }

  // In directed mode, make 40-80% of edges bidirectional by adding reverse edges
  if (isDirected) {
    const edgesToProcess = [...edges]
    for (const edge of edgesToProcess) {
      // 40-80% chance to add reverse edge (making it bidirectional)
      if (Math.random() < 0.6 && !edgeExists(edges, edge.target, edge.source, false)) {
        edges.push({
          id: `edge-${edges.length}`,
          source: edge.target,
          target: edge.source,
          weight: Math.floor(Math.random() * 9) + 1 // Different weight for reverse
        })
      }
    }
  }

  return { nodes, edges, isDirected }
}
