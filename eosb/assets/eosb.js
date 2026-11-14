(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
function rnd(x){return Math.floor(x+0.5)}
function aed(n){n=rnd(n);return (n<0?'-':'')+'AED '+Math.abs(n).toLocaleString('en-US')}
function days(y){return y<1?0:Math.min(y,5)*21+Math.max(y-5,0)*30}
function grat(b,y,p){var a=Math.min(days(y)*b/30,b*24);return rnd(a*p/100)}
function savings(b,y){var m=Math.floor(y*12+1e-9),t=0;for(var i=0;i<m;i++)t+=b*(i<60?5.83:8.33)/100;return rnd(t)}
window.EOSB={grat:grat,savings:savings,days:days};
var f=$('#eo-form');if(!f)return;
var b=$('#eo-b'),y=$('#eo-y'),mo=$('#eo-m'),pt=$('#eo-p'),unp=$('#eo-u'),res=$('#eo-res');
function calc(){var basic=parseFloat(b.value),yy=parseFloat(y.value)||0,mm=parseFloat(mo.value)||0,u=parseFloat(unp.value)||0,p=parseFloat(pt.value);if(!(p>0))p=100;res.hidden=true;
 if(!(basic>0))return;
 var yrs=yy+(mm-u/30)/12;if(yrs<0)yrs=0;
 if(yrs<1){res.hidden=false;res.className='result rise';res.innerHTML='<h2>Under one year</h2><p>A worker needs at least 1 year of continuous service to be entitled to gratuity. Service counted here: '+(Math.round(yrs*100)/100)+' years.</p>';return}
 var dd=days(yrs),raw=dd*basic/30,g=grat(basic,yrs,p),capped=raw>basic*24;
 var rows=[['Service counted',(Math.round(yrs*100)/100)+' years'],['Days of basic salary',(Math.round(dd*10)/10)+' days'],['Gratuity before the cap',aed(raw)]];
 if(capped)rows.push(['Cap: 2 years of wages ('+aed(basic*24)+')','applied']);
 if(p!==100)rows.push(['Part-time share',p+'%']);
 rows.push(['Gratuity due',aed(g),1]);
 var txt='UAE end-of-service gratuity on a basic salary of '+aed(basic)+' after '+(Math.round(yrs*100)/100)+' years: '+aed(g)+'.';
 res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Result</h2><div class="tbl"><table><tbody>'+rows.map(function(x){return '<tr'+(x[2]?' class="tx-total"':'')+'><td>'+x[0]+'</td><td class="tx-n">'+x[1]+'</td></tr>'}).join('')+'</tbody></table></div>'+
 '<p>If the employer were in the Savings Scheme instead, its basic contributions over the same period would be about '+aed(savings(basic,yrs))+' before investment returns.</p>'+
 '<div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Worked out at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div>'+
 '<p class="hint">For an expatriate full-time or part-time worker in the private sector. A day is taken as basic salary ÷ 30. Not legal advice: your contract and MOHRE decide.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();calc()});
[b,y,mo,pt,unp].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)});
})();