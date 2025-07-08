# Opera Subtitles Web App

## Was ist das?

Eine einfache Web-App, die dir beim Hören einer Oper auf Spotify automatisch die passenden Untertitel (Übersetzung + Originaltext) anzeigt. Die App erkennt, welches Stück gerade läuft, und zeigt die richtige Zeile aus dem Libretto an.

## Wie benutze ich die App?

1. **Spotify Developer Zugang:**
   - Gehe auf https://developer.spotify.com/dashboard/applications
   - Erstelle eine neue App und kopiere die `Client ID`.
   - Füge die `Client ID` in der Datei `app.js` bei `CLIENT_ID` ein.
   - Setze als Redirect URI die URL deiner GitHub Pages (z.B. `https://deinname.github.io/`)

2. **App starten:**
   - Öffne die `index.html` auf GitHub Pages oder lokal im Browser.
   - Klicke auf "Mit Spotify verbinden" und logge dich ein.
   - Starte ein Opernstück auf Spotify.
   - Die Untertitel erscheinen automatisch, wenn ein passendes Libretto vorhanden ist.

3. **Libretto/Übersetzung anpassen:**
   - Bearbeite die Datei `libretto_sample.json` oder füge eigene JSON-Dateien hinzu.
   - Achte auf das Format (siehe Beispiel).

## Hinweise
- Die App funktioniert am besten mit Opern, für die ein passendes Libretto im JSON-Format vorliegt.
- Es werden keine Daten gespeichert oder weitergegeben.
- Alles läuft im Browser, keine Installation nötig.

## Beispiel für ein Libretto (libretto_sample.json)

```
{
  "opera": "La Traviata",
  "lines": [
    {
      "track": "Libiamo ne' lieti calici",
      "start_ms": 0,
      "end_ms": 30000,
      "role": "Violetta",
      "original": "Libiamo, libiamo ne' lieti calici",
      "translation": "Lasst uns trinken aus den vollen Bechern!"
    }
  ]
}
```

Viel Spaß mit deiner Opern-App!
