'use strict';
// Editorial reading recommendations. Scores rank relevance; they are not clinical measurements.
const AntarMatching = (() => {
 function rank(entries, options={}) {
  const moods=Array.isArray(options.moods)?options.moods:[];
  const need=options.need||'any',source=options.source||'any';
  const intensity=Math.max(1,Math.min(5,Number(options.intensity)||3));
  const skipped=new Set(options.dismissed||[]);
  return entries.flatMap((entry,index)=>{
   if(skipped.has(entry.id)||source!=='any'&&entry.sourceId!==source)return [];
   if(intensity>entry.intensityMax)return [];
   if(entry.sensitive&&(!options.allowChallenging||intensity>=4))return [];
   const matchedMoods=moods.filter(m=>entry.moods.includes(m));
   if(moods.length&&!matchedMoods.length)return [];
   if(need!=='any'&&!entry.needs.includes(need))return [];
   const nuanceMatched=!!options.nuance&&(entry.nuances||[]).includes(options.nuance);
   const past=options.feedback?.[entry.id]||{};const feedbackHelped=Number(past.helped)||0,feedbackNotHelped=Number(past.notHelped)||0;const feedbackBoost=Math.max(-2,Math.min(2,feedbackHelped-feedbackNotHelped));
   return [{feedbackHelped,feedbackNotHelped,entry,matchedMoods,matchedNeed:need==='any'?null:need,nuanceMatched,score:matchedMoods.length*4+(need==='any'?0:4)+(nuanceMatched?3:0)+feedbackBoost,index}];
  }).sort((a,b)=>b.score-a.score||a.index-b.index);
 }
 return {rank};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=AntarMatching;
