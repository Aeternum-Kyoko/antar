'use strict';
const memoryPatterns=typeof module!=='undefined'&&module.exports?require('./patterns.js'):AntarPatterns;
const AntarMemory=(()=>{
 const knownNeed=id=>typeof id==='string'&&id!==''&&id!=='unsure';
 function filterLogs(entries,f={}){const query=(f.q||'').trim().toLowerCase();return entries.filter(memoryPatterns.valid).filter(e=>{
  const day=memoryPatterns.dateKey(new Date(e.at));if(f.from&&day<f.from||f.to&&day>f.to)return false;
  if(f.mood&&f.mood!=='any'&&!e.moods.includes(f.mood))return false;
  if(f.need&&f.need!=='any'&&e.need!==f.need)return false;
  if(f.situation&&f.situation!=='any'&&e.situation!==f.situation)return false;
  if(f.outcome&&f.outcome!=='any'&&e.outcome!==f.outcome)return false;
  const text=[e.note||'',e.nuance||'',e.need||'',e.situation||'',e.activity||'',e.activityDetail||'',...e.moods,day,new Date(e.at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})].join(' ').toLowerCase();return !query||text.includes(query);
 }).sort((a,b)=>Date.parse(b.at)-Date.parse(a.at));}
 function similarActions(entries,profile={},now=new Date()){
  const moods=(profile.moods||[]).filter(m=>m!=='unsure'),need=knownNeed(profile.need)?profile.need:'',hasComparison=moods.length>0||!!need;
  const groups=new Map();for(const e of entries.filter(memoryPatterns.valid)){
   if(!e.activity||!['helped','not-helped'].includes(e.outcome)||Date.parse(e.at)>now.getTime())continue;
   const matchedMoods=moods.filter(m=>e.moods.includes(m)),needMatch=!!need&&e.need===need;
   if(hasComparison&&!matchedMoods.length&&!needMatch)continue;
   if(profile.situation&&profile.situation!=='any'&&profile.situation!=='unsure'&&e.situation!==profile.situation)continue;
   if(Number.isFinite(profile.intensity)&&Math.abs(e.intensity-profile.intensity)>1)continue;
   const detail=(e.activityDetail||'').trim();const key=e.activity==='reflection'&&e.excerptId?'passage:'+e.excerptId:e.activity==='other'&&!detail?'entry:'+e.id:'activity:'+e.activity+':'+detail.toLowerCase();
   let group=groups.get(key);if(!group){group={id:key,activity:e.activity,activityDetail:detail,excerptId:e.excerptId||'',helped:0,rated:0,entryIds:[],matchedMoods:new Set(),needMatched:false,lastHelpfulAt:null,lastHelpfulNote:'',similar:hasComparison,score:0};groups.set(key,group)}
   group.rated++;group.entryIds.push(e.id);for(const m of matchedMoods)group.matchedMoods.add(m);group.needMatched||=needMatch;group.score=Math.max(group.score,matchedMoods.length*3+(needMatch?3:0));
   if(e.outcome==='helped'){group.helped++;if(!group.lastHelpfulAt||Date.parse(e.at)>Date.parse(group.lastHelpfulAt)){group.lastHelpfulAt=e.at;group.lastHelpfulNote=e.note||'';}}
  }
  return [...groups.values()].filter(g=>g.helped>0).map(g=>({...g,matchedMoods:[...g.matchedMoods]})).sort((a,b)=>b.score-a.score||b.helped/b.rated-a.helped/a.rated||Date.parse(b.lastHelpfulAt)-Date.parse(a.lastHelpfulAt));
 }
 function needs(entries){const records=entries.filter(memoryPatterns.valid);const groups=new Map();for(const e of records){if(!knownNeed(e.need))continue;let group=groups.get(e.need);if(!group){group={need:e.need,count:0,dayKeys:new Set(),entryIds:[],fingerprintKeys:[]};groups.set(e.need,group)}group.count++;group.dayKeys.add(memoryPatterns.dateKey(new Date(e.at)));group.entryIds.push(e.id);group.fingerprintKeys.push(JSON.stringify([e.id,e.at,e.need]))}return{total:records.length,withNeeds:records.filter(e=>knownNeed(e.need)).length,groups:[...groups.values()].map(g=>({need:g.need,count:g.count,days:g.dayKeys.size,entryIds:g.entryIds.sort(),fingerprintKeys:g.fingerprintKeys.sort(),recurring:g.dayKeys.size>=3})).sort((a,b)=>b.days-a.days||b.count-a.count||a.need.localeCompare(b.need))};}
 function fingerprint(need,scope,ids){return JSON.stringify([need,scope,[...ids].sort()]);}
 function mergeChanges(base,next,latest){const baseMap=new Map(base.map(e=>[e.id,e])),nextMap=new Map(next.map(e=>[e.id,e])),result=new Map(latest.map(e=>[e.id,e]));for(const id of baseMap.keys())if(!nextMap.has(id))result.delete(id);for(const [id,e] of nextMap)if(!baseMap.has(id)||JSON.stringify(baseMap.get(id))!==JSON.stringify(e))result.set(id,e);return [...result.values()];}
 return{filterLogs,similarActions,needs,fingerprint,mergeChanges};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=AntarMemory;
