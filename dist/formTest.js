const s="https://www.medserviceswebpap.com/auth/token?hcpid=89",t={grant_type:"password",username:"apiuser",password:"123456"};let a;const i=["Adbry","Admelog","Admelog SoloStar","Afrezza","Aimovig","Anoro Ellipta","Avsola","Basaglar KwikPen","Biktarvy","Botox Cosmetic","Botox","Breo Ellipta","Cimzia","Combivent Respimat","Cosentyx","Creon","Delstrigo","Dupixent","Eliquis","Emgality","Enbrel","Entyvio","Epclusa","Eucrisa","Evotaz","Fasenra","Forteo","HumaLOG","Humira","inFLIXimab","Insulin Degludec","Invokana","Janumet","Januvia","Jardiance","Kazano","Lantus","Linzess","Lovenox","Lyumjev","Motegrity","Multaq","Nesina","NovoLIN 70/30","NovoLOG","Nucala","Nurtec","Ocrevus","Olumiant","Ozempic","Prezcobix","Prolia","Qulipta","Remicade","Rexulti","Rinvoq","Rybelsus","Simponi","Simponi Aria","Skyrizi","Steglatro","Stelara","Stiolto Respimat","Symtuza","Taltz","Tobi Podhaler","Toujeo SoloStar","Trelegy Ellipta","Tremfya","Tresiba","Trintellix","Trulicity","Ubrelvy","Viberzi","Xarelto","Xeljanz","Zenpep","Zepatier","Zubsolv"];async function m(e,o){const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(o).toString()});if(!r.ok)throw new Error(r.statusText);return r.json()}m(s,t).then(e=>{a=e.access_token,i.forEach(async o=>{await n("https://www.medserviceswebpap.com/api/search/availabledrugs?drugname="+o).then(async r=>{await d(o,r)})})});async function n(e){try{const o=await fetch(e,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!o.ok)throw new Error("Network response was not ok");let r=await o.json();return console.log(r),r}catch(o){console.log(o)}}async function c(e){try{const o=await fetch("https://www.medserviceswebpap.com/api/paporders/additem",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(e)});if(!o.ok)throw new Error("Network response was not ok");return await o.json()}catch(o){console.log(o)}}async function d(e,o){const r={customerId:21,orderItems:[{ddi:`${o[0].DrugId}`,name:`${o[0].DrugName}`,program:"",pharmcoid:"",pharmco:"Rx Outreach",physicianid:"187",qty:"90",sig:"1",diagnosis:"test"}]};e==="Anoro Ellipta"?(r.orderItems[0].pharmco="GlaxoSmithKline",r.orderItems[0].pharmcoid="5331",r.orderItems[0].program="GSK Patient Assistance Program"):e==="Adbry"?(r.orderItems[0].pharmco="Leo Pharma Inc.",r.orderItems[0].pharmcoid="7269",r.orderItems[0].program="Adbry Advocate Program"):e==="Admelog SoloStar"?(r.orderItems[0].pharmco="Sanofi",r.orderItems[0].pharmcoid="90",r.orderItems[0].program="Sanofi Patient Connection"):e==="Afrezza"?(r.orderItems[0].pharmco="Sanofi Pharmaceuticals",r.orderItems[0].pharmcoid="7070",r.orderItems[0].program="Afrezza Support Program"):e==="Aimovig"?(r.orderItems[0].pharmco="Amgen, Inc.",r.orderItems[0].pharmcoid="7537",r.orderItems[0].program="(ASNF) Aimovig"):e==="Avsola"?(r.orderItems[0].pharmco="Amgen, Inc.",r.orderItems[0].pharmcoid="7078",r.orderItems[0].program="Amgen Safety Net Foundation (ASNF)"):e==="Basaglar KwikPen"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Biktarvy"?(r.orderItems[0].pharmco="Gilead Sciences, Inc.",r.orderItems[0].pharmcoid="6969",r.orderItems[0].program="Support Path Patient Assistance Program"):e==="Breo Ellipta"?(r.orderItems[0].pharmco="GlaxoSmithKline",r.orderItems[0].pharmcoid="5331",r.orderItems[0].program="GSK Patient Assistance Program"):e==="Botox Cosmetic"?(r.orderItems[0].pharmco="Allergan",r.orderItems[0].pharmcoid="3236",r.orderItems[0].program="Botox Patient Assistance Program"):e==="Botox"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="7538",r.orderItems[0].program="MyAbbvie Assist for Botox"):e==="Cimzia"?(r.orderItems[0].pharmco="UCB, Inc.",r.orderItems[0].pharmcoid="7081",r.orderItems[0].program="UCBCares Program"):e==="Combivent Respimat"?(r.orderItems[0].pharmco="Boehringer Ingelheim CARES Foundation, Inc.",r.orderItems[0].pharmcoid="36",r.orderItems[0].program="BI Cares Patient Assistance Program"):e==="Cosentyx"?(r.orderItems[0].pharmco="Novartis Pharmaceuticals Corporation",r.orderItems[0].pharmcoid="56",r.orderItems[0].program="Novartis Patient Assistance Foundation, Inc. (NPAF)"):e==="Creon 10"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="6910",r.orderItems[0].program="myAbbVie Assist for Creon, Linzess, Viberzi"):e==="Delstrigo"?(r.orderItems[0].pharmco="Merck & Co., Inc.",r.orderItems[0].pharmcoid="7108",r.orderItems[0].program="Merck Connect"):e==="Dupixent"?(r.orderItems[0].pharmco="Sanofi and Regeneron Pharmaceuticals, Inc",r.orderItems[0].pharmcoid="7461",r.orderItems[0].program="Dupixent MyWay Program Allergists (AD, Asthma, CRSwNP)"):e==="Eliquis"?(r.orderItems[0].pharmco="Bristol-Myers Squibb Company",r.orderItems[0].pharmcoid="37",r.orderItems[0].program="Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)"):e==="Emgality"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Enbrel"?(r.orderItems[0].pharmco="Amgen, Inc.",r.orderItems[0].pharmcoid="7541",r.orderItems[0].program="Amgen Enbrel"):e==="Entyvio"?(r.orderItems[0].pharmco="Takeda Pharmaceuticals",r.orderItems[0].pharmcoid="7137",r.orderItems[0].program="Entyvio Patient Assistance Program"):e==="Epclusa"?(r.orderItems[0].pharmco="Gilead Sciences, Inc.",r.orderItems[0].pharmcoid="46",r.orderItems[0].program="Advancing Access Program"):e==="Eucrisa"?(r.orderItems[0].pharmco="Pfizer, Inc.",r.orderItems[0].pharmcoid="7342",r.orderItems[0].program="Pzifer Dermatology Patient Access"):e==="Evotaz"?(r.orderItems[0].pharmco="Bristol-Myers Squibb Company",r.orderItems[0].pharmcoid="5335",r.orderItems[0].program="Access Virology Patient Assistance Program"):e==="Fasenra"?(r.orderItems[0].pharmco="Astrazeneca Pharmaceuticals",r.orderItems[0].pharmcoid="31",r.orderItems[0].program="AZ&Me Prescription Savings Program for people without insurance"):e==="Forteo"||e==="HumaLOG"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Humira"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="203",r.orderItems[0].program="myAbbvie Assist for Humira"):e==="inFLIXimab"||e==="Insulin Degludec"||e==="Invokana"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Janumet"||e==="Januvia"?(r.orderItems[0].pharmco="Merck & Co., Inc.",r.orderItems[0].pharmcoid="7108",r.orderItems[0].program="Merck Connect"):e==="Jardiance"?(r.orderItems[0].pharmco="Boehringer Ingelheim",r.orderItems[0].pharmcoid="36",r.orderItems[0].program="BI Cares Patient Assistance Program"):e==="Kazano"?(r.orderItems[0].pharmco="Takeda Pharmaceuticals",r.orderItems[0].pharmcoid="221",r.orderItems[0].program="Help at Hand Patient Assistance Program"):e==="Lantus"?(r.orderItems[0].pharmco="Sanofi",r.orderItems[0].pharmcoid="90",r.orderItems[0].program="Sanofi Patient Connection"):e==="Linzess"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="6910",r.orderItems[0].program="myAbbVie Assist for Creon, Linzess, Viberzi"):e==="Lovenox"?(r.orderItems[0].pharmco="Sanofi",r.orderItems[0].pharmcoid="90",r.orderItems[0].program="Sanofi Patient Connection"):e==="Lyumjev"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Motegrity"?(r.orderItems[0].pharmco="Takeda Pharmaceuticals",r.orderItems[0].pharmcoid="221",r.orderItems[0].program="Help at Hand Patient Assistance Program"):e==="Multaq"?(r.orderItems[0].pharmco="Sanofi",r.orderItems[0].pharmcoid="90",r.orderItems[0].program="Sanofi Patient Connection"):e==="Nesina"?(r.orderItems[0].pharmco="Takeda Pharmaceuticals",r.orderItems[0].pharmcoid="221",r.orderItems[0].program="Help at Hand Patient Assistance Program"):e==="NovoLIN 70/30"||e==="NovoLOG"?(r.orderItems[0].pharmco="Novo Nordisk",r.orderItems[0].pharmcoid="6993",r.orderItems[0].program="Novo Nordisk Patient Assistance Program"):e==="Nucala"?(r.orderItems[0].pharmco="GlaxoSmithKline",r.orderItems[0].pharmcoid="7178",r.orderItems[0].program="GSK Patient Assistance Program (Nucala)"):e==="Nurtec"?(r.orderItems[0].pharmco="Pfizer, Inc.",r.orderItems[0].pharmcoid="7542",r.orderItems[0].program="Pfizer Nurtec"):e==="Ocrevus"?(r.orderItems[0].pharmco="Genentech USA, Inc.",r.orderItems[0].pharmcoid="7123",r.orderItems[0].program="Genentech Patient Foundation"):e==="Olumiant"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Ozempic"?(r.orderItems[0].pharmco="Novo Nordisk",r.orderItems[0].pharmcoid="6993",r.orderItems[0].program="Novo Nordisk Patient Assistance Program"):e==="Prezcobix"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Prolia"?(r.orderItems[0].pharmco="Amgen, Inc.",r.orderItems[0].pharmcoid="7543",r.orderItems[0].program="Amgen Safety Net Foundation (ASNF)"):e==="Qulipta"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="7538",r.orderItems[0].program="MyAbbvie Assist Patient Assistance Program"):e==="Remicade"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Rexulti"?(r.orderItems[0].pharmco="Otsuka Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="7084",r.orderItems[0].program="Otsuka PAP-Rexulti"):e==="Rinvoq"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="7538",r.orderItems[0].program="MyAbbvie Assist Patient Assistance Program"):e==="Rybelsus"?(r.orderItems[0].pharmco="Novo Nordisk",r.orderItems[0].pharmcoid="6993",r.orderItems[0].program="Novo Nordisk Patient Assistance Program"):e==="Simponi"||e==="Simponi Aria"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Skyrizi"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="7538",r.orderItems[0].program="MyAbbvie Assist Patient Assistance Program"):e==="Steglatro"?(r.orderItems[0].pharmco="Merck & Co., Inc.",r.orderItems[0].pharmcoid="7108",r.orderItems[0].program="Merck Connect"):e==="Stelara"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Stiolto Respimat"?(r.orderItems[0].pharmco="Boehringer Ingelheim CARES Foundation, Inc.",r.orderItems[0].pharmcoid="36",r.orderItems[0].program="BI Cares Patient Assistance Program"):e==="Symtuza"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Taltz"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Tobi Podhaler"?(r.orderItems[0].pharmco="Novartis Pharmaceuticals Corporation",r.orderItems[0].pharmcoid="56",r.orderItems[0].program="Novartis Patient Assistance Foundation, Inc. (NPAF)"):e==="Toujeo SoloStar"?(r.orderItems[0].pharmco="Sanofi",r.orderItems[0].pharmcoid="90",r.orderItems[0].program="Sanofi Patient Connection"):e==="Trelegy Ellipta"?(r.orderItems[0].pharmco="GlaxoSmithKline",r.orderItems[0].pharmcoid="5331",r.orderItems[0].program="GSK Patient Assistance Program"):e==="Tremfya"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Tresiba"?(r.orderItems[0].pharmco="Novo Nordisk",r.orderItems[0].pharmcoid="6993",r.orderItems[0].program="Novo Nordisk Patient Assistance Program"):e==="Trintellix"?(r.orderItems[0].pharmco="Takeda Pharmaceuticals",r.orderItems[0].pharmcoid="221",r.orderItems[0].program="Help at Hand Patient Assistance Program"):e==="Truvada "?(r.orderItems[0].pharmco="Gilead Sciences, Inc.",r.orderItems[0].pharmcoid="6969",r.orderItems[0].program="Support Path Patient Assistance Program"):e==="Trulicity"?(r.orderItems[0].pharmco="Lilly USA, LLC.",r.orderItems[0].pharmcoid="52",r.orderItems[0].program="Lilly Cares Foundation Patient Assistance Program"):e==="Ubrelvy"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="7538",r.orderItems[0].program="MyAbbvie Assist Patient Assistance Program"):e==="Viberzi"?(r.orderItems[0].pharmco="AbbVie Inc.",r.orderItems[0].pharmcoid="6910",r.orderItems[0].program="myAbbVie Assist for Creon, Linzess, Viberzi"):e==="Xarelto"?(r.orderItems[0].pharmco="Johnson & Johnson Patient Assistance Foundation, Inc.",r.orderItems[0].pharmcoid="5091",r.orderItems[0].program="Patient Assistance Program"):e==="Xeljanz"?(r.orderItems[0].pharmco="Pfizer, Inc.",r.orderItems[0].pharmcoid="7342",r.orderItems[0].program="Pzifer Dermatology Patient Access"):e==="Zenpep"?(r.orderItems[0].pharmco="Nestle HealthCare Nutrition",r.orderItems[0].pharmcoid="7109",r.orderItems[0].program="Nestle Nutrition Patient Care"):e==="Zepatier"?(r.orderItems[0].pharmco="Merck & Co., Inc.",r.orderItems[0].pharmcoid="7108",r.orderItems[0].program="Merck Connect"):e==="Zubsolv"&&(r.orderItems[0].pharmco="Orexo US, Inc.",r.orderItems[0].pharmcoid="7018",r.orderItems[0].program="Zubsolv Patient Assistance Program"),console.log(r),c(r)}
