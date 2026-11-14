(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function fra(y){return y<=1954?792:y>=1960?804:792+2*(y-1954)}
function fac(y,c){var f=fra(y);c=Math.max(744,Math.min(840,c));if(c<f){var m=f-c,cut=Math.min(m,36)*5/9+Math.max(m-36,0)*5/12;return 1-cut/100}return 1+(c-f)*(2/3)/100}
window.SSX={fra:fra,fac:fac};
function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#ss-form');if(!f)return;var res=$('#ss-res');
function ui(){var y=Math.max(1943,Math.min(2010,Math.round(v('#ss-y')))),pia=v('#ss-p'),c=Math.round(v('#ss-ay'))*12+Math.round(v('#ss-am'));
 var fr=fra(y),k=fac(y,c),cc=Math.max(744,Math.min(840,c));res.hidden=false;res.className='result rise';
 var fy=Math.floor(fr/12),fm=fr%12;
 res.innerHTML='<h2>Monthly benefit at your chosen age: '+money(pia*k)+'</h2><div class="tbl"><table><tbody>'+
 '<tr><td>Full retirement age</td><td class="tx-n">'+fy+(fm?' and '+fm+' months':'')+'</td></tr>'+
 '<tr><td>Starting age used</td><td class="tx-n">'+Math.floor(cc/12)+' years '+(cc%12)+' months</td></tr>'+
 '<tr><td>Benefit at full retirement age (your entry)</td><td class="tx-n">'+money(pia)+'</td></tr>'+
 '<tr class="tx-total"><td>'+(cc<fr?'Reduced to '+(k*100).toFixed(2)+'% of it':cc>fr?'Increased to '+(k*100).toFixed(2)+'% of it':'Full amount')+'</td><td class="tx-n">'+money(pia*k)+'</td></tr></tbody></table></div>'+
 '<p class="tx-src">Based on SSA Benefits Planner pages read on 13 November 2026. The monthly formula is derived from SSA’s table and rounded; the earnings test, tax on benefits and cost-of-living adjustments are not included.</p>';}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();