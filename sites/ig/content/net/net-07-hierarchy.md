---
title: Die Hierarchie des Internets
---

> [!success] Lernziele
>
> - Sie verstehen, warum Dijkstra typischerweise nur innerhalb eines Netzwerks eines Autonomen Systems (AS) funktioniert.
> - Sie wissen, dass das globale Internet ebenso von **Politik und Wirtschaft** zusammengehalten wird wie von Algorithmen.

In der letzten Lektion haben wir gesehen, wie Router mit Dijkstra den kürzesten Weg finden. Aber da gibt es ein Problem: Dijkstra setzt voraus, dass **alle Router ihre Informationen offen teilen**. Das funktioniert innerhalb einer Organisation - aber was, wenn ein Paket von der Swisscom zu Google muss?

## Autonome Systeme

Das Internet ist kein einzelnes Netzwerk, sondern ein **Netzwerk aus tausenden von Netzwerken**. Jedes dieser Netzwerke wird als **Autonomes System (AS)** bezeichnet und hat eine eindeutige Nummer (ASN).

Ein Autonomes System ist typischerweise:
- Ein **Internet Service Provider** (ISP) wie Swisscom, Sunrise oder Init7
- Ein **grosses Unternehmen** wie Google, Microsoft oder die SBB
- Eine **Universität** wie die ETH oder Universität Zürich

Jedes AS verwaltet sein eigenes internes Routing und entscheidet selbst, wie es mit anderen AS verbunden sein will.

> [!example] Beispiele für Autonome Systeme in der Schweiz
>
> | ASN | Organisation |
> |-----|--------------|
> | AS3303 | Swisscom |
> | AS6730 | Sunrise |
> | AS13030 | Init7 |
> | AS559 | SWITCH (Schweizer Hochschulen) |
> | AS15169 | Google |

## Zwei Arten von Routing-Protokollen

Weil das Internet aus unabhängigen Netzwerken besteht, braucht es **zwei verschiedene Arten** von Routing-Protokollen:

### Interior Gateway Protocols (IGP) - Innerhalb eines AS

**OSPF** (Open Shortest Path First) ist das bekannteste IGP und verwendet tatsächlich den **Dijkstra-Algorithmus**. Es funktioniert, weil:
- Alle Router gehören zur **gleichen Organisation**
- Sie können **offen alle Informationen** teilen
- Die Netzwerktopologie ist **überschaubar** (hunderte bis tausende Router)

Die Router tauschen sogenannte "Link State Advertisements" aus - jeder Router teilt mit, welche Nachbarn er hat und was die Verbindungen kosten. So kann jeder Router eine vollständige Karte des Netzwerks aufbauen und Dijkstra lokal ausführen.

### Exterior Gateway Protocols (EGP) - Zwischen autonomen Systemen

Für die Verbindung **zwischen** autonomen Systemen wird **BGP** (Border Gateway Protocol) verwendet. BGP ist fundamental anders als OSPF:

- **Kein Dijkstra:** BGP berechnet nicht den "kürzesten" Weg
- **Policy-basiert:** Entscheidungen basieren auf Geschäftsbeziehungen und Policies
- **Pfad-Vektor:** Router tauschen aus, über welche AS ein Ziel erreichbar ist

Warum kein Dijkstra? Weil verschiedene Organisationen **nicht alle Informationen teilen wollen**. Ein ISP verrät seinen Konkurrenten nicht, wie sein internes Netzwerk aufgebaut ist. Ausserdem spielen **wirtschaftliche Faktoren** eine grosse Rolle: Wer bezahlt wen für die Weiterleitung von Daten?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────┐           BGP            ┌─────────┐          │
│   │ AS 3303 │◄────────────────────────►│ AS 6730 │          │
│   │Swisscom │                          │ Sunrise │          │
│   └─────────┘                          └─────────┘          │
│        │                                    │               │
│        │ OSPF                          OSPF │               │
│        │ (Dijkstra)                (Dijkstra)│              │
│        ▼                                    ▼               │
│   ┌─────────┐                          ┌─────────┐          │
│   │ Router  │                          │ Router  │          │
│   │ intern  │                          │ intern  │          │
│   └─────────┘                          └─────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Die Tier-Hierarchie des Internets

Nicht alle autonomen Systeme sind gleich. Das Internet hat eine hierarchische Struktur:

### Tier 1 - Die Spitze der Pyramide

**Tier-1-Provider** sind die grossen Backbone-Netzwerke wie Arelion, NTT, Cogent oder Telia. Sie haben eine besondere Eigenschaft: Sie können das **gesamte Internet erreichen, ohne jemandem Geld für Transit zu bezahlen**.

