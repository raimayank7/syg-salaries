(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var T={"upi-transfer": 1, "upi-merchant": 5, "imps": 1, "atm": 5, "card-card": 1, "pos": 5, "cnp": 5, "aeps": 5, "apbs": 1, "nach": 1, "ppi": 1};
function comp(days,tat){return 100*Math.max(0,Math.floor(days)-tat)}
window.UPIX={comp:comp};
var f=$('#tt-form');if(!f)return;var sc=$('#tt-s'),dy=$('#tt-d'),rs=$('#tt-res');
function ui(){var n=parseInt(dy.value,10),tat=parseInt(sc.value,10);rs.hidden=true;if(!(n>=0))return;var c=comp(n,tat),late=Math.max(0,n-tat);
 var txt='UPI/RBI rule: reversal due by T+'+tat+' days; after '+n+' days the delay is '+late+' day(s) and the compensation is Rs '+c+' (Rs 100 per day beyond T+'+tat+').';
 rs.hidden=false;rs.className='result rise';rs.innerHTML='<h2>'+(late>0?'Compensation: \u20b9'+c.toLocaleString('en-IN'):'Still within the time limit')+'</h2><div class="tbl"><table><tbody><tr><td>Reversal due by</td><td class="tx-n">T + '+tat+' days</td></tr><tr><td>Days since the transaction (T)</td><td class="tx-n">'+n+'</td></tr><tr><td>Days beyond the limit</td><td class="tx-n">'+late+'</td></tr><tr class="tx-total"><td>Compensation at \u20b9100 a day</td><td class="tx-n">\u20b9'+c.toLocaleString('en-IN')+'</td></tr></tbody></table></div><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">RBI says the compensation is credited to your account on its own, without a complaint. If you are not given redress, you can complain under the RBI Integrated Ombudsman Scheme.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});[sc,dy].forEach(function(el){el.addEventListener('input',ui);el.addEventListener('change',ui)});
})();