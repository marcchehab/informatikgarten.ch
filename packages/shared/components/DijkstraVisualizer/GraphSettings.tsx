import { useState, useRef } from 'react'
import styles from './style/dijkstra.module.css'

const MIN_NODES = 3
const SLIDER_MAX = 30
const ABSOLUTE_MAX = 200

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
  const [isDragging, setIsDragging] = useState(false)
  const [dragValue, setDragValue] = useState(nodeCount)
  const [isEditingCount, setIsEditingCount] = useState(false)
  const [editValue, setEditValue] = useState('')
  const sliderRef = useRef<HTMLInputElement>(null)

  // Use dragValue while dragging, otherwise use nodeCount prop
  const displayValue = isDragging ? dragValue : nodeCount
  const sliderValue = Math.min(displayValue, SLIDER_MAX)

  const handleSliderStart = () => {
    setIsDragging(true)
    setDragValue(Math.min(nodeCount, SLIDER_MAX))
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragValue(Number(e.target.value))
  }

  const handleSliderEnd = () => {
    if (isDragging && dragValue !== nodeCount) {
      onNodeCountChange(dragValue)
    }
    setIsDragging(false)
  }

  const handleCountClick = () => {
    setIsEditingCount(true)
    setEditValue(String(nodeCount))
  }

  const handleCountSubmit = () => {
    const newCount = parseInt(editValue, 10)
    if (!isNaN(newCount) && newCount >= MIN_NODES && newCount <= ABSOLUTE_MAX) {
      onNodeCountChange(newCount)
    }
    setIsEditingCount(false)
    setEditValue('')
  }

  const handleCountCancel = () => {
    setIsEditingCount(false)
    setEditValue('')
  }

  return (
    <div className={styles.graphSettings}>
      <div className={styles.settingGroup}>
        <label htmlFor="node-count">
          Knoten:{' '}
          {isEditingCount ? (
            <input
              type="number"
              min={MIN_NODES}
              max={ABSOLUTE_MAX}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={handleCountSubmit}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCountSubmit()
                if (e.key === 'Escape') handleCountCancel()
              }}
              autoFocus
              className={styles.nodeCountInput}
            />
          ) : (
            <span
              onClick={handleCountClick}
              className={styles.nodeCountValue}
              title="Klicken für grössere Werte (max. 200)"
            >
              {displayValue}
            </span>
          )}
        </label>
        <input
          ref={sliderRef}
          id="node-count"
          type="range"
          min={MIN_NODES}
          max={SLIDER_MAX}
          value={sliderValue}
          onMouseDown={handleSliderStart}
          onTouchStart={handleSliderStart}
          onChange={handleSliderChange}
          onMouseUp={handleSliderEnd}
          onTouchEnd={handleSliderEnd}
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
