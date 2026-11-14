(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function sa(w,y,r,s){var f=Math.min(y,5),l=Math.max(y-5,0),a=w/2*f+w*l;if(r&&!s){if(y<2)return 0;if(y<5)return a/3;if(y<10)return a*2/3}return a}
window.SAUX={sa:sa};
function sar(n){return 'SAR '+Math.round(n).toLocaleString('en-US')}
var f=$('#sa-form');if(!f)return;var res=$('#sa-res');
function ui(){var w=parseFloat($('#sa-b').value)||0,y=(parseFloat($('#sa-y').value)||0)+(parseFloat($('#sa-m').value)||0)/12,r=$('#sa-r').value==='r',s=$('#sa-s').checked;res.hidden=false;res.className='result rise';if(!(w>0)){res.hidden=true;return}
 var g=sa(w,y,r,s),full=sa(w,y,false,false);
 res.innerHTML='<h2>End-of-service award about '+sar(g)+'</h2><div class="tbl"><table><tbody><tr><td>Last monthly wage</td><td class="tx-n">'+sar(w)+'</td></tr><tr><td>Years of service</td><td class="tx-n">'+(Math.round(y*100)/100)+'</td></tr><tr><td>Full award (Article 84)</td><td class="tx-n">'+sar(full)+'</td></tr><tr class="tx-total"><td>'+(r&&!s?'Award on resignation (Article 85)':'Award')+'</td><td class="tx-n">'+sar(g)+'</td></tr></tbody></table></div><p class="tx-src">From the Ministry’s English text of the 2005 Labor Law (translation file of 2022). Later amendments were not read.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();