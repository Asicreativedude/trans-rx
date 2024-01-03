const generalURL2 = 'https://www.medserviceswebpap.com/auth/token?hcpid=89';
const authData2 = {
	grant_type: 'password',
	username: 'apiuser',
	password: '123456',
};

let authToken2: string;

const brandMeds2 = [
	'Adbry',
	'Admelog',
	'Admelog SoloStar',
	'Afrezza',
	'Aimovig',
	'Anoro Ellipta',
	'Avsola',
	'Basaglar KwikPen',
	'Biktarvy',
	'Botox Cosmetic',
	'Botox',
	'Breo Ellipta',
	'Cimzia',
	'Combivent Respimat',
	'Cosentyx',
	'Creon',
	'Delstrigo',
	'Dupixent',
	'Eliquis',
	'Emgality',
	'Enbrel',
	'Entyvio',
	'Epclusa',
	'Eucrisa',
	'Evotaz',
	'Fasenra',
	'Forteo',
	'HumaLOG',
	'Humira',
	'inFLIXimab',
	'Insulin Degludec',
	'Invokana',
	'Janumet',
	'Januvia',
	'Jardiance',
	'Kazano',
	'Lantus',
	'Linzess',
	'Lovenox',
	'Lyumjev',
	'Motegrity',
	'Multaq',
	'Nesina',
	'NovoLIN 70/30',
	'NovoLOG',
	'Nucala',
	'Nurtec',
	'Ocrevus',
	'Olumiant',
	'Ozempic',
	'Prezcobix',
	'Prolia',
	'Qulipta',
	'Remicade',
	'Rexulti',
	'Rinvoq',
	'Rybelsus',
	'Simponi',
	'Simponi Aria',
	'Skyrizi',
	'Steglatro',
	'Stelara',
	'Stiolto Respimat',
	'Symtuza',
	'Taltz',
	'Tobi Podhaler',
	'Toujeo SoloStar',
	'Trelegy Ellipta',
	'Tremfya',
	'Tresiba',
	'Trintellix',
	'Trulicity',
	'Ubrelvy',
	'Viberzi',
	'Xarelto',
	'Xeljanz',
	'Zenpep',
	'Zepatier',
	'Zubsolv',
];

async function getAuth2(
	url: string,
	data: { grant_type: string; username: string; password: string }
) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			// 'Content-Type': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams(data).toString(),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}

getAuth2(generalURL2, authData2).then((data) => {
	authToken2 = data.access_token;
	// getDoc2(
	// 	`https://www.medserviceswebpap.com/api/physician/getphysician?lname=Robertson%20II`
	// );
	// ); Farrah Stephens Jasmine Gray
	// deletePatient(
	// 	'https://www.medserviceswebpap.com/api/patient/deletepatient?patientId=187'
	// );
	// deleteDoc(
	// 	'https://www.medserviceswebpap.com/api/physician/deletephysician?physicianId=203'
	// );
	// deleteDoc(
	// 	'https://www.medserviceswebpap.com/api/physician/deletephysician?physicianId=180'
	// );
	// deleteDoc(
	// 	'https://www.medserviceswebpap.com/api/physician/deletephysician?physicianId=104'
	// );
	// getProgram(
	// 	'https://www.medserviceswebpap.com/api/search/availableprograms?drugId=192372'
	// );
	brandMeds2.forEach(async (med) => {
		await searchMed2(
			'https://www.medserviceswebpap.com/api/search/availabledrugs?drugname=' +
				med
		).then(async (data) => {
			await massOrders(med, data);
		});
	});
	// postDoctorData2(
	// 	'https://www.medserviceswebpap.com/api/physician/createphysician',
	// 	{
	// 		fname: 'test',
	// 		lname: 'test',
	// 	}
	// ).then((docdata) => {
	// 	console.log(docdata);
	// });

	// searchMed2(
	// 	'https://www.medserviceswebpap.com/api/search/availabledrugs?drugname=metformin'
	// );
});

