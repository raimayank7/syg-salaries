(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function due(y,m){return m===12?new Date(Date.UTC(y+1,0,15)):new Date(Date.UTC(y,m,15))}
function days(a,b){return Math.round((b-a)/86400000)}
function intr(a,du,pa){var n=days(du,pa);return n<=0?0:a*0.12*n/365}
function rate(du,pa){if(pa<=du)return 0;var m=(pa.getUTCFullYear()-du.getUTCFullYear())*12+pa.getUTCMonth()-du.getUTCMonth()-(pa.getUTCDate()<du.getUTCDate()?1:0);return m<2?5:m<4?10:m<6?15:25}
window.PFESI={due:due,intr:intr,rate:rate};
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function fmt(x){return x.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}
var f=$('#pe-form');if(!f)return;var res=$('#pe-res');
function ui(){var ym=$('#pe-m').value.split('-'),a=parseFloat($('#pe-a').value)||0,pd=$('#pe-p').value;res.hidden=false;res.className='result rise';
 var y=+ym[0],m=+ym[1],du=due(y,m),pa=pd?new Date(pd+'T00:00:00Z'):null;
 var html='<h2>Due date: '+fmt(du)+'</h2><p>The 15th of the month after the wage month, for both the PF payment (EPF Scheme paragraph 38) and the ESI payment (Regulation 31).</p>';
 if(pa&&a>0){var n=days(du,pa);if(n<=0)html+='<p>Paid on or before the due date: no ESI interest.</p>';else html+='<div class="tbl"><table><tbody><tr><td>Days late</td><td>'+n+'</td></tr><tr class="tx-total"><td>ESI interest at 12% a year, per day of delay</td><td>'+r(intr(a,du,pa))+'</td></tr><tr><td>Highest damages rate for this delay (Regulation 31C), a year</td><td>'+rate(du,pa)+'%</td></tr></tbody></table></div><p class="tx-src">Interest uses 365 days to a year: the Regulation does not state the divisor. EPF interest and damages are not covered. Damages are a maximum the Corporation may recover, not a fixed charge.</p>'}
 res.innerHTML=html}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();