const x=["Anoro Ellipta","Biktarvy","Botox for migraines","Breo Ellipta","Cimzia","Cosentyx","Cosentyx (300 MG Dose)","Cosentyx Sensoready Pen","Creon","Eliquis","Emgality","Enbrel","EPCLUSA","Fasenra","HumaLOG","HumaLOG KwikPen","HumaLOG Mix 50/50","HumaLOG Mix 75/25","HumaLOG Mix 75/25 KwikPen","Humira","Humulin N (U 100 Injection)","Jardiance","Janumet","Janumet XR","Januvia","Lantus","Lovenox","Multaq","Ocrevus","Ozempic (0.25 or 0.5 MG Dose)","Ozempic (1 MG Dose)","Ozempic (2 MG Dose)","Prodigy AutoCode Blood Glucose Monitor","Prolia","Rexulti","Rinvoq","Rybelsus","Skyrizi","Skyrizi (150 MG Dose)","Stelara","Suboxone","Taltz","Tresiba","Tresiba FlexTouch","Trelegy Ellipta","Trintellix","Wegovy","Xarelto","Xeljanz","Xeljanz XR","Zubsolv"],o={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",email:"",marital:"",residency:"",employed:"",sex:"",disabled:"",numinhouse:"",EmerContactName:"",EmerContactPhone1:""},P={patwages:"",patdisab:"",patunemploy:""},h={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},b={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},k=document.querySelector('[cd="submit-data"]');let q="",w={CustomerId:"",OrderItems:[]};async function C(){function t(a){let e={ddi:"",name:"",program:"",pharmcoid:"6825",pharmco:"Rx Outreach",physicianid:"",qty:"90",sig:"",diagnosis:""};a.querySelectorAll(".input-field").forEach(r=>{if(r.name.includes("med-name")){let l="";r.querySelectorAll("option").forEach(n=>{n.value===r.value&&(l=n.getAttribute("cd-webpap-name"),e.program=n.getAttribute("cd-program"),n.getAttribute("cd-program")==="GSK Patient Assistance Program"?(e.pharmco="GlaxoSmithKline",e.pharmcoid="5331"):n.getAttribute("cd-program")==="myAbbvie Assist for Humira"?(e.pharmco="AbbVie Inc.",e.pharmcoid="203"):n.getAttribute("cd-program")==="Zubsolv Patient Assistance Program"?(e.pharmco="Orexo US, Inc",e.pharmcoid="7018"):n.getAttribute("cd-program")==="Otsuka PAP-Rexulti"?(e.pharmco="Otsuka Patient Assistance Foundation, Inc.",e.pharmcoid="7084"):n.getAttribute("cd-program")==="Amgen Enbrel"?(e.pharmco="Amgen, Inc.",e.pharmcoid="7541"):n.getAttribute("cd-program")==="Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)"?(e.pharmco="Bristol-Myers Squibb Company",e.pharmcoid="37"):n.getAttribute("cd-program")==="Help at Hand Patient Assistance Program"?(e.pharmco="Takeda Pharmaceuticals",e.pharmcoid="221"):n.getAttribute("cd-program")==="Sanofi Patient Connection"?(e.pharmco="Sanofi",e.pharmcoid="90"):n.getAttribute("cd-program")==="BI Cares Patient Assistance Program"?(e.pharmco="Boehringer Ingelheim CARES Foundation, Inc.",e.pharmcoid="36"):n.getAttribute("cd-program")==="Patient Assistance Program"?(e.pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",e.pharmcoid="5091"):n.getAttribute("cd-program")==="Xelsource : Xeljanz"?(e.pharmco="Pfizer, Inc.",e.pharmcoid="7145"):n.getAttribute("cd-program")==="MyAbbvie Assist for Botox"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7538"):n.getAttribute("cd-program")==="myAbbVie Assist for Skyrizi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7122"):n.getAttribute("cd-program")==="myAbbVie Assist for Creon, Linzess, Viberzi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="6910"):n.getAttribute("cd-program")==="myAbbVie Assist for Rinvoq"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7141"):n.getAttribute("cd-program")==="UCBCares Program"?(e.pharmco="UCB, Inc.",e.pharmcoid="7081"):n.getAttribute("cd-program")==="Novartis Patient Assistance Foundation, Inc. (NPAF)"?(e.pharmco="Novartis Pharmaceuticals Corporation",e.pharmcoid="56"):n.getAttribute("cd-program")==="Novo Nordisk Patient Assistance Program"?(e.pharmco="Novo Nordisk",e.pharmcoid="6993"):n.getAttribute("cd-program")==="Dexcom Patient Assistance Program"?(e.pharmco="Dexcom, Inc.",e.pharmcoid="7535"):n.getAttribute("cd-program")==="Genentech Patient Foundation"?(e.pharmco="Genentech USA, Inc.",e.pharmcoid="7123"):n.getAttribute("cd-program")==="Wegovy Savings Card"?(e.pharmco="Novo Nordisk",e.pharmcoid="7539"):n.getAttribute("cd-program")==="Amgen Safety Net Foundation (ASNF)"?(e.pharmco="Amgen, Inc",e.pharmcoid="7078"):n.getAttribute("cd-program")==="Support Path Patient Assistance Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="6969"):n.getAttribute("cd-program")==="Advancing Access Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="46"):n.getAttribute("cd-program")==="myAbbVie Assist Patient Assistance Program"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7208"):n.getAttribute("cd-program")==="Lilly Cares Foundation Patient Assistance Program"?(e.pharmco="Lilly USA, LLC.",e.pharmcoid="52"):n.getAttribute("cd-program")==="AZ&Me Prescription Savings Program for people without insurance"?(e.pharmco="Astrazeneca Pharmaceuticals",e.pharmcoid="31"):n.getAttribute("cd-program")==="Merck Patient Assistance Program, Inc."&&(e.pharmco="Merck Patient Assistance Program, Inc.",e.pharmcoid="172"),e.diagnosis=n.getAttribute("cd-diagnosis"),e.ddi===""&&(e.ddi=n.getAttribute("cd-webpap-id")))}),e.name=l}else if(r.name.includes("med-strength")){let l="";r.querySelectorAll("option").forEach(n=>{n.innerHTML===r.value&&(l=n.getAttribute("cd-webpap-id"))}),l!==""&&(e.ddi=l)}else r.name.includes("Frequency")?e.sig=r.value:r.name.includes("Doctor")&&(e.physicianid=r.value)}),w.OrderItems.push(e)}document.querySelectorAll('[cd="med"]').forEach(a=>{a.querySelector(".select-doc").value!==""&&t(a)})}k.addEventListener("click",()=>{M()});async function M(){patientAddress&&patientAddress.forEach(e=>{switch(e.types[0]){case"street_number":{o.address=`${e.long_name} `;break}case"route":{o.address+=e.short_name;break}case"locality":o.city=e.long_name;break;case"administrative_area_level_1":{o.state=e.short_name;break}}}),doctorAddress&&doctorAddress.forEach(e=>{switch(e.types[0]){case"street_number":{h.address=`${e.long_name} `;break}case"route":{h.address+=e.short_name;break}case"locality":h.city=e.long_name;break;case"administrative_area_level_1":{h.state=e.short_name;break}}}),doctor2Address&&doctor2Address.forEach(e=>{switch(e.types[0]){case"street_number":{b.address=`${e.long_name} `;break}case"route":{b.address+=e.short_name;break}case"locality":b.city=e.long_name;break;case"administrative_area_level_1":{b.state=e.short_name;break}}});const t=[];document.querySelectorAll(".input-field").forEach(e=>{let i=e.id,r=e.value;(i.includes("phone")||i.includes("fax"))&&(r=r.replace(/\D/g,"")),t.push({field:i,value:r})}),document.querySelectorAll("input[type=radio]:checked").forEach(e=>{let i=e.name,r=e.id;t.push({field:i,value:r})}),t.forEach(e=>{if(e.field==="insurance-field"){q=e.value;return}if(e.field==="patwages"){P[e.field]=e.value.slice(1);return}if(e.field.includes("doc-")){let i=e.field.split("-")[1];h[i]=e.value;return}if(e.field.includes("doc2-")){let i=e.field.split("-")[1];b[i]=e.value;return}if(e.field==="month"){o.dob=`${e.value}`;return}if(e.field==="day"||e.field==="year"){o.dob=`${o.dob}/${e.value}`;return}if(e.field==="residency"||e.field==="disabled"){o[e.field]=e.value==="Yes"?"true":"false";return}if(e.field==="ssn"){o[e.field]=e.value.replace(/-/g,"");return}o[e.field]=e.value}),await C();const s=Date.now().toString(),a={patientData:o,patientIncomeData:P,insurance:q,doctorData:h,doctor2Data:b,drugData:w,uniqueId:s};sessionStorage.setItem("formData",JSON.stringify(a)),sessionStorage.setItem(s,JSON.stringify(a)),z(s)}const z=async t=>{const a=await(await fetch("https://voluble-axolotl-2e6e1c.netlify.app/.netlify/functions/create-stripe-session",{method:"POST",body:JSON.stringify({uniqueId:t}),headers:{"Content-Type":"application/json"}})).json();window.location.href=a.checkoutURL};function O(){const t=document.getElementById("segment-field");for(let s=1;s<4;s++){const e=document.getElementById(`med-name-${s}`).value;if(e==="")return;if(e!==x.find(i=>i===e)){if(t.value==="Brand"){t.value="Both";return}t.value="Generic";return}else{if(t.value==="Generic"){t.value="Both";return}t.value="Brand"}}}const $=document.getElementById("year"),D=105;for(let t=D;t>0;t--){const s=document.createElement("option");s.text=`${t+1900}`,s.value=`${t+1900}`,$.add(s)}function T(t,s,a,e){let i=0;s.style.display="none";const r=t.length;t.forEach((l,n)=>{n!==i&&(l.style.display="none")}),s.addEventListener("click",()=>{i>0&&(t[i].style.display="none",i--,t[i].style.display="block"),e.forEach((l,n)=>{n!==i?l.classList.remove("current"):l.classList.add("current")}),i===0?s.style.display="none":s.style.display="block",i===3&&(a.innerHTML="Continue")}),a.addEventListener("click",()=>{const l=t[i].querySelectorAll("input"),n=t[i].querySelectorAll("select");if(G(l,n,i))if(i===3){O(),document.querySelector(".submit-btn").click(),k.click();return}else i<r-1&&(t[i].style.display="none",i++,t[i].style.display="block"),e.forEach((c,d)=>{d!==i?c.classList.remove("current"):c.classList.add("current")}),i===0?s.style.display="none":s.style.display="block",i===3&&(a.innerHTML="Continue To Payment")})}const _=document.querySelectorAll("[cd-form = step]"),N=document.querySelector("[cd-form = button-back]"),F=document.querySelector("[cd-form = button-next]"),S=document.querySelectorAll("[cd-form=progress-indicator]");T(_,N,F,S);function G(t,s,a){let e=!0;t.forEach(c=>{c.required&&(c.value===""?(e=!1,c.nextElementSibling.classList.add("active")):c.nextElementSibling.classList.remove("active"))}),s.forEach(c=>{c.required&&(c.value===""?(e=!1,c.nextElementSibling.classList.add("active")):c.nextElementSibling.classList.remove("active"))});const i=document.querySelectorAll("input[name=sex]:checked"),r=document.querySelectorAll("input[name=residency]:checked"),l=document.querySelectorAll("input[name=disabled]:checked");if(i.length===0?(document.getElementById("sex-radio-error").classList.add("active"),e=!1):document.getElementById("sex-radio-error").classList.remove("active"),r.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),e=!1):document.getElementById("citizen-radio-error").classList.remove("active"),l.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),e=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(e=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),a===1){const c=document.getElementById("email");if(!c.required)return;/\S+@\S+\.\S+/.test(c.value)?c.nextElementSibling.classList.remove("active"):(e=!1,c.nextElementSibling.classList.add("active"));const u=document.getElementById("dayphone"),f=document.getElementById("EmerContactPhone");u.value.length!==16?(e=!1,u.nextElementSibling.classList.add("active")):u.nextElementSibling.classList.remove("active"),f.value.length!==16?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active");const g=document.getElementById("zip");g.value.length!==5?(e=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active");const m=document.getElementById("patientAddress");L(m.value)===!1?(e=!1,m.nextElementSibling.classList.add("active")):m.nextElementSibling.classList.remove("active")}if(a===2){const c=document.getElementById("doc-email"),d=document.getElementById("doc2-email-2");if(!c.required)return;Number($.value)<=1958&&(x.forEach(p=>{console.log(p),document.querySelector(`[cd-drug-box="${p}"]`).remove()}),document.querySelector(".generic-only").style.display="block");for(let p=1;p<4;p++)se(document.getElementById(`med-name-${p}`));const u=/\S+@\S+\.\S+/;u.test(c.value)?c.nextElementSibling.classList.remove("active"):(e=!1,c.nextElementSibling.classList.add("active")),d.value!==""?u.test(d.value)||(e=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active");const f=document.getElementById("doc-officephone-2"),g=document.getElementById("doc-fax"),m=document.getElementById("doc2-officephone-2"),v=document.getElementById("doc2-fax-2");f.value.length!==16?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),g.value.length!==16?(e=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active"),m.value!==""&&(m.value.length!==16?(e=!1,m.nextElementSibling.classList.add("active")):m.nextElementSibling.classList.remove("active")),v.value!==""&&(v.value.length!==16?(e=!1,v.nextElementSibling.classList.add("active")):v.nextElementSibling.classList.remove("active"));const E=document.getElementById("doctorAddress");L(E.value)===!1?(e=!1,E.nextElementSibling.classList.add("active")):E.nextElementSibling.classList.remove("active");const y=document.getElementById("doctor2Address");y.value!==""&&(L(y.value)===!1?(e=!1,y.nextElementSibling.classList.add("active")):y.nextElementSibling.classList.remove("active"));const I=document.getElementById("doc-zip-2"),A=document.getElementById("doc2-zip-2");I.value.length!==5?(e=!1,I.nextElementSibling.classList.add("active")):I.nextElementSibling.classList.remove("active"),A.value!==""&&(A.value.length!==5?(e=!1,A.nextElementSibling.classList.add("active")):A.nextElementSibling.classList.remove("active"))}return e}const H=document.querySelectorAll(".phone-field");function R(t){t.addEventListener("input",function(){this.value=this.value.replace(/\D/g,"");const s=this.value.replace(/\D/g,"").substring(0,10),a=s.substring(0,3),e=s.substring(3,6),i=s.substring(6,10);s.length>6?this.value=`(${a}) ${e} - ${i}`:s.length>3?this.value=`(${a}) ${e}`:s.length>0&&(this.value=`(${a}`)})}H.forEach(t=>{R(t)});const V=document.querySelectorAll('input[placeholder="Zip code"]');V.forEach(t=>{t.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function J(t){return t.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(e,i,r,l)=>l?`${i}-${r}-${l}`:r?`${i}-${r}`:i)}const U=document.getElementById("ssn");U.addEventListener("input",function(){this.value=J(this.value)});function L(t){return/^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/.test(t)}const X=document.querySelector(".money-field");X.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+this.value)});const B=document.querySelector(".progress-bar-c"),j=document.querySelector(".progress-bar"),Z={attributes:!0};function K(t){t.forEach(function(s){if(s.type==="attributes"&&s.attributeName==="class"){let a=Array.from(S).findIndex(e=>e.classList.contains("current"));j.style.width=`${(a+1)/S.length*100}%`,window.innerWidth<768&&(a===2?B.style.transform=`translateX(-${516-window.innerWidth}px)`:a<2&&(B.style.transform="translateX(0px)"))}})}let W=new MutationObserver(K);S.forEach(t=>{W.observe(t,Z)});const Y=document.querySelectorAll(".doc-content-c-tab"),Q=document.querySelectorAll(".doc-content-w"),ee=document.querySelectorAll(".tab-minus-icon"),te=document.querySelectorAll(".tab-plus-icon");Y.forEach(t=>{t.addEventListener("click",()=>{Q.forEach(s=>{s.classList.remove("active"),s.parentElement===t&&s.classList.add("active")}),ee.forEach(s=>{s.classList.remove("active"),t.querySelector(".tab-minus-icon")===s&&s.classList.add("active")}),te.forEach(s=>{s.classList.remove("active"),t.querySelector(".tab-plus-icon")!==s&&s.classList.add("active")})})});function ie(t){if(t==="")return!1;t===x.find(s=>s===t)?(document.getElementById("insurance-row").classList.remove("hidden"),document.getElementById("insurance-field").required=!0,document.getElementById("brand-note").classList.remove("hidden")):(document.getElementById("insurance-row").classList.add("hidden"),document.getElementById("insurance-field").required=!1,document.getElementById("brand-note").classList.add("hidden"))}for(let t=1;t<4;t++){const s=document.getElementById(`med-name-${t}`),a=document.getElementById(`med-strength-${t}`);s.addEventListener("change",e=>{var c;t!==1&&(s.value!==""?(document.getElementById(`med-strength-${t}`).required=!0,document.getElementById(`choose-doctor-${t}`).required=!0):(document.getElementById(`med-strength-${t}`).required=!1,document.getElementById(`choose-doctor-${t}`).required=!1)),a.innerHTML="";const i=e.target.value.toLocaleLowerCase().replace(/[\(\)\/.]/g,"").split(" ").join("-"),r=(c=document.querySelector(`[cd-name=${i}]`))==null?void 0:c.parentElement,l=r==null?void 0:r.querySelectorAll("[cd=strength]"),n=[];l==null||l.forEach(d=>{const u={strength:d.textContent,webpapId:d.getAttribute("cd-webpap-id")};u.strength!==null&&n.push(u)}),ne(a,n),ie(e.target.value)})}function se(t){document.querySelectorAll("[cd=drug]").forEach(a=>{const e=document.createElement("option"),i=a.textContent,r=a.getAttribute("cd-webpap-name"),l=a.getAttribute("cd-program"),n=a.getAttribute("cd-diagnosis"),c=a.getAttribute("cd-webpap-id");i!==null&&(e.text=i,e.value=i,e.setAttribute("cd-webpap-name",r),e.setAttribute("cd-program",l),e.setAttribute("cd-diagnosis",n),e.setAttribute("cd-webpap-id",c),t.add(e))})}function ne(t,s){if(s.length>9){t.innerHTML="";const i=document.createElement("option");i.text="Select Medication First",i.value="",t.add(i);return}t.removeAttribute("disabled"),t.classList.remove("disabled"),t.innerHTML="";const a=document.createElement("option");a.text="Select Medication First",a.value="",t.add(a);let e=!0;s.forEach(i=>{if(i.strength==="")return;e=!1;const r=document.createElement("option");r.text=i.strength,r.value=i.strength,r.setAttribute("cd-webpap-id",i.webpapId),t.add(r)}),e&&(t.setAttribute("disabled","true"),t.classList.add("disabled"),t.removeAttribute("required"))}

