---
title: Von Neumann Architektur
---
> [!success] Lernziele
> 
> - Sie wissen, was die Schritte des **Fetch-Decode-Execute-Zyklus** tun.
>  - Sie wissen, was folgende Teile der Von-Neumann-Architektur sind: **CPU, CU, ALU, Register (PC und ACC), RAM, Bus**
> - Sie können kleine [Programme im **LMC**](https://oinf.ch/interactive/little-man-computer/) nachvollziehen. Versichern Sie sich, dass Sie **alle Befehle in der Tabelle verstehen** (nicht auswendig lernen!)

## Computer-Architektur

1945 wurden in den USA und Europa an verschiedenen Universitäten Rechenmaschinen gebaut. Das Mathegenie John von Neumann fasste seine Arbeit am EDVAC-Computer in einem Bericht zusammen, in dem er die Kernprinzipien und die Organisation der Komponenten erklärte und beschrieb. Diese Grundprinzipien waren für lange Zeit und bis heute **die Basis der meisten Allzweckcomputer**.

![[vonneumann-overview.excalidraw]]

Ich habe Ihnen im violetten Teil eine moderne Input- und Output-Infrastruktur angehängt. In dieser Lektion ist aber nur der obere Teil wichtig: die klassische **Von-Neumann-Architektur**. Sie definiert **vier Hauptteile**:
1. **Control Unit, CU**: Koordiniert den Rechenprozess.
2. **Arithmetisch-logische Einheit (ALU)**: Führt alle Rechen- und Logikoperationen aus. Hier befindet sich der Addierer, den wir [in der Lektion dazu](./hw-03-addierer.mdx) bauen.
3. **Register**: Ultraschnelle Speicherzellen, die einzelne Informationen des Rechenprozesses zwischenspeichern.
	- Die **Aktuelle Instruktion (CIR)** enthält die Instruktion, die als nächstes ausgeführt wird.
	- Der **Program Counter (PC)** enthält die Adresse, die beim nächsten Fetch-Schritt geladen wird.
	- Der **Akkumulator** enthält das aktuelle Zwischenergebnis.
1. **Arbeitsspeicher (RAM)**: Speichert Daten **und** Befehle.
2. **Input/Output (I/O)**: Verbindet diesen Kern des Computers mit Ein- und Ausgabegeräten wie Massenspeicher (SSD, Festplatten), Grafikkarten, USB-Geräte und Peripheriegeräte.

Um sich das Diagramm zu merken, hilft es, den Rechenprozess zu verstehen und nur den oberen Teil anzuschauen. Ignorieren Sie die verschiedenen Ein- und Ausgabegeräte!

## Fetch-Decode-Execute-Zyklus

Der Schlüssel für den Rechenprozess steckt in der Control Unit (CU): Dort läuft der **Fetch-Decode-Execute-Zyklus**. Hier habe ich Ihnen zwei FDE-Zyklen visualisiert. Klicken Sie hier durch die Tabs durch, um zu verstehen, was bei den Schritten passiert.

import { Tabs } from 'nextra/components'

<Tabs items={['Anfang', 'Fetch 1', 'Decode 1', 'Execute 1',  'Fetch 2', 'Decode 2', 'Execute 2']}>
  <Tabs.Tab>
![[hw-04-fde-start.excalidraw]]
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-fetch.excalidraw]]
**Fetch** (holen) macht zwei Dinge *nacheinander*:
	1) Die CPU nimmt die Speicheradresse, die aktuell im Register "Program Counter (PC)" gespeichert ist (0), und **holt den Inhalt dieser Speicheradresse** ins Register "Aktuelle Instruktion (CIR)". 
	2) Danach wird der "Program Counter (PC)" erhöht auf die nächste Instruktion im RAM, damit beim nächsten Durchgang nicht nochmal die gleiche Instruktion kopiert wird.
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-decode.excalidraw]]
**Decode** (dekodieren): Sie als Menschen schauen in diesem Schritt auf die Operationen-Liste und interpretieren den Befehl in "Aktuelle Instruktion (CIR)". Die erste Zahl kodiert den Befehl (Opcode), die zwei nächsten Zahlen sind Informationen für den Befehl (Operand) - oft eine Speicheradresse. In einer richtigen CPU wird das in diesem Schritt an das richtige Modul weitergeleitet - bei einer Addition z.B. an unseren Addierer.
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-execute.excalidraw]]
**Execute** (ausführen): Nun wird der Befehl ausgeführt. Was passiert, ist natürlich auf die Instruktion an.
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-fetch2.excalidraw]]
**Fetch** (holen) macht zwei Dinge *nacheinander*:
	1) Die CPU nimmt die Speicheradresse, die aktuell im Register "Program Counter (PC)" gespeichert ist (3), und **holt den Inhalt dieser Speicheradresse** ins Register "Aktuelle Instruktion (CIR)". 
	2) Danach wird der "Program Counter (PC)" erhöht auf die nächste Instruktion im RAM, damit beim nächsten Durchgang nicht nochmal die gleiche Instruktion kopiert wird.
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-decode2.excalidraw]]
**Decode** (dekodieren): Sie als Menschen schauen in diesem Schritt auf die Operationen-Liste und interpretieren den Befehl in "Aktuelle Instruktion (CIR)". Die erste Zahl kodiert den Befehl (Opcode), die zwei nächsten Zahlen sind Informationen für den Befehl (Operand) - oft eine Speicheradresse. In einer richtigen CPU wird das in diesem Schritt an das richtige Modul weitergeleitet - bei einer Addition z.B. an unseren Addierer.
  </Tabs.Tab>
  <Tabs.Tab>
