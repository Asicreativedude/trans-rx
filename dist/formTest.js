const o="https://www.medserviceswebpap.com/auth/token?hcpid=89",s={grant_type:"password",username:"apiuser",password:"123456"};let n;async function i(e,t){const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(t).toString()});if(!a.ok)throw new Error(a.statusText);return a.json()}i(o,s).then(e=>{n=e.access_token,p("https://www.medserviceswebpap.com/api/physician/getphysician?lname=Bethany Jimenez"),r("https://www.medserviceswebpap.com/api/patient/deletepatient?patientId=111"),c("https://www.medserviceswebpap.com/api/physician/deletephysician?physicianId=115")});async function r(e){await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}})}async function c(e){await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}})}async function p(e){try{const t=await fetch(e,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!t.ok)throw new Error("Network response was not ok");let a=await t.json();return console.log(a),a}catch(t){console.log(t)}}
