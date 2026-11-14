(function(){'use strict';
var d=document,$=function(s){return d.querySelector(s)};
var G22=["Chhattisgarh", "Madhya Pradesh", "Gujarat", "Maharashtra", "Karnataka", "Goa", "Kerala", "Tamil Nadu", "Telangana", "Andhra Pradesh", "Daman and Diu and Dadra and Nagar Haveli", "Puducherry", "Andaman and Nicobar Islands", "Lakshadweep"],G24=["Himachal Pradesh", "Punjab", "Uttarakhand", "Haryana", "Rajasthan", "Uttar Pradesh", "Bihar", "Sikkim", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura", "Meghalaya", "Assam", "West Bengal", "Jharkhand", "Odisha", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Delhi"];
function day(s){return G22.indexOf(s)>=0?22:G24.indexOf(s)>=0?24:0}
window.GSTDT={day:day};
var f=$('#gd-form');if(!f)return;var res=$('#gd-res'),sel=$('#gd-s');
G22.concat(G24).sort().forEach(function(n){var o=d.createElement('option');o.value=n;o.textContent=n;sel.appendChild(o)});
function ui(){var s=sel.value,x=day(s);res.hidden=!s;if(!s)return;res.className='result rise';
 res.innerHTML='<h2>'+s+': GSTR-3B for a quarter is due on the '+x+'th of the month after the quarter</h2><p>Monthly filers: the 20th of the next month. Quarterly (QRMP) filers: the '+x+'th of the month after the quarter, and the tax for the first two months of the quarter by FORM GST PMT-06 by the 25th of the next month. Rule 61 of the CGST Rules (CBIC compilation of 26 December 2022). Check the GST portal for any extension.</p>'}
f.addEventListener('change',ui);ui();
})();