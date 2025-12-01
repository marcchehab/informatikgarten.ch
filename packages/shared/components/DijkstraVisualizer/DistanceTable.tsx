import type { GraphNode, AlgorithmStep } from './types/DijkstraTypes'
import styles from './style/dijkstra.module.css'

interface DistanceTableProps {
  nodes: GraphNode[]
  currentStep: AlgorithmStep | null
  sourceNode: string | null
}

export function DistanceTable({
  nodes,
  currentStep,
  sourceNode
}: DistanceTableProps) {
  if (!sourceNode || !currentStep) {
    return (
      <div className={styles.distanceTable}>
        <div className={styles.tableHeader}>Distanztabelle</div>
        <div className={styles.tablePlaceholder}>
          Wähle einen Startknoten aus
        </div>
      </div>
    )
  }

  // Sort nodes by label
  const sortedNodes = [...nodes].sort((a, b) => a.label.localeCompare(b.label))

  return (
    <div className={styles.distanceTable}>
      <div className={styles.tableHeader}>Distanztabelle</div>
      <table>
        <thead>
          <tr>
            <th>Knoten</th>
            <th>Distanz</th>
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
            const isSource = node.id === sourceNode

            const rowClass = isCurrent
              ? styles.currentRow
              : isVisited
                ? styles.visitedRow
                : isSource
                  ? styles.sourceRow
                  : undefined

            return (
              <tr key={node.id} className={rowClass}>
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
  )
}
