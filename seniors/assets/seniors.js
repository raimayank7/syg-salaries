(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function iDed(se,sv,t){return se?Math.min(t,50000):Math.min(sv,10000)}
function tdsT(se){return se?100000:50000}
function hg(se,p,c,m){var la=se?50000:25000,a=(p+c>0)?Math.min(p+Math.min(c,5000),la):0,x=(se&&p===0)?Math.min(m,50000):0;return Math.min(a+x,50000)}
function spec(se,p,r){return Math.max(0,Math.min(p-r,se?100000:40000))}
window.SENX={iDed:iDed,tdsT:tdsT,hg:hg,spec:spec};
function inr(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#sn-form');if(!f)return;var res=$('#sn-res');
function ui(){var se=$('#sn-a').value==='s',pe=$('#sn-pa').value==='s';
 var sv=v('#sn-sv'),fd=v('#sn-fd'),t=sv+fd;
 var i=iDed(se,Math.min(sv,t),t),th=tdsT(se);
 var hs=hg(se,v('#sn-hp'),v('#sn-hc'),v('#sn-hm')),hq=hg(pe,v('#sn-pp'),v('#sn-pc'),v('#sn-pm'));
 var sp=spec(se,v('#sn-sd'),v('#sn-sr'));
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Your age-linked amounts</h2><div class="tbl"><table><tbody>'+
 '<tr><td>Interest deduction (section 153)</td><td class="tx-n">'+inr(i)+'</td></tr>'+
 '<tr><td>Interest on which bank tax at source starts, per the table (section 393)</td><td class="tx-n">above '+inr(th)+'</td></tr>'+
 '<tr><td>Health insurance and medical, self and family (section 126)</td><td class="tx-n">'+inr(hs)+'</td></tr>'+
 '<tr><td>Health insurance and medical, parents (section 126)</td><td class="tx-n">'+inr(hq)+'</td></tr>'+
 '<tr><td>Specified disease treatment (section 128)</td><td class="tx-n">'+inr(sp)+'</td></tr>'+
 '<tr class="tx-total"><td>Total of the deductions above</td><td class="tx-n">'+inr(i+hs+hq+sp)+'</td></tr></tbody></table></div>'+
 '<p class="tx-src">From the Income-tax Act, 2025 as read on 13 November 2026. Whether you can claim these depends on the tax regime you choose; check before filing.</p>';}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();