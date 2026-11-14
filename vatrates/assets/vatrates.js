(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var FIRST=1,LIM=16.5;
function addVat(n,r){return n*(1+r/100)}
function removeVat(g,r){return g/(1+r/100)}
function flatPay(net,vr,flat,fy){var inc=net*(1+vr/100),f=flat-(fy?FIRST:0);return inc*f/100}
function gbp(n){return '\u00a3'+n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}
window.VATR={addVat:addVat,removeVat:removeVat,flatPay:flatPay};
var f=$('#vt-form');if(f){var amt=$('#vt-a'),rate=$('#vt-r'),mode=$('#vt-m'),res=$('#vt-res');
function ui(){var a=parseFloat(amt.value),r=parseFloat(rate.value);res.hidden=true;if(!(a>=0)||isNaN(r))return;var net,gross;
 if(mode.value==='add'){net=a;gross=addVat(a,r)}else{gross=a;net=removeVat(a,r)}
 var vat=gross-net,txt='VAT at '+r+'% : price without VAT '+gbp(net)+', VAT '+gbp(vat)+', price with VAT '+gbp(gross)+'.';
 res.hidden=false;res.className='result rise';res.innerHTML='<h2>VAT at '+r+'%</h2><div class="tbl"><table><tbody><tr><td>Price without VAT</td><td class="tx-n">'+gbp(net)+'</td></tr><tr><td>VAT</td><td class="tx-n">'+gbp(vat)+'</td></tr><tr class="tx-total"><td>Price with VAT</td><td class="tx-n">'+gbp(gross)+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});[amt,rate,mode].forEach(function(el){el.addEventListener('input',ui);el.addEventListener('change',ui)});}
var g=$('#fl-form');if(g){var tn=$('#fl-t'),fa=$('#fl-a'),fy=$('#fl-y'),fr=$('#fl-res'),fl=$('#fl-l');
function ui2(){var n=parseFloat(fa.value),rt=parseFloat(fl.value==='1'?LIM:tn.value);fr.hidden=true;if(!(n>=0)||isNaN(rt))return;var y=fy.checked,pay=flatPay(n,20,rt,y),out=addVat(n,20)-n;
 var txt='Flat Rate Scheme: pay HMRC '+gbp(pay)+' on '+gbp(n)+' of sales plus VAT (rate '+(rt-(y?FIRST:0))+'%).';
 fr.hidden=false;fr.className='result rise';fr.innerHTML='<h2>Flat Rate Scheme</h2><div class="tbl"><table><tbody><tr><td>Flat rate used</td><td class="tx-n">'+(rt-(y?FIRST:0))+'%</td></tr><tr><td>VAT-inclusive turnover</td><td class="tx-n">'+gbp(addVat(n,20))+'</td></tr><tr class="tx-total"><td>You pay HMRC</td><td class="tx-n">'+gbp(pay)+'</td></tr><tr><td>VAT you charged customers</td><td class="tx-n">'+gbp(out)+'</td></tr><tr><td>You keep</td><td class="tx-n">'+gbp(out-pay)+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Assumes every sale is at 20% and ignores the VAT on purchases, which you cannot reclaim on this scheme.</p>'}
g.addEventListener('submit',function(e){e.preventDefault();ui2()});[tn,fa,fy,fl].forEach(function(el){el.addEventListener('input',ui2);el.addEventListener('change',ui2)});}
})();