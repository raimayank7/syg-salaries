(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function tg(m){return m<=15000?0:m<=20000?150:200}
window.TGPT={tg:tg};
var f=$('#tg-form');if(!f)return;var res=$('#tg-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#tg-s').value)||0,t=tg(s);res.hidden=false;res.className='result rise';res.innerHTML='<h2>Professional tax '+r(t)+' a month, '+r(t*12)+' a year</h2><p>From the First Schedule as the Commercial Taxes Department shows it (“as amended upto date”). The department’s consolidated page, not the gazette; check your employer’s notice.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();