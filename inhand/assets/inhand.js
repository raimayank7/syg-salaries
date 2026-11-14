(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)},T=window.TAXSLAB,Y='2026-27';
function inr(n){n=Math.round(n);return (n<0?'-':'')+'₹'+Math.abs(n).toLocaleString('en-IN')}
function struct(ctc,bp,on,ceil,pt){var basic=ctc*bp/100,base=on==='basic'?basic:Math.min(basic,ceil*12),er=base*0.12,grat=basic/12*15/26,gross=ctc-er-grat;
 var n=T.compute(Y,'new','a',gross,true,0),o=T.compute(Y,'old','a',gross,true,Math.min(150000,er)+pt),r={basic:basic,er:er,grat:grat,gross:gross,pt:pt,n:n,o:o};
 r.ny=gross-er-pt-n.total;r.oy=gross-er-pt-o.total;return r}
window.INHAND={struct:struct};
var form=$('#ih-form');if(!form)return;
var c=$('#ih-c'),b=$('#ih-b'),on=$('#ih-on'),ce=$('#ih-ce'),pt=$('#ih-pt'),res=$('#ih-res');
function calc(){var ctc=parseFloat(c.value);$('#ih-cw').textContent=ctc>=1e7?'= '+(Math.round(ctc/1e5)/100)+' crore':ctc>=1e5?'= '+(Math.round(ctc/1e3)/100)+' lakh':'';
 if(!(ctc>0)){res.hidden=true;return}
 if(ctc>1e10){res.hidden=false;res.innerHTML='<h2>Check the CTC</h2><p>Type the yearly CTC in rupees, without commas.</p>';return}
 var bp=Math.min(Math.max(parseFloat(b.value)||40,10),100),cl=parseFloat(ce.value)||25000,p=Math.max(parseFloat(pt.value)||0,0),r=struct(ctc,bp,on.value,cl,p);
 var best=r.ny>=r.oy?'new':'old',diff=Math.abs(r.ny-r.oy);
 function col(k,y,t){return '<div class="tx-box'+(best===k?' low':'')+'"><h3>'+(k==='new'?'New regime':'Old regime')+'</h3><p class="big">'+inr(y/12)+'</p><small>a month in hand. '+inr(y)+' a year. Income tax '+inr(t)+'</small></div>'}
 function tab(rg,y,isOld){var rows=[['CTC (cost to company)',ctc],['Less: employer PF',-r.er],['Less: gratuity provision',-r.grat],['Gross salary paid',r.gross],['Less: employee PF',-r.er],['Less: professional tax',-r.pt],['Less: income tax with cess',-rg.total]];
  return '<div class="tbl"><table><tbody>'+rows.map(function(x){return '<tr><td>'+x[0]+'</td><td class="tx-n">'+inr(x[1])+'</td></tr>'}).join('')+'<tr class="tx-total"><td>In hand for the year</td><td class="tx-n">'+inr(y)+'</td></tr><tr><td>In hand a month</td><td class="tx-n">'+inr(y/12)+'</td></tr></tbody></table></div>'}
 var txt='CTC '+inr(ctc)+': in hand about '+inr(r.ny/12)+' a month in the new regime, '+inr(r.oy/12)+' in the old (basic '+bp+'% of CTC).';
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>In-hand pay on a CTC of '+inr(ctc)+'</h2><div class="tx-two">'+col('new',r.ny,r.n.total)+col('old',r.oy,r.o.total)+'</div><p>'+(diff<12?'About the same in both regimes.':'With these assumptions the <b>'+best+' regime</b> leaves '+inr(diff/12)+' more each month.')+'</p>'+
  '<details open><summary>Working, new regime</summary>'+tab(r.n,r.ny)+'</details><details><summary>Working, old regime (deductions: standard deduction, employee PF up to the 80C limit, professional tax; nothing else)</summary>'+tab(r.o,r.oy)+'</details>'+
  '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'+
  '<p class="hint">Estimate from the assumptions shown. Your payslip depends on how your employer splits the CTC, bonuses, insurance and other items. Not tax advice.</p>'}
form.addEventListener('submit',function(e){e.preventDefault();calc()});
[c,b,on,ce,pt].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)});
var m=location.hash.match(/ctc=(\d+)/);if(m){c.value=m[1];calc()}
})();