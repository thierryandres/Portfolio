Portfolio-Webseite Thierry Andres

## Abstract ##
Meine Portfolio-Webseite ist meine digitale Visitenkarte. Sie zeigt konzentriert, wer ich bin, welche Technologien ich beherrsche und was mich privat antreibt. Ich bin Thierry Andres, 16 Jahre alt und im ersten Lehrjahr meiner Informatik-Ausbildung (Applikationsentwicklung) bei Bystronic. Die Seite buendelt meine wichtigsten Inhalte (Ueber mich, Skills, Diplome, Hobbys, Galerie, Konzept, Kontakt) in einem klar strukturierten, responsiven Frontend auf Basis von HTML, CSS und JavaScript. Ziel ist es, Professionalitaet zu zeigen und gleichzeitig persoenlich zu bleiben.

## Zielpublikum ##
Die Seite richtet sich an Menschen, die sich ein Bild von mir machen moechten:
- **Ausbildner:innen und Vorgesetzte:** schnelles Pruefen von Kompetenzen, Projekten und Kontaktmoeglichkeiten.
- **Kuenftige Arbeitgeber oder Projektpartner:** Fokus auf Skills, Arbeitsweise und Referenzen.
- **Freundeskreis und Interessierte:** persoenliche Einblicke in Hobbys und Motivation.
- **Technik-Community:** Austausch mit Personen, die aehnliche Interessen wie Motorradfahren oder Softwareentwicklung teilen.

Die Gestaltung ist auf gute Lesbarkeit und Barrierearmut ausgelegt: hoher Kontrast, Schriftgroessen zwischen 1.05 rem und 2.75 rem (per `clamp` responsiv skaliert), ausreichende Weissraeume und eine Navigation, die sowohl per Maus als auch per Touch unkompliziert funktioniert.

## Sitemap ##
- `index.html`: Startseite mit Hero-Sektion, kurzer Projektuebersicht und Highlights.
- `ueber_mich.html`: Steckbrief, Motivation und Werte inklusive Portraitfoto.
- `skills.html`: Uebersicht ueber technische Skills, Tools, Soft Skills und Sprachen.
- `diplome.html`: Auflistung von Abschluessen und Zertifikaten.
- `hobbys.html`: Persoenliche Interessen mit Bildstrecken.
- `gallery.html`: Bildgalerie mit Slider (JavaScript gesteuert).
- `konzept.html`: Dokumentation der Gestaltungsideen (Farbpalette, Breakpoints, Mockups).
- `contact.html`: Validiertes Kontaktformular plus alternative Kontaktwege.
- `impressum.html`: Rechtliche Angaben und Kontaktdaten.

## Farben und Schriften ##
### Farben
- `#1F5F8B` (Primaerblau): praegt Logo, Buttons, aktive Navigation. Die Farbe steht fuer Vertrauen und Technik und bildet einen klaren Kontrast zum hellen Hintergrund.
- `#2F74A8` (Sekundaerblau): wird fuer Hover- und Fokuszustaende eingesetzt, damit Interaktionen visuell nachvollziehbar bleiben.
- `#F5A623` (Akzentorange): markiert besonders wichtige Elemente (Call-to-Actions und Icons) und bringt Waerme in das ansonsten kuehle Farbschema.
- `#F5F7FB` (Hintergrund): sehr helles Grau-Blau als Grundflaeche, damit Karten und Textbereiche weich eingebettet werden und lange Lesetexte nicht auf reinem Weiss stehen.
- `#FFFFFF` (Surface): Karten- und Formularhintergrund fuer einen klaren Layer ueber dem Grundlayout.
- `#1F2B3A` (Primaertext): dunkles Petrol, sorgt fuer optimale Lesbarkeit auf hellem Grund.
- `#5B6B7A` (Sekundaertext): abgeschwaechte Variante fuer erklaerende Texte oder Beschreibungen.
- `#0F1D2B` (Footer): sehr dunkler Blauton schafft Gewicht am Seitenende und sorgt fuer klar abgegrenzte Metainformationen.

Die Farbpalette ist bewusst konsistent: Blau steht fuer Seriositaet und passt zur technischen Ausbildung, Orange sorgt als Akzent fuer Aufmerksamkeit bei Buttons und Links, ohne den ruhigen Gesamteindruck zu stoeren. Transparente Layer (z. B. `rgba(255, 255, 255, 0.94)`) erzeugen Tiefe, bleiben aber leicht genug, damit Inhalte im Fokus bleiben.

### Schriften
- **Schriftfamilie:** `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`. Diese systemnahen Sans-Serif-Fonts sind auf Windows, macOS und mobilen Geraeten verfuegbar, wirken modern und sind auf Displays hervorragend lesbar.
- **Basisgroesse:** Im `:root` ist `font-size: 16px` gesetzt, wodurch rem-Werte konsistent bleiben und Browser-Zoom zuverlaessig funktioniert.
- **Headlines:** `clamp`-Funktionen (z. B. `clamp(2rem, 5vw, 2.75rem)`) skalieren Ueberschriften dynamisch zwischen Smartphone und Desktop.
- **Lauftext:** Mit ca. 1.05 rem liegt der Text leicht ueber dem Standard und verhindert ermuedendes Lesen. Formulare erben die Schrift aus dem Body (`font: inherit`), damit alle Eingabefelder denselben Look haben.
- **Gewichte:** Eine Kombination aus Normalgewicht, 500 (Navigation) und 600 (Buttons, Unterueberschriften) lenkt die Aufmerksamkeit, ohne viele unterschiedliche Fonts laden zu muessen.

Die Entscheidung gegen dekorative Schriften hilft, Ladezeiten zu reduzieren und den serioesen Eindruck zu staerken. Gleichzeitig bleibt das Layout durch die klaren Sans-Serif-Schnitte leicht und zeitgemaess.

