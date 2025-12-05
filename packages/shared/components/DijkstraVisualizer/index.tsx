'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { DijkstraCanvas } from './DijkstraCanvas'
import { ControlPanel } from './ControlPanel'
import { DistanceTable } from './DistanceTable'
import { GraphSettings } from './GraphSettings'
import { generateRandomGraph } from './utils/graphGenerator'
import { computeDijkstraSteps } from './utils/dijkstraAlgorithm'
import type { DijkstraVisualizerProps, DijkstraConfig, AlgorithmStep } from './types/DijkstraTypes'
import { AnimationState } from './types/DijkstraTypes'
import styles from './style/dijkstra.module.css'

export function DijkstraVisualizer({
  initialNodeCount = 7,
  initialDirected = false,
  width = 800,
  height = 500
}: DijkstraVisualizerProps) {
  const [config, setConfig] = useState<DijkstraConfig>(() => ({
    graph: generateRandomGraph(initialNodeCount, initialDirected, width, height),
    sourceNode: null,
    targetNode: null,
    steps: [],
    currentStepIndex: -1,
    animationState: AnimationState.IDLE,
    animationSpeed: 500,
    nodeCount: initialNodeCount,
    isDirected: initialDirected
  }))

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [tableWidth, setTableWidth] = useState(250)
  const containerRef = useRef<HTMLDivElement>(null)
  const mainAreaRef = useRef<HTMLDivElement>(null)
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isDraggingDivider = useRef(false)

  // Derive current step from config
  const currentStep: AlgorithmStep | null = useMemo(() => {
    if (config.currentStepIndex >= 0 && config.currentStepIndex < config.steps.length) {
      return config.steps[config.currentStepIndex] ?? null
    }
    return null
  }, [config.steps, config.currentStepIndex])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [])

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Failed to enter fullscreen:', err)
      })
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Failed to exit fullscreen:', err)
      })
    }
  }, [])

  // Divider drag handlers
  const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDraggingDivider.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingDivider.current || !mainAreaRef.current) return

      const rect = mainAreaRef.current.getBoundingClientRect()
      const newTableWidth = rect.right - e.clientX
      const clampedWidth = Math.max(150, Math.min(500, newTableWidth))
      setTableWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      if (isDraggingDivider.current) {
        isDraggingDivider.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Animation tick effect
  useEffect(() => {
    if (config.animationState !== AnimationState.PLAYING) return

    if (config.currentStepIndex >= config.steps.length - 1) {
      setConfig(prev => ({ ...prev, animationState: AnimationState.FINISHED }))
      return
    }

    animationTimerRef.current = setTimeout(() => {
      setConfig(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1
      }))
    }, config.animationSpeed)

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [config.animationState, config.currentStepIndex, config.steps.length, config.animationSpeed])

  const handleNodeClick = useCallback((nodeId: string, ctrlKey: boolean) => {
    setConfig(prev => {
      // Ctrl+click sets/clears target node
      if (ctrlKey) {
        // If clicking current target, clear it
        const newTarget = prev.targetNode === nodeId ? null : nodeId

        // Don't allow setting source as target
        if (newTarget === prev.sourceNode) return prev

        // Recompute steps if we have a source
        if (prev.sourceNode) {
          const steps = computeDijkstraSteps(prev.graph, prev.sourceNode, newTarget)
          return {
            ...prev,
            targetNode: newTarget,
            steps,
            currentStepIndex: 0,
            animationState: AnimationState.PAUSED
          }
        }

        return { ...prev, targetNode: newTarget }
      }

      // Regular click sets source node
      // If clicking same source, do nothing
      if (prev.sourceNode === nodeId) return prev

      // If clicking target node, clear target
      const newTarget = prev.targetNode === nodeId ? null : prev.targetNode

      // Compute steps for new source
      const steps = computeDijkstraSteps(prev.graph, nodeId, newTarget)

      return {
        ...prev,
        sourceNode: nodeId,
        targetNode: newTarget,
        steps,
        currentStepIndex: 0,
        animationState: AnimationState.PAUSED
      }
    })
  }, [])

  const handleNodeMove = useCallback((nodeId: string, x: number, y: number) => {
    setConfig(prev => {
      const newNodes = prev.graph.nodes.map(node =>
        node.id === nodeId ? { ...node, x, y } : node
      )
      return {
        ...prev,
        graph: { ...prev.graph, nodes: newNodes }
      }
    })
  }, [])

  const handleEdgeWeightChange = useCallback((edgeId: string, newWeight: number) => {
    setConfig(prev => {
      const newEdges = prev.graph.edges.map(edge =>
        edge.id === edgeId ? { ...edge, weight: newWeight } : edge
      )
      return {
        ...prev,
        graph: { ...prev.graph, edges: newEdges }
      }
    })
  }, [])

  const play = useCallback(() => {
    setConfig(prev => {
      if (prev.steps.length === 0) return prev

      // If finished, restart from beginning
      if (prev.animationState === AnimationState.FINISHED) {
        return {
          ...prev,
          currentStepIndex: 0,
          animationState: AnimationState.PLAYING
        }
      }

      return { ...prev, animationState: AnimationState.PLAYING }
    })
  }, [])

  const pause = useCallback(() => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current)
      animationTimerRef.current = null
    }
    setConfig(prev => ({ ...prev, animationState: AnimationState.PAUSED }))
  }, [])

  const stepForward = useCallback(() => {
    pause()
    setConfig(prev => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, prev.steps.length - 1)
      return {
        ...prev,
        currentStepIndex: nextIndex,
        animationState:
          nextIndex >= prev.steps.length - 1
            ? AnimationState.FINISHED
            : AnimationState.PAUSED
      }
    })
  }, [pause])

  const stepBackward = useCallback(() => {
    pause()
    setConfig(prev => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0),
      animationState: AnimationState.PAUSED
    }))
  }, [pause])

  const reset = useCallback(() => {
    pause()
    setConfig(prev => ({
      ...prev,
      currentStepIndex: 0,
      animationState: AnimationState.PAUSED
    }))
  }, [pause])

  const setSpeed = useCallback((speed: number) => {
    setConfig(prev => ({ ...prev, animationSpeed: speed }))
  }, [])

  const setNodeCount = useCallback(
    (count: number) => {
      setConfig(prev => ({
        ...prev,
        nodeCount: count,
        graph: generateRandomGraph(count, prev.isDirected, width, height),
        sourceNode: null,
        targetNode: null,
        steps: [],
        currentStepIndex: -1,
        animationState: AnimationState.IDLE
      }))
    },
    [width, height]
  )

  const toggleDirected = useCallback(() => {
    setConfig(prev => {
      const newDirected = !prev.isDirected
      return {
        ...prev,
        isDirected: newDirected,
        graph: generateRandomGraph(prev.nodeCount, newDirected, width, height),
        sourceNode: null,
        targetNode: null,
        steps: [],
        currentStepIndex: -1,
        animationState: AnimationState.IDLE
      }
    })
  }, [width, height])

  const regenerateGraph = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      graph: generateRandomGraph(prev.nodeCount, prev.isDirected, width, height),
      sourceNode: null,
      targetNode: null,
      steps: [],
      currentStepIndex: -1,
      animationState: AnimationState.IDLE
    }))
  }, [width, height])

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
    >
      <GraphSettings
        nodeCount={config.nodeCount}
        isDirected={config.isDirected}
        onNodeCountChange={setNodeCount}
        onDirectedToggle={toggleDirected}
        onRegenerate={regenerateGraph}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      <div className={styles.mainArea} ref={mainAreaRef}>
        <DijkstraCanvas
          graph={config.graph}
          currentStep={currentStep}
          sourceNode={config.sourceNode}
          targetNode={config.targetNode}
          onNodeClick={handleNodeClick}
          onNodeMove={handleNodeMove}
          onEdgeWeightChange={handleEdgeWeightChange}
          width={width}
          height={height}
        />
        <div
          className={styles.divider}
          onMouseDown={handleDividerMouseDown}
        />
        <div style={{ width: tableWidth, flexShrink: 0, height: isFullscreen ? '100%' : height }}>
          <DistanceTable
            nodes={config.graph.nodes}
            currentStep={currentStep}
            sourceNode={config.sourceNode}
            autoScroll={config.animationState === AnimationState.PLAYING}
          />
        </div>
      </div>

      <ControlPanel
        animationState={config.animationState}
        currentStepIndex={config.currentStepIndex}
        totalSteps={config.steps.length}
        speed={config.animationSpeed}
        onPlay={play}
        onPause={pause}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onSpeedChange={setSpeed}
        onReset={reset}
        stepDescription={currentStep?.description}
        disabled={config.steps.length === 0}
      />
    </div>
  )
}

export type { DijkstraVisualizerProps } from './types/DijkstraTypes'
