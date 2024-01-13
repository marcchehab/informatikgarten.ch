---
title: Module - Eine Denkhilfe für die Informatik
slug: denkhilfe-informatik
---

> Sie fragen sich vielleicht, wie es möglich ist, ein komplettes Computersystem von Grund auf zu konstruieren, das mit nichts anderem als elementarsten Schaltkreisen beginnt. Das muss ein gigantisches Unterfangen sein! Wir gehen mit dieser Komplexität um, indem wir **das System in Module aufteilen**. Jedes Modul wird ... separat in einem eigenständigen Projekt aufgebaut. Sie werden sich vielleicht fragen, wie es möglich ist, diese Module isoliert zu beschreiben und zu bauen? Sie sind doch sicher miteinander verbunden! Wie wir ... zeigen werden, impliziert ein gutes modulares Design genau das: Sie können an den einzelnen Modulen unabhängig voneinander arbeiten, während Sie den Rest des Systems völlig ignorieren. Wenn das System gut konzipiert ist, können Sie diese Module in beliebiger Reihenfolge und sogar parallel zueinander aufbauen, wenn Sie im Team arbeiten.
> 
> Die kognitive Fähigkeit des "Divide & Conquer", also ein komplexes System in überschaubare Module aufzuteilen, wird durch einen weiteren kognitiven Kniff gestärkt: unsere **Fähigkeit, zwischen der Abstraktion und der Implementierung der einzelnen Module zu unterscheiden**. In der Informatik nehmen wir diese Worte konkret: Die Abstraktion \[oder Schnittstelle\] beschreibt, was das Modul tut, und die Implementierung beschreibt, wie es dies tut. Mit dieser Unterscheidung im Hinterkopf lautet die wichtigste Regel in der Systemtechnik: Wenn Sie ein Modul als Baustein verwenden - egal welches Modul -, sollten Sie sich ausschliesslich auf die Abstraktion des Moduls konzentrieren und die Implementierungsdetails völlig ignorieren.
> 
> *Nisan, N. & Schocken, S. (2005) The Elements of Computing Systems: Building a Modern Computer from First Principles*

In der Welt der Informatik werden fast ausschliesslich **Schnittstellen** standardisiert und vorgeschrieben - z.B. Kommunikationsprotokolle, Stecker, Sockel, Pin-Belegungen, etc. Wie ein Modul dann diese Schnittstelle **implementiert**, ist meistens freigestellt. Die konkrete Funktionsweise eines Moduls interessiert uns nur, wenn wir dieses Modul verstehen wollen - ansonsten reicht uns die Schnittstelle. 

> [!example] Jetzt sind Sie dran!
> 
> Überlegen Sie sich bei folgenden Beispielen, was für Sie die Abstraktion / Schnittstelle ist, was die Funktionsweise / Implementierung, und wie beide zusammenhängen.

![[attachments/Pasted image 20230807161447.png]]
> [!question]- Sie tauschen Ihren Computer-Prozessor (**CPU**) aus...
> 
> Sie können ihren Prozessor austauschen und, sofern der neue Prozessor eine kompatible Schnittstelle hat, läuft ihr problemlos Computer weiter! Dies, obwohl die Funktionsweise des neuen Prozessors eine andere ist: hoffentlich besser, schneller, oder effizienter.
> 
> **Abstraktion / Schnittstelle**: Das Format des "Steckers" (man spricht vom Sockel) und die Funktionen, die der Prozessor kann.
> 
> **Implementierung / Funktionsweise**: Wie der Prozessor  gebaut wurde und wie er funktioniert. Das ist teilweise ein Geschäftsgeheimnis der Hersteller.

![[attachments/Pasted image 20230807173548.png]]
> [!question]- Sie kreieren eine **Webseite**.
>
>Sie nehmen einfach an, dass alle Ihre Besucher Geräte mit einem modernen Browser besitzen. 
>
>**Abstraktion / Schnittstelle**: Moderne Internet- und Webstandards (wie TCP/IP, HTTPS, HTML, CSS, Javascript, etc.)
>
>**Implementierung / Funktionsweise**: Wie der spezifische Browser oder die Geräte ihrer Benutzer funktionieren, können Sie gar nicht wissen und darf ihnen auch egal sein – das ist Sache der Benutzer.

![[attachments/Pasted image 20230807173846.png]]

> [!question]- Sie versenden **E-Mails**.
> 
> Hand aufs Herz: Wann haben Sie das letzte Mal darüber nachgedacht, wie Ihr E-Mail-Programm wohl funktioniert? 😅 Eben. Sie müssen das gar nicht wissen, es muss einfach E-Mails richtig verschicken und empfangen.
> 
> **Abstraktion / Schnittstelle**: Moderne Internet- und E-Mail-Standards (wie TCP/IP, SMTP, IMAP, POP...).
> 
> **Implementierung / Funktionsweise**: Wie Ihr E-Mail-Programm programmiert wurde. Das ist unter Umständen ebenfalls ein Geschäftsgeheimnis (e.g. Microsoft legt nicht offen, wie Outlook programmiert wurde).

Diese Idee bildlich veranschaulicht:

<iframe src="https://onedrive.live.com/embed?resid=FFA11E10DCAE9352%2129681&authkey=!AF-mFegEbwo2nAQ&em=2"></iframe>


> [!SUMMARY] Das Wichtigste in Kürze
> - Informatiker **teilen Systeme in Module auf**, die isoliert betrachtet werden können.
> - Bei Modulen kann man ihre **Abstraktion** (oder Schnittstelle) von ihrer Implementierung (oder Funktionsweise) unterscheiden.
> - Wenn man auf ein Modul aufbaut, nutzt man seine Schnittstelle/Abstraktion.
> - Wenn man ein Modul selbst verstehen will, schaut man auf die Funktionsweise.
