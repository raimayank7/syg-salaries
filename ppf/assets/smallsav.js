(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
function rnd(x){return Math.floor(x+0.5)}
function inr(n){n=rnd(n);return (n<0?'-':'')+'₹'+Math.abs(n).toLocaleString('en-IN')}
function yearly(dep,mode,dy,years,r){var bal=0,put=0;for(var y=0;y<years;y++){var acc=0,dd=0;for(var m=0;m<12;m++){if(y<dy){if(mode==='m'){bal+=dep;dd+=dep}else if(m===0){bal+=dep;dd+=dep}}acc+=bal*r/1200}bal+=rnd(acc);put+=dd}return {bal:bal,put:put}}
function rd(dep,n,r){var bal=0,acc=0;for(var m=1;m<=n;m++){bal+=dep;acc+=bal*r/1200;if(m%3===0){bal+=rnd(acc);acc=0}}bal+=rnd(acc);return {bal:bal,put:dep*n}}
function td(p,y,r){return {bal:rnd(p*Math.pow(1+r/400,4*y)),put:p}}
function nsc(p,r){return {bal:rnd(p*Math.pow(1+r/100,5)),put:p}}
function kvp(p,r){return {bal:rnd(Math.abs(r-7.5)<1e-9?2*p:p*Math.pow(1+r/100,115/12)),put:p}}
window.SMALLSAV={yearly:yearly,rd:rd,td:td,nsc:nsc,kvp:kvp,rnd:rnd};
var f=$('#ss-form');if(!f)return;
var sch=f.getAttribute('data-s'),amt=$('#ss-a'),rt=$('#ss-r'),yr=$('#ss-y'),md=$('#ss-m'),res=$('#ss-res'),LIM=JSON.parse(f.getAttribute('data-lim'));
function out(rows,note,txt){res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Result</h2><div class="tbl"><table><tbody>'+rows.map(function(x){return '<tr'+(x[2]?' class="tx-total"':'')+'><td>'+x[0]+'</td><td class="tx-n">'+x[1]+'</td></tr>'}).join('')+'</tbody></table></div>'+(note?'<p>'+note+'</p>':'')+
 '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'+
 '<p class="hint">An estimate from the scheme rules. A post office or bank passbook can differ by a few rupees. The rate is the one you typed; rates are announced every quarter.</p>'}
function calc(){var a=parseFloat(amt.value),r=parseFloat(rt.value);res.hidden=true;
 if(!(a>0)||!(r>=0))return;
 var mx=LIM.max;if((sch==='ppf'&&md.value==='m')){mx=Math.floor(LIM.max/12)}
 if(mx&&a>mx){res.hidden=false;res.innerHTML='<h2>Over the limit</h2><p>The most that can be put in is '+inr(LIM.max)+' '+LIM.per+(mx!==LIM.max?' (that is '+inr(mx)+' a month)':'')+'. Type a smaller amount.</p>';return}
 if(LIM.min&&a<LIM.min){res.hidden=false;res.innerHTML='<h2>Below the minimum</h2><p>The least that can be put in is '+inr(LIM.min)+' '+LIM.per+'.</p>';return}
 var x,t;
 if(sch==='ppf'||sch==='ssy'){var years=sch==='ppf'?(parseInt(yr.value)||15):21,dy=sch==='ppf'?years:15;x=yearly(a,md.value,dy,years,r);
  out([['Total you put in',inr(x.put)],['Interest earned',inr(x.bal-x.put)],['Balance after '+years+' years',inr(x.bal),1]],'Interest is worked out each month on the balance and added once a year. In '+(md.value==='m'?'monthly deposits, each made by the 5th':'one yearly deposit, made by 5 April')+'.','Deposit '+inr(a)+(md.value==='m'?' a month':' a year')+' at '+r+'%: balance '+inr(x.bal)+' after '+years+' years.')}
 else if(sch==='rd'){x=rd(a,60,r);out([['Total you put in (60 months)',inr(x.put)],['Interest earned',inr(x.bal-x.put)],['Maturity amount',inr(x.bal),1]],'Interest compounds every quarter.','Recurring deposit '+inr(a)+' a month for 5 years at '+r+'%: '+inr(x.bal)+'.')}
 else if(sch==='td'){var n=parseInt(yr.value)||5;x=td(a,n,r);out([['Deposit',inr(a)],['Interest earned',inr(x.bal-a)],['Value after '+n+' years',inr(x.bal),1]],'Interest compounds every quarter. The post office pays it out each year if you ask; if you leave it, this is the value.','Time deposit '+inr(a)+' for '+n+' years at '+r+'%: '+inr(x.bal)+'.')}
 else if(sch==='nsc'){x=nsc(a,r);out([['Invested',inr(a)],['Interest earned',inr(x.bal-a)],['Maturity value after 5 years',inr(x.bal),1]],'Interest compounds yearly and is paid at maturity.','NSC '+inr(a)+' at '+r+'%: '+inr(x.bal)+' after 5 years.')}
 else if(sch==='kvp'){x=kvp(a,r);out([['Invested',inr(a)],['Interest earned',inr(x.bal-a)],['Maturity value after 115 months',inr(x.bal),1]],'At 7.5% the money doubles in 115 months. At another rate the time to double would differ.','KVP '+inr(a)+' at '+r+'%: '+inr(x.bal)+' after 115 months.')}
 else if(sch==='scss'){var q=rnd(a*r/400);out([['Interest each quarter',inr(q)],['Interest each year',inr(q*4)],['Interest over 5 years',inr(q*20)]],'The deposit itself is returned at the end of 5 years.','SCSS '+inr(a)+' at '+r+'%: '+inr(q)+' every quarter.')}
 else if(sch==='mis'){var mm=rnd(a*r/1200);out([['Interest each month',inr(mm)],['Interest each year',inr(mm*12)],['Interest over 5 years',inr(mm*60)]],'The deposit itself is returned at the end of 5 years.','Monthly income scheme '+inr(a)+' at '+r+'%: '+inr(mm)+' a month.')}}
f.addEventListener('submit',function(e){e.preventDefault();calc()});
[amt,rt,yr,md].forEach(function(el){if(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}});
})();