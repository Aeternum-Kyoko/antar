'use strict';
const CACHE='antar-shell-solar-5';
const READINGS='antar-readings-solar-5';
const CORE=['/','/index.html','/styles.css','/mobile.css','/fonts.css','/icon.svg','/icon-192.png','/icon-512.png','/apple-touch-icon.png','/manifest.webmanifest','/matching.js','/patterns.js','/memory-engine.js','/passages.js','/checkins.js','/understand.js','/interactive-stories.js','/history.js','/pwa.js','/app.js','/personal.css','/personal-data.js','/second-mind.js','/gentle-help.js','/journeys.js','/living-model.js','/living.js','/polish.css','/skills-model.js','/skills.js','/skills.css','/solar-model.js','/solar.js','/solar.css','/library/manifest.json','/library/excerpts.json'];
// Only explicitly listed static assets are cached. Auth redirects, API responses,
// logs, exports, and downloadable full editions never enter these caches.
async function checkedFetch(path){const response=await fetch(path,{cache:'reload'});if(!response.ok||response.redirected||new URL(response.url).origin!==self.location.origin)throw Error('Asset unavailable');return response;}
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const path of CORE)await cache.put(path,await checkedFetch(path));const fonts=await (await cache.match('/fonts.css')).text();for(const match of fonts.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)){const path=new URL(match[1],self.location.origin+'/').pathname;if(path.startsWith('/fonts/'))await cache.put(path,await checkedFetch(path));}})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('antar-')&&key!==CACHE&&key!==READINGS)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;const path=url.pathname;
 if(req.mode==='navigate'){if(path==='/'||path==='/index.html')event.respondWith((async()=>{return (await (await caches.open(CACHE)).match('/index.html'))||fetch(req)})());return;}
 if(CORE.includes(path)||path.startsWith('/fonts/')){event.respondWith((async()=>{const cached=await (await caches.open(CACHE)).match(path);return cached||fetch(req)})());return;}
 if(/^\/library\/[a-z0-9-]+-chapters\.json$/.test(path)){event.respondWith((async()=>{const cache=await caches.open(READINGS);try{const response=await fetch(req);if(response.ok&&!response.redirected&&response.headers.get('content-type')?.includes('json')){await cache.put(path,response.clone());const keys=await cache.keys();while(keys.length>20)await cache.delete(keys.shift());}return response}catch{const cached=await cache.match(path);return cached||new Response('{"offline":true}',{status:503,headers:{'Content-Type':'application/json'}})}})());}
});
