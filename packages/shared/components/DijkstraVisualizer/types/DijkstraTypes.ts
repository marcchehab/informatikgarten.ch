// Node representation
export interface GraphNode {
  id: string
  x: number
  y: number
  label: string
}

// Edge representation
export interface GraphEdge {
  id: string
  source: string
  target: string
  weight: number
  directed?: boolean // If true, render with arrow; if false/undefined, no arrow
}

// Complete graph structure
export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  isDirected: boolean
}

// Algorithm step for animation playback
export interface AlgorithmStep {
  stepNumber: number
  currentNode: string | null
  visitedNodes: Set<string>
  distances: Map<string, number>
  previousNodes: Map<string, string | null>
  queueNodes: Set<string>
  highlightedEdges: string[]
  shortestPathEdges: string[]
  description: string
}

// Animation state
export enum AnimationState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  FINISHED = 'finished'
}

// Node visual state for color coding
export enum NodeState {
  UNVISITED = 'unvisited',
  CURRENT = 'current',
  IN_QUEUE = 'inQueue',
  VISITED = 'visited'
}

// Main component props
export interface DijkstraVisualizerProps {
  initialNodeCount?: number
  initialDirected?: boolean
  width?: number
  height?: number
}

// Configuration type
export interface DijkstraConfig {
  graph: Graph
  sourceNode: string | null
  targetNode: string | null
  steps: AlgorithmStep[]
  currentStepIndex: number
  animationState: AnimationState
  animationSpeed: number
  nodeCount: number
  isDirected: boolean
}
