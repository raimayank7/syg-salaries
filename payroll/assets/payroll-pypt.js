(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function mx(m){var h=m*6;return h<=99999?0:h<=200000?250:h<=300000?500:h<=400000?750:h<=500000?1000:1250}
window.PYPT={mx:mx};
var f=$('#py-form');if(!f)return;var res=$('#py-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#py-s').value)||0,t=mx(s);res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>'+(t?'At most '+r(t)+' for each half-year':'Nothing for this income')+'</h2><p>Monthly pay '+r(s)+' makes half-yearly income of '+r(s*6)+'. The Act sets a maximum for each class and leaves the actual scale to the municipal council, so what your council charges can be lower. Check its notice.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();