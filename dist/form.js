const C=["Enbrel","Vyvanse","Humira","Breo Ellipta","Trelegy","Ellipta","Xarelto","Wegovy","Ozempic","Skyrizi","HumaLOG","Dexcom","Xeljanz","Rybelsus","OCREVUS","Botox for migraines","Cosentyx","Jardiance","Multaq","Januvia","Suboxone","Janumet","Fasenra","Emgality","Qulipta","Prolia","Ribavirin","Sofosbuvir/velpatasvir EPCLUSA","Tresiba","Trintellix","Eliquis"],u={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",email:"",marital:"",residency:"",employed:"",sex:"",disabled:"",numinhouse:"",EmerContactName:"",EmerContactPhone1:""},O={patwages:"",patdisab:"",patunemploy:""},m={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},y={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:"",id:""},M=document.querySelector('[cd="submit-data"]');let x=0,g="",N="";const R="https://www.medserviceswebpap.com/api/patient/createpatient",k="https://www.medserviceswebpap.com/api/physician/createphysician",j="https://www.medserviceswebpap.com/auth/token?hcpid=89",F={grant_type:"password",username:"apiuser",password:"123456"};async function H(t,e){const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()});if(!n.ok)throw new Error(n.statusText);return n.json()}async function B(t,e){try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(e)});if(!n.ok)throw new Error("Network response was not ok");const s=await n.json();e.id=s.Id,console.log(e)}catch(n){Sentry.captureException(n),console.log(n)}}async function V(t,e){try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(e)});if(!n.ok)throw new Error("Network response was not ok");x=(await n.json()).Id}catch(n){Sentry.captureException(n),console.log(n)}}async function J(t,e){try{if(!(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(e)})).ok)throw new Error("Network response was not ok")}catch(n){Sentry.captureException(n),console.log(n)}}async function U(t,e){let n;e==="private"?n={privateins:"true"}:n={none:"true"};try{if(!(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(n)})).ok)throw new Error("Network response was not ok")}catch(s){Sentry.captureException(s),console.log(s)}}async function X(t){try{const e=await fetch(t,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`}});if(!e.ok)throw new Error("Network response was not ok");let n=await e.json();return console.log(n),n}catch(e){Sentry.captureException(e),console.log(e)}}async function G(t){try{const e=await fetch("https://www.medserviceswebpap.com/api/paporders/additem",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify(t)});if(!e.ok)throw new Error("Network response was not ok");let n=await e.json();return console.log(n),n}catch(e){Sentry.captureException(e),console.log(e)}}let b={CustomerId:"",OrderItems:[]};async function D(){function t(n){let s={ddi:"",name:"",program:"",pharmcoid:"6825",pharmco:"Rx Outreach",physicianid:"",qty:"90",sig:"",diagnosis:""};n.querySelectorAll(".input-field").forEach(i=>{if(i.name.includes("med-name")){let o="";i.querySelectorAll("option").forEach(c=>{c.value===i.value&&(o=c.getAttribute("cd-webpap-name"),s.program=c.getAttribute("cd-program"),c.getAttribute("cd-program")==="GSK Patient Assistance Program"?(s.pharmco="GlaxoSmithKline",s.pharmcoid="5331"):c.getAttribute("cd-program")==="myAbbvie Assist for Humira"?(s.pharmco="AbbVie Inc.",s.pharmcoid="203"):c.getAttribute("cd-program")==="Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)"?(s.pharmco="Bristol-Myers Squibb Company",s.pharmcoid="37"):c.getAttribute("cd-program")==="Help at Hand Patient Assistance Program"?(s.pharmco="Takeda Pharmaceuticals",s.pharmcoid="221"):c.getAttribute("cd-program")==="Sanofi Patient Connection"&&(s.pharmco="Sanofi",s.pharmcoid="90"),s.diagnosis=c.getAttribute("cd-diagnosis"),s.ddi===""&&(s.ddi=c.getAttribute("cd-webpap-id")))}),s.name=o}else if(i.name.includes("med-strength")){let o="";i.querySelectorAll("option").forEach(c=>{c.innerHTML===i.value&&(o=c.getAttribute("cd-webpap-id"))}),o!==""&&(s.ddi=o)}else i.name.includes("Frequency")?s.sig=i.value:i.name.includes("Doctor")&&(s.physicianid=i.value)}),b.OrderItems.push(s)}document.querySelectorAll('[cd="med"]').forEach(n=>{n.querySelector(".select-doc").value!==""&&t(n)})}M.addEventListener("click",()=>{z()});async function z(){patientAddress&&patientAddress.forEach(e=>{switch(e.types[0]){case"street_number":{u.address=`${e.long_name} `;break}case"route":{u.address+=e.short_name;break}case"locality":u.city=e.long_name;break;case"administrative_area_level_1":{u.state=e.short_name;break}}}),doctorAddress&&doctorAddress.forEach(e=>{switch(e.types[0]){case"street_number":{m.address=`${e.long_name} `;break}case"route":{m.address+=e.short_name;break}case"locality":m.city=e.long_name;break;case"administrative_area_level_1":{m.state=e.short_name;break}}}),doctor2Address&&doctor2Address.forEach(e=>{switch(e.types[0]){case"street_number":{y.address=`${e.long_name} `;break}case"route":{y.address+=e.short_name;break}case"locality":y.city=e.long_name;break;case"administrative_area_level_1":{y.state=e.short_name;break}}});const t=[];document.querySelectorAll(".input-field").forEach(e=>{let n=e.id,s=e.value;(n.includes("phone")||n.includes("fax"))&&(s=s.replace(/\D/g,"")),t.push({field:n,value:s})}),document.querySelectorAll("input[type=radio]:checked").forEach(e=>{let n=e.name,s=e.id;t.push({field:n,value:s})}),t.forEach(e=>{if(e.field==="insurance-field"){N=e.value;return}if(e.field==="patwages"){O[e.field]=e.value.slice(1);return}if(e.field.includes("doc-")){let n=e.field.split("-")[1];m[n]=e.value;return}if(e.field.includes("doc2-")){let n=e.field.split("-")[1];y[n]=e.value;return}if(e.field==="month"){u.dob=`${e.value}`;return}if(e.field==="day"||e.field==="year"){u.dob=`${u.dob}/${e.value}`;return}if(e.field==="residency"||e.field==="disabled"){u[e.field]=e.value==="Yes"?"true":"false";return}if(e.field==="ssn"){u[e.field]=e.value.replace(/-/g,"");return}u[e.field]=e.value}),await W().then(()=>{window.location.replace("https://www.transparentpricerx.com/thank-you")})}async function W(){return new Promise(async(t,e)=>{try{await H(j,F).then(n=>{g=n.access_token}).then(async()=>{await V(R,u);let n=`https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${x}`;await J(n,O),b.CustomerId=`${x}`;let s=`https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${x}`;await U(s,N),await B(k,m),document.getElementById("doc2-fname").value!==""&&await B(k,y),await D(),await Promise.all(b.OrderItems.map(async a=>{console.log(a.pharmco),await X(`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${m.fname}&lname=${m.lname}`),a.physicianid.includes(m.fname)&&a.physicianid.includes(m.lname)&&(a.physicianid=m.id)})).then(()=>{console.log(b)}),await G(b)}),t()}catch(n){e(n)}})}function K(){const t=document.getElementById("segment-field");for(let e=1;e<4;e++){const s=document.getElementById(`med-name-${e}`).value;if(s==="")return;if(s!==C.find(a=>a===s)){if(t.value==="Brand"){t.value="Both";return}t.value="Generic";return}else{if(t.value==="Generic"){t.value="Both";return}t.value="Brand"}}}const Q=document.getElementById("year"),Y=105;for(let t=Y;t>0;t--){const e=document.createElement("option");e.text=`${t+1900}`,e.value=`${t+1900}`,Q.add(e)}function Z(t,e,n,s){let a=0;e.style.display="none";const i=t.length;t.forEach((o,c)=>{c!==a&&(o.style.display="none")}),e.addEventListener("click",()=>{a>0&&(t[a].style.display="none",a--,t[a].style.display="block"),s.forEach((o,c)=>{c!==a?o.classList.remove("current"):o.classList.add("current")}),a===0?e.style.display="none":e.style.display="block",a===3&&(n.innerHTML="Continue")}),n.addEventListener("click",()=>{const o=t[a].querySelectorAll("input"),c=t[a].querySelectorAll("select");if(se(o,c,a))if(a===3){K(),document.querySelector(".payment-trigger").click(),document.querySelector(".submit-btn").click();return}else a<i-1&&(t[a].style.display="none",a++,t[a].style.display="block"),s.forEach((r,l)=>{l!==a?r.classList.remove("current"):r.classList.add("current")}),a===0?e.style.display="none":e.style.display="block",a===3&&(n.innerHTML="Continue To Payment")})}const ee=document.querySelectorAll("[cd-form = step]"),te=document.querySelector("[cd-form = button-back]"),ne=document.querySelector("[cd-form = button-next]"),A=document.querySelectorAll("[cd-form=progress-indicator]");Z(ee,te,ne,A);function se(t,e,n){let s=!0;t.forEach(r=>{r.required&&(r.value===""?(s=!1,r.nextElementSibling.classList.add("active")):r.nextElementSibling.classList.remove("active"))}),e.forEach(r=>{r.required&&(r.value===""?(s=!1,r.nextElementSibling.classList.add("active")):r.nextElementSibling.classList.remove("active"))});const a=document.querySelectorAll("input[name=sex]:checked"),i=document.querySelectorAll("input[name=residency]:checked"),o=document.querySelectorAll("input[name=disabled]:checked");if(a.length===0?(document.getElementById("sex-radio-error").classList.add("active"),s=!1):document.getElementById("sex-radio-error").classList.remove("active"),i.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),s=!1):document.getElementById("citizen-radio-error").classList.remove("active"),o.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),s=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(s=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),n===1){const r=document.getElementById("email");if(!r.required)return;/\S+@\S+\.\S+/.test(r.value)?r.nextElementSibling.classList.remove("active"):(s=!1,r.nextElementSibling.classList.add("active"));const d=document.getElementById("dayphone"),f=document.getElementById("EmerContactPhone");d.value.length!==16?(s=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active"),f.value.length!==16?(s=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active");const h=document.getElementById("zip");h.value.length!==5?(s=!1,h.nextElementSibling.classList.add("active")):h.nextElementSibling.classList.remove("active");const p=document.getElementById("patientAddress");q(p.value)===!1?(s=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")}if(n===2){const r=document.getElementById("doc-email"),l=document.getElementById("doc2-email-2");if(!r.required)return;const d=/\S+@\S+\.\S+/;d.test(r.value)?r.nextElementSibling.classList.remove("active"):(s=!1,r.nextElementSibling.classList.add("active")),l.value!==""?d.test(l.value)||(s=!1,l.nextElementSibling.classList.add("active")):l.nextElementSibling.classList.remove("active");const f=document.getElementById("doc-officephone-2"),h=document.getElementById("doc-fax"),p=document.getElementById("doc2-officephone-2"),w=document.getElementById("doc2-fax-2");f.value.length!==16?(s=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),h.value.length!==16?(s=!1,h.nextElementSibling.classList.add("active")):h.nextElementSibling.classList.remove("active"),p.value!==""&&(p.value.length!==16?(s=!1,p.nextElementSibling.classList.add("active")):p.nextElementSibling.classList.remove("active")),w.value!==""&&(w.value.length!==16?(s=!1,w.nextElementSibling.classList.add("active")):w.nextElementSibling.classList.remove("active"));const L=document.getElementById("doctorAddress");q(L.value)===!1?(s=!1,L.nextElementSibling.classList.add("active")):L.nextElementSibling.classList.remove("active");const E=document.getElementById("doctor2Address");E.value!==""&&(q(E.value)===!1?(s=!1,E.nextElementSibling.classList.add("active")):E.nextElementSibling.classList.remove("active"));const I=document.getElementById("doc-zip-2"),S=document.getElementById("doc2-zip-2");I.value.length!==5?(s=!1,I.nextElementSibling.classList.add("active")):I.nextElementSibling.classList.remove("active"),S.value!==""&&(S.value.length!==5?(s=!1,S.nextElementSibling.classList.add("active")):S.nextElementSibling.classList.remove("active"))}return s}const ae=document.querySelectorAll(".phone-field");function ie(t){t.addEventListener("input",function(){this.value=this.value.replace(/\D/g,"");const e=this.value.replace(/\D/g,"").substring(0,10),n=e.substring(0,3),s=e.substring(3,6),a=e.substring(6,10);e.length>6?this.value=`(${n}) ${s} - ${a}`:e.length>3?this.value=`(${n}) ${s}`:e.length>0&&(this.value=`(${n}`)})}ae.forEach(t=>{ie(t)});const re=document.querySelectorAll('input[placeholder="Zip code"]');re.forEach(t=>{t.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function oe(t){return t.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(s,a,i,o)=>o?`${a}-${i}-${o}`:i?`${a}-${i}`:a)}const ce=document.getElementById("ssn");ce.addEventListener("input",function(){this.value=oe(this.value)});function q(t){return/^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/.test(t)}const le=document.querySelector(".money-field");le.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+this.value)});const $=document.querySelector(".progress-bar-c"),de=document.querySelector(".progress-bar"),ue={attributes:!0};function me(t){t.forEach(function(e){if(e.type==="attributes"&&e.attributeName==="class"){let n=Array.from(A).findIndex(s=>s.classList.contains("current"));de.style.width=`${(n+1)/A.length*100}%`,window.innerWidth<768&&(n===2?$.style.transform=`translateX(-${516-window.innerWidth}px)`:n<2&&($.style.transform="translateX(0px)"))}})}let pe=new MutationObserver(me);A.forEach(t=>{pe.observe(t,ue)});const fe=document.querySelectorAll(".doc-content-c-tab"),he=document.querySelectorAll(".doc-content-w"),ge=document.querySelectorAll(".tab-minus-icon"),ye=document.querySelectorAll(".tab-plus-icon");fe.forEach(t=>{t.addEventListener("click",()=>{he.forEach(e=>{e.classList.remove("active"),e.parentElement===t&&e.classList.add("active")}),ge.forEach(e=>{e.classList.remove("active"),t.querySelector(".tab-minus-icon")===e&&e.classList.add("active")}),ye.forEach(e=>{e.classList.remove("active"),t.querySelector(".tab-plus-icon")!==e&&e.classList.add("active")})})});const v=document.getElementById("medicationStep"),ve=v==null?void 0:v.querySelector(".form-row-wrapper"),T=document.getElementById("addMed");T.addEventListener("click",()=>{var e,n;const t=ve.cloneNode(!0);v.insertBefore(t,T.parentElement),(e=t.querySelector(".flex-grow:nth-child(1) > select"))==null||e.removeAttribute("required"),(n=t.querySelector(".flex-grow:nth-child(4) > input"))==null||n.removeAttribute("required"),t.querySelector(".flex-grow:nth-child(4) > input").value="",t.querySelector(".flex-grow:nth-child(2) > select").id=`med-name-${v.childElementCount-1}`,t.querySelector(".flex-grow:nth-child(2) > select").value="",t.querySelector(".flex-grow:nth-child(3) > select").id=`med-strength-${v.childElementCount-1}`,t.querySelector(".flex-grow:nth-child(2) > select").addEventListener("change",s=>{var r;t.querySelector(".flex-grow:nth-child(3) > select").innerHTML="";const a=s.target.value.toLocaleLowerCase().split(" ").join("-"),i=(r=document.querySelector(`[cd-name=${a}]`))==null?void 0:r.parentElement,o=i==null?void 0:i.querySelectorAll("[cd=strength]"),c=[];o==null||o.forEach(l=>{const d={strength:l.textContent,webpapId:l.getAttribute("cd-webpap-id")};d.strength!==null&&c.push(d)}),_(t.querySelector(".flex-grow:nth-child(3) > select"),c)})});function be(t){if(t==="")return!1;t===C.find(e=>e===t)?(document.getElementById("insurance-row").classList.remove("hidden"),document.getElementById("insurance-field").required=!0,document.getElementById("brand-note").classList.remove("hidden")):(document.getElementById("insurance-row").classList.add("hidden"),document.getElementById("insurance-field").required=!1,document.getElementById("brand-note").classList.add("hidden"))}for(let t=1;t<4;t++){const e=document.getElementById(`med-name-${t}`),n=document.getElementById(`med-strength-${t}`);e.addEventListener("change",s=>{var r;t!==1&&(e.value!==""?(document.getElementById(`med-strength-${t}`).required=!0,document.getElementById(`choose-doctor-${t}`).required=!0):(document.getElementById(`med-strength-${t}`).required=!1,document.getElementById(`choose-doctor-${t}`).required=!1)),n.innerHTML="";const a=s.target.value.toLocaleLowerCase().replace(/[\(\)\/.]/g,"").split(" ").join("-"),i=(r=document.querySelector(`[cd-name=${a}]`))==null?void 0:r.parentElement,o=i==null?void 0:i.querySelectorAll("[cd=strength]"),c=[];o==null||o.forEach(l=>{const d={strength:l.textContent,webpapId:l.getAttribute("cd-webpap-id")};d.strength!==null&&c.push(d)}),_(n,c),be(s.target.value)})}function we(t){document.querySelectorAll("[cd=drug]").forEach(n=>{const s=document.createElement("option"),a=n.textContent,i=n.getAttribute("cd-webpap-name"),o=n.getAttribute("cd-program"),c=n.getAttribute("cd-diagnosis"),r=n.getAttribute("cd-webpap-id");a!==null&&(s.text=a,s.value=a,s.setAttribute("cd-webpap-name",i),s.setAttribute("cd-program",o),s.setAttribute("cd-diagnosis",c),s.setAttribute("cd-webpap-id",r),t.add(s))})}function _(t,e){if(e.length>9){t.innerHTML="";const a=document.createElement("option");a.text="Select Medication First",a.value="",t.add(a);return}t.removeAttribute("disabled"),t.classList.remove("disabled"),t.innerHTML="";const n=document.createElement("option");n.text="Select Medication First",n.value="",t.add(n);let s=!0;e.forEach(a=>{if(a.strength==="")return;s=!1;const i=document.createElement("option");i.text=a.strength,i.value=a.strength,i.setAttribute("cd-webpap-id",a.webpapId),t.add(i)}),s&&(t.setAttribute("disabled","true"),t.classList.add("disabled"),t.removeAttribute("required"))}(function(){window.AuthorizeNetIFrame||(window.AuthorizeNetIFrame={}),AuthorizeNetIFrame.onReceiveCommunication=function(e){var n=t(e);switch(n.action){case"resizeWindow":break;case"successfulSave":break;case"cancel":break;case"transactResponse":var s=JSON.parse(n.response);s.responseCode==="1"&&z()}};function t(e){for(var n=[],s=e.split("&"),a,i=0;i<s.length;i++)a=s[i].split("="),n.push(a[0]),n[a[0]]=unescape(a[1]);return n}})();let P="";async function Ee(t,e){try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!n.ok)throw new Error("Network response was not ok");P=(await n.json()).token,document.querySelector("input[name=token]").value=P}catch(n){console.log(n)}}const Se={getHostedPaymentPageRequest:{merchantAuthentication:{name:"9QRrX47T4DkY",transactionKey:"5GN3E8m559X9pdSf"},transactionRequest:{transactionType:"authCaptureTransaction",amount:"200.00"},hostedPaymentSettings:{setting:[{settingName:"hostedPaymentReturnOptions",settingValue:'{"showReceipt": false, "url": "https://www.transparentpricerx.com", "urlText": "Continue", "cancelUrl": "https://www.transparentpricerx.com", "cancelUrlText": "Cancel"}'},{settingName:"hostedPaymentButtonOptions",settingValue:'{"text": "Pay"}'},{settingName:"hostedPaymentStyleOptions",settingValue:'{"bgColor": "blue"}'},{settingName:"hostedPaymentPaymentOptions",settingValue:'{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": true}'},{settingName:"hostedPaymentSecurityOptions",settingValue:'{"captcha": false}'},{settingName:"hostedPaymentShippingAddressOptions",settingValue:'{"show": false, "required": false}'},{settingName:"hostedPaymentBillingAddressOptions",settingValue:'{"show": true, "required": true}'},{settingName:"hostedPaymentCustomerOptions",settingValue:'{"showEmail": true, "requiredEmail": true, "addPaymentProfile": true}'},{settingName:"hostedPaymentOrderOptions",settingValue:'{"show": false, "merchantName": "TrasnaparentPrice RX"}'},{settingName:"hostedPaymentIFrameCommunicatorUrl",settingValue:'{"url": "https://www.transparentpricerx.com/communicator"}'}]}}};Ee("https://api.authorize.net/xml/v1/request.api",Se);window.fsAttributes=window.fsAttributes||[];window.fsAttributes.push(["cmsload",t=>{const[e]=t;for(let n=1;n<4;n++)we(document.getElementById(`med-name-${n}`));e.on("renderitems",n=>{console.log(n)})}]);document.querySelector(".navbar-container").addEventListener("click",()=>{D()});
