(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function ch(m){var h=m*6;return h<=21000?0:h<=30000?180:h<=45000?425:h<=60000?930:h<=75000?1025:1250}
window.TNPT={ch:ch};
var f=$('#tn-form');if(!f)return;var res=$('#tn-res');
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function ui(){var s=parseFloat($('#tn-s').value)||0,t=ch(s);res.hidden=false;res.className='result rise';res.innerHTML='<h2>Profession tax '+r(t)+' for each half-year</h2><p>Monthly gross pay '+r(s)+' makes half-yearly gross income of '+r(s*6)+'. Greater Chennai Corporation only; deducted in August and January.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();