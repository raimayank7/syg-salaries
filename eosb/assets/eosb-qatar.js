(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
function qar(n){n=Math.floor(n+0.5);return 'QAR '+n.toLocaleString('en-US')}
function qatar(b,y){return y<1?0:b*12/52*3*y}
function alt(b,y){return y<1?0:b*21/30*y}
window.QAT={qatar:qatar,alt:alt};
var f=$('#qa-form');if(!f)return;var res=$('#qa-res');
function ui(){var b=parseFloat($('#qa-b').value)||0,y=(parseFloat($('#qa-y').value)||0)+(parseFloat($('#qa-m').value)||0)/12;res.hidden=false;res.className='result rise';
 if(!(b>0)){res.hidden=true;return}
 if(y<1){res.innerHTML='<h2>Under one year</h2><p>Article 54 gives gratuity to a worker who has spent one full year or more in the work.</p>';return}
 var g=qatar(b,y),txt='Qatar Labour Law Article 54: minimum gratuity on a last basic wage of '+qar(b)+' after '+(Math.round(y*100)/100)+' years is about '+qar(g)+'.';
 res.innerHTML='<h2>Minimum gratuity about '+qar(g)+'</h2><div class="tbl"><table><tbody><tr><td>Last basic wage a month</td><td class="tx-n">'+qar(b)+'</td></tr><tr><td>Three weeks’ basic wage (monthly × 12 ÷ 52 × 3)</td><td class="tx-n">'+qar(b*36/52)+'</td></tr><tr><td>Years of service counted</td><td class="tx-n">'+(Math.round(y*100)/100)+'</td></tr><tr class="tx-total"><td>Minimum gratuity</td><td class="tx-n">'+qar(g)+'</td></tr><tr><td>The common 21-days-of-30 figure</td><td class="tx-n">'+qar(alt(b,y))+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">The law sets a minimum of three weeks’ wage a year; your contract may give more. The law does not say how a week’s wage is found from a monthly wage.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();