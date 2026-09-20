const CACHE='master-shell-v17';
const SHELL=[
  './',
  './index.html',
  './styles.css?v=audio-5',
  './app.js?v=audio-5',
  './manifest.webmanifest',
  './assets/office.webp',
  './assets/boardroom.webp',
  './assets/hangar.webp',
  './assets/interview.webp',
  './assets/characters.webp',
  './assets/daniel-vorcaro.webp',
  './assets/toffoli.webp',
  './assets/stf-office.webp',
  './assets/andre-mendonca.webp',
  './assets/pf-lab.webp',
  './assets/copa-2022-operatives.webp',
  './assets/copa-residence-street.webp',
  './assets/copa-civic-avenue.webp',
  './assets/copa-abort-road.webp',
  './assets/audio/wake.mp3',
  './assets/audio/ui.mp3',
  './assets/audio/interact.mp3',
  './assets/audio/advance.mp3',
  './assets/audio/blip.mp3',
  './assets/audio/success.mp3',
  './assets/audio/error.mp3',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-192.svg',
  './assets/icon-512.svg'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      const fresh=fetch(event.request).then(response=>{
        if(response && response.ok && new URL(event.request.url).origin===self.location.origin){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      }).catch(()=>cached);
      return cached||fresh;
    })
  );
});
