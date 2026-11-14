(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function bi(a){return a<=300000?0:a<=500000?1000:a<=1000000?2000:2500}
function mn(a){return a<=50000?0:a<=75000?1200:a<=100000?2000:a<=125000?2400:2500}
window.BMPT={bi:bi,mn:mn};
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function wire(id,fn,src){var f=$('#'+id+'-form');if(!f)return;var res=$('#'+id+'-res');
 function ui(){var a=parseFloat($('#'+id+'-s').value)||0;res.hidden=false;res.className='result rise';var t=fn(a);res.innerHTML='<h2>Professional tax '+r(t)+' a year</h2><p>On an annual income of '+r(a)+' (the schedule goes by annual income, not monthly pay). '+src+'</p>'}
 f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui()}
wire('bi',bi,'From the Bihar Gazette notification S.O. 28 of 2 February 2016.');
wire('mn',mn,'From the Manipur Act No. 8 of 2012, in force from 1 September 2012.');
})();