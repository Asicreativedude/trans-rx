const r="https://www.medserviceswebpap.com/auth/token?hcpid=89",n={grant_type:"password",username:"apiuser",password:"123456"};let a;async function s(o,e){const t=await fetch(o,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()});if(!t.ok)throw new Error(t.statusText);return t.json()}s(r,n).then(o=>{a=o.access_token,c("https://www.medserviceswebpap.com/api/search/availabledrugs?drugname=Trandate")});async function c(o){try{const e=await fetch(o,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!e.ok)throw new Error("Network response was not ok");let t=await e.json();return console.log(t),t}catch(e){console.log(e)}}