![[hw-04-fde-execute2.excalidraw]]
**Execute** (ausführen): Nun wird der Befehl ausgeführt. Was passiert, ist natürlich auf die Instruktion an.
  </Tabs.Tab>
</Tabs>

> [!hint]- Erklärvideo zu diesem Beispiel
> 
> ![[aufbau-vonneumann-neu2.mp4]]

### Auffälligkeiten der Von-Neumann-Architektur
Wir bemerken:
- Daten und Instruktionen werden **nicht unterschieden** und **binär** im selben Speicher (RAM) gespeichert. Dieselbe Adresse kann je nach Operation als Daten oder als Instruktion interpretiert werden.
- Der Zyklus setzt sich automatisch fort bis zu einer **Stopp-Anweisung**.
## LMC-Simulator
https://oinf.ch/interactive/little-man-computer/

1. Führen Sie das Beispielprogramm mehrfach aus und versuchen Sie es mit der Befehlsliste nachzuvollziehen.
	- Laden und Ausführen des Beispiels: Auf Bsp 1 klicken; mit «übertragen» in den Speicher laden; in «Eingabe» zwei Werte untereinander schreiben; mit Play starten.) 
2. Schreiben Sie dann entsprechende Programme für die nachfolgenden Aufgaben.

### Aufgaben

Ändern Sie Beispiel 1 so ab, dass zwei Inputwerte **subtrahiert** werden.

> [!solution]- Lösung mit Videoerklärung
> 
> ```
> 901
> 309
> 901
> 310
> 509
> 210 # Hier stand vorher 110
> 311
> 902
> 000
> ```
> 
> ![[aufbau-vonneumann-to-lmc.mp4]]

Schreiben Sie ein Programm, das die **ersten zwei Inputwerte addiert und dann den dritten Inputwert subtrahiert**.

> [!solution]- Lösung
>
> Zum Speichern der Inputs brauche ich hohe Speicheradressen (>20), weil ich während dem Schreiben des Programms ja nicht weiss, wie lange das Programm wird. 
> 
> ![[abc.png]]

> [!danger] Achtung
> 
> Die Spring-Befehle und der Rest dieser Lektion sind nicht Prüfungsstoff.

Beispiel 2 nutzt die Springbefehle. Mit diesen "springt" das Programm an einen anderen Ort im Speicher, indem der Program Counter (PC) überschrieben wird. Ändern Sie das Beispiel 2 so ab, dass ein **Inputwert unendlich lange zu sich selbst addiert wird**, e.g. Input 3 => 3, 6, 9, 12,... (Also nicht wie im Beispiel die vorprogrammierte Zahl 7.)

> [!solution]- Lösung
>
> 
> ```
> 901
> 310
> 902
> 110
> 602
> ```

Es gibt auch Springbefehle, die nur springen, je nachdem was im Akkumulator gerade steht.
- `7xx` springt nach xx, falls im Akkumulator aktuell 0 steht, sonst nicht.
- `8xx` springt nach xx, falls im Akkumulator eine Zahl grösser oder gleich 0 steht, sonst nicht.

Entwickeln Sie damit ein Programm, das zwei Inputwerte **vergleicht** und `1` ausgibt, wenn sie gleich sind, und `0`, wenn sie ungleich sind.

> [!solution]- Lösung
> 
> Im Speicher hat es "Lücken", weil ich beim Schreiben des Programms ja nicht weiss, wie lange das Programm wird. (In einem richtigen Computer wäre das verschwenderisch! Assembler löst das mit "Labels".)
> 
> ```
> 901
> 320
> 901
> 220
> 710
> 521
> 615
> 
> 
> 
> 522
> 615
> 
> 
> 
> 902
> 000
> 
> 
> 
> 
> 0
> 1
> ```
> 

Entwickeln Sie ein Programm, das zwei Inputwerte **multipliziert**, dann das Ergebnis ausgibt und stoppt.

> [!solution]- Mögliche Lösung
> 
> ```
> 901
> 716
> 318
> 901
> 716
> 319
> 520
> 118
> 320
> 519
> 217
> 714
> 319
> 604
> 520
> 902
> 0
> 1
> 
> 
> 0
> ```

