import { NodeState } from '../types/DijkstraTypes'

export const NODE_COLORS = {
  [NodeState.UNVISITED]: '#6b7280', // gray-500
  [NodeState.CURRENT]: '#f59e0b', // amber-500
  [NodeState.IN_QUEUE]: '#3b82f6', // blue-500
  [NodeState.VISITED]: '#10b981' // emerald-500
}

export const NODE_STROKE_COLORS = {
  [NodeState.UNVISITED]: '#374151', // gray-700
  [NodeState.CURRENT]: '#d97706', // amber-600
  [NodeState.IN_QUEUE]: '#2563eb', // blue-600
  [NodeState.VISITED]: '#059669' // emerald-600
}

export const EDGE_COLORS = {
  normal: '#4b5563', // gray-600
  highlighted: '#f59e0b', // amber-500
  shortestPath: '#10b981' // emerald-500
}

export const SOURCE_BORDER_COLOR = '#ef4444' // red-500

export const NODE_RADIUS = 20
