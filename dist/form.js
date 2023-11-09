const k=["Anoro Ellipta","Biktarvy","Botox for migraines","Breo Ellipta","Cimzia","Cosentyx","Cosentyx (300 MG Dose)","Cosentyx Sensoready Pen","Creon","Eliquis","Emgality","Enbrel","EPCLUSA","Fasenra","HumaLOG","HumaLOG KwikPen","HumaLOG Mix 50/50","HumaLOG Mix 75/25","HumaLOG Mix 75/25 KwikPen","Humira","Humulin N (U 100 Injection)","Jardiance","Janumet","Janumet XR","Januvia","Lantus","Lovenox","Multaq","Ocrevus","Ozempic (0.25 or 0.5 MG Dose)","Ozempic (1 MG Dose)","Ozempic (2 MG Dose)","Prodigy AutoCode Blood Glucose Monitor","Prolia","Rexulti","Rinvoq","Rybelsus","Skyrizi","Skyrizi (150 MG Dose)","Stelara","Suboxone","Taltz","Tresiba","Tresiba FlexTouch","Trelegy Ellipta","Trintellix","Wegovy","Xarelto","Xeljanz","Xeljanz XR","Zubsolv"],l={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",email:"",marital:"",residency:"",employed:"",sex:"",disabled:"",numinhouse:"",EmerContactName:"",EmerContactPhone1:""},O={patwages:"",patdisab:"",patunemploy:""},d={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},b={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},M=document.querySelector('[cd="submit-data"]');let E=0,h="",T="";const _="https://www.medserviceswebpap.com/api/patient/createpatient",B="https://www.medserviceswebpap.com/api/physician/createphysician",F="https://www.medserviceswebpap.com/auth/token?hcpid=89",R={grant_type:"password",username:"apiuser",password:"123456"};async function V(n,t){const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()});if(!a.ok)throw new Error(a.statusText);return a.json()}async function q(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");const e=await a.json();t.id=e.Id,console.log(t)}catch(a){console.log(a)}}async function G(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");E=(await a.json()).Id}catch(a){console.log(a)}}async function j(n,t){try{if(!(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(t)})).ok)throw new Error("Network response was not ok")}catch(a){console.log(a)}}async function H(n,t){let a;t==="private"?a={privateins:"true"}:a={none:"true"};try{if(!(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(a)})).ok)throw new Error("Network response was not ok")}catch(e){console.log(e)}}async function U(n){try{const t=await fetch(n,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`}});if(!t.ok)throw new Error("Network response was not ok");let a=await t.json();return console.log(a),a}catch(t){console.log(t)}}async function J(n){try{const t=await fetch("https://www.medserviceswebpap.com/api/paporders/additem",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(n)});if(!t.ok)throw new Error("Network response was not ok");let a=await t.json();return console.log(a),a}catch(t){console.log(t)}}let v={CustomerId:"",OrderItems:[]};async function $(){function n(a){let e={ddi:"",name:"",program:"",pharmcoid:"6825",pharmco:"Rx Outreach",physicianid:"",qty:"90",sig:"",diagnosis:""};a.querySelectorAll(".input-field").forEach(r=>{if(r.name.includes("med-name")){let c="";r.querySelectorAll("option").forEach(i=>{i.value===r.value&&(c=i.getAttribute("cd-webpap-name"),e.program=i.getAttribute("cd-program"),i.getAttribute("cd-program")==="GSK Patient Assistance Program"?(e.pharmco="GlaxoSmithKline",e.pharmcoid="5331"):i.getAttribute("cd-program")==="myAbbvie Assist for Humira"?(e.pharmco="AbbVie Inc.",e.pharmcoid="203"):i.getAttribute("cd-program")==="Dupixent MyWay Program Allergists (AD, Asthma, CRSwNP)"?(e.pharmco="Sanofi and Regeneron Pharmaceuticals, Inc",e.pharmcoid="7461"):i.getAttribute("cd-program")==="Zubsolv Patient Assistance Program"?(e.pharmco="Orexo US, Inc",e.pharmcoid="7018"):i.getAttribute("cd-program")==="Otsuka PAP-Rexulti"?(e.pharmco="Otsuka Patient Assistance Foundation, Inc.",e.pharmcoid="7084"):i.getAttribute("cd-program")==="Amgen Enbrel"?(e.pharmco="Amgen, Inc.",e.pharmcoid="7541"):i.getAttribute("cd-program")==="Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)"?(e.pharmco="Bristol-Myers Squibb Company",e.pharmcoid="37"):i.getAttribute("cd-program")==="Help at Hand Patient Assistance Program"?(e.pharmco="Takeda Pharmaceuticals",e.pharmcoid="221"):i.getAttribute("cd-program")==="Sanofi Patient Connection"?(e.pharmco="Sanofi",e.pharmcoid="90"):i.getAttribute("cd-program")==="BI Cares Patient Assistance Program"?(e.pharmco="Boehringer Ingelheim CARES Foundation, Inc.",e.pharmcoid="36"):i.getAttribute("cd-program")==="Patient Assistance Program"?(e.pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",e.pharmcoid="5091"):i.getAttribute("cd-program")==="Xelsource : Xeljanz"?(e.pharmco="Pfizer, Inc.",e.pharmcoid="7145"):i.getAttribute("cd-program")==="Pzifer Dermatology Patient Access"?(e.pharmco="Pfizer, Inc.",e.pharmcoid="7342"):i.getAttribute("cd-program")==="MyAbbvie Assist for Botox"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7538"):i.getAttribute("cd-program")==="myAbbVie Assist for Skyrizi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7122"):i.getAttribute("cd-program")==="myAbbVie Assist for Creon, Linzess, Viberzi"?(e.pharmco="AbbVie Inc.",e.pharmcoid="6910"):i.getAttribute("cd-program")==="myAbbVie Assist for Rinvoq"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7141"):i.getAttribute("cd-program")==="UCBCares Program"?(e.pharmco="UCB, Inc.",e.pharmcoid="7081"):i.getAttribute("cd-program")==="Novartis Patient Assistance Foundation, Inc. (NPAF)"?(e.pharmco="Novartis Pharmaceuticals Corporation",e.pharmcoid="56"):i.getAttribute("cd-program")==="Novo Nordisk Patient Assistance Program"?(e.pharmco="Novo Nordisk",e.pharmcoid="6993"):i.getAttribute("cd-program")==="Dexcom Patient Assistance Program"?(e.pharmco="Dexcom, Inc.",e.pharmcoid="7535"):i.getAttribute("cd-program")==="Genentech Patient Foundation"?(e.pharmco="Genentech USA, Inc.",e.pharmcoid="7123"):i.getAttribute("cd-program")==="Wegovy Savings Card"?(e.pharmco="Novo Nordisk",e.pharmcoid="7539"):i.getAttribute("cd-program")==="Amgen Safety Net Foundation (ASNF)"?(e.pharmco="Amgen, Inc",e.pharmcoid="7078"):i.getAttribute("cd-program")==="Support Path Patient Assistance Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="6969"):i.getAttribute("cd-program")==="Advancing Access Program"?(e.pharmco="Gilead Sciences, Inc.",e.pharmcoid="46"):i.getAttribute("cd-program")==="myAbbVie Assist Patient Assistance Program"?(e.pharmco="AbbVie Inc.",e.pharmcoid="7208"):i.getAttribute("cd-program")==="Lilly Cares Foundation Patient Assistance Program"?(e.pharmco="Lilly USA, LLC.",e.pharmcoid="52"):i.getAttribute("cd-program")==="AZ&Me Prescription Savings Program for people without insurance"?(e.pharmco="Astrazeneca Pharmaceuticals",e.pharmcoid="31"):i.getAttribute("cd-program")==="Merck Patient Assistance Program, Inc."&&(e.pharmco="Merck Patient Assistance Program, Inc.",e.pharmcoid="172"),e.diagnosis=i.getAttribute("cd-diagnosis"),e.ddi===""&&(e.ddi=i.getAttribute("cd-webpap-id")))}),e.name=c}else if(r.name.includes("med-strength")){let c="";r.querySelectorAll("option").forEach(i=>{i.innerHTML===r.value&&(c=i.getAttribute("cd-webpap-id"))}),c!==""&&(e.ddi=c)}else r.name.includes("Frequency")?e.sig=r.value:r.name.includes("Doctor")&&(e.physicianid=r.value)}),v.OrderItems.push(e)}document.querySelectorAll('[cd="med"]').forEach(a=>{a.querySelector(".select-doc").value!==""&&n(a)})}M.addEventListener("click",()=>{z()});async function z(){patientAddress&&patientAddress.forEach(t=>{switch(t.types[0]){case"street_number":{l.address=`${t.long_name} `;break}case"route":{l.address+=t.short_name;break}case"locality":l.city=t.long_name;break;case"administrative_area_level_1":{l.state=t.short_name;break}}}),doctorAddress&&doctorAddress.forEach(t=>{switch(t.types[0]){case"street_number":{d.address=`${t.long_name} `;break}case"route":{d.address+=t.short_name;break}case"locality":d.city=t.long_name;break;case"administrative_area_level_1":{d.state=t.short_name;break}}}),doctor2Address&&doctor2Address.forEach(t=>{switch(t.types[0]){case"street_number":{b.address=`${t.long_name} `;break}case"route":{b.address+=t.short_name;break}case"locality":b.city=t.long_name;break;case"administrative_area_level_1":{b.state=t.short_name;break}}});const n=[];document.querySelectorAll(".input-field").forEach(t=>{let a=t.id,e=t.value;(a.includes("phone")||a.includes("fax"))&&(e=e.replace(/\D/g,"")),n.push({field:a,value:e})}),document.querySelectorAll("input[type=radio]:checked").forEach(t=>{let a=t.name,e=t.id;n.push({field:a,value:e})}),n.forEach(t=>{if(t.field==="insurance-field"){T=t.value;return}if(t.field==="patwages"){O[t.field]=t.value.slice(1);return}if(t.field.includes("doc-")){let a=t.field.split("-")[1];d[a]=t.value;return}if(t.field.includes("doc2-")){let a=t.field.split("-")[1];b[a]=t.value;return}if(t.field==="month"){l.dob=`${t.value}`;return}if(t.field==="day"||t.field==="year"){l.dob=`${l.dob}/${t.value}`;return}if(t.field==="residency"||t.field==="disabled"){l[t.field]=t.value==="Yes"?"true":"false";return}if(t.field==="ssn"){l[t.field]=t.value.replace(/-/g,"");return}l[t.field]=t.value}),await X().then(()=>{window.location.replace("https://www.transparentpricerx.com/thank-you")})}async function X(){return new Promise(async(n,t)=>{try{await V(F,R).then(a=>{h=a.access_token}).then(async()=>{await G(_,l);let a=`https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${E}`;await j(a,O),v.CustomerId=`${E}`;let e=`https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${E}`;await H(e,T),await q(B,d),document.getElementById("doc2-fname").value!==""&&await q(B,b),await $(),await Promise.all(v.OrderItems.map(async s=>{console.log(s.pharmco),await U(`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${d.fname}&lname=${d.lname}`),s.physicianid.includes(d.fname)&&s.physicianid.includes(d.lname)&&(s.physicianid=d.id)})).then(()=>{console.log(v)}),await J(v)}),n()}catch(a){t(a)}})}function W(){const n=document.getElementById("segment-field");for(let t=1;t<5;t++){const e=document.getElementById(`med-name-${t}`).value;if(e==="")return;if(e!==k.find(s=>s===e)){if(n.value==="Brand"){n.value="Both";return}n.value="Generic";return}else{if(n.value==="Generic"){n.value="Both";return}n.value="Brand"}}}const D=document.getElementById("year"),K=105;for(let n=K;n>0;n--){const t=document.createElement("option");t.text=`${n+1900}`,t.value=`${n+1900}`,D.add(t)}function Z(n,t,a,e){let s=0;t.style.display="none";const r=n.length;n.forEach((c,i)=>{i!==s&&(c.style.display="none")}),t.addEventListener("click",()=>{s>0&&(n[s].style.display="none",s--,n[s].style.display="block"),e.forEach((c,i)=>{i!==s?c.classList.remove("current"):c.classList.add("current")}),s===0?t.style.display="none":t.style.display="block",s===3&&(a.innerHTML="Continue")}),a.addEventListener("click",()=>{const c=n[s].querySelectorAll("input"),i=n[s].querySelectorAll("select");if(te(c,i,s))if(s===3){W(),document.querySelector(".payment-trigger").click(),document.querySelector(".submit-btn").click();return}else s<r-1&&(n[s].style.display="none",s++,n[s].style.display="block"),e.forEach((o,u)=>{u!==s?o.classList.remove("current"):o.classList.add("current")}),s===0?t.style.display="none":t.style.display="block",s===3&&(a.innerHTML="Continue To Payment")})}const Q=document.querySelectorAll("[cd-form = step]"),Y=document.querySelector("[cd-form = button-back]"),ee=document.querySelector("[cd-form = button-next]"),I=document.querySelectorAll("[cd-form=progress-indicator]");Z(Q,Y,ee,I);function te(n,t,a){let e=!0;n.forEach(o=>{o.required&&(o.value===""?(e=!1,o.nextElementSibling.classList.add("active")):o.nextElementSibling.classList.remove("active"))}),t.forEach(o=>{o.required&&(o.value===""?(e=!1,o.nextElementSibling.classList.add("active")):o.nextElementSibling.classList.remove("active"))});const s=document.querySelectorAll("input[name=sex]:checked"),r=document.querySelectorAll("input[name=residency]:checked"),c=document.querySelectorAll("input[name=disabled]:checked");if(s.length===0?(document.getElementById("sex-radio-error").classList.add("active"),e=!1):document.getElementById("sex-radio-error").classList.remove("active"),r.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),e=!1):document.getElementById("citizen-radio-error").classList.remove("active"),c.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),e=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(e=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),a===1){const o=document.getElementById("email");if(!o.required)return;/\S+@\S+\.\S+/.test(o.value)?o.nextElementSibling.classList.remove("active"):(e=!1,o.nextElementSibling.classList.add("active"));const m=document.getElementById("dayphone"),f=document.getElementById("EmerContactPhone");m.value.length!==16?(e=!1,m.nextElementSibling.classList.add("active")):m.nextElementSibling.classList.remove("active"),f.value.length!==16?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active");const g=document.getElementById("zip");g.value.length!==5?(e=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active");const p=document.getElementById("patientAddress");P(p.value)===!1?(e=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")}if(a===2){const o=document.getElementById("doc-email"),u=document.getElementById("doc2-email-2");if(!o.required)return;Number(D.value)<=1958&&(k.forEach(y=>{console.log(y),document.querySelector(`[cd-drug-box="${y}"]`).remove()}),document.querySelector(".generic-only").style.display="block");for(let y=1;y<5;y++)ye(document.getElementById(`med-name-${y}`));const m=/\S+@\S+\.\S+/;m.test(o.value)?o.nextElementSibling.classList.remove("active"):(e=!1,o.nextElementSibling.classList.add("active")),u.value!==""?m.test(u.value)||(e=!1,u.nextElementSibling.classList.add("active")):u.nextElementSibling.classList.remove("active");const f=document.getElementById("doc-officephone-2"),g=document.getElementById("doc-fax"),p=document.getElementById("doc2-officephone-2"),A=document.getElementById("doc2-fax-2");f.value.length!==16?(e=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),g.value.length!==16?(e=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active"),p.value!==""&&(p.value.length!==16?(e=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")),A.value!==""&&(A.value.length!==16?(e=!1,A.nextElementSibling.classList.add("active")):A.nextElementSibling.classList.remove("active"));const L=document.getElementById("doctorAddress");P(L.value)===!1?(e=!1,L.nextElementSibling.classList.add("active")):L.nextElementSibling.classList.remove("active");const w=document.getElementById("doctor2Address");w.value!==""&&(P(w.value)===!1?(e=!1,w.nextElementSibling.classList.add("active")):w.nextElementSibling.classList.remove("active"));const x=document.getElementById("doc-zip-2"),S=document.getElementById("doc2-zip-2");x.value.length!==5?(e=!1,x.nextElementSibling.classList.add("active")):x.nextElementSibling.classList.remove("active"),S.value!==""&&(S.value.length!==5?(e=!1,S.nextElementSibling.classList.add("active")):S.nextElementSibling.classList.remove("active"))}return e}const ne=document.querySelectorAll(".phone-field");function ae(n){n.addEventListener("input",function(){this.value=this.value.replace(/\D/g,"");const t=this.value.replace(/\D/g,"").substring(0,10),a=t.substring(0,3),e=t.substring(3,6),s=t.substring(6,10);t.length>6?this.value=`(${a}) ${e} - ${s}`:t.length>3?this.value=`(${a}) ${e}`:t.length>0&&(this.value=`(${a}`)})}ne.forEach(n=>{ae(n)});const se=document.querySelectorAll('input[placeholder="Zip code"]');se.forEach(n=>{n.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function ie(n){return n.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(e,s,r,c)=>c?`${s}-${r}-${c}`:r?`${s}-${r}`:s)}const re=document.getElementById("ssn");re.addEventListener("input",function(){this.value=ie(this.value)});function P(n){return/^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/.test(n)}const oe=document.querySelector(".money-field");oe.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+this.value)});const C=document.querySelector(".progress-bar-c"),ce=document.querySelector(".progress-bar"),le={attributes:!0};function de(n){n.forEach(function(t){if(t.type==="attributes"&&t.attributeName==="class"){let a=Array.from(I).findIndex(e=>e.classList.contains("current"));ce.style.width=`${(a+1)/I.length*100}%`,window.innerWidth<768&&(a===2?C.style.transform=`translateX(-${516-window.innerWidth}px)`:a<2&&(C.style.transform="translateX(0px)"))}})}let ue=new MutationObserver(de);I.forEach(n=>{ue.observe(n,le)});const me=document.querySelectorAll(".doc-content-c-tab"),pe=document.querySelectorAll(".doc-content-w"),fe=document.querySelectorAll(".tab-minus-icon"),ge=document.querySelectorAll(".tab-plus-icon");me.forEach(n=>{n.addEventListener("click",()=>{pe.forEach(t=>{t.classList.remove("active"),t.parentElement===n&&t.classList.add("active")}),fe.forEach(t=>{t.classList.remove("active"),n.querySelector(".tab-minus-icon")===t&&t.classList.add("active")}),ge.forEach(t=>{t.classList.remove("active"),n.querySelector(".tab-plus-icon")!==t&&t.classList.add("active")})})});function he(n){if(n==="")return!1;n===k.find(t=>t===n)?(document.getElementById("insurance-row").classList.remove("hidden"),document.getElementById("insurance-field").required=!0,document.getElementById("brand-note").classList.remove("hidden")):(document.getElementById("insurance-row").classList.add("hidden"),document.getElementById("insurance-field").required=!1,document.getElementById("brand-note").classList.add("hidden"))}for(let n=1;n<5;n++){const t=document.getElementById(`med-name-${n}`),a=document.getElementById(`med-strength-${n}`);t.addEventListener("change",e=>{var o;n!==1&&(t.value!==""?(document.getElementById(`med-strength-${n}`).required=!0,document.getElementById(`choose-doctor-${n}`).required=!0):(document.getElementById(`med-strength-${n}`).required=!1,document.getElementById(`choose-doctor-${n}`).required=!1)),a.innerHTML="";const s=e.target.value.toLocaleLowerCase().replace(/[\(\)\/.]/g,"").split(" ").join("-"),r=(o=document.querySelector(`[cd-name=${s}]`))==null?void 0:o.parentElement,c=r==null?void 0:r.querySelectorAll("[cd=strength]"),i=[];c==null||c.forEach(u=>{const m={strength:u.textContent,webpapId:u.getAttribute("cd-webpap-id")};m.strength!==null&&i.push(m)}),be(a,i),he(e.target.value)})}function ye(n){document.querySelectorAll("[cd=drug]").forEach(a=>{const e=document.createElement("option"),s=a.textContent,r=a.getAttribute("cd-webpap-name"),c=a.getAttribute("cd-program"),i=a.getAttribute("cd-diagnosis"),o=a.getAttribute("cd-webpap-id");s!==null&&(e.text=s,e.value=s,e.setAttribute("cd-webpap-name",r),e.setAttribute("cd-program",c),e.setAttribute("cd-diagnosis",i),e.setAttribute("cd-webpap-id",o),n.add(e))})}function be(n,t){if(t.length>9){n.innerHTML="";const s=document.createElement("option");s.text="Select Medication First",s.value="",n.add(s);return}n.removeAttribute("disabled"),n.classList.remove("disabled"),n.innerHTML="";const a=document.createElement("option");a.text="Select Medication First",a.value="",n.add(a);let e=!0;t.forEach(s=>{if(s.strength==="")return;e=!1;const r=document.createElement("option");r.text=s.strength,r.value=s.strength,r.setAttribute("cd-webpap-id",s.webpapId),n.add(r)}),e&&(n.setAttribute("disabled","true"),n.classList.add("disabled"),n.removeAttribute("required"))}(function(){window.AuthorizeNetIFrame||(window.AuthorizeNetIFrame={}),AuthorizeNetIFrame.onReceiveCommunication=function(t){var a=n(t);switch(a.action){case"resizeWindow":break;case"successfulSave":break;case"cancel":break;case"transactResponse":var e=JSON.parse(a.response);e.responseCode==="1"?z():console.log(e)}};function n(t){for(var a=[],e=t.split("&"),s,r=0;r<e.length;r++)s=e[r].split("="),a.push(s[0]),a[s[0]]=unescape(s[1]);return a}})();let N="";async function ve(n,t){try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");N=(await a.json()).token,document.querySelector("input[name=token]").value=N}catch(a){console.log(a)}}const Ae={getHostedPaymentPageRequest:{merchantAuthentication:{name:"9QRrX47T4DkY",transactionKey:"5GN3E8m559X9pdSf"},transactionRequest:{transactionType:"authCaptureTransaction",amount:"200.00"},hostedPaymentSettings:{setting:[{settingName:"hostedPaymentReturnOptions",settingValue:'{"showReceipt": false, "url": "https://www.transparentpricerx.com", "urlText": "Continue", "cancelUrl": "https://www.transparentpricerx.com", "cancelUrlText": "Cancel"}'},{settingName:"hostedPaymentButtonOptions",settingValue:'{"text": "Pay"}'},{settingName:"hostedPaymentStyleOptions",settingValue:'{"bgColor": "blue"}'},{settingName:"hostedPaymentPaymentOptions",settingValue:'{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": true}'},{settingName:"hostedPaymentSecurityOptions",settingValue:'{"captcha": false}'},{settingName:"hostedPaymentShippingAddressOptions",settingValue:'{"show": false, "required": false}'},{settingName:"hostedPaymentBillingAddressOptions",settingValue:'{"show": true, "required": true}'},{settingName:"hostedPaymentCustomerOptions",settingValue:'{"showEmail": true, "requiredEmail": true, "addPaymentProfile": true}'},{settingName:"hostedPaymentOrderOptions",settingValue:'{"show": false, "merchantName": "TrasnaparentPrice RX"}'},{settingName:"hostedPaymentIFrameCommunicatorUrl",settingValue:'{"url": "https://www.transparentpricerx.com/communicator"}'}]}}};ve("https://api.authorize.net/xml/v1/request.api",Ae);document.querySelector(".navbar-container").addEventListener("click",()=>{$()});
