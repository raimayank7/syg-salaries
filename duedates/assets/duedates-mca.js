(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function add(ds,n){var x=new Date(ds+'T00:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x}
function iso(x){return x.toISOString().slice(0,10)}
window.MCADT={add:add,iso:iso};
function fmt(x){return x.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}
var f=$('#mc-form');if(!f)return;var res=$('#mc-res');
function ui(){var a=$('#mc-a').value,fy=$('#mc-y').value;if(!a){res.hidden=true;return}res.hidden=false;res.className='result rise';
 var aoc=add(a,30),mgt=add(a,60),h='<h2>AOC-4 due '+fmt(aoc)+'; MGT-7 due '+fmt(mgt)+'</h2><p>From the AGM date: 30 days for the financial statements (Companies Act section 137(1)) and 60 days for the annual return (section 92(4)).</p>';
 if(fy==='2025-26'){var c1=new Date(Date.UTC(2026,11,31)),c2=new Date(Date.UTC(2027,0,31));
  h+='<div class="tbl"><table><tbody><tr><td>AOC-4 without additional fee, financial year 2025-26 (MCA General Circular 05/2026)</td><td>up to '+fmt(c1)+'</td></tr><tr><td>MGT-7 / MGT-7A without additional fee</td><td>up to '+fmt(c2)+'</td></tr></tbody></table></div><p class="tx-src">The circular does not extend the time for holding the AGM. Filing after the circular’s dates attracts additional fees from the date the form was actually due under the Act.</p>'}
 res.innerHTML=h}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();