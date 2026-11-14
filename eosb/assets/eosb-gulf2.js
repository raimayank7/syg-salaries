(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function om(b,y){return b*y}
function bh(w,m){return w/2/12*Math.min(m,36)+w/12*Math.max(m-36,0)}
window.GULFX={om:om,bh:bh};
function f3(n,c){return c+' '+n.toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}
function wire(id,fn){var f=$('#'+id+'-form');if(!f)return;var res=$('#'+id+'-res');
 function ui(){var b=parseFloat($('#'+id+'-b').value)||0,y=(parseFloat($('#'+id+'-y').value)||0),m=(parseFloat($('#'+id+'-m').value)||0);res.hidden=false;res.className='result rise';if(!(b>0)){res.hidden=true;return}fn(res,b,y,m)}
 f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui()}
wire('om',function(res,b,y,m){var t=y+m/12,g=om(b,t);res.innerHTML='<h2>Minimum gratuity about '+f3(g,'OMR')+'</h2><p>'+f3(b,'OMR')+' final basic wage × '+(Math.round(t*100)/100)+' years. Article 61 of the Labour Law gives not less than one basic wage for each year of service, in proportion for part of a year.</p>'});
wire('bh',function(res,w,y,m){var mo=y*12+m,g=bh(w,mo);res.innerHTML='<h2>Indemnity about '+f3(g,'BHD')+'</h2><p>For '+mo+' months at '+f3(w,'BHD')+' a month, by the Labour Market Regulatory Authority’s method. The last wage is paid as well.</p>'});
})();