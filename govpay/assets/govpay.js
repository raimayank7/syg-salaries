(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
function rnd(x){return Math.floor(x+0.5)}
function inr(n){n=rnd(n);return (n<0?'-':'')+'₹'+Math.abs(n).toLocaleString('en-IN')}
function da(b,p){return rnd(b*p/100)}
window.GOVPAY={da:da};
var f=$('#gp-form');if(!f)return;
var kind=f.getAttribute('data-k'),b=$('#gp-b'),p=$('#gp-p'),o=$('#gp-o'),m=$('#gp-m'),res=$('#gp-res');
function calc(){var base=parseFloat(b.value),np=parseFloat(p.value),op=parseFloat(o.value),mo=parseFloat(m.value)||0;res.hidden=true;
 if(!(base>0)||!(np>=0)||!(op>=0))return;
 var nd=da(base,np),od=da(base,op),inc=nd-od,lab=kind==='dr'?'pension':'basic pay',rows=[[kind==='dr'?'Dearness relief at '+np+'%':'Dearness allowance at '+np+'%',inr(nd)],['It was (at '+op+'%)',inr(od)],['Increase each month',inr(inc),1]];
 if(mo>0)rows.push(['Arrears for '+mo+' month'+(mo===1?'':'s'),inr(inc*mo),1]);
 rows.push(['Increase over a year',inr(inc*12)],[kind==='dr'?'Pension plus relief a month':'Basic pay plus DA a month',inr(base+nd)]);
 var txt=(kind==='dr'?'DR':'DA')+' on '+lab+' '+inr(base)+' at '+np+'%: '+inr(nd)+' a month (was '+inr(od)+'); increase '+inr(inc)+(mo>0?', arrears for '+mo+' months '+inr(inc*mo):'')+'.';
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Result</h2><div class="tbl"><table><tbody>'+rows.map(function(x){return '<tr'+(x[2]?' class="tx-total"':'')+'><td>'+x[0]+'</td><td class="tx-n">'+x[1]+'</td></tr>'}).join('')+'</tbody></table></div>'+
 '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'+
 '<p class="hint">Arithmetic on the rates in the Cabinet decisions, rounded to whole rupees. Your pay office applies the order to your exact pay; check your pay slip.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();calc()});
[b,p,o,m].forEach(function(el){if(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}});
})();