Weitere Ideen: 
- Entwickeln Sie ein Programm, das die zwei Inputwerte subtrahiert, wenn sie nicht gleich sind, ansonsten addiert, dann das Ergebnis ausgibt und stoppt.
- Entwickeln Sie ein Programm, das Fakultät berechnet. Ein Beispiel für Fakultät 4. $$4! = 4 \times 3 \times 2 \times 1 = 24$$
## Binär ist das etwas komplizierter
### Bit und Bytes

* Eine einzelne Stelle im Speicher kann ein einzelnes 0 oder 1 repräsentieren. Das nennen wir ein **Bit**. Bei unserem Addierer war ein Lämpchen oder ein Schalter jeweils ein Bit.
* Acht von diesen Bits zusammen ergeben ein **Byte**.
![[bit-byte.excalidraw]]

Jetzt nutzt man die bestehenden Begriffe Kilo (10<sup>3</sup>), Mega (10<sup>6</sup>), Giga (10<sup>9</sup>), Tera (10<sup>12</sup>), um grössere Speicher zu beschreiben. Einziger Unterschied: Weil die **Speicheradressen binär** sind, nutzt man als Schwelle nicht 10<sup>3</sup> (1000), sondern die nächstliegendste Zweierpotenz: 2<sup>10</sup> (**1024**).

```
1 Kilobyte = 1024 Bytes
1 Megabyte = 1024 Kilobytes
1 Gigabyte = 1024 Megabytes
1 Gigabyte = 1024 * 1024 * 1024 Bytes = 1'073'741'824 Bytes
```

Es genügt, wenn Sie sich merken, dass Sie beim 1024-er Schritte machen müssen. Um die Grössenordnung abzuschätzen, reichen Zehnerpotenzen. Ein Gigabyte hat *ungefähr* eine Milliarde Bytes.
### Von Neumann im Binärsystem

Wir haben hier die Funktion mit Dezimalzahlen erklärt. In Wahrheit funktioniert alles binär.
- Ein **64-Bit**-Prozessor hat eine 64-Bit (8 Byte) breite Datenverarbeitung. Das heisst: Die Register, die Speicheradressen und die relevanten Busse sind 64-Bit breit.
- Eine einzelne adressierbare Speicherzelle im RAM ist 1 Byte lang. Eine 64-Bit Instruktion braucht also **8 Speicherzellen**!
- Der "Program counter" erhöht sich nicht um 1 wie hier, sondern zeigt auf die nächste Speicheradresse, wo die nächsten Instruktion beginnt.

## Zusatzinfo: Programmiersprachen von Bits zu Python

Der Little Man Computer (LMC) ist ein idealisiertes Modell eines Computers, das zum Lernen der grundlegenden Mechanismen genutzt wird. Natürlich geschieht fast keine produktive Arbeit auf diesem Level, sondern wir verwenden **Programmiersprachen.** 
### Binärcode (Hex-Notation)
Der grundlegendste Code, den ein Computer verstehen kann, ist Binärcode - eine Folge von Nullen und Einsen. Diese repräsentieren direkt die Maschinenbefehle, die der Prozessor ausführt. Im Kontext des LMC umfasst dies einfache Befehle wie Laden, Speichern, Addieren, Subtrahieren, Springen, wenn Null, und so weiter.

![[memory-adressen.png]]
### Assembler
Assemblersprache ist eine etwas benutzerfreundlichere Darstellung des Binärcodes. Jeder Maschinenbefehl im Binärcode hat ein Äquivalent in der Assemblersprache, das durch mnemonische Codes (wie LDA für "load", STA für "store") dargestellt wird. Ein Assembler ist ein Programm, das diese mnemonischen Codes in Binärcode übersetzt, den der Computer direkt ausführen kann. Dieser Schritt macht den Code menschenlesbarer, bleibt aber sehr hardwarenah.

![[assembler.png]]
### Höhere Programmiersprachen (C, C++)

Sprachen wie C sind weiter von der Maschinensprache entfernt und bieten Konstrukte wie Funktionen, Kontrollstrukturen (if-else, Schleifen) und komplexe Datentypen, die das Programmieren erleichtern. Ein Compiler übersetzt den in einer solchen höheren Sprache geschriebenen Code in Assembler oder direkt in Binärcode. Der Code in C und ähnlichen Sprachen ist effizient und ermöglicht eine präzise Kontrolle über die Hardware, was in systemnaher Programmierung nützlich ist.

![[cpp.png]]
### (Python, Javascript)
Python ist eine hochgradig abstrakte Sprache, die viele komplexe Funktionen in einfache Befehle kapselt. Python-Programme sind einfacher zu schreiben und zu lesen als C-Programme, jedoch wird ein Interpreter benötigt, der Python-Code zur Laufzeit in Maschinenbefehle umsetzt. Für zusätzliche Effizienz kann Python-Code auch in C-Code übersetzt und dann kompiliert werden, um eine nähere Maschinensteuerung zu ermöglichen.

![[python.png]]