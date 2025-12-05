import { useState, useEffect, useRef } from 'react'
import type { GraphNode, AlgorithmStep } from './types/DijkstraTypes'
import styles from './style/dijkstra.module.css'

interface DistanceTableProps {
  nodes: GraphNode[]
  currentStep: AlgorithmStep | null
  sourceNode: string | null
  autoScroll?: boolean
}

export function DistanceTable({
  nodes,
  currentStep,
  sourceNode,
  autoScroll = false
}: DistanceTableProps) {
  const [sortByPriority, setSortByPriority] = useState(true)
  const currentRowRef = useRef<HTMLTableRowElement>(null)

  // Auto-scroll to current node when it changes
  useEffect(() => {
    if (autoScroll && currentRowRef.current) {
      currentRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [autoScroll, currentStep?.currentNode])

  if (!sourceNode || !currentStep) {
    return (
      <div className={styles.distanceTable}>
        <div className={styles.tableHeaderWithToggle}>
          <span>Distanztabelle</span>
          <button
            className={`${styles.priorityToggle} ${sortByPriority ? styles.active : ''}`}
            onClick={() => setSortByPriority(!sortByPriority)}
            title={sortByPriority ? 'Alphabetisch sortieren' : 'Nach Priority Queue sortieren'}
          >
            PQ
          </button>
        </div>
        <div className={styles.tablePlaceholder}>
          Wähle einen Startknoten aus
        </div>
      </div>
    )
  }

  // Sort nodes either by label or by priority queue order
  const sortedNodes = [...nodes].sort((a, b) => {
    if (!sortByPriority) {
      return a.label.localeCompare(b.label)
    }

    // Priority queue sorting: visited on top, then unvisited by distance
    const aVisited = currentStep.visitedNodes.has(a.id)
    const bVisited = currentStep.visitedNodes.has(b.id)
    const aDistance = currentStep.distances.get(a.id) ?? Infinity
    const bDistance = currentStep.distances.get(b.id) ?? Infinity

    // Visited nodes come first (on top)
    if (aVisited !== bVisited) {
      return aVisited ? -1 : 1
    }

    // For visited nodes, sort by distance (already processed order)
    // For unvisited nodes, sort by distance (smallest first - next to be processed)
    if (aDistance !== bDistance) {
      return aDistance - bDistance
    }

    // Finally by label for stable sort
    return a.label.localeCompare(b.label)
  })

  return (
    <div className={styles.distanceTable}>
      <div className={styles.tableHeaderWithToggle}>
        <span>Distanztabelle</span>
        <button
          className={`${styles.priorityToggle} ${sortByPriority ? styles.active : ''}`}
          onClick={() => setSortByPriority(!sortByPriority)}
          title={sortByPriority ? 'Alphabetisch sortieren' : 'Nach Priority Queue sortieren'}
        >
          PQ
        </button>
      </div>
      <div className={styles.tableScrollContainer}>
        <table>
          <thead>
            <tr>
              <th>Knoten</th>
              <th>Gesamtdistanz{sortByPriority && ' ↓'}</th>
              <th>Vorgänger</th>
            </tr>
          </thead>
          <tbody>
            {sortedNodes.map(node => {
              const distance = currentStep.distances.get(node.id)
              const previous = currentStep.previousNodes.get(node.id)
              const previousNode = previous
                ? nodes.find(n => n.id === previous)
                : null

              const isCurrent = currentStep.currentNode === node.id
              const isVisited = currentStep.visitedNodes.has(node.id)
              const isInQueue = currentStep.queueNodes.has(node.id)
              const isSource = node.id === sourceNode

              const rowClass = isCurrent
                ? styles.currentRow
                : isVisited
                  ? styles.visitedRow
                  : isInQueue
                    ? styles.inQueueRow
                    : undefined

              return (
                <tr
                  key={node.id}
                  className={rowClass}
                  ref={isCurrent ? currentRowRef : undefined}
                >
                  <td>
                    <span className={styles.nodeCell}>
                      {node.label}
                      {isSource && <span className={styles.sourceMarker}>*</span>}
                    </span>
                  </td>
                  <td>
                    {distance === undefined
                      ? '-'
                      : distance === Infinity
                        ? '∞'
                        : distance}
                  </td>
                  <td>{previousNode ? previousNode.label : '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
