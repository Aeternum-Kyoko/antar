'use strict';
const AntarLiving=(()=>{
 const starts=['home','mood','mind','reset','comfort'];
 const start=value=>starts.includes(value)?value:'home';
 const launchHash=(hash,value,standalone=false)=>!hash||(standalone&&hash==='#home')?'#'+start(value):hash;
 const linkId=(from,to)=>'connection:'+JSON.stringify([from,to].sort());
 function links(items){const thoughts=new Set(items.filter(x=>x.kind==='thought').map(x=>x.id));return items.filter(x=>x.kind==='link'&&x.from!==x.to&&thoughts.has(x.from)&&thoughts.has(x.to))}
 function revisit(items,state={},now=new Date()){
  if(!state.enabled)return null;
  const last=Date.parse(state.lastShownAt||'');
  if(Number.isFinite(last)&&(now.getTime()-last)<7*86400000)return null;
  return items.filter(x=>x.revisit===true&&['thought','words'].includes(x.kind)).sort((a,b)=>Date.parse(a.lastRevisitedAt||a.createdAt)-Date.parse(b.lastRevisitedAt||b.createdAt)||a.id.localeCompare(b.id))[0]||null;
 }
 return{starts,start,launchHash,linkId,links,revisit};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=AntarLiving;
