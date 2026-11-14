(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function pt(s){return s<=10000?0:s<15000?150:s<25000?180:208}
window.ASPT={pt:pt};
var f=$('#as-form');if(!f)return;var res=$('#as-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#as-s').value)||0;res.hidden=false;res.className='result rise';res.innerHTML='<h2>Professional tax '+r(pt(s))+' a month, '+r(pt(s)*12)+' a year</h2><p>From the Assam Taxation Department’s rate schedule marked “with effect from 15-10-2014”.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();