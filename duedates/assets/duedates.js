(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var INST=[['15 June',15,3],['15 September',45,3],['15 December',75,3],['15 March',100,1]];
function schedule(tax,pre){if(tax<10000)return[];if(pre)return[['15 March',tax,tax]];var out=[],prev=0;INST.forEach(function(x){var cum=tax*x[1]/100;out.push([x[0],cum-prev,cum]);prev=cum});return out}
function interest(tax,paid,pre){if(tax<10000)return 0;if(pre)return Math.max(0,tax-paid[3])*0.01;var t=0;for(var i=0;i<4;i++){var sh=Math.max(0,tax*INST[i][1]/100-paid[i]);if((i===0&&paid[0]>=tax*0.12)||(i===1&&paid[1]>=tax*0.36))continue;t+=sh*INST[i][2]/100}return t}
window.DUEX={schedule:schedule,interest:interest};
function inr(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function v(id){return parseFloat($(id).value)||0}
var f=$('#ad-form');if(f){var res=$('#ad-res');function ui(){var tax=v('#ad-t'),pre=$('#ad-p').checked,s=schedule(tax,pre);res.hidden=false;res.className='result rise';
 if(!s.length){res.innerHTML='<h2>No advance tax is due</h2><p>Section 404 makes advance tax payable only where the tax payable during the year is \u20b910,000 or more.</p>';return}
 var rows=s.map(function(x){return '<tr><td>'+x[0]+'</td><td class="tx-n">'+inr(x[1])+'</td><td class="tx-n">'+inr(x[2])+'</td></tr>'}).join('');
 var txt='Advance tax on '+inr(tax)+': '+s.map(function(x){return x[0]+' '+inr(x[1])}).join(', ')+'.';
 res.innerHTML='<h2>Advance tax on '+inr(tax)+'</h2><div class="tbl"><table><thead><tr><th>Pay by</th><th class="tx-n">This instalment</th><th class="tx-n">Total paid by then</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Enter the tax you expect to be payable after tax deducted at source. Due dates falling on holidays are not moved here.</p>'}
 f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui()}
var g=$('#in-form');if(g){var r2=$('#in-res');function ui2(){var tax=v('#in-t'),pre=$('#in-p').checked,paid=[v('#in-a'),v('#in-b'),v('#in-c'),v('#in-d')],i=interest(tax,paid,pre);r2.hidden=false;r2.className='result rise';
 r2.innerHTML='<h2>Interest on the shortfall: '+inr(i)+'</h2><p>'+(tax<10000?'No advance tax was due, so no interest arises under section 425.':'Worked under section 425 on a tax due on the returned income of '+inr(tax)+'.')+'</p><p class="hint">Enter the total advance tax paid on or before each date, not the amount of each instalment.</p>'}
 g.addEventListener('submit',function(e){e.preventDefault();ui2()});g.addEventListener('input',ui2);g.addEventListener('change',ui2);ui2()}
})();