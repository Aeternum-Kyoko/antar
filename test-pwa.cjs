const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const origin='https://antar.example';const handlers={};const storage=new Map();
let offline=false,claimed=false,activated=false;
const key=x=>typeof x==='string'?new URL(x,origin).pathname:new URL(x.url).pathname;
const caches={async open(name){if(!storage.has(name))storage.set(name,new Map());const m=storage.get(name);return{put:async(k,r)=>m.set(key(k),r.clone()),match:async k=>m.get(key(k))?.clone(),keys:async()=>[...m.keys()].map(x=>new Request(origin+x)),delete:async k=>m.delete(key(k))}},keys:async()=>[...storage.keys()],delete:async n=>storage.delete(n)};
const fetch=async req=>{if(offline)throw Error('offline');const path=key(req);const file='dist'+(path==='/'?'/index.html':path);if(!fs.existsSync(file))return new Response('',{status:404});const response=new Response(fs.readFileSync(file),{headers:{'Content-Type':path.endsWith('.json')?'application/json':'text/plain'}});Object.defineProperty(response,'url',{value:origin+path});return response};
vm.runInNewContext(fs.readFileSync('dist/sw.js','utf8'),{self:{location:{origin},clients:{claim:async()=>{claimed=true}},skipWaiting:()=>{activated=true},addEventListener:(n,f)=>handlers[n]=f},caches,fetch,URL,Response});
async function event(name){let task;handlers[name]({waitUntil:p=>task=p});await task}
async function request(path,mode='cors',method='GET'){let response;handlers.fetch({request:{url:origin+path,method,mode},respondWith:p=>response=p});return response&&await response}
(async()=>{
 const manifest=JSON.parse(fs.readFileSync('dist/manifest.webmanifest'));
 assert.equal(manifest.display,'standalone');for(const icon of manifest.icons){const data=fs.readFileSync('dist/'+icon.src);assert.equal(data.readUInt32BE(16),Number(icon.sizes.split('x')[0]));}
 await event('install');assert(storage.get('antar-shell-solar-5').size>24);
 await caches.open('antar-shell-obsolete');await event('activate');assert(claimed);assert(!storage.has('antar-shell-obsolete'));
 offline=true;assert.match(await(await request('/','navigate')).text(),/pwa.js/);assert.match(await(await request('/library/excerpts.json')).text(),/entries/);
 assert.equal(await request('/api/private'),undefined);assert.equal(await request('/library/book.pdf'),undefined);assert.equal(await request('/app.js','cors','POST'),undefined);
 let uncached=await request('/library/confucius-analects-chapters.json');assert.equal(uncached.status,503);
 offline=false;const live=await request('/library/confucius-analects-chapters.json');assert.equal(live.status,200);offline=true;assert.equal((await request('/library/confucius-analects-chapters.json')).status,200);
 handlers.message({data:{type:'ACTIVATE_UPDATE'}});assert(activated);
 console.log('Verified manifest/icon dimensions, complete static precache, offline app/excerpts, visited chapter fallback, uncached chapter failure, cache cleanup, explicit update activation, and excluded API/download/write requests.');
})().catch(e=>{console.error(e);process.exit(1)});
