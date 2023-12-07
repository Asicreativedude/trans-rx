document.addEventListener("DOMContentLoaded",async()=>{const e=sessionStorage.getItem("formData"),t=e?JSON.parse(e):null;t?await b(t).then(()=>{sessionStorage.clear()}):console.log("No form data found in sessionStorage.")});let i=0,s="";const h="https://www.medserviceswebpap.com/api/patient/createpatient",p="https://www.medserviceswebpap.com/api/physician/createphysician",l="https://www.medserviceswebpap.com/auth/token?hcpid=89",y={grant_type:"password",username:"apiuser",password:"123456"};async function u(e,t){const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()});if(!a.ok)throw new Error(a.statusText);return a.json()}async function d(e,t){try{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");const o=await a.json();t.id=o.Id}catch(a){console.log(a)}}async function g(e,t){try{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Network response was not ok");i=(await a.json()).Id}catch(a){console.log(a)}}async function f(e,t){try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(t)})).ok)throw new Error("Network response was not ok")}catch(a){console.log(a)}}async function m(e,t){let a;t==="private"?a={privateins:"true"}:a={none:"true"};try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(a)})).ok)throw new Error("Network response was not ok")}catch(o){console.log(o)}}async function k(e){try{const t=await fetch(e,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){console.log(t)}}async function D(e){try{const t=await fetch("https://www.medserviceswebpap.com/api/paporders/additem",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(e)});if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){console.log(t)}}async function b(e){const t=document.querySelector(".loader-s");return t.style.display="flex",new Promise(async(a,o)=>{try{await u(l,y).then(r=>{s=r.access_token}).then(async()=>{await g(h,e.patientData);let r=`https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${i}`;await f(r,e.patientIncomeData),e.drugData.webpapOrder.customerId=i;let w=`https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${i}`;await m(w,e.insurance),await d(p,e.doctorData),e.doctor2Data.fname!==""&&await d(p,e.doctor2Data),await Promise.all(e.drugData.webpapOrder.orderItems.map(async n=>{await k(`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${e.doctorData.fname}&lname=${e.doctorData.lname}`),n.physicianid.includes(e.doctorData.fname)&&n.physicianid.includes(e.doctorData.lname)?n.physicianid=e.doctorData.id:n.physicianid.includes(e.doctor2Data.fname)&&n.physicianid.includes(e.doctor2Data.lname)&&(n.physicianid=e.doctor2Data.id)})),e.patientData.webpapId=i,e.patientData.submissionDate=new Date,await D(e.drugData.webpapOrder),e.drugData.webpapOrder.orderItems.forEach(n=>{n.orderDate=new Date,e.drugData.drugData.forEach(c=>{console.log(c),n.name===c.name&&(n.strength=c.strength)})}),await S(e)}),t.classList.add("hide"),setTimeout(()=>{t.style.display="none"},200),a()}catch(r){o(r)}})}async function S(e){try{const t=await fetch("https://us-central1-transparent-rx.cloudfunctions.net/sendDataToFirebase",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){console.log(t)}}
