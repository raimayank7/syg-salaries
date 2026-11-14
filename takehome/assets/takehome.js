(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var PA=12570,TS=100000,BE=[[37700,20],[125140,40],[1e12,45]],BS=[[3967,19],[16956,20],[31092,21],[62430,42],[125140,45],[1e12,48]],PT=12570,UEL=50270,LOANS={none:0,plan1:26900,plan2:29385,plan4:33795,plan5:25000},PG=21000;
function gbp(n,dp){return (n<0?'-':'')+'£'+Math.abs(n).toLocaleString('en-GB',{minimumFractionDigits:dp||0,maximumFractionDigits:dp||0})}
function calc(inc,scot,plan,pg){var allow=Math.max(PA-Math.max((inc-TS)/2,0),0),taxable=Math.max(inc-allow,0),bands=scot?BS:BE,tax=0,prev=0;
 for(var i=0;i<bands.length;i++){if(taxable>prev)tax+=(Math.min(taxable,bands[i][0])-prev)*bands[i][1]/100;prev=bands[i][0]}
 var ni=Math.max(Math.min(inc,UEL)-PT,0)*0.08+Math.max(inc-UEL,0)*0.02,loan=plan!=='none'?Math.max(inc-LOANS[plan],0)*0.09:0,pgl=pg?Math.max(inc-PG,0)*0.06:0;
 return {income:inc,allow:allow,taxable:taxable,tax:tax,ni:ni,loan:loan,pg:pgl,net:inc-tax-ni-loan-pgl}}
window.TAKEHOME={calc:calc};
var f=$('#th-form');if(!f)return;var a=$('#th-a'),r=$('#th-r'),p=$('#th-p'),g=$('#th-g'),res=$('#th-res');
function calcUI(){var inc=parseFloat(a.value);res.hidden=true;if(!(inc>=0))return;var x=calc(inc,r.value==='s',p.value,g.checked);
 var rows=[['Salary',gbp(inc)],['Personal Allowance',gbp(x.allow)],['Income Tax',gbp(-x.tax)],['National Insurance',gbp(-x.ni)]];if(x.loan)rows.push(['Student loan',gbp(-x.loan)]);if(x.pg)rows.push(['Postgraduate loan',gbp(-x.pg)]);
 rows.push(['Take-home a year',gbp(x.net),1],['Take-home a month',gbp(x.net/12,2),1],['Take-home a week',gbp(x.net/52,2)]);
 var txt='UK take-home pay on a salary of '+gbp(inc)+' (2026-27): '+gbp(x.net)+' a year, '+gbp(x.net/12,2)+' a month.';
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Take-home pay on '+gbp(inc)+'</h2><div class="tbl"><table><tbody>'+rows.map(function(y){return '<tr'+(y[2]?' class="tx-total"':'')+'><td>'+y[0]+'</td><td class="tx-n">'+y[1]+'</td></tr>'}).join('')+'</tbody></table></div><p>You keep '+(inc>0?(x.net/inc*100).toFixed(1):'0')+'% of your salary.</p>'+
 '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'+
 '<p class="hint">Assumes a steady salary from one job, standard tax code, NI category A, no pension or benefits. Your payslip may differ.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();calcUI()});[a,r,p,g].forEach(function(el){el.addEventListener('input',calcUI);el.addEventListener('change',calcUI)});
})();