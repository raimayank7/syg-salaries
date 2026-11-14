(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function pt(s){return s>=25000?200:0}
window.KAPT={pt:pt};
var f=$('#ka-form');if(!f)return;var res=$('#ka-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#ka-s').value)||0;res.hidden=false;res.className='result rise';res.innerHTML='<h2>Professional tax '+r(pt(s))+' a month, '+r(pt(s)*12)+' a year</h2><p>Per the schedule the Karnataka Commercial Taxes Department publishes: ₹200 a month from a monthly salary of ₹25,000, nothing below it. No separate February rate appears in that file.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();