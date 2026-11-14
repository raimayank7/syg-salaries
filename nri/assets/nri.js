(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)},L=1500000;
function status(days,prev4,kind,visiting,emp,income,taxed,nr,d7){var cit=kind==='citizen',cp=kind==='citizen'||kind==='pio',res=false,why='';
 if(days>=182){res=true;why='6(2)(a): 182 days or more in India in the tax year'}else{var thr=60,ap=true;if(cit&&emp){ap=false}else if(cp&&visiting){if(income>L){thr=120}else{ap=false}}
  if(ap&&days>=thr&&prev4>=365){res=true;why='6(2)(b): '+thr+' days or more this year and 365 days or more in the four preceding years'}}
 var deemed=false;if(!res&&cit&&!taxed&&income>L){deemed=true;res=true;why='6(7): citizen not liable to tax in any other country with total income above 15 lakh'}
 if(!res)return['NR','No test of section 6 is met'];
 var rn=null;if(nr>=9)rn='6(13)(a)(i): non-resident in 9 or 10 of the 10 preceding tax years';else if(d7<=729)rn='6(13)(a)(ii): 729 days or fewer in India in the 7 preceding tax years';else if(cp&&income>L&&days>=120&&days<182)rn='6(13)(b): citizen or person of Indian origin, income above 15 lakh and 120 to 181 days in India';else if(deemed)rn='6(13)(c): deemed resident under 6(7)';
 if(rn)return['RNOR',why+'; '+rn];return['ROR',why]}
window.NRIX={status:status};
var f=$('#nr-form');if(!f)return;var NAME={NR:'Non-resident (NR)',RNOR:'Resident but not ordinarily resident (RNOR)',ROR:'Resident and ordinarily resident (ROR)'};
var TAX={NR:'Income that is received in India, or that accrues or arises in India, in the tax year (section 5(2)).',RNOR:'Income received or accruing in India, plus income accruing abroad only if it comes from a business controlled in India or a profession set up in India (section 5(1)(c)).',ROR:'Income from all sources, in India or abroad (section 5(1)).'};
function v(id){return parseFloat($(id).value)||0}
function ui(){var days=v('#nr-d'),prev4=v('#nr-p'),kind=$('#nr-k').value,vis=$('#nr-v').checked,emp=$('#nr-e').checked,inc=v('#nr-i')*100000,tx=$('#nr-t').checked,nr=v('#nr-n'),d7=v('#nr-s');
 var r=status(days,prev4,kind,vis,emp,inc,tx,nr,d7),rs=$('#nr-res');
 var txt='Income-tax Act 2025 residential status: '+NAME[r[0]]+' ('+r[1]+').';
 rs.hidden=false;rs.className='result rise';rs.innerHTML='<h2>'+NAME[r[0]]+'</h2><p><b>Why:</b> '+r[1]+'.</p><p><b>What is taxed in India:</b> '+TAX[r[0]]+'</p><div class="acts"><button class="btn sm" type="button" data-copy="'+S.esc(txt)+'">Copy result</button><button class="btn sm ghost" type="button" data-wa="'+S.esc(txt+' Checked at '+location.origin+'/')+'">WhatsApp</button><button class="btn sm ghost" type="button" onclick="print()">Print</button></div><p class="hint">Residential status under the Income-tax Act is not the same as residence under FEMA for bank accounts and investments. Not tax advice.</p>'}
f.addEventListener('submit',function(e){e.preventDefault();ui()});f.addEventListener('input',ui);f.addEventListener('change',ui);ui();
})();