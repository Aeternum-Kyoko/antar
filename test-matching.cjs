const assert=require('node:assert/strict');
const fs=require('node:fs');
const {rank}=require('./dist/matching.js');
const manifest=JSON.parse(fs.readFileSync('./dist/library/manifest.json','utf8'));
const data=JSON.parse(fs.readFileSync('./dist/library/excerpts.json','utf8'));
const entries=data.entries,needs=['comfort','perspective','understanding','action'];
const moods='overwhelmed anxious looping sad lonely ashamed guilty angry numb exhausted uncertain jealous restless hurt okay unsure'.split(' ');
assert.equal(entries.length,39);assert.equal(new Set(entries.map(e=>e.sourceId)).size,13);
for(const e of entries){
 assert.match(e.id,/^[a-z0-9-]+$/);const s=manifest.sources.find(s=>s.id===e.sourceId);assert.ok(s);
 const sections=JSON.parse(fs.readFileSync('./dist/library/'+s.text,'utf8'));const section=sections[e.sectionIndex];
 assert.ok(section,e.id);assert.equal(section.text.slice(e.start,e.end),e.quote,e.id+' exact UTF-16 source range');
 assert.ok(e.quote.trim().length>20);assert.ok(e.hinglish&&e.why&&e.prompt&&e.locator);
 assert.ok(e.moods.every(m=>moods.includes(m)));assert.ok(e.needs.every(n=>needs.includes(n)));
 assert.ok(e.intensityMax>=1&&e.intensityMax<=5);assert.equal(typeof e.sensitive,'boolean');
}
let checked=0;
for(const mood of moods){
 assert.ok(entries.some(e=>e.moods.includes(mood)&&!e.sensitive),'gentle coverage '+mood);
 for(const need of needs)for(let intensity=1;intensity<=5;intensity++)for(const allowChallenging of [false,true]){
  const results=rank(entries,{moods:[mood],need,intensity,allowChallenging});
  for(const r of results){assert.ok(r.entry.moods.includes(mood));assert.ok(r.entry.needs.includes(need));assert.ok(r.entry.intensityMax>=intensity);assert.ok(!r.entry.sensitive||allowChallenging&&intensity<4);}
  checked++;
 }
}
for(const source of manifest.sources){const rs=rank(entries,{source:source.id,allowChallenging:true,intensity:3});assert.ok(rs.length);assert.ok(rs.every(r=>r.entry.sourceId===source.id));}
const mixed=rank(entries,{moods:['anxious','overwhelmed'],need:'perspective',allowChallenging:true});assert.ok(mixed.some(r=>r.matchedMoods.length===2));assert.ok(mixed.every(r=>r.entry.moods.some(m=>['anxious','overwhelmed'].includes(m))));
const first=mixed[0].entry.id;assert.ok(rank(entries,{moods:['anxious','overwhelmed'],need:'perspective',allowChallenging:true,dismissed:[first]}).every(r=>r.entry.id!==first));
assert.deepEqual(rank(entries,{moods:['nonexistent-feeling'],need:'comfort',allowChallenging:true}),[],'no unrelated fallback');
assert.deepEqual(rank(entries,{moods:['angry'],need:'comfort',source:'kafka-trial',allowChallenging:true}),[],'no forced writer/need match');
const fixture=[{id:'a',sourceId:'book',moods:['anxious'],needs:['perspective'],nuances:[],sensitive:false,intensityMax:3},{id:'b',sourceId:'book',moods:['anxious'],needs:['perspective'],nuances:['Future uncertainty'],sensitive:false,intensityMax:3}];
assert.equal(rank(fixture,{moods:['anxious'],need:'perspective',nuance:'Future uncertainty'})[0].entry.id,'b');
console.log('Verified39 exact source ranges,13 editions,16 gentle mood categories and '+checked+' mood/need/intensity/consent combinations.');
