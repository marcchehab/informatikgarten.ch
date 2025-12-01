import { useState, useRef, useCallback } from 'react'
import type { Graph, GraphNode, GraphEdge, AlgorithmStep } from './types/DijkstraTypes'
import { NodeState } from './types/DijkstraTypes'
import { NODE_COLORS, NODE_STROKE_COLORS, EDGE_COLORS, SOURCE_BORDER_COLOR, NODE_RADIUS } from './utils/colorScheme'
import styles from './style/dijkstra.module.css'

interface DijkstraCanvasProps {
  graph: Graph
  currentStep: AlgorithmStep | null
  sourceNode: string | null
  targetNode: string | null
  onNodeClick: (nodeId: string, ctrlKey: boolean) => void
  onNodeMove: (nodeId: string, x: number, y: number) => void
  width: number
  height: number
}

function getNodeState(
  nodeId: string,
  currentStep: AlgorithmStep | null,
  sourceNode: string | null
): NodeState {
  if (!currentStep) return NodeState.UNVISITED
  if (currentStep.currentNode === nodeId) return NodeState.CURRENT
  if (currentStep.visitedNodes.has(nodeId)) return NodeState.VISITED
  if (currentStep.queueNodes.has(nodeId)) return NodeState.IN_QUEUE
  return NodeState.UNVISITED
}

function getEdgeStyle(
  edgeId: string,
  currentStep: AlgorithmStep | null
): { stroke: string; strokeWidth: number } {
  if (!currentStep) {
    return { stroke: EDGE_COLORS.normal, strokeWidth: 2 }
  }
  if (currentStep.highlightedEdges.includes(edgeId)) {
    return { stroke: EDGE_COLORS.highlighted, strokeWidth: 4 }
  }
  if (currentStep.shortestPathEdges.includes(edgeId)) {
    return { stroke: EDGE_COLORS.shortestPath, strokeWidth: 3 }
  }
  return { stroke: EDGE_COLORS.normal, strokeWidth: 2 }
}

function EdgeComponent({
  edge,
  sourceNode,
  targetNode,
  currentStep
}: {
  edge: GraphEdge
  sourceNode: GraphNode
  targetNode: GraphNode
  currentStep: AlgorithmStep | null
}) {
  const { stroke, strokeWidth } = getEdgeStyle(edge.id, currentStep)

  // Calculate edge endpoints adjusted for node radius
  const dx = targetNode.x - sourceNode.x
  const dy = targetNode.y - sourceNode.y
  const length = Math.sqrt(dx * dx + dy * dy)

  if (length === 0) return null

  const offsetX = (dx / length) * NODE_RADIUS
  const offsetY = (dy / length) * NODE_RADIUS

  const x1 = sourceNode.x + offsetX
  const y1 = sourceNode.y + offsetY
  const x2 = targetNode.x - offsetX
  const y2 = targetNode.y - offsetY

  // Calculate midpoint for weight label
  const midX = (sourceNode.x + targetNode.x) / 2
  const midY = (sourceNode.y + targetNode.y) / 2

  // Offset label perpendicular to the edge
  const perpX = -dy / length * 12
  const perpY = dx / length * 12

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        markerEnd={edge.directed ? 'url(#arrowhead)' : undefined}
        className={styles.edge}
      />
      <text
        x={midX + perpX}
        y={midY + perpY}
        textAnchor="middle"
        dominantBaseline="central"
        className={styles.weightLabel}
      >
        {edge.weight}
      </text>
    </g>
  )
}

