(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)},T=window.TAXSLAB,Y='2026-27',R=T.RULES[Y],BASIC=R.new.slabs[0][0],CESS=R.cess;
function holding(k,m){return m>(k==='other'?24:12)?'long':'short'}
function tx(o){return T.compute(Y,'new','general',o,false).total}
function cg(kind,months,gain,other){var cls=holding(kind,months),g=Math.max(0,gain),sf=Math.max(0,BASIC-other),c=1+CESS/100;
 if(cls==='short'&&kind==='eq'){var g2=Math.max(0,g-sf);return{cls:cls,rate:'20%',gt:g2*0.2*c,ot:tx(other),tg:g2,total:g2*0.2*c+tx(other)}}
 if(cls==='short'){var a=tx(other+g),b=tx(other);return{cls:cls,rate:'slab rates',gt:a-b,ot:b,tg:g,total:a}}
 var h=Math.max(0,g-sf),t=kind==='eq'?Math.max(0,h-125000):h;return{cls:cls,rate:'12.5%',gt:t*0.125*c,ot:tx(other),tg:t,total:t*0.125*c+tx(other)}}
window.CGX={cg:cg};
function inr(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#cg-form');if(!f)return;var res=$('#cg-res');
function ui(){var k=$('#cg-k').value,m=v('#cg-m'),g=v('#cg-g'),o=v('#cg-o'),r=cg(k,m,g,o);res.hidden=false;res.className='result rise';
 var txt='India capital gains tax (2026-27, new regime): a '+r.cls+'-term gain of '+inr(g)+' is taxed at '+r.rate+'; tax on the gain about '+inr(r.gt)+'.';
 res.innerHTML='<h2>'+(r.cls==='long'?'Long-term':'Short-term')+' gain taxed at '+r.rate+': about '+inr(r.gt)+'</h2><div class="tbl"><table><tbody><tr><td>Gain</td><td class="tx-n">'+inr(g)+'</td></tr><tr><td>Part of the gain that is taxed at that rate</td><td class="tx-n">'+inr(r.tg)+'</td></tr><tr><td>Tax on the gain with 4% cess</td><td class="tx-n">'+inr(r.gt)+'</td></tr><tr><td>Tax on your other income</td><td class="tx-n">'+inr(r.ot)+'</td></tr><tr class="tx-total"><td>Total tax</td><td class="tx-n">'+inr(r.total)+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Resident individual, new regime, tax year 2026-27. No surcharge, no rebate on the gain, no indexation, one kind of gain at a time. Not tax advice.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();