const CACHE="abismal-hellfire-v2-11000m";
const ASSETS=["/","/manifest.json","/feed/metal","/covers/ia_abismal_hellfire_album_cover.webp"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(f=>{if(e.request.url.includes("/covers/")||e.request.url.includes("/feed/")){let cl=f.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));}return f;}).catch(()=>{if(e.request.destination==="image")return caches.match("/covers/ia_abismal_hellfire_album_cover.webp");})));});