function NodeComponent({
  node,
  state,
  isSource,
  isTarget,
  distance,
  isDragging,
  onMouseDown
}: {
  node: GraphNode
  state: NodeState
  isSource: boolean
  isTarget: boolean
  distance: number | null
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent, nodeId: string) => void
}) {
  const fill = NODE_COLORS[state]
  const stroke = isSource ? SOURCE_BORDER_COLOR : isTarget ? '#dc2626' : NODE_STROKE_COLORS[state]
  const strokeWidth = isSource || isTarget ? 4 : 2

  return (
    <g
      onMouseDown={e => onMouseDown(e, node.id)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      className={styles.nodeGroup}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_RADIUS}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={`${styles.node} ${state === NodeState.CURRENT && !isDragging ? styles.pulsing : ''}`}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        className={styles.nodeLabel}
      >
        {node.label}
      </text>
      {distance !== null && (
        <text
          x={node.x}
          y={node.y + NODE_RADIUS + 14}
          textAnchor="middle"
          className={styles.distanceLabel}
        >
          {distance === Infinity ? '∞' : distance}
        </text>
      )}
    </g>
  )
}

export function DijkstraCanvas({
  graph,
  currentStep,
  sourceNode,
  targetNode,
  onNodeClick,
  onNodeMove,
  width,
  height
}: DijkstraCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)
  const hasDragged = useRef(false)
  const ctrlKeyRef = useRef(false)

  // Create a map for quick node lookup
  const nodeMap = new Map(graph.nodes.map(n => [n.id, n]))

  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 }

    const svg = svgRef.current
    const rect = svg.getBoundingClientRect()

    // Account for viewBox scaling
    const scaleX = width / rect.width
    const scaleY = height / rect.height

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    }
  }, [width, height])

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    e.stopPropagation()

    const point = getSVGPoint(e.clientX, e.clientY)
    dragStartPos.current = point
    hasDragged.current = false
    ctrlKeyRef.current = e.ctrlKey || e.metaKey // metaKey for Mac
    setDraggingNode(nodeId)
  }, [getSVGPoint])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingNode) return

    const point = getSVGPoint(e.clientX, e.clientY)

    // Check if we've moved enough to consider it a drag
    if (dragStartPos.current) {
      const dx = point.x - dragStartPos.current.x
      const dy = point.y - dragStartPos.current.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDragged.current = true
      }
    }

    // Clamp to canvas bounds
    const clampedX = Math.max(NODE_RADIUS, Math.min(width - NODE_RADIUS, point.x))
    const clampedY = Math.max(NODE_RADIUS, Math.min(height - NODE_RADIUS, point.y))

    onNodeMove(draggingNode, clampedX, clampedY)
  }, [draggingNode, getSVGPoint, onNodeMove, width, height])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (draggingNode && !hasDragged.current) {
      // It was a click, not a drag - trigger node click with ctrl state
      onNodeClick(draggingNode, ctrlKeyRef.current)
    }
    setDraggingNode(null)
    dragStartPos.current = null
    ctrlKeyRef.current = false
  }, [draggingNode, onNodeClick])

  const handleMouseLeave = useCallback(() => {
    setDraggingNode(null)
    dragStartPos.current = null
  }, [])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={styles.canvas}
      viewBox={`0 0 ${width} ${height}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
        </marker>
      </defs>

      {/* Edges layer */}
      <g>
        {graph.edges.map(edge => {
          const source = nodeMap.get(edge.source)
          const target = nodeMap.get(edge.target)
          if (!source || !target) return null
          return (
            <EdgeComponent
              key={edge.id}
              edge={edge}
              sourceNode={source}
              targetNode={target}
              currentStep={currentStep}
            />
          )
        })}
      </g>

      {/* Nodes layer */}
      <g>
        {graph.nodes.map(node => {
          const state = getNodeState(node.id, currentStep, sourceNode)
          const distance = currentStep?.distances.get(node.id) ?? null
          return (
            <NodeComponent
              key={node.id}
              node={node}
              state={state}
              isSource={node.id === sourceNode}
              isTarget={node.id === targetNode}
              distance={distance}
              isDragging={draggingNode === node.id}
              onMouseDown={handleMouseDown}
            />
          )
        })}
      </g>
    </svg>
  )
}
