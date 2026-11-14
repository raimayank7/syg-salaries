(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function due(y,m,sp){var ny=m===12?y+1:y,nm=m===12?1:m+1;if(sp){var e=new Date(Date.UTC(ny,nm-1,1));e.setUTCDate(e.getUTCDate()-1+30);return e}if(m===3)return new Date(Date.UTC(y,3,30));return new Date(Date.UTC(ny,nm-1,7))}
window.TDSDT={due:due};
function fmt(x){return x.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}
var f=$('#td-form');if(!f)return;var res=$('#td-res');
function ui(){var p=$('#td-m').value.split('-'),sp=$('#td-k').value==='s',y=+p[0],m=+p[1];res.hidden=false;res.className='result rise';
 res.innerHTML='<h2>Pay by '+fmt(due(y,m,sp))+'</h2><p>'+(sp?'Rent, immovable property, contract work, professional fees, commission, brokerage or virtual digital asset: thirty days from the end of the month of deduction, with a challan-cum-statement in Form 141 (Rule 218(3)).':(m===3?'Deductions in March: by 30 April (Rule 218(2)(a)).':'Seven days from the end of the month of deduction (Rule 218(2)(b)).'))+' Income-tax Rules, 2026. A notified extension or a holiday is not worked here.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();