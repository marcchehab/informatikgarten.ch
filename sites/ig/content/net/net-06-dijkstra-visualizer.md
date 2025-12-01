---
title: Dijkstra Visualizer
---

## Bedienung

1. Wählen Sie zuerst eine **Anzahl Knoten** (Router), dann ziehen Sie Ihr Internet zurecht. 
2. Wenn Sie bereit sind, suchen Sie einen **Startknoten** aus und klicken Sie ihn an.
3. Falls Sie einen **Zielknoten** bestimmen wollen, klicken Sie ihn mit Ctrl + Klick an.
4. Starten Sie die Simulation mit **Play** oder gehen Sie schrittweise vor mit.

<DijkstraVisualizer
    initialNodeCount={7}
    initialDirected={false}
    width={700}
    height={450}
  />

| Aktion                       | Effekt                                 |
| ---------------------------- | -------------------------------------- |
| **Klick** auf Knoten         | Setzt den **Startknoten** (roter Rand) |
| **Ctrl+Klick** auf Knoten    | Setzt das **Ziel** (stoppt früher)     |
| **Ziehen** eines Knotens     | Verschiebt den Knoten                  |
| **PQ**-Button in der Tabelle | Sortiert nach Priority Queue           |

