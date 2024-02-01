const o={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",country:"USA",phone:"",email:"",marital:"",residency:!0,employed:"",sex:"",disabled:!1,numinhouse:"",EmerContactName:"",EmerContactPhone:"",Patwages__c:0,insurance:"",medicationType:""},m={fname:"",mname:"",lname:"",email:"",Phone:"",fax:"",address:"",city:"",state:"",zip:"",Facility_Name__c:"",country:"USA"},v={fname:"",mname:"",lname:"",email:"",Phone:"",fax:"",address:"",city:"",state:"",zip:"",Facility_Name__c:"",country:"USA"},h={Patient__c:"",orderItems:[]},L=Date.now().toString()+Math.random().toString();document.querySelector("#unique-id").value=`${L}`;const k=document.querySelector('[cd="submit-data"]'),N=["Adbry","Admelog","Admelog SoloStar","Aimovig","Anoro Ellipta","Avsola","Basaglar KwikPen","Basaglar Tempo Pen","Biktarvy","Botox Cosmetic","Botox for migraines","Breo Ellipta","Cimzia","Combivent Respimat","Cosentyx","Cosentyx (300 MG Dose)","Cosentyx Sensoready Pen","Creon","Delstrigo","Dupixent","Eliquis","Emgality","Enbrel","Entyvio","Epclusa","Eucrisa","Evotaz","Fasenra","Forteo","HumaLOG","HumaLOG KwikPen","HumaLOG Mix 50/50","HumaLOG Mix 75/25","HumaLOG Mix 75/25 KwikPen","Humira","inFLIXimab","Insulin Degludec","Insulin Degludec FlexTouch","Invokana","Janumet","Janumet XR","Januvia","Jardiance","Kazano","Lantus","Linzess","Lovenox","Lyumjev","Lyumjev KwikPen","Lyumjev Tempo Pen","Motegrity","Multaq","Nesina","NovoLIN 70/30","NovoLIN 70/30 FlexPen","NovoLIN R","NovoLOG","NovoLOG FlexPen","NovoLOG Mix 70/30","NovoLOG Mix 70/30 FlexPen","Nucala","Nurtec","Ocrevus","Olumiant","Ozempic (0.25 or 0.5 MG Dose)","Ozempic (1 MG Dose)","Ozempic (2 MG Dose)","Prezcobix","Prolia","Qulipta","Remicade","Rexulti","Rinvoq","Rybelsus","Simponi","Simponi Aria","Skyrizi","Skyrizi (150 MG Dose)","Steglatro","Stelara","Stiolto Respimat","Symtuza","Taltz","Tobi Podhaler","Toujeo Max SoloStar","Toujeo SoloStar","Trelegy Ellipta","Tremfya","Tresiba","Tresiba FlexTouch","Trintellix","Ubrelvy","Viberzi","Xarelto","Xeljanz","Xeljanz XR","Zenpep","Zepatier","Zubsolv"];let T=0;k.addEventListener("click",()=>{M()});async function M(){patientAddress&&patientAddress.forEach(t=>{switch(t.types[0]){case"street_number":{o.address=`${t.long_name} `;break}case"route":{o.address+=t.short_name;break}case"locality":o.city=t.long_name;break;case"administrative_area_level_1":{o.state=t.short_name;break}}}),doctorAddress&&doctorAddress.forEach(t=>{switch(t.types[0]){case"street_number":{m.address=`${t.long_name} `;break}case"route":{m.address+=t.short_name;break}case"locality":m.city=t.long_name;break;case"administrative_area_level_1":{m.state=t.short_name;break}}}),doctor2Address&&doctor2Address.forEach(t=>{switch(t.types[0]){case"street_number":{v.address=`${t.long_name} `;break}case"route":{v.address+=t.short_name;break}case"locality":v.city=t.long_name;break;case"administrative_area_level_1":{v.state=t.short_name;break}}});const e=[];document.querySelectorAll(".input-field").forEach(t=>{let n=t.id,a=t.value;(n.includes("phone")||n.includes("fax"))&&(a=a.replace(/\D/g,"")),e.push({field:n,value:a})}),document.querySelectorAll("input[type=radio]:checked").forEach(t=>{let n=t.name,a=t.id;t.name==="residency"?e.push({field:n,value:"US Citizen/Resident"}):e.push({field:n,value:a})}),e.forEach(t=>{t.field.includes("choose")&&t.value!==""&&h.orderItems.push({Doctor__c:t.value,Medication_Name__c:"",Frequency__c:"",Strength__c:""})}),e.forEach(t=>{if(t.field.includes("doc-")){let n=t.field.split("-")[1];if(m[n]=t.value,n==="office"){m.Facility_Name__c=t.value;return}if(n==="officephone"){m.Phone=t.value;return}return}if(t.field.includes("doc2-")){let n=t.field.split("-")[1];if(v[n]=t.value,n==="office"){v.Facility_Name__c=t.value;return}if(n==="officephone"){v.Phone=t.value;return}return}if(t.field==="month"){const n=t.value.length===1?`0${t.value}`:t.value;o.dob=`${n}`;return}if(t.field==="marital"){o.marital=t.value;return}if(t.field==="employed"){o.employed=t.value;return}if(t.field==="patwages"){o.Patwages__c=parseFloat(t.value.split("$")[1]);return}if(t.field==="day"||t.field==="year"){o.dob=`${o.dob}-${t.value}`;return}if(t.field==="disabled"){o[t.field]=t.value==="Yes";return}if(t.field==="ssn"){o[t.field]=t.value.replace(/-/g,"");return}if(t.field==="dayphone"){o.phone=t.value.replace(/-/g,"");return}if(!(t.field.includes("choose")||t.field.includes("residency"))){if(t.field.includes("med-name-")&&t.value!==""){let n=t.field.split("-")[2];h.orderItems[n-1].Medication_Name__c=t.value;return}if(t.field.includes("med-strength-")&&t.value!==""){let n=t.field.split("-")[2];h.orderItems[n-1].Strength__c=t.value;return}if(t.field.includes("Frequency")&&t.value!==""){let n=t.field.split("-")[1];h.orderItems[n-1].Frequency__c=t.value;return}if(t.field.includes("insurance")){o.insurance=t.value;return}t.field.includes("segment-field")&&(o.medicationType=t.value),o[t.field]=t.value}});const i=o.dob.split("-");o.dob=`${i[2]}-${i[1]}-${i[0]}`;const r={patient:o,doctor:m,doctor2:v,orders:h,uniqueId:L};sessionStorage.setItem("formData",JSON.stringify(r)),sessionStorage.setItem(L,JSON.stringify(r)),$(L)}const $=async e=>{const r=await(await fetch("http://127.0.0.1:5001/transparent-rx/us-central1/createStripe",{method:"POST",body:JSON.stringify({uniqueId:e}),headers:{"Content-Type":"application/json"}})).json();window.location.href=r.checkoutURL};function O(){const e=document.getElementById("segment-field");for(let i=1;i<5;i++){const t=document.getElementById(`med-name-${i}`).value;if(t==="")return;if(t!==N.find(n=>n===t)){if(e.value==="Brand"){e.value="Both";return}e.value="Generic";return}else{if(e.value==="Generic"){e.value="Both";return}e.value="Brand"}}}const w=document.getElementById("year"),P=105;for(let e=P;e>0;e--){const i=document.createElement("option");i.text=`${e+1900}`,i.value=`${e+1900}`,w.add(i)}function F(e,i,r,t){let n=0;i.style.display="none";const a=e.length;e.forEach((l,u)=>{u!==n&&(l.style.display="none")}),i.addEventListener("click",()=>{n===3&&(r.innerHTML="Continue"),n>0&&(e[n].style.display="none",n--,e[n].style.display="block"),t.forEach((l,u)=>{u!==n?l.classList.remove("current"):l.classList.add("current")}),n===0?i.style.display="none":i.style.display="block"}),r.addEventListener("click",()=>{const l=e[n].querySelectorAll("input"),u=e[n].querySelectorAll("select");if(R(l,u,n)){if(n===3){O(),k.click();return}else n<a-1&&(e[n].style.display="none",n++,e[n].style.display="block"),t.forEach((s,c)=>{c!==n?s.classList.remove("current"):s.classList.add("current")}),n===0?i.style.display="none":i.style.display="block",n===3&&(r.innerHTML="Continue To Payment");n===2&&(T=ne(parseFloat(document.getElementById("numinhouse").value),parseFloat(document.getElementById("patwages").value.split("$")[1].replace(/,/g,""))))}})}const C=document.querySelectorAll("[cd-form = step]"),D=document.querySelector("[cd-form = button-back]"),G=document.querySelector("[cd-form = button-next]"),p=document.querySelectorAll("[cd-form=progress-indicator]");F(C,D,G,p);function R(e,i,r){let t=!0;e.forEach(s=>{if(s.required)if(s.value===""){if(s.id==="doc2-mname")return;t=!1,s.nextElementSibling.classList.add("active")}else{if(s.id==="doc2-mname")return;s.nextElementSibling.classList.remove("active")}}),i.forEach(s=>{s.required&&(s.value===""?(t=!1,s.nextElementSibling.classList.add("active")):s.nextElementSibling.classList.remove("active"))});const n=document.querySelectorAll("input[name=sex]:checked"),a=document.querySelectorAll("input[name=residency]:checked"),l=document.querySelectorAll("input[name=disabled]:checked");if(n.length===0?(document.getElementById("sex-radio-error").classList.add("active"),t=!1):document.getElementById("sex-radio-error").classList.remove("active"),a.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),t=!1):a[0].id==="No"?(document.querySelector(".error-announcement-c").classList.add("active"),t=!1):(document.querySelector(".error-announcement-c").classList.remove("active"),document.getElementById("citizen-radio-error").classList.remove("active")),l.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),t=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(t=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),r===1){const s=document.getElementById("email");if(!s.required)return;/\S+@\S+\.\S+/.test(s.value)?s.nextElementSibling.classList.remove("active"):(t=!1,s.nextElementSibling.classList.add("active"));const f=document.getElementById("dayphone"),g=document.getElementById("EmerContactPhone");f.value.length!==16?(t=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),g.value.length!==16?(t=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active");const y=document.getElementById("zip");y.value.length!==5?(t=!1,y.nextElementSibling.classList.add("active")):y.nextElementSibling.classList.remove("active");const d=document.getElementById("patientAddress");B(d.value)===!1?(t=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active")}if(r===2){const s=document.getElementById("doc-email"),c=document.getElementById("doc2-email-2");for(let q=1;q<5;q++)ee(document.getElementById(`med-name-${q}`));const f=/\S+@\S+\.\S+/;!f.test(s.value)&&s.value!==""?(t=!1,s.nextElementSibling.classList.add("active")):s.nextElementSibling.classList.remove("active"),c.value!==""&&(f.test(c.value)?c.nextElementSibling.classList.remove("active"):(t=!1,c.nextElementSibling.classList.add("active")));const g=document.getElementById("doc-officephone-2"),y=document.getElementById("doc-fax"),d=document.getElementById("doc2-officephone-2"),E=document.getElementById("doc2-fax-2");g.value.length!==16?(t=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active"),y.value.length!==16?(t=!1,y.nextElementSibling.classList.add("active")):y.nextElementSibling.classList.remove("active"),d.value!==""&&(d.value.length!==16?(t=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active")),E.value!==""&&(E.value.length!==16?(t=!1,E.nextElementSibling.classList.add("active")):E.nextElementSibling.classList.remove("active"));const I=document.getElementById("doctorAddress");B(I.value)===!1?(t=!1,I.nextElementSibling.classList.add("active")):I.nextElementSibling.classList.remove("active");const S=document.getElementById("doctor2Address");S.value!==""&&(B(S.value)===!1?(t=!1,S.nextElementSibling.classList.add("active")):S.nextElementSibling.classList.remove("active"));const A=document.getElementById("doc-zip-2"),b=document.getElementById("doc2-zip-2");A.value.length!==5?(t=!1,A.nextElementSibling.classList.add("active")):A.nextElementSibling.classList.remove("active"),b.value!==""&&(b.value.length!==5?(t=!1,b.nextElementSibling.classList.add("active")):b.nextElementSibling.classList.remove("active"))}return t}const x=document.querySelector(".second-doc");x.querySelectorAll(".input-field").forEach(e=>{e.addEventListener("change",()=>{e.value!==""?x.querySelectorAll(".input-field").forEach(i=>{i.name!=="doc2-email"&&(i.required=!0)}):Array.from(x.querySelectorAll(".input-field")).every(r=>r.value==="")&&x.querySelectorAll(".input-field").forEach(r=>{r.getAttribute("id")!=="doc2-mname"&&(r.required=!1,r.nextElementSibling.classList.remove("active"))})})});const j=document.querySelectorAll(".phone-field");function H(e){e.addEventListener("input",function(){this.value=this.value.replace(/\D/g,"");const i=this.value.replace(/\D/g,"").substring(0,10),r=i.substring(0,3),t=i.substring(3,6),n=i.substring(6,10);i.length>6?this.value=`(${r}) ${t} - ${n}`:i.length>3?this.value=`(${r}) ${t}`:i.length>0&&(this.value=`(${r}`)})}j.forEach(e=>{H(e)});const X=document.querySelectorAll('input[placeholder="Zip code"]');X.forEach(e=>{e.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function J(e){return e.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(t,n,a,l)=>l?`${n}-${a}-${l}`:a?`${n}-${a}`:n)}const K=document.getElementById("ssn");K.addEventListener("input",function(){this.value=J(this.value)});function B(e){return/^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/.test(e)}const _=document.querySelector(".money-field"),U=document.getElementById("employed");U.addEventListener("change",function(){if(this.value==="Unemployed"){_.value="$25,000";return}_.value=""});_.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+parseInt(this.value).toLocaleString())});const z=document.querySelector(".progress-bar-c"),Z=document.querySelector(".progress-bar"),Q={attributes:!0};function V(e){e.forEach(function(i){if(i.type==="attributes"&&i.attributeName==="class"){let r=Array.from(p).findIndex(t=>t.classList.contains("current"));Z.style.width=`${(r+1)/p.length*100}%`,window.innerWidth<768&&(r===2?z.style.transform=`translateX(-${516-window.innerWidth}px)`:r<2&&(z.style.transform="translateX(0px)"))}})}let W=new MutationObserver(V);p.forEach(e=>{W.observe(e,Q)});function Y(){let e=!1,i=!0;for(let r=1;r<5;r++){const n=document.getElementById(`med-name-${r}`).value,a=ie(T,n);n===N.find(l=>l===n)&&(e=!0),a||(i=!1,document.querySelector(".eligibility-announcement-c").classList.remove("hidden"),document.querySelector(".eligability-med-name").textContent=n)}e?(document.getElementById("insurance-row").classList.remove("hidden"),document.getElementById("insurance-field").required=!0,document.getElementById("brand-note").classList.remove("hidden")):(document.getElementById("insurance-row").classList.add("hidden"),document.getElementById("insurance-field").required=!1,document.getElementById("brand-note").classList.add("hidden")),i&&document.querySelector(".eligibility-announcement-c").classList.add("hidden")}for(let e=1;e<5;e++){const i=document.getElementById(`med-name-${e}`),r=document.getElementById(`med-strength-${e}`);if(i.addEventListener("change",t=>{Y(),e!==1&&(i.value!==""?(document.getElementById(`med-strength-${e}`).required=!0,document.getElementById(`choose-doctor-${e}`).required=!0):(document.getElementById(`med-strength-${e}`).required=!1,document.getElementById(`choose-doctor-${e}`).required=!1)),r.innerHTML="";let n=t.target.value.toLocaleLowerCase().replace(/[\(\)\/.]/g,"").split(" ").join("-");if(n===""){const s=document.createElement("option");s.text="Select Medication First",s.value="",r.add(s);return}n==="ozempic-025-or-05-mg-dose"?n="ozempic-0-25-or-0-5-mg-dose":n==="novolog-mix-7030"?n="novolog-mix-70-30":n==="novolin-7030"?n="novolin-70-30":n==="novolin-7030-flexpen"?n="novolin-70-30-flexpen":n==="novolog-mix-7030-flexpen"?n="novolog-mix-70-30-flexpen":n==="humalog-mix-5050"?n="humalog-mix-50-50":n==="humalog-mix-7525"?n="humalog-mix-75-25":n==="humalog-mix-7525-kwikpen"?n="humalog-mix-75-25-kwikpen":n==="prodigy-insulin-syringe-31g-8mm-13cc"?n="prodigy-insulin-syringe-31g-8mm-1-3cc":n==="prodigy-insulin-syringe-31g-8mm-12cc"?n="prodigy-insulin-syringe-31g-8mm-1-2cc":n==="prodigy-insulin-syringe-28g-127mm-1cc"&&(n="prodigy-insulin-syringe-28g-12-7mm-1cc");const a=document.querySelector(`[cd-name=${n}]`).parentElement,l=a==null?void 0:a.querySelectorAll("[cd=strength]"),u=[];l==null||l.forEach(s=>{const c={strength:s.textContent};c.strength!==null&&u.push(c)}),te(r,u)}),e!==1){const t=document.getElementById(`med-row-${e}`);t.querySelectorAll(".input-field").forEach(n=>{n.addEventListener("change",()=>{n.value!==""?t.querySelectorAll(".input-field").forEach(a=>{a.required=!0}):Array.from(t.querySelectorAll(".input-field")).every(l=>l.value==="")&&t.querySelectorAll(".input-field").forEach(l=>{l.required=!1,l.nextElementSibling.classList.remove("active")})})})}}function ee(e){document.querySelectorAll("[cd=drug]").forEach(r=>{const t=document.createElement("option"),n=r.textContent,a=r.getAttribute("cd-program"),l=r.getAttribute("cd-diagnosis");n!==null&&(t.text=n,t.value=n,t.setAttribute("cd-program",a),t.setAttribute("cd-diagnosis",l),e.add(t))})}function te(e,i){if(i.length>9){e.innerHTML="";const n=document.createElement("option");n.text="Select Medication First",n.value="",e.add(n);return}e.removeAttribute("disabled"),e.classList.remove("disabled"),e.innerHTML="";const r=document.createElement("option");r.text="Select Medication First",r.value="",e.add(r);let t=!0;i.forEach(n=>{if(n.strength==="")return;t=!1;const a=document.createElement("option");a.text=n.strength,a.value=n.strength,e.add(a)}),t&&(e.setAttribute("disabled","true"),e.classList.add("disabled"),e.removeAttribute("required"))}document.getElementById("wf-form-application-form").addEventListener("submit",()=>{k.click()});function ne(e,i){return Math.round(i/(15060+(e-1)*5380)*100)}function ie(e,i){switch(i){case"Adbry":return e<=500;case"Admelog":return e<=500;case"Admelog SoloStar":return e<=500;case"Aimovig":return e<=290;case"Anoro Ellipta":return e<=600;case"Basaglar KwikPen":return e<=500;case"Basaglar Tempo Pen":return e<=500;case"Biktarvy":return e<=500;case"Botox Cosmetic":return e<=600;case"Botox for migraines":return e<=600;case"Breo Ellipta":return e<=300;case"Cimzia":return e<=500;case"Combivent Respimat":return e<=200;case"Cosentyx":return e<=550;case"Cosentyx (300 MG Dose)":return e<=550;case"Cosentyx Sensoready Pen":return e<=550;case"Creon":return e<=600;case"Delstrigo":return e<=400;case"Dupixent":return e<=400;case"Eliquis":return e<=250;case"Emgality":return e<=400;case"Enbrel":return e<=290;case"Entyvio":return e<=500;case"Epclusa":return e<=500;case"Eucrisa":return e<=300;case"Evotaz":return e<=500;case"Fasenra":return e<=235;case"Forteo":return e<=300;case"HumaLOG":return e<=500;case"HumaLOG KwikPen":return e<=500;case"HumaLOG Mix 50/50":return e<=400;case"HumaLOG Mix 75/25":return e<=400;case"HumaLOG Mix 75/25 KwikPen":return e<=400;case"Humira":return e<=600;case"inFLIXimab":return e<=600;case"Invokana":return e<=305;case"Janumet":return e<=400;case"Janumet XR":return e<=400;case"Januvia":return e<=400;case"Jardiance":return e<=250;case"Kazano":return e<=500;case"Lantus":return e<=400;case"Linzess":return e<=600;case"Lovenox":return e<=400;case"Lyumjev":return e<=400;case"Lyumjev KwikPen":return e<=500;case"Lyumjev Tempo Pen":return e<=500;case"Motegrity":return e<=500;case"Multaq":return e<=400;case"Nesina":return e<=500;case"NovoLIN 70/30":return e<=400;case"NovoLIN 70/30 FlexPen":return e<=400;case"NovoLIN R":return e<=500;case"NovoLOG":return e<=400;case"NovoLOG FlexPen":return e<=400;case"NovoLOG Mix 70/30":return e<=400;case"NovoLOG Mix 70/30 FlexPen":return e<=400;case"Nucala":return e<=600;case"Nurtec":return e<=300;case"Ocrevus":return e<=1e3;case"Olumiant":return e<=500;case"Ozempic (0.25 or 0.5 MG Dose)":return e<=400;case"Ozempic (1 MG Dose)":return e<=400;case"Ozempic (2 MG Dose)":return e<=400;case"Qulipta":return e<=600;case"Remicade":return e<=600;case"Rexulti":return e<=400;case"Rinvoq":return e<=600;case"Rybelsus":return e<=400;case"Simponi":return e<=600;case"Simponi Aria":return e<=600;case"Skyrizi":return e<=600;case"Skyrizi (150 MG Dose)":return e<=600;case"Stelara":return e<=600;case"Stiolto Respimat":return e<=200;case"Symtuza":return e<=300;case"Taltz":return e<=500;case"Toujeo Max SoloStar":return e<=400;case"Toujeo SoloStar":return e<=400;case"Trelegy Ellipta":return e<=600;case"Tremfya":return e<=600;case"Tresiba":return e<=500;case"Tresiba FlexTouch":return e<=400;case"Trintellix":return e<=500;case"Ubrelvy":return e<=600;case"Viberzi":return e<=600;case"Xarelto":return e<=300;case"Xeljanz":return e<=500;case"Xeljanz XR":return e<=500;case"Zenpep":return e<=400;case"Zepatier":return e<=400;case"Zubsolv":return e<=300;default:return!0}}