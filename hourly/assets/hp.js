(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var f=$('[data-filter]');
if(f){var rows=[].slice.call(d.querySelectorAll(f.getAttribute('data-filter'))),none=$('[data-none]');
 f.addEventListener('input',function(){var q=f.value.trim().toLowerCase(),n=0;rows.forEach(function(r){var hit=!q||(r.getAttribute('data-k')||r.textContent).toLowerCase().indexOf(q)>-1;r.hidden=!hit;if(hit)n++});if(none)none.hidden=n>0})}
var form=$('#hp-form');if(!form)return;
var amt=$('#hp-a'),per=$('#hp-p'),hw=$('#hp-h'),wy=$('#hp-w'),ot=$('#hp-o'),om=$('#hp-m'),cur=$('#hp-c'),res=$('#hp-res');
function fmt(n){return cur.value+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
function calc(){var a=parseFloat(amt.value),h=parseFloat(hw.value),w=parseFloat(wy.value),o=parseFloat(ot.value)||0,m=parseFloat(om.value)||1.5;
 if(!(a>0)){res.hidden=true;return}
 if(!(h>0&&h<=168)||!(w>0&&w<=52)||o<0||h+o>168){res.hidden=false;res.innerHTML='<h2>Check the hours and weeks</h2><p>Hours a week (with overtime) must be between 1 and 168, and paid weeks a year between 1 and 52.</p>';return}
 var rate=per.value==='hour'?a:per.value==='week'?a/h:per.value==='month'?a*12/(h*w):a/(h*w);
 var baseWeek=rate*h,otWeek=rate*m*o,week=baseWeek+otWeek,year=week*w;
 var rows=[['Hourly rate',rate],['Per day ('+(Math.round(h/5*100)/100)+' hours)',baseWeek/5],['Per week',week],['Per fortnight (2 weeks)',week*2],['Per month',year/12],['Per year',year]];
 var h2=per.value==='hour'?fmt(a)+' an hour is '+fmt(year)+' a year':fmt(a)+' a '+per.value+' is '+fmt(rate)+' an hour';
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>'+h2+'</h2><div class="tbl"><table><tbody>'+rows.map(function(r){return '<tr><td>'+r[0]+'</td><td class="hp-n">'+fmt(r[1])+'</td></tr>'}).join('')+'</tbody></table></div>'+
  (o>0?'<p>Each week: '+fmt(baseWeek)+' for '+h+' regular hours, plus '+fmt(otWeek)+' for '+o+' overtime hours at '+m+' times the rate ('+fmt(rate*m)+' an hour).</p>':'')+
  '<p class="hint">Before tax and deductions. Worked out with '+h+' hours a week and '+w+' paid weeks a year ('+Math.round(h*w)+' hours). A month is one twelfth of a year.</p>'+
  '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(h2+'\n'+rows.map(function(r){return r[0]+': '+fmt(r[1])}).join('\n'))+'">Copy result</button><button class="btn sm ghost" type="button" data-share="'+S.esc(h2+' (before tax)')+'">Share</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>';
 try{localStorage.setItem('hp-last',JSON.stringify({h:hw.value,w:wy.value,c:cur.value}))}catch(e){}}
form.addEventListener('submit',function(e){e.preventDefault();calc()});
[amt,per,hw,wy,ot,om,cur].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)});
try{var l=JSON.parse(localStorage.getItem('hp-last')||'null');if(l){hw.value=l.h;wy.value=l.w;cur.value=l.c}}catch(e){}
var m=location.hash.match(/rate=([0-9.]+)/);if(m){amt.value=m[1];per.value='hour';cur.value='$';calc()}
})();