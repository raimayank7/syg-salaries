(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)},TEN=1000000;
function lrs(p,a,pu,el,od){if(el||od)return 0;var r=pu==='edu'?0.05:0.2;return Math.max(0,p+a-Math.max(p,TEN))*r}
function tour(p,a,od){if(od)return 0;var low=Math.max(0,Math.min(p+a,TEN)-Math.min(p,TEN));return low*0.05+(a-low)*0.2}
window.REMX={lrs:lrs,tour:tour};
function inr(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#rm-form');if(!f)return;var res=$('#rm-res');
function ui(){var k=$('#rm-k').value,p=v('#rm-p'),a=v('#rm-a'),pu=$('#rm-u').value,el=$('#rm-l').checked,od=$('#rm-d').checked;
 $('#rm-ur').hidden=k!=='lrs';$('#rm-lr').hidden=k!=='lrs';
 var t=k==='lrs'?lrs(p,a,pu,el,od):tour(p,a,od);res.hidden=false;res.className='result rise';
 var txt='India TCS on '+(k==='lrs'?'a remittance under the Liberalised Remittance Scheme':'an overseas tour package')+' of '+inr(a)+' (after '+inr(p)+' earlier in the year): '+inr(t)+'.';
 res.innerHTML='<h2>Tax collected at source: '+inr(t)+'</h2><div class="tbl"><table><tbody><tr><td>Already sent or paid this financial year</td><td class="tx-n">'+inr(p)+'</td></tr><tr><td>This payment</td><td class="tx-n">'+inr(a)+'</td></tr><tr><td>Total for the year after this</td><td class="tx-n">'+inr(p+a)+'</td></tr><tr class="tx-total"><td>Tax collected at source on this payment</td><td class="tx-n">'+inr(t)+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Section 394 of the Income-tax Act, 2025. The foreign exchange limits on how much you may send are a separate rule and are not worked here. Not tax advice.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();