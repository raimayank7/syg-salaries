(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function tr(m){return m<=7500?0:m<=15000?150:208}
window.TRPT={tr:tr};
var f=$('#tr-form');if(!f)return;var res=$('#tr-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#tr-s').value)||0,t=tr(s);res.hidden=false;res.className='result rise';res.innerHTML='<h2>Professional tax '+r(t)+' a month</h2><p>Monthly gross income '+r(s)+'. From the Tripura Finance Department notification of 25 July 2018 as corrected on 30 October 2018. Rs 208 a month is Rs 2,496 a year; Rs 150 is Rs 1,800.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();