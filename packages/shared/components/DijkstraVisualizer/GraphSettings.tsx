import styles from './style/dijkstra.module.css'

interface GraphSettingsProps {
  nodeCount: number
  isDirected: boolean
  onNodeCountChange: (count: number) => void
  onDirectedToggle: () => void
  onRegenerate: () => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

export function GraphSettings({
  nodeCount,
  isDirected,
  onNodeCountChange,
  onDirectedToggle,
  onRegenerate,
  isFullscreen,
  onToggleFullscreen
}: GraphSettingsProps) {
  return (
    <div className={styles.graphSettings}>
      <div className={styles.settingGroup}>
        <label htmlFor="node-count">Knoten: {nodeCount}</label>
        <input
          id="node-count"
          type="range"
          min="5"
          max="100"
          value={nodeCount}
          onChange={e => onNodeCountChange(Number(e.target.value))}
          className={styles.nodeCountSlider}
        />
      </div>

      <div className={styles.settingGroup}>
        <label>Gerichtet:</label>
        <button
          className={`${styles.toggle} ${isDirected ? styles.active : ''}`}
          onClick={onDirectedToggle}
          title={isDirected ? 'Gerichteter Graph' : 'Ungerichteter Graph'}
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>

      <button className={styles.regenerateButton} onClick={onRegenerate}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        Neuer Graph
      </button>

      <button
        className={styles.fullscreenButton}
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
      >
        {isFullscreen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        )}
      </button>
    </div>
  )
}
