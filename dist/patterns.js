'use strict';
const AntarPatterns=(()=>{
 const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
 function valid(entry){return entry&&typeof entry.id==='string'&&Number.isFinite(Date.parse(entry.at))&&['difficult','rest'].includes(entry.kind)&&Array.isArray(entry.moods)&&Number.isInteger(entry.intensity)&&entry.intensity>=1&&entry.intensity<=5&&Number.isFinite(entry.minutes)&&entry.minutes>=0&&entry.minutes<=1440;}
 function entriesForMonth(entries,month){return entries.filter(valid).filter(e=>dateKey(new Date(e.at)).slice(0,7)===month);}
 function summarize(entries,month){
  const records=entriesForMonth(entries,month).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
  const days=new Set(records.map(e=>dateKey(new Date(e.at))));
  const difficult=records.filter(e=>e.kind==='difficult'),rest=records.filter(e=>e.kind==='rest');
  const groups=(items,field)=>{const result={};for(const e of items){for(const key of Array.isArray(e[field])?e[field]:[e[field]])if(key&&key!=='unsure'){const v=result[key]||(result[key]={count:0,days:new Set()});v.count++;v.days.add(dateKey(new Date(e.at)));}}return Object.entries(result).map(([key,v])=>({key,count:v.count,days:v.days.size})).sort((a,b)=>b.days-a.days||b.count-a.count||a.key.localeCompare(b.key));};
  const situations=groups(difficult,'situation');
  const moods=groups(difficult,'moods');
  const rated=records.filter(e=>e.activity&&['helped','not-helped'].includes(e.outcome));
  const activityKeys=[...new Set(rated.map(e=>e.activity))];
  const helpful=activityKeys.map(key=>{const a=rated.filter(e=>e.activity===key);return{key,helped:a.filter(e=>e.outcome==='helped').length,rated:a.length,days:new Set(a.map(e=>dateKey(new Date(e.at)))).size}}).filter(x=>x.rated>=3&&x.days>=3).sort((a,b)=>b.helped/b.rated-a.helped/a.rated||b.rated-a.rated);
  const thirds=[{label:'Days 1–10',days:new Set(),difficult:new Set()},{label:'Days 11–20',days:new Set(),difficult:new Set()},{label:'Days 21 onward',days:new Set(),difficult:new Set()}];
  for(const e of records){const d=new Date(e.at),key=dateKey(d),phase=thirds[d.getDate()<=10?0:d.getDate()<=20?1:2];phase.days.add(key);if(e.kind==='difficult')phase.difficult.add(key)}
  const span=records.length?(Date.parse(records.at(-1).at)-Date.parse(records[0].at))/86400000:0;
  const timeBands={morning:[],afternoon:[],evening:[],night:[]};for(const e of difficult){const h=new Date(e.at).getHours();timeBands[h>=5&&h<12?'morning':h>=12&&h<17?'afternoon':h>=17&&h<22?'evening':'night'].push(e)}
  const repeatedTimes=Object.entries(timeBands).map(([key,a])=>({key,count:a.length,days:new Set(a.map(e=>dateKey(new Date(e.at)))).size})).filter(x=>x.days>=3).sort((a,b)=>b.days-a.days);
  const allMonths=[...new Set(entries.filter(valid).map(e=>dateKey(new Date(e.at)).slice(0,7)))];
  const observedMonths=allMonths.filter(m=>new Set(entriesForMonth(entries,m).map(e=>dateKey(new Date(e.at)))).size>=6);
  const monthClusters=[];
  for(const m of observedMonths.sort().slice(-6)){
   const phaseSets=[new Set(),new Set(),new Set()];for(const e of entriesForMonth(entries,m).filter(e=>e.kind==='difficult')){const d=new Date(e.at);phaseSets[d.getDate()<=10?0:d.getDate()<=20?1:2].add(dateKey(d));}
   const counts=phaseSets.map(s=>s.size),order=[0,1,2].sort((a,b)=>counts[b]-counts[a]);
   if(counts.every(n=>n>=1)&&counts[order[0]]>=3&&counts[order[0]]-counts[order[1]]>=2)monthClusters.push({month:m,phase:order[0],days:counts[order[0]]});
  }
  const cycleObservations=[0,1,2].map(phase=>({phase,label:thirds[phase].label,months:monthClusters.filter(x=>x.phase===phase).map(x=>x.month),days:monthClusters.filter(x=>x.phase===phase).reduce((sum,x)=>sum+x.days,0)})).filter(x=>x.months.length>=3);
  return {records,loggedDays:days.size,difficultCount:difficult.length,restCount:rest.length,knownMinutes:records.filter(e=>e.durationKnown).reduce((sum,e)=>sum+e.minutes,0),durationCount:records.filter(e=>e.durationKnown).length,moods,situations: situations.filter(x=>x.days>=3),helpful,repeatedTimes:days.size>=7&&span>=14?repeatedTimes:[],thirds:thirds.map(x=>({label:x.label,loggedDays:x.days.size,difficultDays:x.difficult.size})),observedMonths:observedMonths.length,spanDays:span,cycleObservations};
 }
 function preferences(entries){const recent=entries.filter(valid).sort((a,b)=>Date.parse(b.at)-Date.parse(a.at)).slice(0,100);const ratings={};for(const e of recent){if(!e.excerptId||!['helped','not-helped'].includes(e.outcome))continue;const a=ratings[e.excerptId]||(ratings[e.excerptId]={helped:0,notHelped:0});a[e.outcome==='helped'?'helped':'notHelped']++;}return ratings;}
 return{dateKey,valid,entriesForMonth,summarize,preferences};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=AntarPatterns;
