// === Einstellungen ===
const CLIENT_ID = 'f916390e2ac04d8eaee09222620f5277'; // <-- Hier deine Spotify Client ID eintragen
const REDIRECT_URI = window.location.origin + window.location.pathname; // Muss in Spotify App erlaubt sein
const LIBRETTO_FILE = 'libretto_sample.json';

// === Hilfsfunktionen ===
function getHashParams() {
    const hash = window.location.hash.substring(1);
    return Object.fromEntries(hash.split('&').map(kv => kv.split('=')));
}

function fetchLibretto() {
    return fetch(LIBRETTO_FILE).then(r => r.json());
}

function colorForRole(role) {
    // Einfache Farbauswahl für Rollen
    const colors = {
        'Violetta': '#b71c1c',
        'Alfredo': '#1565c0',
        'Germont': '#388e3c',
        'Annina': '#6d4c41',
        'Chor': '#fbc02d'
    };
    return colors[role] || '#333';
}

// === Spotify Auth ===
function loginSpotify() {
    const scopes = 'user-read-playback-state user-read-currently-playing';
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
    window.location = url;
}

function getSpotifyToken() {
    const params = getHashParams();
    return params['access_token'];
}

// === Hauptlogik ===
let libretto = null;
let currentLine = null;

async function updateSubtitle(token) {
    document.getElementById('status').textContent = 'Lade Spotify-Info...';
    const resp = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!resp.ok) {
        document.getElementById('status').textContent = 'Fehler beim Abrufen von Spotify.';
        return;
    }
    const data = await resp.json();
    if (!data || !data.item) {
        document.getElementById('status').textContent = 'Nichts wird gerade gespielt.';
        return;
    }
    const track = data.item.name;
    const position = data.progress_ms;
    document.getElementById('status').textContent = `Gerade läuft: ${track}`;
    // Libretto-Zeile suchen
    if (!libretto) return;
    const line = libretto.lines.find(l => l.track === track && position >= l.start_ms && position <= l.end_ms);
    if (line) {
        if (currentLine !== line) {
            currentLine = line;
            document.getElementById('subtitle-container').style.display = '';
            document.getElementById('role').textContent = line.role + ':';
            document.getElementById('role').style.color = colorForRole(line.role);
            document.getElementById('translation').textContent = line.translation;
            document.getElementById('original').textContent = line.original;
        }
    } else {
        document.getElementById('subtitle-container').style.display = 'none';
    }
}

window.onload = async function() {
    document.getElementById('login-btn').onclick = loginSpotify;
    libretto = await fetchLibretto();
    const token = getSpotifyToken();
    if (token) {
        document.getElementById('login-btn').style.display = 'none';
        setInterval(() => updateSubtitle(token), 3000);
        updateSubtitle(token);
    }
};
