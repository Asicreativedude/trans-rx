document.addEventListener("DOMContentLoaded",async()=>{const t=document.querySelector(".loader-s"),e=new URLSearchParams(window.location.search);e.has("uniqueId");const n=e.get("uniqueId");n?await o(n).then(()=>{t.classList.add("hide"),setTimeout(()=>{t.style.display="none"},200)}):alert("Error occured, please contact support")});async function o(t){try{const e=await fetch("https://us-central1-transparent-rx.cloudfunctions.net/newClient",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uniqueId:t})});if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){console.log(e)}}