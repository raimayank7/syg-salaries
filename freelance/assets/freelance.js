(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)},T=window.TAXSLAB,Y='2026-27';
function presumptive(r,kind,cash,dig,act){var ok,lim,deemed;if(kind==='profession'){lim=cash<=5?7500000:5000000;ok=r<=5000000||(r<=7500000&&cash<=5);deemed=r*0.5}else{lim=cash<=5?30000000:20000000;ok=r<=20000000||(r<=30000000&&cash<=5);var g=r*dig/100;deemed=g*0.06+(r-g)*0.08}
 var taken=act>0?Math.max(deemed,act):deemed;return[ok,deemed,taken,lim]}
function taxOn(p){return T.compute(Y,'new','general',p,false).total}
window.FREEX={presumptive:presumptive,taxOn:taxOn};
function inr(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#fr-form');if(!f)return;var res=$('#fr-res');
function ui(){var r=v('#fr-r'),kind=$('#fr-k').value,cash=v('#fr-c'),dig=v('#fr-g'),act=v('#fr-a');var p=presumptive(r,kind,cash,dig,act);res.hidden=false;res.className='result rise';
 $('#fr-dig').hidden=kind!=='business';
 if(!p[0]){res.innerHTML='<h2>Presumptive taxation is not available</h2><p>Your receipts of '+inr(r)+' are above the limit of '+inr(p[3])+' for this case under section 58(2). You would keep books of account and may need an audit (sections 62 and 63).</p>';return}
 var tax=taxOn(p[2]),txt='Presumptive income '+inr(p[2])+' on receipts of '+inr(r)+'; income tax and cess about '+inr(tax)+' (new regime, tax year 2026-27).';
 res.innerHTML='<h2>Income tax about '+inr(tax)+'</h2><div class="tbl"><table><tbody><tr><td>Gross receipts</td><td class="tx-n">'+inr(r)+'</td></tr><tr><td>Deemed profit ('+(kind==='profession'?'50% of receipts':'6% and 8%')+')</td><td class="tx-n">'+inr(p[1])+'</td></tr>'+(act>0?'<tr><td>Profit really earned (the higher is taken)</td><td class="tx-n">'+inr(act)+'</td></tr>':'')+'<tr><td>Income taken</td><td class="tx-n">'+inr(p[2])+'</td></tr><tr class="tx-total"><td>Income tax with cess, new regime</td><td class="tx-n">'+inr(tax)+'</td></tr><tr><td>Left after tax, out of receipts</td><td class="tx-n">'+inr(r-tax)+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Resident individual, no other income, new regime for tax year 2026-27, no standard deduction. The whole advance tax is due by 15 March and the return by 31 July of the next financial year.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();