const r={fname:"",lname:"",mname:"",dob:"",ssn:"",address:"",city:"",state:"",zip:"",email:"",marital:"",residency:"",employed:"",sex:"",disabled:"",numinhouse:"",EmerContactName:"",EmerContactPhone1:""},L={patwages:"",patdisab:"",patunemploy:""},p={fname:"",mname:"",lname:"",email:"",phone:"",fax:"",address:"",city:"",state:"",zip:""},k=document.querySelector('[cd="submit-data"]');let x=0,S="";const q="https://www.medserviceswebpap.com/api/patient/createpatient",A="https://www.medserviceswebpap.com/api/physician/createphysician",B="https://www.medserviceswebpap.com/auth/token?hcpid=89",$={grant_type:"password",username:"apiuser",password:"123456"};async function T(e,t){const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()});if(!s.ok)throw new Error(s.statusText);return s.json()}async function _(e,t){try{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`},body:JSON.stringify(t)});if(!s.ok)throw new Error("Network response was not ok");await s.json()}catch(s){console.log(s)}}async function C(e,t){try{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`},body:JSON.stringify(t)});if(!s.ok)throw new Error("Network response was not ok");x=(await s.json()).Id}catch(s){console.log(s)}}async function N(e,t){try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`},body:JSON.stringify(t)})).ok)throw new Error("Network response was not ok")}catch(s){console.log(s)}}k.addEventListener("click",()=>{patientAddress&&patientAddress.forEach(e=>{switch(e.types[0]){case"street_number":{r.address=`${e.long_name} `;break}case"route":{r.address+=e.short_name;break}case"locality":r.city=e.long_name;break;case"administrative_area_level_1":{r.state=e.short_name;break}}}),doctorAddress&&doctorAddress.forEach(e=>{switch(e.types[0]){case"street_number":{p.address=`${e.long_name} `;break}case"route":{p.address+=e.short_name;break}case"locality":p.city=e.long_name;break;case"administrative_area_level_1":{p.state=e.short_name;break}}}),all_data.forEach(e=>{if(e.field==="patwages"||e.field==="patdisab"||e.field==="patunemploy"){L[e.field]=e.value;return}if(e.field.includes("doc-")){let t=e.field.split("-")[1];p[t]=e.value;return}if(e.field==="month"){r.dob=`${e.value}`;return}if(e.field==="day"||e.field==="year"){r.dob=`${r.dob}/${e.value}`;return}if(e.field==="residency"||e.field==="disabled"){r[e.field]=e.value==="Yes"?"true":"false";return}if(e.field==="ssn"){r[e.field]=e.value.replace(/-/g,"");return}r[e.field]=e.value}),T(B,$).then(e=>{S=e.access_token,C(q,r).then(()=>{let t=`https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${x}`;N(t,L)}),_(A,p)})});window.fsAttributes=window.fsAttributes||[];window.fsAttributes.push(["cmsload",e=>{const[t]=e;for(let s=1;s<4;s++)ne(document.getElementById(`med-name-${s}`));t.on("renderitems",s=>{console.log(s)})}]);const z=document.getElementById("year"),D=105;for(let e=D;e>0;e--){const t=document.createElement("option");t.text=`${e+1900}`,t.value=`${e+1900}`,z.add(t)}function M(e,t,s,n){let l=0;t.style.display="none";const c=e.length;e.forEach((o,a)=>{a!==l&&(o.style.display="none")}),t.addEventListener("click",()=>{l>0&&(e[l].style.display="none",l--,e[l].style.display="block"),n.forEach((o,a)=>{a!==l?o.classList.remove("current"):o.classList.add("current")}),l===0?t.style.display="none":t.style.display="block"}),s.addEventListener("click",()=>{const o=e[l].querySelectorAll("input"),a=e[l].querySelectorAll("select");if(P(o,a,l))l<c-1&&(e[l].style.display="none",l++,e[l].style.display="block"),n.forEach((i,d)=>{d!==l?i.classList.remove("current"):i.classList.add("current")}),l===0?t.style.display="none":t.style.display="block";else return})}const O=document.querySelectorAll("[cd-form = step]"),j=document.querySelector("[cd-form = button-back]"),R=document.querySelector("[cd-form = button-next]"),E=document.querySelectorAll("[cd-form=progress-indicator]");M(O,j,R,E);function P(e,t,s){let n=!0;e.forEach(i=>{i.required&&(i.value===""?(n=!1,i.nextElementSibling.classList.add("active")):i.nextElementSibling.classList.remove("active"))}),t.forEach(i=>{i.required&&(i.value===""?(n=!1,i.nextElementSibling.classList.add("active")):i.nextElementSibling.classList.remove("active"))});const l=document.querySelectorAll("input[name=sex]:checked"),c=document.querySelectorAll("input[name=residency]:checked"),o=document.querySelectorAll("input[name=disabled]:checked");if(l.length===0?(document.getElementById("sex-radio-error").classList.add("active"),n=!1):document.getElementById("sex-radio-error").classList.remove("active"),c.length===0?(document.getElementById("citizen-radio-error").classList.add("active"),n=!1):document.getElementById("citizen-radio-error").classList.remove("active"),o.length===0?(document.getElementById("disabled-radio-error").classList.add("active"),n=!1):document.getElementById("disabled-radio-error").classList.remove("active"),document.getElementById("ssn").value.length!==11?(n=!1,document.getElementById("ssn-error").classList.add("active")):document.getElementById("ssn-error").classList.remove("active"),s===1){const i=document.getElementById("email");if(!i.required)return;/\S+@\S+\.\S+/.test(i.value)?i.nextElementSibling.classList.remove("active"):(n=!1,i.nextElementSibling.classList.add("active"));const u=document.getElementById("dayphone"),m=document.getElementById("EmerContactPhone");u.value.length!==10?(n=!1,u.nextElementSibling.classList.add("active")):u.nextElementSibling.classList.remove("active"),m.value.length!==10?(n=!1,m.nextElementSibling.classList.add("active")):m.nextElementSibling.classList.remove("active");const f=document.getElementById("zip");f.value.length!==5?(n=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active")}if(s===2){const i=document.getElementById("doc-email"),d=document.getElementById("doc2-email-2");if(!i.required)return;const u=/\S+@\S+\.\S+/;u.test(i.value)?i.nextElementSibling.classList.remove("active"):(n=!1,i.nextElementSibling.classList.add("active")),d.value!==""?u.test(d.value)||(n=!1,d.nextElementSibling.classList.add("active")):d.nextElementSibling.classList.remove("active");const m=document.getElementById("doc-officephone-2"),f=document.getElementById("doc-fax"),v=document.getElementById("doc2-officephone-2"),y=document.getElementById("doc2-fax-2");m.value.length!==10?(n=!1,m.nextElementSibling.classList.add("active")):m.nextElementSibling.classList.remove("active"),f.value.length!==10?(n=!1,f.nextElementSibling.classList.add("active")):f.nextElementSibling.classList.remove("active"),v.value!==""&&(v.value.length!==10?(n=!1,v.nextElementSibling.classList.add("active")):v.nextElementSibling.classList.remove("active")),y.value!==""&&(y.value.length!==10?(n=!1,y.nextElementSibling.classList.add("active")):y.nextElementSibling.classList.remove("active"));const b=document.getElementById("doc-zip-2"),g=document.getElementById("doc2-zip-2");b.value.length!==5?(n=!1,b.nextElementSibling.classList.add("active")):b.nextElementSibling.classList.remove("active"),g.value!==""&&(g.value.length!==5?(n=!1,g.nextElementSibling.classList.add("active")):g.nextElementSibling.classList.remove("active"))}return n}const F=document.querySelectorAll(".phone-field"),J=document.querySelectorAll('input[placeholder="Zip code"]');F.forEach(e=>{e.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>10&&(this.value=this.value.slice(0,10))})});J.forEach(e=>{e.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value.length>5&&(this.value=this.value.slice(0,5))})});function U(e){return e.replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{0,4})$/,(n,l,c,o)=>o?`${l}-${c}-${o}`:c?`${l}-${c}`:l)}const H=document.getElementById("ssn");H.addEventListener("input",function(){this.value=U(this.value)});const Y=document.querySelectorAll(".money-field");Y.forEach(e=>{e.addEventListener("input",function(){this.value=this.value.replace(/\D/g,""),this.value!==""&&(this.value="$"+this.value)})});const Z=document.querySelector(".progress-bar"),G={attributes:!0};function K(e){e.forEach(function(t){if(t.type==="attributes"&&t.attributeName==="class"){let s=Array.from(E).findIndex(n=>n.classList.contains("current"));Z.style.width=`${(s+1)/E.length*100}%`}})}let Q=new MutationObserver(K);E.forEach(e=>{Q.observe(e,G)});const V=document.querySelectorAll(".doc-content-c-tab"),X=document.querySelectorAll(".doc-content-w"),W=document.querySelectorAll(".tab-minus-icon"),ee=document.querySelectorAll(".tab-plus-icon");V.forEach(e=>{e.addEventListener("click",()=>{X.forEach(t=>{t.classList.remove("active"),t.parentElement===e&&t.classList.add("active")}),W.forEach(t=>{t.classList.remove("active"),e.querySelector(".tab-minus-icon")===t&&t.classList.add("active")}),ee.forEach(t=>{t.classList.remove("active"),e.querySelector(".tab-plus-icon")!==t&&t.classList.add("active")})})});const h=document.getElementById("medicationStep"),te=h==null?void 0:h.querySelector(".form-row-wrapper"),w=document.getElementById("addMed");w.addEventListener("click",()=>{const e=te.cloneNode(!0);h.insertBefore(e,w.parentElement),e.querySelector(".flex-grow:nth-child(2) > select").id=`med-name-${h.childElementCount-1}`,e.querySelector(".flex-grow:nth-child(3) > select").id=`med-strength-${h.childElementCount-1}`,e.querySelector(".flex-grow:nth-child(2) > select").addEventListener("change",t=>{var o;e.querySelector(".flex-grow:nth-child(3) > select").innerHTML="";const s=t.target.value.toLocaleLowerCase().split(" ").join("-"),n=(o=document.querySelector(`[cd-name=${s}]`))==null?void 0:o.parentElement,l=n==null?void 0:n.querySelectorAll("[cd=strength]"),c=[];l==null||l.forEach(a=>{const i=a.textContent;i!==null&&c.push(i)}),I(e.querySelector(".flex-grow:nth-child(3) > select"),c)})});for(let e=1;e<4;e++){const t=document.getElementById(`med-name-${e}`),s=document.getElementById(`med-strength-${e}`);t.addEventListener("change",n=>{var i;s.innerHTML="";const l=n.target.value.toLocaleLowerCase().split(" ").join("-"),c=(i=document.querySelector(`[cd-name=${l}]`))==null?void 0:i.parentElement,o=c==null?void 0:c.querySelectorAll("[cd=strength]"),a=[];o==null||o.forEach(d=>{const u=d.textContent;u!==null&&a.push(u)}),I(s,a)})}function ne(e){document.querySelectorAll("[cd=drug]").forEach(s=>{const n=document.createElement("option"),l=s.textContent;l!==null&&(n.text=l,n.value=l,n.setAttribute("cd",l),e.add(n))})}function I(e,t){if(t.length>9){e.innerHTML="";const n=document.createElement("option");n.text="Select Medication First",n.value="",e.add(n);return}e.innerHTML="";const s=document.createElement("option");s.text="Select Medication First",s.value="",e.add(s),t.forEach(n=>{if(n==="")return;const l=document.createElement("option");l.text=n,l.value=n,e.add(l)})}
