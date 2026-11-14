(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
function ker(m){var h=m*6;return h<=11999?0:h<=17999?320:h<=29999?450:h<=44999?600:h<=99999?750:h<=124999?1000:1250}
function miz(m){return m<=5000?0:m<=8000?75:m<=10000?120:m<=12000?150:m<=15000?180:m<=20000?195:208}
function nag(m){if(m===4000||m===5000||m===7000||m===9000)return null;return m<4000?0:m<5000?35:m<7000?75:m<9000?110:m<12000?180:208}
window.PTMORE={ker:ker,miz:miz,nag:nag};
function r(n){return '₹'+Math.round(n).toLocaleString('en-IN')}
function wire(id,fn){var f=$('#'+id+'-form');if(!f)return;var res=$('#'+id+'-res');
 function ui(){var s=parseFloat($('#'+id+'-s').value)||0;res.hidden=false;res.className='result rise';res.innerHTML=fn(s)}
 f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui()}
wire('ke',function(s){var t=ker(s);return '<h2>Professional tax '+r(t)+' for each half-year</h2><p>Monthly pay '+r(s)+' makes half-yearly income of '+r(s*6)+'. Government Order (Sadha) 1149/2024/LSGD, in force from 1 October 2024. How a local body collects it is not worked here.</p>'});
wire('mz',function(s){var t=miz(s);return '<h2>Professional tax '+r(t)+' a month</h2><p>Or the lump sum the notification allows for the year. From the Taxation Department notification of 11 July 2024.</p>'});
wire('na',function(s){var t=nag(s);return t===null?'<h2>Check the amount with the Department</h2><p>The printed schedule says “less than” and “more than” and so does not say which slab exactly '+r(s)+' falls in.</p>':'<h2>Professional tax '+r(t)+' a month</h2><p>From the Nagaland Taxation Department’s schedule (file undated).</p>'});
})();