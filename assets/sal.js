(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var f=$('[data-filter]');
if(f){var rows=[].slice.call(d.querySelectorAll(f.getAttribute('data-filter'))),none=$('[data-none]');
 f.addEventListener('input',function(){var q=f.value.trim().toLowerCase(),n=0;rows.forEach(function(r){var hit=!q||(r.getAttribute('data-k')||r.textContent).toLowerCase().indexOf(q)>-1;r.hidden=!hit;if(hit)n++});if(none)none.hidden=n>0})}
/* job search on the home page */
var box=$('#sl-q');
if(box){var out=$('#sl-out'),J=null,want=false;
 var run=function(){var q=box.value.trim().toLowerCase();if(q.length<2){out.innerHTML='';return}if(!J){out.innerHTML='<div class="shim"></div>';return}
  var words=q.split(/\s+/),hits=J.filter(function(j){var t=j[0].toLowerCase();return words.every(function(w){return t.indexOf(w)>-1})});
  hits.sort(function(a,b){return a[0].toLowerCase().indexOf(words[0])-b[0].toLowerCase().indexOf(words[0])||a[0].length-b[0].length});
  out.innerHTML=hits.length?'<ul class="sl-list">'+hits.slice(0,15).map(function(j){return '<li><a href="/job/'+j[1]+'/">'+S.esc(j[0])+'<span>'+S.esc(j[2])+'</span></a></li>'}).join('')+'</ul>'+(hits.length>15?'<p class="hint">'+hits.length+' matches. Type more letters to narrow the list.</p>':''):'<p class="sl-empty">No occupation title contains "'+S.esc(box.value.trim())+'". Official titles are broad: try a simpler word such as nurse, driver, teacher or software.</p>'};
 var load=function(){if(want)return;want=true;S.json('/data/jobs.json').then(function(j){J=j;run()})};
 box.addEventListener('focus',load);box.addEventListener('input',function(){load();run()})}
/* pay converter */
var cf=$('#cv-form');
if(cf){var amt=$('#cv-a'),per=$('#cv-p'),hw=$('#cv-h'),wy=$('#cv-w'),cur=$('#cv-c'),res=$('#cv-res');
 var fmt=function(n){return cur.value+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})};
 var calc=function(){var a=parseFloat(amt.value),h=parseFloat(hw.value),w=parseFloat(wy.value);
  if(!(a>0)){res.hidden=true;return}
  if(!(h>0&&h<=168)||!(w>0&&w<=52)){res.hidden=false;res.innerHTML='<h2>Check the hours and weeks</h2><p>Hours a week must be between 1 and 168, and weeks a year between 1 and 52.</p>';return}
  var year=per.value==='hour'?a*h*w:per.value==='day'?a*5*w:per.value==='week'?a*w:per.value==='month'?a*12:a;
  var rows=[['Per hour',year/(h*w)],['Per day (5-day week)',year/(w*5)],['Per week',year/w],['Per fortnight (2 weeks)',year/w*2],['Per month',year/12],['Per year',year]];
  res.hidden=false;res.innerHTML='<h2>'+fmt(a)+' per '+per.value+' is</h2><div class="tbl"><table><tbody>'+rows.map(function(r){return '<tr><td>'+r[0]+'</td><td class="sl-n">'+fmt(r[1])+'</td></tr>'}).join('')+'</tbody></table></div><p class="hint">Worked out with '+h+' hours a week and '+w+' paid weeks a year, before tax and deductions. A month is one twelfth of a year.</p><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(rows.map(function(r){return r[0]+': '+fmt(r[1])}).join('\n'))+'">Copy the table</button></div>'};
 cf.addEventListener('submit',function(e){e.preventDefault();calc()});
 [amt,per,hw,wy,cur].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)})}
})();