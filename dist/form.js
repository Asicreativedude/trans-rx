const q=["Enbrel","Humira","Humulin N (U 100 Injection)","Breo Ellipta","Trelegy Ellipta","Xarelto","Wegovy","Ozempic (0.25 or 0.5 MG/DOSE)","Ozempic (1 MG/DOSE)","Ozempic (2 MG/DOSE)","Skyrizi","Skyrizi (150 MG Dose)","HumaLOG","HumaLOG KwikPen","HumaLOG Mix 50/50","HumaLOG Mix 75/25","HumaLOG Mix 75/25 KwikPen","Xeljanz","Xeljanz XR","Rybelsus","OCREVUS","Botox for migraines","Cosentyx (300 MG Dose)","Cosentyx","Cosentyx Sensoready Pen","Jardiance","Multaq","Januvia","Suboxone","Janumet","Janumet XR","Fasenra","Emgality","Qulipta","Prolia","EPCLUSA","Tresiba","Tresiba FlexTouch","Trintellix","Eliquis","Prodigy AutoCode Blood Glucose Monitor","Biktarvy","Strelara","Anoro Ellipta","Zubsolv","Rexulti","Taltz","Creon","Rinvoq","Cimzia","Lovenox","Lantus"],u={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",email:"",marital:"",residency:"",employed:"",sex:"",disabled:"",numinhouse:"",EmerContactName:"",EmerContactPhone1:""},T={patwages:"",patdisab:"",patunemploy:""},m={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},y={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},F=document.querySelector('[cd="submit-data"]');let I=0,g="",z="";const V="https://www.medserviceswebpap.com/api/patient/createpatient",B="https://www.medserviceswebpap.com/api/physician/createphysician",G="https://www.medserviceswebpap.com/auth/token?hcpid=89",j={grant_type:"password",username:"apiuser",password:"123456"};async function H(n,t){const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()});if(!a.ok)throw new Error(a.statusText);return a.json()}async function C(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");const e=await a.json();t.id=e.Id,console.log(t)}catch(a){Sentry.captureException(a),console.log(a)}}async function U(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");I=(await a.json()).Id}catch(a){Sentry.captureException(a),console.log(a)}}async function J(n,t){try{if(!(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(t)})).ok)throw new Error("Network response was not ok")}catch(a){Sentry.captureException(a),console.log(a)}}async function X(n,t){let a;t==="private"?a={privateins:"true"}:a={none:"true"};try{if(!(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(a)})).ok)throw new Error("Network response was not ok")}catch(e){Sentry.captureException(e),console.log(e)}}async function K(n){try{const t=await fetch(n,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`}});if(!t.ok)throw new Error("Network response was not ok");let a=await t.json();return console.log(a),a}catch(t){Sentry.captureException(t),console.log(t)}}async function W(n){try{const t=await fetch("https://www.medserviceswebpap.com/api/paporders/additem",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(n)});if(!t.ok)throw new Error("Network response was not ok");let a=await t.json();return console.log(a),a}catch(t){Sentry.captureException(t),console.log(t)}}let w={CustomerId:"",OrderItems:[]};async function D(){function n(a){let e={ddi:"",name:"",program:"",pharmcoid:"6825",pharmco:"Rx Outreach",physicianid:"",qty:"90",sig:"",diagnosis:""};a.querySelectorAll(".input-field").forEach(s=>{if(s.name.includes("med-name")){let c="";s.querySelectorAll("option").forEach(i=>{i.value===s.value&&(c=i.getAttribute("cd-webpap-name"),e.program=i.getAttribute("cd-program"),i.getAttribute("cd-program")==="GSK Patient Assistance Program"?(e.pharmco="GlaxoSmithKline",e.pharmcoid="5331"):i.getAttribute("cd-program")==="myAbbvie Assist for Humira"?(e.pharmco="AbbVie Inc.",e.pharmcoid="203"):i.getAttribute("cd-program")==="Zubsolv Patient Assistance Program"?(e.pharmco="Orexo US, Inc",e.pharmcoid="7018"):i.getAttribute("cd-program")==="Otsuka PAP-Rexulti"?(e.pharmco="Otsuka Patient Assistance Foundation, Inc.",e.pharmcoid="7084"):i.getAttribute("cd-program")==="Amgen Enbrel"?(e.pharmco="Amgen, Inc.",e.pharmcoid="7541"):i.getAttribute("cd-program")==="Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)"?(e.pharmco="Bristol-Myers Squibb Company",e.pharmcoid="37"):i.getAttribute("cd-program")==="Help at Hand Patient Assistance Program"?(e.pharmco="Takeda Pharmaceuticals",e.pharmcoid="221"):i.getAttribute("cd-program")==="Sanofi Patient Connection"?(e.pharmco="Sanofi",e.pharmcoid="90"):i.getAttribute("cd-program")==="BI Cares Patient Assistance Program"?(e.pharmco="Boehringer Ingelheim CARES Foundation, Inc.",e.pharmcoid="36"):i.getAttribute("cd-program")==="Patient Assistance Program"?(e.pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",e.pharmcoid="5091"):i.getAttribute("cd-program")==="Xelsource : Xeljanz"?(e.pharmco="Pfizer, Inc.",e.pharmcoid="7145"):i.getAttribute("cd-program")==="Pzifer Dermatology Patient Access"?(e.pharmco="Pfizer, Inc.",e.pharmcoid="7342"):i.getAttribute("cd-program")==="MyAbbvie Assist for Botox"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7538"):i.getAttribute("cd-program")==="myAbbVie Assist for Skyrizi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7122"):i.getAttribute("cd-program")==="myAbbVie Assist for Creon, Linzess, Viberzi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="6910"):i.getAttribute("cd-program")==="myAbbVie Assist for Rinvoq"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7141"):i.getAttribute("cd-program")==="UCBCares Program"?(e.pharmco="UCB, Inc.",e.pharmcoid="7081"):i.getAttribute("cd-program")==="Novartis Patient Assistance Foundation, Inc. (NPAF)"?(e.pharmco="Novartis Pharmaceuticals Corporation",e.pharmcoid="56"):i.getAttribute("cd-program")==="Novo Nordisk Patient Assistance Program"?(e.pharmco="Novo Nordisk",e.pharmcoid="6993"):i.getAttribute("cd-program")==="Dexcom Patient Assistance Program"?(e.pharmco="Dexcom, Inc.",e.pharmcoid="7535"):i.getAttribute("cd-program")==="Genentech Patient Foundation"?(e.pharmco="Genentech USA, Inc.",e.pharmcoid="7123"):i.getAttribute("cd-program")==="Wegovy Savings Card"?(e.pharmco="Novo Nordisk",e.pharmcoid="7539"):i.getAttribute("cd-program")==="Amgen Safety Net Foundation (ASNF)"?(e.pharmco="Amgen, Inc",e.pharmcoid="7078"):i.getAttribute("cd-program")==="Support Path Patient Assistance Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="6969"):i.getAttribute("cd-program")==="Advancing Access Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="46"):i.getAttribute("cd-program")==="myAbbVie Assist Patient Assistance Program"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7208"):i.getAttribute("cd-program")==="Lilly Cares Foundation Patient Assistance Program"?(e.pharmco="Lilly USA, LLC.",e.pharmcoid="52"):i.getAttribute("cd-program")==="AZ&Me Prescription Savings Program for people without insurance"?(e.pharmco="Astrazeneca Pharmaceuticals",e.pharmcoid="31"):i.getAttribute("cd-program")==="Merck Patient Assistance Program, Inc."&&(e.pharmco="Merck Patient Assistance Program, Inc.",e.pharmcoid="172"),e.diagnosis=i.getAttribute("cd-diagnosis"),e.ddi===""&&(e.ddi=i.getAttribute("cd-webpap-id")))}),e.name=c}else if(s.name.includes("med-strength")){let c="";s.querySelectorAll("option").forEach(i=>{i.innerHTML===s.value&&(c=i.getAttribute("cd-webpap-id"))}),c!==""&&(e.ddi=c)}else s.name.includes("Frequency")?e.sig=s.value:s.name.includes("Doctor")&&(e.physicianid=s.value)}),w.OrderItems.push(e)}document.querySelectorAll('[cd="med"]').forEach(a=>{a.querySelector(".select-doc").value!==""&&n(a)})}F.addEventListener("click",()=>{M()});async function M(){patientAddress&&patientAddress.forEach(t=>{switch(t.types[0]){case"street_number":{u.address=`${t.long_name} `;break}case"route":{u.address+=t.short_name;break}case"locality":u.city=t.long_name;break;case"administrative_area_level_1":{u.state=t.short_name;break}}}),doctorAddress&&doctorAddress.forEach(t=>{switch(t.types[0]){case"street_number":{m.address=`${t.long_name} `;break}case"route":{m.address+=t.short_name;break}case"locality":m.city=t.long_name;break;case"administrative_area_level_1":{m.state=t.short_name;break}}}),doctor2Address&&doctor2Address.forEach(t=>{switch(t.types[0]){case"street_number":{y.address=`${t.long_name} `;break}case"route":{y.address+=t.short_name;break}case"locality":y.city=t.long_name;break;case"administrative_area_level_1":{y.state=t.short_name;break}}});const n=[];document.querySelectorAll(".input-field").forEach(t=>{let a=t.id,e=t.value;(a.includes("phone")||a.includes("fax"))&&(e=e.replace(/\D/g,"")),n.push({field:a,value:e})}),document.querySelectorAll("input[type=radio]:checked").forEach(t=>{let a=t.name,e=t.id;n.push({field:a,value:e})}),n.forEach(t=>{if(t.field==="insurance-field"){z=t.value;return}if(t.field==="patwages"){T[t.field]=t.value.slice(1);return}if(t.field.includes("doc-")){let a=t.field.split("-")[1];m[a]=t.value;return}if(t.field.includes("doc2-")){let a=t.field.split("-")[1];y[a]=t.value;return}if(t.field==="month"){u.dob=`${t.value}`;return}if(t.field==="day"||t.field==="year"){u.dob=`${u.dob}/${t.value}`;return}if(t.field==="residency"||t.field==="disabled"){u[t.field]=t.value==="Yes"?"true":"false";return}if(t.field==="ssn"){u[t.field]=t.value.replace(/-/g,"");return}u[t.field]=t.value}),await Z().then(()=>{window.location.replace("https://www.transparentpricerx.com/thank-you")})}async function Z(){return new Promise(async(n,t)=>{try{await H(G,j).then(a=>{g=a.access_token}).then(async()=>{await U(V,u);let a=`https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${I}`;await J(a,T),w.CustomerId=`${I}`;let e=`https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${I}`;await X(e,z),await C(B,m),document.getElementById("doc2-fname").value!==""&&await C(B,y),await D(),await Promise.all(w.OrderItems.map(async r=>{console.log(r.pharmco),await K(`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${m.fname}&lname=${m.lname}`),r.physicianid.includes(m.fname)&&r.physicianid.includes(m.lname)&&(r.physicianid=m.id)})).then(()=>{console.log(w)}),await W(w)}),n()}catch(a){t(a)}})}function Q(){const n=document.getElementById("segment-field");for(let t=1;t<4;t++){const e=document.getElementById(`med-name-${t}`).value;if(e==="")return;if(e!==q.find(r=>r===e)){if(n.value==="Brand"){n.value="Both";return}n.value="Generic";return}else{if(n.value==="Generic"){n.value="Both";return}n.value="Brand"}}}const R=document.getElementById("year"),Y=105;for(let n=Y;n>0;n--){const t=document.createElement("option");t.text=`${n+1900}`,t.value=`${n+1900}`,R.add(t)}function ee(n,t,a,e){let r=0;t.style.display="none";const s=n.length;n.forEach((c,i)=>{i!==r&&(c.style.display="none")}),t.addEventListener("click",()=>{r>0&&(n[r].style.display="none",r--,n[r].style.display="block"),e.forEach((c,i)=>{i!==r?c.classList.remove("current"):c.classList.add("current")}),r===0?t.style.display="none":t.style.display="block",r===3&&(a.innerHTML="Continue")}),a.addEventListener("click",()=>{const c=n[r].querySelectorAll("input"),i=n[r].querySelectorAll("select");if(re(c,i,r))if(r===3){Q(),document.querySelector(".payment-trigger").click(),document.querySelector(".submit-btn").click();return}else r<s-1&&(n[r].style.display="none",r++,n[r].style.display="block"),e.forEach((o,l)=>{l!==r?o.classList.remove("current"):o.classList.add("current")}),r===0?t.style.display="none":t.style.display="block",r===3&&(a.innerHTML="Continue To Payment")})}const te=document.querySelectorAll("[cd-form = step]"),ne=document.querySelector("[cd-form = button-back]"),ae=document.querySelector("[cd-form = button-next]"),x=document.querySelectorAll("[cd-form=progress-indicator]");ee(te,ne,ae,x);function re(n,t,a){let e=!0;n.forEach(o=>{o.required&&(o.value===""?(e=!1,o.nextElementSibling.classList.add("active")):o.nextElementSibling.classList.remove("active"))}),t.forEach(o=>{o.required&&(o.value===""?(e=!1,o.nextElementSibling.classList.add("active")):o.nextElementSibling.classList.remove("active"))});const r=document.querySelectorAll("input[name=sex]:checked"),s=document.querySelectorAll("input[name=residency]:checked"),c=document.querySelectorAll("input[name=disabled]:checked");if(r.length===0?(document.getElementById("sex-radio-error").classList.add("active"),e=!1):document.getElementById("sex-radio-error").classList.remove("active"),s.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),e=!1):document.getElementById("citizen-radio-error").classList.remove("active"),c.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),e=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(e=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),a===1){const o=document.getElementById("email");if(!o.required)return;/\S+@\S+\.\S+/.test(o.value)?o.nextElementSibling.classList.remove("active"):(e=!1,o.nextElementSibling.classList.add("active"));const d=document.getElementById("dayphone"),h=document.getElementById("EmerContactPhone");d.value.length!==16?(e=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active"),h.value.length!==16?(e=!1,h.nextElementSibling.classList.add("active")):h.nextElementSibling.classList.remove("active");const f=document.getElementById("zip");f.value.length!==5?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active");const p=document.getElementById("patientAddress");k(p.value)===!1?(e=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")}if(a===2){const o=document.getElementById("doc-email"),l=document.getElementById("doc2-email-2");if(!o.required)return;Number(R.value)<=1958&&(q.forEach(v=>{document.querySelector(`[cd-drug-box="${v}"]`).remove()}),document.querySelector(".generic-only").style.display="block");for(let v=1;v<4;v++)Se(document.getElementById(`med-name-${v}`));const d=/\S+@\S+\.\S+/;d.test(o.value)?o.nextElementSibling.classList.remove("active"):(e=!1,o.nextElementSibling.classList.add("active")),l.value!==""?d.test(l.value)||(e=!1,l.nextElementSibling.classList.add("active")):l.nextElementSibling.classList.remove("active");const h=document.getElementById("doc-officephone-2"),f=document.getElementById("doc-fax"),p=document.getElementById("doc2-officephone-2"),S=document.getElementById("doc2-fax-2");h.value.length!==16?(e=!1,h.nextElementSibling.classList.add("active")):h.nextElementSibling.classList.remove("active"),f.value.length!==16?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),p.value!==""&&(p.value.length!==16?(e=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")),S.value!==""&&(S.value.length!==16?(e=!1,S.nextElementSibling.classList.add("active")):S.nextElementSibling.classList.remove("active"));const L=document.getElementById("doctorAddress");k(L.value)===!1?(e=!1,L.nextElementSibling.classList.add("active")):L.nextElementSibling.classList.remove("active");const E=document.getElementById("doctor2Address");E.value!==""&&(k(E.value)===!1?(e=!1,E.nextElementSibling.classList.add("active")):E.nextElementSibling.classList.remove("active"));const P=document.getElementById("doc-zip-2"),A=document.getElementById("doc2-zip-2");P.value.length!==5?(e=!1,P.nextElementSibling.classList.add("active")):P.nextElementSibling.classList.remove("active"),A.value!==""&&(A.value.length!==5?(e=!1,A.nextElementSibling.classList.add("active")):A.nextElementSibling.classList.remove("active"))}return e}const ie=document.querySelectorAll(".phone-field");function se(n){n.addEventListener("input",function(){this.value=this.value.replace(/\D/g,"");const t=this.value.replace(/\D/g,"").substring(0,10),a=t.substring(0,3),e=t.substring(3,6),r=t.substring(6,10);t.length>6?this.value=`(${a}) ${e} - ${r}`:t.length>3?this.value=`(${a}) ${e}`:t.length>0&&(this.value=`(${a}`)})}ie.forEach(n=>{se(n)});const oe=document.querySelectorAll('input[placeholder="Zip code"]');oe.forEach(n=>{n.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function ce(n){return n.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(e,r,s,c)=>c?`${r}-${s}-${c}`:s?`${r}-${s}`:r)}const le=document.getElementById("ssn");le.addEventListener("input",function(){this.value=ce(this.value)});function k(n){return/^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/.test(n)}const de=document.querySelector(".money-field");de.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+this.value)});const O=document.querySelector(".progress-bar-c"),ue=document.querySelector(".progress-bar"),me={attributes:!0};function pe(n){n.forEach(function(t){if(t.type==="attributes"&&t.attributeName==="class"){let a=Array.from(x).findIndex(e=>e.classList.contains("current"));ue.style.width=`${(a+1)/x.length*100}%`,window.innerWidth<768&&(a===2?O.style.transform=`translateX(-${516-window.innerWidth}px)`:a<2&&(O.style.transform="translateX(0px)"))}})}let he=new MutationObserver(pe);x.forEach(n=>{he.observe(n,me)});const fe=document.querySelectorAll(".doc-content-c-tab"),ge=document.querySelectorAll(".doc-content-w"),ye=document.querySelectorAll(".tab-minus-icon"),be=document.querySelectorAll(".tab-plus-icon");fe.forEach(n=>{n.addEventListener("click",()=>{ge.forEach(t=>{t.classList.remove("active"),t.parentElement===n&&t.classList.add("active")}),ye.forEach(t=>{t.classList.remove("active"),n.querySelector(".tab-minus-icon")===t&&t.classList.add("active")}),be.forEach(t=>{t.classList.remove("active"),n.querySelector(".tab-plus-icon")!==t&&t.classList.add("active")})})});const b=document.getElementById("medicationStep"),ve=b==null?void 0:b.querySelector(".form-row-wrapper"),N=document.getElementById("addMed");N.addEventListener("click",()=>{var t,a;const n=ve.cloneNode(!0);b.insertBefore(n,N.parentElement),(t=n.querySelector(".flex-grow:nth-child(1) > select"))==null||t.removeAttribute("required"),(a=n.querySelector(".flex-grow:nth-child(4) > input"))==null||a.removeAttribute("required"),n.querySelector(".flex-grow:nth-child(4) > input").value="",n.querySelector(".flex-grow:nth-child(2) > select").id=`med-name-${b.childElementCount-1}`,n.querySelector(".flex-grow:nth-child(2) > select").value="",n.querySelector(".flex-grow:nth-child(3) > select").id=`med-strength-${b.childElementCount-1}`,n.querySelector(".flex-grow:nth-child(2) > select").addEventListener("change",e=>{var o;n.querySelector(".flex-grow:nth-child(3) > select").innerHTML="";const r=e.target.value.toLocaleLowerCase().split(" ").join("-"),s=(o=document.querySelector(`[cd-name=${r}]`))==null?void 0:o.parentElement,c=s==null?void 0:s.querySelectorAll("[cd=strength]"),i=[];c==null||c.forEach(l=>{const d={strength:l.textContent,webpapId:l.getAttribute("cd-webpap-id")};d.strength!==null&&i.push(d)}),_(n.querySelector(".flex-grow:nth-child(3) > select"),i)})});function we(n){if(n==="")return!1;n===q.find(t=>t===n)?(document.getElementById("insurance-row").classList.remove("hidden"),document.getElementById("insurance-field").required=!0,document.getElementById("brand-note").classList.remove("hidden")):(document.getElementById("insurance-row").classList.add("hidden"),document.getElementById("insurance-field").required=!1,document.getElementById("brand-note").classList.add("hidden"))}for(let n=1;n<4;n++){const t=document.getElementById(`med-name-${n}`),a=document.getElementById(`med-strength-${n}`);t.addEventListener("change",e=>{var o;n!==1&&(t.value!==""?(document.getElementById(`med-strength-${n}`).required=!0,document.getElementById(`choose-doctor-${n}`).required=!0):(document.getElementById(`med-strength-${n}`).required=!1,document.getElementById(`choose-doctor-${n}`).required=!1)),a.innerHTML="";const r=e.target.value.toLocaleLowerCase().replace(/[\(\)\/.]/g,"").split(" ").join("-"),s=(o=document.querySelector(`[cd-name=${r}]`))==null?void 0:o.parentElement,c=s==null?void 0:s.querySelectorAll("[cd=strength]"),i=[];c==null||c.forEach(l=>{const d={strength:l.textContent,webpapId:l.getAttribute("cd-webpap-id")};d.strength!==null&&i.push(d)}),_(a,i),we(e.target.value)})}function Se(n){document.querySelectorAll("[cd=drug]").forEach(a=>{const e=document.createElement("option"),r=a.textContent,s=a.getAttribute("cd-webpap-name"),c=a.getAttribute("cd-program"),i=a.getAttribute("cd-diagnosis"),o=a.getAttribute("cd-webpap-id");r!==null&&(e.text=r,e.value=r,e.setAttribute("cd-webpap-name",s),e.setAttribute("cd-program",c),e.setAttribute("cd-diagnosis",i),e.setAttribute("cd-webpap-id",o),n.add(e))})}function _(n,t){if(t.length>9){n.innerHTML="";const r=document.createElement("option");r.text="Select Medication First",r.value="",n.add(r);return}n.removeAttribute("disabled"),n.classList.remove("disabled"),n.innerHTML="";const a=document.createElement("option");a.text="Select Medication First",a.value="",n.add(a);let e=!0;t.forEach(r=>{if(r.strength==="")return;e=!1;const s=document.createElement("option");s.text=r.strength,s.value=r.strength,s.setAttribute("cd-webpap-id",r.webpapId),n.add(s)}),e&&(n.setAttribute("disabled","true"),n.classList.add("disabled"),n.removeAttribute("required"))}(function(){window.AuthorizeNetIFrame||(window.AuthorizeNetIFrame={}),AuthorizeNetIFrame.onReceiveCommunication=function(t){var a=n(t);switch(a.action){case"resizeWindow":break;case"successfulSave":break;case"cancel":break;case"transactResponse":var e=JSON.parse(a.response);e.responseCode==="1"&&M()}};function n(t){for(var a=[],e=t.split("&"),r,s=0;s<e.length;s++)r=e[s].split("="),a.push(r[0]),a[r[0]]=unescape(r[1]);return a}})();let $="";async function Ee(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");$=(await a.json()).token,document.querySelector("input[name=token]").value=$}catch(a){console.log(a)}}const Ae={getHostedPaymentPageRequest:{merchantAuthentication:{name:"9QRrX47T4DkY",transactionKey:"5GN3E8m559X9pdSf"},transactionRequest:{transactionType:"authCaptureTransaction",amount:"200.00"},hostedPaymentSettings:{setting:[{settingName:"hostedPaymentReturnOptions",settingValue:'{"showReceipt": false, "url": "https://www.transparentpricerx.com", "urlText": "Continue", "cancelUrl": "https://www.transparentpricerx.com", "cancelUrlText": "Cancel"}'},{settingName:"hostedPaymentButtonOptions",settingValue:'{"text": "Pay"}'},{settingName:"hostedPaymentStyleOptions",settingValue:'{"bgColor": "blue"}'},{settingName:"hostedPaymentPaymentOptions",settingValue:'{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": true}'},{settingName:"hostedPaymentSecurityOptions",settingValue:'{"captcha": false}'},{settingName:"hostedPaymentShippingAddressOptions",settingValue:'{"show": false, "required": false}'},{settingName:"hostedPaymentBillingAddressOptions",settingValue:'{"show": true, "required": true}'},{settingName:"hostedPaymentCustomerOptions",settingValue:'{"showEmail": true, "requiredEmail": true, "addPaymentProfile": true}'},{settingName:"hostedPaymentOrderOptions",settingValue:'{"show": false, "merchantName": "TrasnaparentPrice RX"}'},{settingName:"hostedPaymentIFrameCommunicatorUrl",settingValue:'{"url": "https://www.transparentpricerx.com/communicator"}'}]}}};Ee("https://api.authorize.net/xml/v1/request.api",Ae);document.querySelector(".navbar-container").addEventListener("click",()=>{D()});
