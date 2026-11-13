'use strict';
const AntarSkills=(()=>{
 const sources={
  worry:{title:'NHS · Problem solving',url:'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/problem-solving/'},
  check:{title:'NHS · Thought record',url:'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/thought-record/'},
  reframe:{title:'NHS · Reframing thoughts',url:'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/reframing-unhelpful-thoughts/'},
  distance:{title:'WHO · Doing What Matters in Times of Stress',url:'https://www.who.int/thailand/activities/doing-what-matters-in-times-of-stress'},
  actions:{title:'NHS · Depression treatment / behavioural activation',url:'https://www.nhs.uk/mental-health/conditions/depression-in-adults/treatment/'},
  sleep:{title:'CDC · About sleep',url:'https://www.cdc.gov/sleep/about/index.html'},
  stress:{title:'WHO · Stress',url:'https://www.who.int/news-room/questions-and-answers/item/stress'},
  learning:{title:'NIH / NICHD · Sleep, learning and memory',url:'https://www.nichd.nih.gov/health/topics/sleep/conditioninfo/Pages/what-happens.aspx'}
 };
 const paths={
  action:{title:'Something I can act on',hi:'Ek practical cheez',prompt:'What is one safe, manageable step?',hint:'A small request, a concrete task, or asking for support. You do not have to solve everything.',next:'One piece at a time.'},
  information:{title:'Something I need to find out',hi:'Thodi jaankari chahiye',prompt:'What information would actually help?',hint:'Choose a trustworthy person or source, and a stopping point. Repeated checking can be different from learning something new.',next:'One useful question.'},
  uncertainty:{title:'A “what if” I cannot settle now',hi:'Abhi iska pakka jawab nahi',prompt:'What can you leave open for now?',hint:'Leaving a question open does not make the concern unreal. You can return to it when there is new information or support.',next:'A little space from the question.'},
  unsure:{title:'I’m not sure yet',hi:'Abhi clear nahi',prompt:'What would make this moment more manageable?',hint:'You can choose company, a pause, or one question. There is no need to classify this correctly.',next:'No label needed.'}
 };
 const actionBank={
  connection:{gentle:['Send a simple “thinking of you” message','Sit near someone you feel comfortable with'],some:['Ask a trusted person for a short check-in','Share one honest sentence with someone safe'],more:['Plan a low-pressure catch-up','Do one small shared activity with a friend']},
  enjoyment:{gentle:['Listen to one familiar song','Look out of a window for a moment'],some:['Spend a few minutes on a hobby you like','Take a short, comfortable walk if accessible'],more:['Make room for a favourite activity','Visit a familiar place you enjoy, if manageable']},
  meaning:{gentle:['Write one line about what matters today','Take one tiny step on something you care about'],some:['Spend five minutes on a personally important task','Ask for something that would support your values'],more:['Set aside a manageable block for a meaningful project','Offer a small act of help within your limits']}
 };
 const suggestions=(category,energy)=>actionBank[category]?.[energy]||[];
 const distance=thought=>thought.trim()?`Abhi mere mann mein “${thought.trim()}” wala thought aa raha hai.`:'';
 function validDay(day){if(!/^\d{4}-\d{2}-\d{2}$/.test(day||''))return false;const [y,m,d]=day.split('-').map(Number),date=new Date(y,m-1,d);return date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d}
 const dayKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
 function bodySummary(items,now=new Date()){
  const today=dayKey(now),start=new Date(now);start.setDate(start.getDate()-29);const cutoff=dayKey(start),byDay=new Map();
  for(const item of items)if(item.kind==='body-note'&&validDay(item.day)&&item.day<=today&&item.day>=cutoff){const prior=byDay.get(item.day);if(!prior||Date.parse(item.updatedAt)>Date.parse(prior.updatedAt))byDay.set(item.day,item)}
  const entries=[...byDay.values()].sort((a,b)=>a.day.localeCompare(b.day));
  
  const paired=entries.filter(x=>['poor','mixed','rested'].includes(x.sleepQuality)&&['low','steady','high'].includes(x.energy));
  const span=paired.length?Math.round((Date.parse(paired.at(-1).day+'T12:00:00Z')-Date.parse(paired[0].day+'T12:00:00Z'))/86400000):0;
  return{entries,days:entries.length,span,paired:paired.length,ready:paired.length>=7&&span>=14,poorAndLow:paired.filter(x=>x.sleepQuality==='poor'&&x.energy==='low').length};
 }
 return{sources,paths,suggestions,distance,validDay,dayKey,bodySummary};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=AntarSkills;
