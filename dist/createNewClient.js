document.addEventListener("DOMContentLoaded",async()=>{const t=document.querySelector(".loader-s"),e=sessionStorage.getItem("formData"),o=e?JSON.parse(e):null;o?await n(o).then(()=>{t.classList.add("hide"),setTimeout(()=>{t.style.display="none"},200)}):console.log("No form data found in sessionStorage.")});async function n(t){try{const e=await fetch("https://us-central1-transparent-rx.cloudfunctions.net/addClient",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){console.log(e)}}
