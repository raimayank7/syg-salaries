(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function pt(s,w,f){if(w){if(s<=25000)return 0;return f?300:200}if(s<=7500)return 0;if(s<=10000)return 175;return f?300:200}
window.MHPT={pt:pt};
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
var f=$('#mh-form');if(!f)return;var res=$('#mh-res');
function ui(){var s=parseFloat($('#mh-s').value)||0,w=$('#mh-w').value==='w';res.hidden=false;res.className='result rise';var tot=0;for(var m=0;m<12;m++)tot+=pt(s,w,m===10);
 res.innerHTML='<h2>Professional tax '+r(pt(s,w,false))+' a month, '+r(tot)+' a year</h2><div class="tbl"><table><tbody><tr><td>Monthly salary or wages</td><td>'+r(s)+'</td></tr><tr><td>Any month except February</td><td>'+r(pt(s,w,false))+'</td></tr><tr><td>February</td><td>'+r(pt(s,w,true))+'</td></tr><tr class="tx-total"><td>For a year</td><td>'+r(tot)+'</td></tr></tbody></table></div><p class="tx-src">Schedule I of the Maharashtra Act of 1975, as printed in 2023. Later changes were not read.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();