async function searchMed2(url: string): Promise<any> {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken2}`,
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function deletePatient(url: string) {
	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken2}`,
		},
	});
}
async function deleteDoc(url: string) {
	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken2}`,
		},
	});
}
async function getDoc2(url: string) {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken2}`,
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function getPatients(url: string) {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken2}`,
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function getProgram(url: string) {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken2}`,
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function addDrugs2(data: any) {
	try {
		const response = await fetch(
			'https://www.medserviceswebpap.com/api/paporders/additem',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken2}`,
				},
				body: JSON.stringify(data),
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function massOrders(med: string, data: any) {
	const orderData = {
		customerId: 21,
		orderItems: [
			{
				ddi: `${data[0].DrugId}`,
				name: `${data[0].DrugName}`,
				program: '',
				pharmcoid: '',
				pharmco: 'Rx Outreach',
				physicianid: '187',
				qty: '90',
				sig: '1',
				diagnosis: 'test',
			},
		],
	};
	if (med === 'Anoro Ellipta') {
		orderData.orderItems[0].pharmco = 'GlaxoSmithKline';
		orderData.orderItems[0].pharmcoid = '5331';
		orderData.orderItems[0].program = 'GSK Patient Assistance Program';
	} else if (med === 'Adbry') {
		orderData.orderItems[0].pharmco = 'Leo Pharma Inc.';
		orderData.orderItems[0].pharmcoid = '7269';
		orderData.orderItems[0].program = 'Adbry Advocate Program';
	} else if (med === 'Admelog SoloStar') {
		orderData.orderItems[0].pharmco = 'Sanofi';
		orderData.orderItems[0].pharmcoid = '90';
		orderData.orderItems[0].program = 'Sanofi Patient Connection';
	} else if (med === 'Afrezza') {
		orderData.orderItems[0].pharmco = 'Sanofi Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '7070';
		orderData.orderItems[0].program = 'Afrezza Support Program';
	} else if (med === 'Aimovig') {
		orderData.orderItems[0].pharmco = 'Amgen, Inc.';
		orderData.orderItems[0].pharmcoid = '7537';
		orderData.orderItems[0].program = '(ASNF) Aimovig';
	} else if (med === 'Avsola') {
		orderData.orderItems[0].pharmco = 'Amgen, Inc.';
		orderData.orderItems[0].pharmcoid = '7078';
		orderData.orderItems[0].program = 'Amgen Safety Net Foundation (ASNF)';
	} else if (med === 'Basaglar KwikPen') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Biktarvy') {
		orderData.orderItems[0].pharmco = 'Gilead Sciences, Inc.';
		orderData.orderItems[0].pharmcoid = '6969';
		orderData.orderItems[0].program = 'Support Path Patient Assistance Program';
	} else if (med === 'Breo Ellipta') {
		orderData.orderItems[0].pharmco = 'GlaxoSmithKline';
		orderData.orderItems[0].pharmcoid = '5331';
		orderData.orderItems[0].program = 'GSK Patient Assistance Program';
	} else if (med === 'Botox Cosmetic') {
		orderData.orderItems[0].pharmco = 'Allergan';
		orderData.orderItems[0].pharmcoid = '3236';
		orderData.orderItems[0].program = 'Botox Patient Assistance Program';
	} else if (med === 'Botox') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '7538';
		orderData.orderItems[0].program = 'MyAbbvie Assist for Botox';
	} else if (med === 'Cimzia') {
		orderData.orderItems[0].pharmco = 'UCB, Inc.';
		orderData.orderItems[0].pharmcoid = '7081';
		orderData.orderItems[0].program = 'UCBCares Program';
	} else if (med === 'Combivent Respimat') {
		orderData.orderItems[0].pharmco =
			'Boehringer Ingelheim CARES Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '36';
		orderData.orderItems[0].program = 'BI Cares Patient Assistance Program';
	} else if (med === 'Cosentyx') {
		orderData.orderItems[0].pharmco = 'Novartis Pharmaceuticals Corporation';
		orderData.orderItems[0].pharmcoid = '56';
		orderData.orderItems[0].program =
			'Novartis Patient Assistance Foundation, Inc. (NPAF)';
	} else if (med === 'Creon 10') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '6910';
		orderData.orderItems[0].program =
			'myAbbVie Assist for Creon, Linzess, Viberzi';
	} else if (med === 'Delstrigo') {
		orderData.orderItems[0].pharmco = 'Merck & Co., Inc.';
		orderData.orderItems[0].pharmcoid = '7108';
		orderData.orderItems[0].program = 'Merck Connect';
	} else if (med === 'Dupixent') {
		orderData.orderItems[0].pharmco =
			'Sanofi and Regeneron Pharmaceuticals, Inc';
		orderData.orderItems[0].pharmcoid = '7461';
		orderData.orderItems[0].program =
			'Dupixent MyWay Program Allergists (AD, Asthma, CRSwNP)';
	} else if (med === 'Eliquis') {
		orderData.orderItems[0].pharmco = 'Bristol-Myers Squibb Company';
		orderData.orderItems[0].pharmcoid = '37';
		orderData.orderItems[0].program =
			'Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)';
	} else if (med === 'Emgality') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Enbrel') {
		orderData.orderItems[0].pharmco = 'Amgen, Inc.';
		orderData.orderItems[0].pharmcoid = '7541';
		orderData.orderItems[0].program = 'Amgen Enbrel';
	} else if (med === 'Entyvio') {
		orderData.orderItems[0].pharmco = 'Takeda Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '7137';
		orderData.orderItems[0].program = 'Entyvio Patient Assistance Program';
	} else if (med === 'Epclusa') {
		orderData.orderItems[0].pharmco = 'Gilead Sciences, Inc.';
		orderData.orderItems[0].pharmcoid = '46';
		orderData.orderItems[0].program = 'Advancing Access Program';
	} else if (med === 'Eucrisa') {
		orderData.orderItems[0].pharmco = 'Pfizer, Inc.';
		orderData.orderItems[0].pharmcoid = '7342';
		orderData.orderItems[0].program = 'Pzifer Dermatology Patient Access';
	} else if (med === 'Evotaz') {
		orderData.orderItems[0].pharmco = 'Bristol-Myers Squibb Company';
		orderData.orderItems[0].pharmcoid = '5335';
		orderData.orderItems[0].program =
			'Access Virology Patient Assistance Program';
	} else if (med === 'Fasenra') {
		orderData.orderItems[0].pharmco = 'Astrazeneca Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '31';
		orderData.orderItems[0].program =
			'AZ&Me Prescription Savings Program for people without insurance';
	} else if (med === 'Forteo') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'HumaLOG') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Humira') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '203';
		orderData.orderItems[0].program = 'myAbbvie Assist for Humira';
	} else if (med === 'inFLIXimab') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Insulin Degludec') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Invokana') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Janumet') {
		orderData.orderItems[0].pharmco = 'Merck & Co., Inc.';
		orderData.orderItems[0].pharmcoid = '7108';
		orderData.orderItems[0].program = 'Merck Connect';
	} else if (med === 'Januvia') {
		orderData.orderItems[0].pharmco = 'Merck & Co., Inc.';
		orderData.orderItems[0].pharmcoid = '7108';
		orderData.orderItems[0].program = 'Merck Connect';
	} else if (med === 'Jardiance') {
		orderData.orderItems[0].pharmco = 'Boehringer Ingelheim';
		orderData.orderItems[0].pharmcoid = '36';
		orderData.orderItems[0].program = 'BI Cares Patient Assistance Program';
	} else if (med === 'Kazano') {
		orderData.orderItems[0].pharmco = 'Takeda Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '221';
		orderData.orderItems[0].program = 'Help at Hand Patient Assistance Program';
	} else if (med === 'Lantus') {
		orderData.orderItems[0].pharmco = 'Sanofi';
		orderData.orderItems[0].pharmcoid = '90';
		orderData.orderItems[0].program = 'Sanofi Patient Connection';
	} else if (med === 'Linzess') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '6910';
		orderData.orderItems[0].program =
			'myAbbVie Assist for Creon, Linzess, Viberzi';
	} else if (med === 'Lovenox') {
		orderData.orderItems[0].pharmco = 'Sanofi';
		orderData.orderItems[0].pharmcoid = '90';
		orderData.orderItems[0].program = 'Sanofi Patient Connection';
	} else if (med === 'Lyumjev') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Motegrity') {
		orderData.orderItems[0].pharmco = 'Takeda Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '221';
		orderData.orderItems[0].program = 'Help at Hand Patient Assistance Program';
	} else if (med === 'Multaq') {
		orderData.orderItems[0].pharmco = 'Sanofi';
		orderData.orderItems[0].pharmcoid = '90';
		orderData.orderItems[0].program = 'Sanofi Patient Connection';
	} else if (med === 'Nesina') {
		orderData.orderItems[0].pharmco = 'Takeda Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '221';
		orderData.orderItems[0].program = 'Help at Hand Patient Assistance Program';
	} else if (med === 'NovoLIN 70/30') {
		orderData.orderItems[0].pharmco = 'Novo Nordisk';
		orderData.orderItems[0].pharmcoid = '6993';
		orderData.orderItems[0].program = 'Novo Nordisk Patient Assistance Program';
	} else if (med === 'NovoLOG') {
		orderData.orderItems[0].pharmco = 'Novo Nordisk';
		orderData.orderItems[0].pharmcoid = '6993';
		orderData.orderItems[0].program = 'Novo Nordisk Patient Assistance Program';
	} else if (med === 'Nucala') {
		orderData.orderItems[0].pharmco = 'GlaxoSmithKline';
		orderData.orderItems[0].pharmcoid = '7178';
		orderData.orderItems[0].program = 'GSK Patient Assistance Program (Nucala)';
	} else if (med === 'Nurtec') {
		orderData.orderItems[0].pharmco = 'Pfizer, Inc.';
		orderData.orderItems[0].pharmcoid = '7542';
		orderData.orderItems[0].program = 'Pfizer Nurtec';
	} else if (med === 'Ocrevus') {
		orderData.orderItems[0].pharmco = 'Genentech USA, Inc.';
		orderData.orderItems[0].pharmcoid = '7123';
		orderData.orderItems[0].program = 'Genentech Patient Foundation';
	} else if (med === 'Olumiant') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Ozempic') {
		orderData.orderItems[0].pharmco = 'Novo Nordisk';
		orderData.orderItems[0].pharmcoid = '6993';
		orderData.orderItems[0].program = 'Novo Nordisk Patient Assistance Program';
	} else if (med === 'Prezcobix') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Prolia') {
		orderData.orderItems[0].pharmco = 'Amgen, Inc.';
		orderData.orderItems[0].pharmcoid = '7543';
		orderData.orderItems[0].program = 'Amgen Safety Net Foundation (ASNF)';
	} else if (med === 'Qulipta') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '7538';
		orderData.orderItems[0].program =
			'MyAbbvie Assist Patient Assistance Program';
	} else if (med === 'Remicade') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Rexulti') {
		orderData.orderItems[0].pharmco =
			'Otsuka Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '7084';
		orderData.orderItems[0].program = 'Otsuka PAP-Rexulti';
	} else if (med === 'Rinvoq') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '7538';
		orderData.orderItems[0].program =
			'MyAbbvie Assist Patient Assistance Program';
	} else if (med === 'Rybelsus') {
		orderData.orderItems[0].pharmco = 'Novo Nordisk';
		orderData.orderItems[0].pharmcoid = '6993';
		orderData.orderItems[0].program = 'Novo Nordisk Patient Assistance Program';
	} else if (med === 'Simponi') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Simponi Aria') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Skyrizi') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '7538';
		orderData.orderItems[0].program =
			'MyAbbvie Assist Patient Assistance Program';
	} else if (med === 'Steglatro') {
		orderData.orderItems[0].pharmco = 'Merck & Co., Inc.';
		orderData.orderItems[0].pharmcoid = '7108';
		orderData.orderItems[0].program = 'Merck Connect';
	} else if (med === 'Stelara') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Stiolto Respimat') {
		orderData.orderItems[0].pharmco =
			'Boehringer Ingelheim CARES Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '36';
		orderData.orderItems[0].program = 'BI Cares Patient Assistance Program';
	} else if (med === 'Symtuza') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Taltz') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Tobi Podhaler') {
		orderData.orderItems[0].pharmco = 'Novartis Pharmaceuticals Corporation';
		orderData.orderItems[0].pharmcoid = '56';
		orderData.orderItems[0].program =
			'Novartis Patient Assistance Foundation, Inc. (NPAF)';
	} else if (med === 'Toujeo SoloStar') {
		orderData.orderItems[0].pharmco = 'Sanofi';
		orderData.orderItems[0].pharmcoid = '90';
		orderData.orderItems[0].program = 'Sanofi Patient Connection';
	} else if (med === 'Trelegy Ellipta') {
		orderData.orderItems[0].pharmco = 'GlaxoSmithKline';
		orderData.orderItems[0].pharmcoid = '5331';
		orderData.orderItems[0].program = 'GSK Patient Assistance Program';
	} else if (med === 'Tremfya') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Tresiba') {
		orderData.orderItems[0].pharmco = 'Novo Nordisk';
		orderData.orderItems[0].pharmcoid = '6993';
		orderData.orderItems[0].program = 'Novo Nordisk Patient Assistance Program';
	} else if (med === 'Trintellix') {
		orderData.orderItems[0].pharmco = 'Takeda Pharmaceuticals';
		orderData.orderItems[0].pharmcoid = '221';
		orderData.orderItems[0].program = 'Help at Hand Patient Assistance Program';
	} else if (med === 'Truvada ') {
		orderData.orderItems[0].pharmco = 'Gilead Sciences, Inc.';
		orderData.orderItems[0].pharmcoid = '6969';
		orderData.orderItems[0].program = 'Support Path Patient Assistance Program';
	} else if (med === 'Trulicity') {
		orderData.orderItems[0].pharmco = 'Lilly USA, LLC.';
		orderData.orderItems[0].pharmcoid = '52';
		orderData.orderItems[0].program =
			'Lilly Cares Foundation Patient Assistance Program';
	} else if (med === 'Ubrelvy') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '7538';
		orderData.orderItems[0].program =
			'MyAbbvie Assist Patient Assistance Program';
	} else if (med === 'Viberzi') {
		orderData.orderItems[0].pharmco = 'AbbVie Inc.';
		orderData.orderItems[0].pharmcoid = '6910';
		orderData.orderItems[0].program =
			'myAbbVie Assist for Creon, Linzess, Viberzi';
	} else if (med === 'Xarelto') {
		orderData.orderItems[0].pharmco =
			'Johnson & Johnson Patient Assistance Foundation, Inc.';
		orderData.orderItems[0].pharmcoid = '5091';
		orderData.orderItems[0].program = 'Patient Assistance Program';
	} else if (med === 'Xeljanz') {
		orderData.orderItems[0].pharmco = 'Pfizer, Inc.';
		orderData.orderItems[0].pharmcoid = '7342';
		orderData.orderItems[0].program = 'Pzifer Dermatology Patient Access';
	} else if (med === 'Zenpep') {
		orderData.orderItems[0].pharmco = 'Nestle HealthCare Nutrition';
		orderData.orderItems[0].pharmcoid = '7109';
		orderData.orderItems[0].program = 'Nestle Nutrition Patient Care';
	} else if (med === 'Zepatier') {
		orderData.orderItems[0].pharmco = 'Merck & Co., Inc.';
		orderData.orderItems[0].pharmcoid = '7108';
		orderData.orderItems[0].program = 'Merck Connect';
	} else if (med === 'Zubsolv') {
		orderData.orderItems[0].pharmco = 'Orexo US, Inc.';
		orderData.orderItems[0].pharmcoid = '7018';
		orderData.orderItems[0].program = 'Zubsolv Patient Assistance Program';
	}

	console.log(orderData);
	addDrugs2(orderData);
}
//
// if (
// 	option.getAttribute('cd-program')! === 'GSK Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'GlaxoSmithKline';
// 	orderItem.pharmcoid = '5331';
// } else if (
// 	option.getAttribute('cd-program')! === 'Adbry Advocate Program'
// ) {
// 	orderItem.pharmco = 'Leo Pharma Inc.';
// 	orderItem.pharmcoid = '7269';
// } else if (
// 	option.getAttribute('cd-program')! === 'myAbbvie Assist for Humira'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '203';
// } else if (
// 	option.getAttribute('cd-program')! === 'Afrezza Support Program'
// ) {
// 	orderItem.pharmco = 'Sanofi Pharmaceuticals';
// 	orderItem.pharmcoid = '7070';
// } else if (option.getAttribute('cd-program')! === '(ASNF) Aimovig') {
// 	orderItem.pharmco = 'Amgen, Inc.';
// 	orderItem.pharmcoid = '7537';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Dupixent MyWay Program Allergists (AD, Asthma, CRSwNP)'
// ) {
// 	orderItem.pharmco = 'Sanofi and Regeneron Pharmaceuticals, Inc';
// 	orderItem.pharmcoid = '7461';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Zubsolv Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Orexo US, Inc';
// 	orderItem.pharmcoid = '7018';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Entyvio Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Takeda Pharmaceuticals';
// 	orderItem.pharmcoid = '7137';
// } else if (option.getAttribute('cd-program')! === 'Otsuka PAP-Rexulti') {
// 	orderItem.pharmco = 'Otsuka Patient Assistance Foundation, Inc.';
// 	orderItem.pharmcoid = '7084';
// } else if (option.getAttribute('cd-program')! === 'Amgen Enbrel') {
// 	orderItem.pharmco = 'Amgen, Inc.';
// 	orderItem.pharmcoid = '7541';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)'
// ) {
// 	orderItem.pharmco = 'Bristol-Myers Squibb Company';
// 	orderItem.pharmcoid = '37';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Help at Hand Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Takeda Pharmaceuticals';
// 	orderItem.pharmcoid = '221';
// } else if (
// 	option.getAttribute('cd-program')! === 'Sanofi Patient Connection'
// ) {
// 	orderItem.pharmco = 'Sanofi';
// 	orderItem.pharmcoid = '90';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'BI Cares Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Boehringer Ingelheim CARES Foundation, Inc.';
// 	orderItem.pharmcoid = '36';
// } else if (
// 	option.getAttribute('cd-program')! === 'Patient Assistance Program'
// ) {
// 	orderItem.pharmco =
// 		'Johnson & Johnson Patient Assistance Foundation, Inc.';
// 	orderItem.pharmcoid = '5091';
// } else if (option.getAttribute('cd-program')! === 'Xelsource : Xeljanz') {
// 	orderItem.pharmco = 'Pfizer, Inc.';
// 	orderItem.pharmcoid = '7145';
// } else if (option.getAttribute('cd-program')! === 'Pfizer Nurtec') {
// 	orderItem.pharmco = 'Pfizer, Inc.';
// 	orderItem.pharmcoid = '7542';
// } else if (option.getAttribute('cd-program')! === 'Merck Connect') {
// 	orderItem.pharmco = 'Merck & Co., Inc.';
// 	orderItem.pharmcoid = '7108';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'GSK Patient Assistance Program (Nucala)'
// ) {
// 	orderItem.pharmco = 'GlaxoSmithKline';
// 	orderItem.pharmcoid = '7178';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Pzifer Dermatology Patient Access'
// ) {
// 	orderItem.pharmco = 'Pfizer, Inc.';
// 	orderItem.pharmcoid = '7342';
// } else if (
// 	option.getAttribute('cd-program')! === 'MyAbbvie Assist for Botox'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '7538';
// } else if (
// 	option.getAttribute('cd-program')! === 'myAbbVie Assist for Skyrizi'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '7122';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'myAbbVie Assist for Creon, Linzess, Viberzi'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '6910';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Nestle Health Science Patient Ass'
// ) {
// 	orderItem.pharmco = 'Nestle Health Science';
// 	orderItem.pharmcoid = '6818';
// } else if (
// 	option.getAttribute('cd-program')! === 'myAbbVie Assist for Rinvoq'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '7141';
// } else if (option.getAttribute('cd-program')! === 'UCBCares Program') {
// 	orderItem.pharmco = 'UCB, Inc.';
// 	orderItem.pharmcoid = '7081';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Novartis Patient Assistance Foundation, Inc. (NPAF)'
// ) {
// 	orderItem.pharmco = 'Novartis Pharmaceuticals Corporation';
// 	orderItem.pharmcoid = '56';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Novo Nordisk Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Novo Nordisk';
// 	orderItem.pharmcoid = '6993';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Dexcom Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Dexcom, Inc.';
// 	orderItem.pharmcoid = '7535';
// } else if (
// 	option.getAttribute('cd-program')! === 'Genentech Patient Foundation'
// ) {
// 	orderItem.pharmco = 'Genentech USA, Inc.';
// 	orderItem.pharmcoid = '7123';
// } else if (option.getAttribute('cd-program')! === 'Wegovy Savings Card') {
// 	orderItem.pharmco = 'Novo Nordisk';
// 	orderItem.pharmcoid = '7539';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Amgen Safety Net Foundation (ASNF)'
// ) {
// 	orderItem.pharmco = 'Amgen, Inc';
// 	orderItem.pharmcoid = '7078';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Support Path Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Gilead Sciences, Inc.';
// 	orderItem.pharmcoid = '6969';
// } else if (
// 	option.getAttribute('cd-program')! === 'Advancing Access Program'
// ) {
// 	orderItem.pharmco = 'Gilead Sciences, Inc.';
// 	orderItem.pharmcoid = '46';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'myAbbVie Assist Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'AbbVie Inc.';
// 	orderItem.pharmcoid = '7208';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Lilly Cares Foundation Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Lilly USA, LLC.';
// 	orderItem.pharmcoid = '52';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Lilly Insulin Value Program - Savings Card'
// ) {
// 	orderItem.pharmco = 'Lilly';
// 	orderItem.pharmcoid = '7507';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Access Virology Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Bristol-Myers Squibb Company';
// 	orderItem.pharmcoid = '5335';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Botox Patient Assistance Program'
// ) {
// 	orderItem.pharmco = 'Allergan';
// 	orderItem.pharmcoid = '3236';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'AZ&Me Prescription Savings Program for people without insurance'
// ) {
// 	orderItem.pharmco = 'Astrazeneca Pharmaceuticals';
// 	orderItem.pharmcoid = '31';
// } else if (
// 	option.getAttribute('cd-program')! ===
// 	'Merck Patient Assistance Program, Inc.'
// ) {
// 	orderItem.pharmco = 'Merck Patient Assistance Program, Inc.';
// 	orderItem.pharmcoid = '172';
// }

// orderItem.diagnosis = option.getAttribute('cd-diagnosis')!;
// if (orderItem.ddi === '') {
// 	orderItem.ddi = option.getAttribute('cd-webpap-id')!;
// }