Das erreichen sie durch **Settlement-Free Peering**: Die grossen Provider verbinden sich untereinander kostenlos, weil beide Seiten gleichermassen profitieren. Hier ein Beispiel des Netzwerkes des Tier-1-Providers Arelion, das Sie [hier interaktiv anschauen können](https://www.arelion.com/products-and-services/internet-and-cloud/ip-transit).

![](arelion.png)

### Tier 2 - Regionale Provider

**Tier-2-Provider** sind regionale Netzwerke, die:
- Mit einigen Netzwerken direkt peeren (kostenlos)
- Aber für den Rest des Internets **Transit kaufen** müssen von Tier-1-Providern

Viele Schweizer ISPs wie Swisscom oder Sunrise fallen in diese Kategorie.

### Tier 3 - Lokale Anbieter

**Tier-3-Provider** sind kleine, lokale ISPs, die fast ausschliesslich Transit kaufen. Sie verbinden Endkunden mit dem Internet, haben aber keine eigene weitreichende Infrastruktur.

```
                    ┌─────────────────┐
                    │    Tier 1       │
                    │ (Lumen, NTT,    │
                    │  Cogent...)     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │  Tier 2  │   │  Tier 2  │   │  Tier 2  │
        │(Swisscom)│   │(Sunrise) │   │  (Init7) │
        └────┬─────┘   └────┬─────┘   └────┬─────┘
             │              │              │
             ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │  Tier 3  │   │  Tier 3  │   │ Endkunde │
        │ (lokale  │   │ (lokale  │   │          │
        │   ISPs)  │   │   ISPs)  │   │          │
        └──────────┘   └──────────┘   └──────────┘
```

## Internet Exchange Points - Wo Netzwerke sich treffen

Wie verbinden sich all diese Netzwerke physisch? An **Internet Exchange Points (IXPs)**. Das sind Rechenzentren, in denen viele Netzwerke ihre Router in den gleichen Raum stellen und sich direkt verbinden können.

### SwissIX - Der Schweizer Internet-Knotenpunkt

In der Schweiz ist **SwissIX** in Zürich der wichtigste Internet Exchange Point. Hier treffen sich über 200 Netzwerke und tauschen direkt Daten aus - ohne den Umweg über internationale Backbone-Provider.

Vorteile eines lokalen IXP:
- **Geringere Latenz:** Schweizer Daten müssen nicht über Frankfurt oder Amsterdam
- **Günstigere Kosten:** Direktes Peering statt teurer Transit
- **Mehr Kontrolle:** Daten bleiben im Land

Wenn Sie also eine Webseite bei einem Schweizer Hoster aufrufen und Ihren Internetanschluss bei einem anderen Schweizer Provider haben, gehen die Daten wahrscheinlich über SwissIX - ein kurzer Weg innerhalb von Zürich statt quer durch Europa.

## Zusammenfassung

| Aspekt | Innerhalb eines AS | Zwischen AS |
|--------|-------------------|-------------|
| **Protokoll** | OSPF, IS-IS (IGP) | BGP (EGP) |
| **Algorithmus** | Dijkstra | Policy-basiert |
| **Optimiert für** | Kürzester Weg | Geschäftsbeziehungen |
| **Informationsaustausch** | Vollständig offen | Nur nötige Infos |

> [!quote] Die Pointe
>
> Dijkstra funktioniert wunderbar innerhalb von Netzwerken, aber das globale Internet wird ebenso von **Politik und Wirtschaft** zusammengehalten wie von Algorithmen.

## Übungsaufgaben

### Aufgabe 1: AS-Nummern nachschlagen

Finden Sie mit [bgp.he.net](https://bgp.he.net/) die AS-Nummern von:
a) Ihrer Schule oder Universität
b) Einem bekannten Schweizer Unternehmen
c) Netflix oder Spotify

### Aufgabe 2: Routing-Pfade analysieren

Verwenden Sie den Befehl `traceroute` (Linux/Mac) oder `tracert` (Windows) um den Weg zu verschiedenen Servern zu verfolgen:

```bash
traceroute google.ch
traceroute srf.ch
traceroute netflix.com
```

Welche Autonomen Systeme werden durchquert? (Tipp: Die IP-Adressen können Sie auf [bgp.he.net](https://bgp.he.net/) nachschlagen)

### Aufgabe 3: Diskussion

Warum wäre es problematisch, wenn das gesamte Internet mit einem einzigen Dijkstra-Algorithmus geroutet würde? Denken Sie an:
- Skalierbarkeit (Millionen von Routern)
- Privatsphäre und Geschäftsgeheimnisse
- Unterschiedliche Interessen der Betreiber
