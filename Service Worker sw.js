const CACHE_NAME = 'quran-companion-cache-v1';
// Liste des fichiers à mettre en cache pour que l'app fonctionne hors ligne.
const urlsToCache = [
  './', // Ajoute la racine du site
  './index.html', // Renommé de le-chemin-vers-le-coran.html
  './translations.js',
  './manifest.json',
  './sw.js', // Le service worker doit se mettre en cache lui-même
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap',
  'https://i.postimg.cc/MvFHgV5v/logo.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];
// 1. Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert. Mise en cache des fichiers de l\'application.');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Stratégie de cache : "Cache d'abord, puis réseau"
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on la cherche sur le réseau
        return fetch(event.request);
      })
  );
});
