(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function spt(c,p1,p2){var t=c+p1/3+p2/6;return {met:c>=31&&t>=183,tot:t}}
window.SPTX={spt:spt};
function v(id){return Math.max(0,Math.min(366,parseFloat($(id).value)||0))}
var f=$('#rs-form');if(!f)return;var res=$('#rs-res');
function ui(){var c=v('#rs-c'),a=v('#rs-a'),b=v('#rs-b'),r=spt(c,a,b);res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>'+(r.met?'You meet the substantial presence test':'You do not meet the substantial presence test')+'</h2><div class="tbl"><table><tbody>'+
 '<tr><td>Days this year (needs at least 31)</td><td class="tx-n">'+c+'</td></tr>'+
 '<tr><td>One third of last year’s '+a+' days</td><td class="tx-n">'+(a/3).toFixed(2)+'</td></tr>'+
 '<tr><td>One sixth of the year before’s '+b+' days</td><td class="tx-n">'+(b/6).toFixed(2)+'</td></tr>'+
 '<tr class="tx-total"><td>Total (needs at least 183)</td><td class="tx-n">'+r.tot.toFixed(2)+'</td></tr></tbody></table></div>'+
 '<p class="tx-src">Count only days that count: leave out exempt-individual days and the other excluded days. Even if you meet the test, an exception may let you be treated as a nonresident. IRS rules as read on 13 November 2026.</p>';}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();