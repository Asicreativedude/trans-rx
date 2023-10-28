interface webPapData {
	[key: string]: string;
}
//@ts-ignore
interface OrderItem {
	ddi: string;
	name: string;
	program: string;
	pharmco: string;
	pharmcoid: string;
	physicianid: string;
	qty: string;
	sig: string;
	diagnosis: string;
}
const brandMeds = [
	'Enbrel',
	'Humira',
	'Humulin N (U 100 Injection)',
	'Breo Ellipta',
	'Trelegy Ellipta',
	'Xarelto',
	'Wegovy',
	'Ozempic',
	'Skyrizi',
	'HumaLOG',
	'Ozempic (0.25 or 0.5 MG/DOSE)',
	'Ozempic (1 MG/DOSE)',
	'Ozempic (2 MG/DOSE)',
	'Skyrizi',
	'Skyrizi (150 MG Dose)',
	'HumaLOG',
	'HumaLOG KwikPen',
	'HumaLOG Mix 50/50',
	'HumaLOG Mix 75/25',
	'HumaLOG Mix 75/25 KwikPen',
	'Dexcom G6 Receiver',
	'Dexcom G7 Receiver',
	'Dexcom G7 Sensor',
	'Dexcom G6 Sensor',
	'Dexcom G6 Transmitter',
	'Xeljanz',
	'Xeljanz XR',
	'Rybelsus',
	'OCREVUS',
	'Botox for migraines',
	'Cosentyx (300 MG Dose)',
	'Cosentyx',
	'Cosentyx Sensoready Pen',
	'Jardiance',
	'Multaq',
	'Januvia',
	'Suboxone',
	'Janumet',
	'Janumet XR',
	'Fasenra',
	'Emgality',
	'Qulipta',
	'Prolia',
	'EPCLUSA',
	'Tresiba',
	'Tresiba FlexTouch',
	'Trintellix',
	'Eliquis',
	'Prodigy AutoCode Blood Glucose Monitor',
	'Biktarvy',
	'Strelara',
	'Anoro Ellipta',
	'Zubsolv',
	'Rexulti',
	'Taltz',
	'Creon',
	'Rinvoq',
	'Cimzia',
	'Lovenox',
	'Lantus',
];
const patientData: webPapData = {
	fname: '',
	lname: '',
	mname: '',
	dob: '',
	ssn: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	email: '',
	marital: '',
	residency: '',
	employed: '',
	sex: '',
	disabled: '',
	numinhouse: '',
	EmerContactName: '',
	EmerContactPhone1: '',
};
const patientIncomeData: webPapData = {
	patwages: '',
	patdisab: '',
	patunemploy: '',
};

const doctorData: webPapData = {
	fname: '',
	mname: '',
	lname: '',
	email: '',
	phone: '',
	fax: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	id: '',
};
const doctor2Data: webPapData = {
	fname: '',
	mname: '',
	lname: '',
	email: '',
	phone: '',
	fax: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	id: '',
};

const submitBtn = document.querySelector(
	'[cd="submit-data"]'
) as HTMLButtonElement;

let patientId: number = 0;
let authToken: string = '';
let insurance: string = '';
// webPap get authtoken Api
const createURL = 'https://www.medserviceswebpap.com/api/patient/createpatient';
const createDoctorURL =
	'https://www.medserviceswebpap.com/api/physician/createphysician';
const generalURL = 'https://www.medserviceswebpap.com/auth/token?hcpid=89';
const authData = {
	grant_type: 'password',
	username: import.meta.env.VITE_USERNAME,
	password: import.meta.env.VITE_PASSWORD,
};
async function getAuth(
	url: string,
	data: { grant_type: string; username: string; password: string }
) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams(data).toString(),
	});
	if (!response.ok) {
		//@ts-ignore
		// Sentry.captureException(response.statusText);
		throw new Error(response.statusText);
	}

	return response.json();
}

async function postDoctorData(url: string, data: webPapData) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const docData = await response.json();

		data.id = docData.Id;
		console.log(data);
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}

async function postData(url: string, data: webPapData) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const responseJson = await response.json();
		patientId = responseJson.Id;
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}
async function postIncomeData(url: string, data: webPapData) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}
async function postIsuranceData(url: string, data: string) {
	let insuranceData;
	data === 'private'
		? (insuranceData = {
				privateins: 'true',
		  })
		: (insuranceData = {
				none: 'true',
		  });

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(insuranceData),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}
async function getDoc(url: string) {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}
async function addDrugs(data: any) {
	try {
		const response = await fetch(
			'https://www.medserviceswebpap.com/api/paporders/additem',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(data),
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let res = await response.json();
		console.log(res);
		return res;
	} catch (err) {
		//@ts-ignore
		Sentry.captureException(err);
		console.log(err);
	}
}

let addDrugData = {
	CustomerId: '',
	OrderItems: [] as OrderItem[],
};
async function getDrugData() {
	function setOrder(row: HTMLElement) {
		let orderItem = {
			ddi: '',
			name: '',
			program: '',
			pharmcoid: '6825',
			pharmco: 'Rx Outreach',
			physicianid: '',
			qty: '90',
			sig: '',
			diagnosis: '',
		};

		let fields = row.querySelectorAll(
			'.input-field'
		) as NodeListOf<HTMLInputElement>;
		fields.forEach((field) => {
			if (field.name.includes('med-name')) {
				let fieldOption = '';
				field.querySelectorAll('option').forEach((option) => {
					if (option.value === field.value) {
						fieldOption = option.getAttribute('cd-webpap-name')!;
						orderItem.program = option.getAttribute('cd-program')!;
						if (
							option.getAttribute('cd-program')! ===
							'GSK Patient Assistance Program'
						) {
							orderItem.pharmco = 'GlaxoSmithKline';
							orderItem.pharmcoid = '5331';
						} else if (
							option.getAttribute('cd-program')! ===
							'myAbbvie Assist for Humira'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '203';
						} else if (
							option.getAttribute('cd-program')! ===
							'Zubsolv Patient Assistance Program'
						) {
							orderItem.pharmco = 'Orexo US, Inc';
							orderItem.pharmcoid = '7018';
						} else if (
							option.getAttribute('cd-program')! === 'Otsuka PAP-Rexulti'
						) {
							orderItem.pharmco = 'Otsuka Patient Assistance Foundation, Inc.';
							orderItem.pharmcoid = '7084';
						} else if (option.getAttribute('cd-program')! === 'Amgen Enbrel') {
							orderItem.pharmco = 'Amgen, Inc.';
							orderItem.pharmcoid = '7541';
						} else if (
							option.getAttribute('cd-program')! ===
							'Bristol-Myers Squibb Patient Assistance Foundation (BMSPAF)'
						) {
							orderItem.pharmco = 'Bristol-Myers Squibb Company';
							orderItem.pharmcoid = '37';
						} else if (
							option.getAttribute('cd-program')! ===
							'Help at Hand Patient Assistance Program'
						) {
							orderItem.pharmco = 'Takeda Pharmaceuticals';
							orderItem.pharmcoid = '221';
						} else if (
							option.getAttribute('cd-program')! === 'Sanofi Patient Connection'
						) {
							orderItem.pharmco = 'Sanofi';
							orderItem.pharmcoid = '90';
						} else if (
							option.getAttribute('cd-program')! ===
							'BI Cares Patient Assistance Program'
						) {
							orderItem.pharmco = 'Boehringer Ingelheim CARES Foundation, Inc.';
							orderItem.pharmcoid = '36';
						} else if (
							option.getAttribute('cd-program')! ===
							'Patient Assistance Program'
						) {
							orderItem.pharmco =
								'Johnson & Johnson Patient Assistance Foundation, Inc.';
							orderItem.pharmcoid = '5091';
						} else if (
							option.getAttribute('cd-program')! === 'Xelsource : Xeljanz'
						) {
							orderItem.pharmco = 'Pfizer, Inc.';
							orderItem.pharmcoid = '7145';
						} else if (
							option.getAttribute('cd-program')! === 'MyAbbvie Assist for Botox'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '7538';
						} else if (
							option.getAttribute('cd-program')! ===
							'myAbbVie Assist for Skyrizi'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '7122';
						} else if (
							option.getAttribute('cd-program')! ===
							'myAbbVie Assist for Creon, Linzess, Viberzi'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '6910';
						} else if (
							option.getAttribute('cd-program')! ===
							'myAbbVie Assist for Rinvoq'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '7141';
						} else if (
							option.getAttribute('cd-program')! === 'UCBCares Program'
						) {
							orderItem.pharmco = 'UCB, Inc.';
							orderItem.pharmcoid = '7081';
						} else if (
							option.getAttribute('cd-program')! ===
							'Novartis Patient Assistance Foundation, Inc. (NPAF)'
						) {
							orderItem.pharmco = 'Novartis Pharmaceuticals Corporation';
							orderItem.pharmcoid = '56';
						} else if (
							option.getAttribute('cd-program')! ===
							'Novo Nordisk Patient Assistance Program'
						) {
							orderItem.pharmco = 'Novo Nordisk';
							orderItem.pharmcoid = '6993';
						} else if (
							option.getAttribute('cd-program')! ===
							'Dexcom Patient Assistance Program'
						) {
							orderItem.pharmco = 'Dexcom, Inc.';
							orderItem.pharmcoid = '7535';
						} else if (
							option.getAttribute('cd-program')! ===
							'Genentech Patient Foundation'
						) {
							orderItem.pharmco = 'Genentech USA, Inc.';
							orderItem.pharmcoid = '7123';
						} else if (
							option.getAttribute('cd-program')! === 'Wegovy Savings Card'
						) {
							orderItem.pharmco = 'Novo Nordisk';
							orderItem.pharmcoid = '7539';
						} else if (
							option.getAttribute('cd-program')! ===
							'Amgen Safety Net Foundation (ASNF)'
						) {
							orderItem.pharmco = 'Amgen, Inc';
							orderItem.pharmcoid = '7078';
						} else if (
							option.getAttribute('cd-program')! ===
							'Support Path Patient Assistance Program'
						) {
							orderItem.pharmco = 'Gilead Sciences, Inc.';
							orderItem.pharmcoid = '6969';
						} else if (
							option.getAttribute('cd-program')! === 'Advancing Access Program'
						) {
							orderItem.pharmco = 'Gilead Sciences, Inc.';
							orderItem.pharmcoid = '46';
						} else if (
							option.getAttribute('cd-program')! ===
							'myAbbVie Assist Patient Assistance Program'
						) {
							orderItem.pharmco = 'AbbVie Inc.';
							orderItem.pharmcoid = '7208';
						} else if (
							option.getAttribute('cd-program')! ===
							'Lilly Cares Foundation Patient Assistance Program'
						) {
							orderItem.pharmco = 'Lilly USA, LLC.';
							orderItem.pharmcoid = '52';
						} else if (
							option.getAttribute('cd-program')! ===
							'AZ&Me Prescription Savings Program for people without insurance'
						) {
							orderItem.pharmco = 'Astrazeneca Pharmaceuticals';
							orderItem.pharmcoid = '31';
						} else if (
							option.getAttribute('cd-program')! ===
							'Merck Patient Assistance Program, Inc.'
						) {
							orderItem.pharmco = 'Merck Patient Assistance Program, Inc.';
							orderItem.pharmcoid = '172';
						}

						orderItem.diagnosis = option.getAttribute('cd-diagnosis')!;
						if (orderItem.ddi === '') {
							orderItem.ddi = option.getAttribute('cd-webpap-id')!;
						}
					}
				});
				orderItem.name = fieldOption;
			} else if (field.name.includes('med-strength')) {
				let fieldOption = '';
				field.querySelectorAll('option').forEach((option) => {
					if (option.innerHTML === field.value) {
						fieldOption = option.getAttribute('cd-webpap-id')!;
					}
				});
				if (fieldOption !== '') orderItem.ddi = fieldOption;
			} else if (field.name.includes('Frequency')) {
				orderItem.sig = field.value;
			} else if (field.name.includes('Doctor')) {
				orderItem.physicianid = field.value;
			}
		});
		addDrugData.OrderItems.push(orderItem);
	}
	const rows = document.querySelectorAll('[cd="med"]');
	rows.forEach((row) => {
		if ((row.querySelector('.select-doc')! as HTMLInputElement).value === '') {
			return;
		}
		setOrder(row as HTMLElement);
	});
}

submitBtn.addEventListener('click', () => {
	sendToWebpap();
});

async function sendToWebpap() {
	// //patient address

	//@ts-ignore
	if (patientAddress) {
		//@ts-ignore
		patientAddress.forEach((component) => {
			let componentType = component.types[0];
			switch (componentType) {
				case 'street_number': {
					patientData['address'] = `${component.long_name} `;
					break;
				}
				case 'route': {
					patientData['address'] += component.short_name;
					break;
				}
				case 'locality':
					patientData['city'] = component.long_name;
					break;
				case 'administrative_area_level_1': {
					patientData['state'] = component.short_name;
					break;
				}
			}
		});
	}
	//doctor address
	//@ts-ignore
	if (doctorAddress) {
		//@ts-ignore
		doctorAddress.forEach((component) => {
			let componentType = component.types[0];
			switch (componentType) {
				case 'street_number': {
					doctorData['address'] = `${component.long_name} `;
					break;
				}
				case 'route': {
					doctorData['address'] += component.short_name;
					break;
				}
				case 'locality':
					doctorData['city'] = component.long_name;
					break;
				case 'administrative_area_level_1': {
					doctorData['state'] = component.short_name;
					break;
				}
			}
		});
	}
	//@ts-ignore
	if (doctor2Address) {
		//@ts-ignore
		doctor2Address.forEach((component) => {
			let componentType = component.types[0];
			switch (componentType) {
				case 'street_number': {
					doctor2Data['address'] = `${component.long_name} `;
					break;
				}
				case 'route': {
					doctor2Data['address'] += component.short_name;
					break;
				}
				case 'locality':
					doctor2Data['city'] = component.long_name;
					break;
				case 'administrative_area_level_1': {
					doctor2Data['state'] = component.short_name;
					break;
				}
			}
		});
	}
	const allFields: any = [];
	(
		document.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
	).forEach((field) => {
		let fieldId = field.id;
		let value = field.value;
		if (fieldId.includes('phone') || fieldId.includes('fax')) {
			// remove all non-numric characters
			value = value.replace(/\D/g, '');
		}
		allFields.push({ field: fieldId, value: value });
	});
	(
		document.querySelectorAll(
			'input[type=radio]:checked'
		) as NodeListOf<HTMLInputElement>
	).forEach((field) => {
		let fieldId = field.name;
		let value = field.id;
		allFields.push({ field: fieldId, value: value });
	});
	//@ts-ignore
	allFields.forEach((data: { field: string; value: string }) => {
		if (data.field === 'insurance-field') {
			insurance = data.value;
			return;
		}
		if (data.field === 'patwages') {
			patientIncomeData[data.field] = data.value.slice(1);
			return;
		}
		if (data.field.includes('doc-')) {
			let field = data.field.split('-')[1];
			doctorData[field] = data.value;
			return;
		}
		if (data.field.includes('doc2-')) {
			let field = data.field.split('-')[1];
			doctor2Data[field] = data.value;
			return;
		}
		if (data.field === 'month') {
			patientData['dob'] = `${data.value}`;
			return;
		}
		if (data.field === 'day' || data.field === 'year') {
			patientData['dob'] = `${patientData['dob']}/${data.value}`;
			return;
		}
		if (data.field === 'residency' || data.field === 'disabled') {
			patientData[data.field] = data.value === 'Yes' ? 'true' : 'false';
			return;
		}
		if (data.field === 'ssn') {
			patientData[data.field] = data.value.replace(/-/g, '');
			return;
		}
		patientData[data.field] = data.value;
	});

	await sendData().then(() => {
		window.location.replace('https://www.transparentpricerx.com/thank-you');
	});
}

async function sendData() {
	return new Promise<void>(async (resolve, reject) => {
		try {
			await getAuth(generalURL, authData)
				.then((data) => {
					authToken = data.access_token;
				})
				.then(async () => {
					await postData(createURL, patientData);
					let incomeUrl = `https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${patientId}`;
					await postIncomeData(incomeUrl, patientIncomeData);
					addDrugData.CustomerId = `${patientId}`;
					let insuranceUrl = `https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${patientId}`;
					await postIsuranceData(insuranceUrl, insurance);
					await postDoctorData(createDoctorURL, doctorData);

					if (
						(document.getElementById('doc2-fname') as HTMLInputElement)!
							.value !== ''
					) {
						await postDoctorData(createDoctorURL, doctor2Data);
					}
					await getDrugData();
					await Promise.all(
						addDrugData.OrderItems.map(async (item) => {
							console.log(item.pharmco);
							await getDoc(
								`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${doctorData.fname}&lname=${doctorData.lname}`
							);
							if (
								item.physicianid.includes(doctorData.fname) &&
								item.physicianid.includes(doctorData.lname)
							) {
								item.physicianid = doctorData.id;
							}
						})
					).then(() => {
						console.log(addDrugData);
					});
					await addDrugs(addDrugData);
				});
			resolve();
		} catch (error) {
			reject(error);
		}
	});
}

function fillSegmentFields() {
	const segmentField = document.getElementById(
		'segment-field'
	) as HTMLInputElement;

	for (let i = 1; i < 4; i++) {
		const selectElement = document.getElementById(
			`med-name-${i}`
		) as HTMLSelectElement;
		const value = selectElement.value;
		if (value === '') return;
		if (value !== brandMeds.find((med) => med === value)) {
			if (segmentField.value === 'Brand') {
				segmentField.value = 'Both';
				return;
			}
			segmentField.value = 'Generic';
			return;
		} else {
			if (segmentField.value === 'Generic') {
				segmentField.value = 'Both';
				return;
			}
			segmentField.value = 'Brand';
		}
	}
}

//populate year select field
const yearSelect = document.getElementById('year') as HTMLSelectElement;
const years = 105;
for (let i = years; i > 0; i--) {
	const option = document.createElement('option');
	option.text = `${i + 1900}`;
	option.value = `${i + 1900}`;
	yearSelect.add(option);
}

function createMultiStepForm(
	elements: NodeListOf<HTMLElement>,
	prevButton: HTMLButtonElement,
	nextButton: HTMLButtonElement,
	indicatiors: NodeListOf<HTMLElement>
) {
	let currentStep = 0;
	prevButton.style.display = 'none';
	const numSteps = elements.length;

	// Hide all elements except the first one
	elements.forEach((element, index) => {
		if (index !== currentStep) {
			element.style.display = 'none';
		}
	});

	// Add event listeners to the buttons
	prevButton.addEventListener('click', () => {
		if (currentStep > 0) {
			elements[currentStep].style.display = 'none';
			currentStep--;
			elements[currentStep].style.display = 'block';
		}
		indicatiors.forEach((indicator, index) => {
			if (index !== currentStep) {
				indicator.classList.remove('current');
			} else {
				indicator.classList.add('current');
			}
		});
		if (currentStep === 0) {
			prevButton.style.display = 'none';
		} else {
			prevButton.style.display = 'block';
		}
		if (currentStep === 3) {
			nextButton.innerHTML = 'Continue';
		}
	});

	nextButton.addEventListener('click', () => {
		const inputs = elements[currentStep].querySelectorAll(
			'input'
		) as NodeListOf<HTMLInputElement>;
		const selects = elements[currentStep].querySelectorAll(
			'select'
		) as NodeListOf<HTMLSelectElement>;

		if (!validateForm(inputs, selects, currentStep)) {
			return;
		}
		if (currentStep === 3) {
			fillSegmentFields();
			(document.querySelector('.payment-trigger') as HTMLElement).click();
			(document.querySelector('.submit-btn') as HTMLButtonElement)!.click();
			return;
		} else {
			if (currentStep < numSteps - 1) {
				elements[currentStep].style.display = 'none';
				currentStep++;
				elements[currentStep].style.display = 'block';
			}
			indicatiors.forEach((indicator, index) => {
				if (index !== currentStep) {
					indicator.classList.remove('current');
				} else {
					indicator.classList.add('current');
				}
			});
			if (currentStep === 0) {
				prevButton.style.display = 'none';
			} else {
				prevButton.style.display = 'block';
			}
			if (currentStep === 3) {
				nextButton.innerHTML = 'Continue To Payment';
			}
		}
	});
}

const elements = document.querySelectorAll(
	'[cd-form = step]'
) as NodeListOf<HTMLElement>;
const prevButton = document.querySelector(
	'[cd-form = button-back]'
) as HTMLButtonElement;
const nextButton = document.querySelector(
	'[cd-form = button-next]'
) as HTMLButtonElement;
const indicators = document.querySelectorAll(
	'[cd-form=progress-indicator]'
) as NodeListOf<HTMLElement>;
createMultiStepForm(elements, prevButton, nextButton, indicators);

//form step validation

function validateForm(
	inputs: NodeListOf<HTMLInputElement>,
	selects: NodeListOf<HTMLSelectElement>,
	currentStep: number
) {
	let valid = true;
	inputs.forEach((input) => {
		if (!input.required) {
			return;
		}
		if (input.value === '') {
			valid = false;
			input.nextElementSibling!.classList.add('active');
		} else {
			input.nextElementSibling!.classList.remove('active');
		}
	});
	selects.forEach((select) => {
		if (!select.required) {
			return;
		}
		if (select.value === '') {
			valid = false;
			select.nextElementSibling!.classList.add('active');
		} else {
			select.nextElementSibling!.classList.remove('active');
		}
	});

	//radio buttons
	const sexRadio = document.querySelectorAll('input[name=sex]:checked');
	const citizenRadio = document.querySelectorAll(
		'input[name=residency]:checked'
	);
	const disabledRadio = document.querySelectorAll(
		'input[name=disabled]:checked'
	);
	if (sexRadio.length === 0) {
		document.getElementById('sex-radio-error')!.classList.add('active');
		valid = false;
	} else {
		document.getElementById('sex-radio-error')!.classList.remove('active');
	}
	if (citizenRadio.length === 0) {
		document.getElementById('citizen-radio-error')!.classList.add('active');
		valid = false;
	} else {
		document.getElementById('citizen-radio-error')!.classList.remove('active');
	}
	if (disabledRadio.length === 0) {
		document.getElementById('disabled-radio-error')!.classList.add('active');
		valid = false;
	} else {
		document.getElementById('disabled-radio-error')!.classList.remove('active');
	}

	//ssn
	const ssn = document.getElementById('ssn') as HTMLInputElement;
	if (ssn.value.length !== 11) {
		valid = false;
		document.getElementById('ssn-error')!.classList.add('active');
	} else {
		document.getElementById('ssn-error')!.classList.remove('active');
	}

	//email validation and phone number validation
	if (currentStep === 1) {
		const emailInput = document.getElementById('email') as HTMLInputElement;
		if (!emailInput.required) {
			return;
		}
		const re = /\S+@\S+\.\S+/;
		if (!re.test(emailInput.value)) {
			valid = false;
			emailInput.nextElementSibling!.classList.add('active');
		} else {
			emailInput.nextElementSibling!.classList.remove('active');
		}
		const phoneInput = document.getElementById('dayphone') as HTMLInputElement;
		const phoneInput2 = document.getElementById(
			'EmerContactPhone'
		) as HTMLInputElement;

		if (phoneInput.value.length !== 16) {
			valid = false;
			phoneInput.nextElementSibling!.classList.add('active');
		} else {
			phoneInput.nextElementSibling!.classList.remove('active');
		}
		if (phoneInput2.value.length !== 16) {
			valid = false;
			phoneInput2.nextElementSibling!.classList.add('active');
		} else {
			phoneInput2.nextElementSibling!.classList.remove('active');
		}

		const zipCode = document.getElementById('zip') as HTMLInputElement;
		if (zipCode.value.length !== 5) {
			valid = false;
			zipCode.nextElementSibling!.classList.add('active');
		} else {
			zipCode.nextElementSibling!.classList.remove('active');
		}

		const address = document.getElementById(
			'patientAddress'
		) as HTMLInputElement;
		if (validateAddress(address.value) === false) {
			valid = false;
			address.nextElementSibling!.classList.add('active');
		} else {
			address.nextElementSibling!.classList.remove('active');
		}
	}

	if (currentStep === 2) {
		const emailInput = document.getElementById('doc-email') as HTMLInputElement;
		const emailInput2 = document.getElementById(
			'doc2-email-2'
		) as HTMLInputElement;

		if (!emailInput.required) {
			return;
		}
		if (Number(yearSelect.value) <= 1958) {
			brandMeds.forEach((med) => {
				document.querySelector(`[cd-drug-box="${med}"]`)!.remove();
			});
			(document.querySelector('.generic-only') as HTMLElement).style.display =
				'block';
		}
		for (let i = 1; i < 4; i++) {
			setMedicationNames(
				document.getElementById(`med-name-${i}`) as HTMLSelectElement
			);
		}
		const re = /\S+@\S+\.\S+/;
		if (!re.test(emailInput.value)) {
			valid = false;
			emailInput.nextElementSibling!.classList.add('active');
		} else {
			emailInput.nextElementSibling!.classList.remove('active');
		}
		if (emailInput2.value !== '') {
			if (!re.test(emailInput2.value)) {
				valid = false;
				emailInput2.nextElementSibling!.classList.add('active');
			}
		} else {
			emailInput2.nextElementSibling!.classList.remove('active');
		}

		const phoneInput = document.getElementById(
			'doc-officephone-2'
		) as HTMLInputElement;
		const fax = document.getElementById('doc-fax') as HTMLInputElement;
		const phoneInput2 = document.getElementById(
			'doc2-officephone-2'
		) as HTMLInputElement;
		const fax2 = document.getElementById('doc2-fax-2') as HTMLInputElement;

		if (phoneInput.value.length !== 16) {
			valid = false;
			phoneInput.nextElementSibling!.classList.add('active');
		} else {
			phoneInput.nextElementSibling!.classList.remove('active');
		}
		if (fax.value.length !== 16) {
			valid = false;
			fax.nextElementSibling!.classList.add('active');
		} else {
			fax.nextElementSibling!.classList.remove('active');
		}
		if (phoneInput2.value !== '') {
			if (phoneInput2.value.length !== 16) {
				valid = false;
				phoneInput2.nextElementSibling!.classList.add('active');
			} else {
				phoneInput2.nextElementSibling!.classList.remove('active');
			}
		}
		if (fax2.value !== '') {
			if (fax2.value.length !== 16) {
				valid = false;
				fax2.nextElementSibling!.classList.add('active');
			} else {
				fax2.nextElementSibling!.classList.remove('active');
			}
		}

		const doctorAddress = document.getElementById(
			'doctorAddress'
		) as HTMLInputElement;
		if (validateAddress(doctorAddress.value) === false) {
			valid = false;
			doctorAddress.nextElementSibling!.classList.add('active');
		} else {
			doctorAddress.nextElementSibling!.classList.remove('active');
		}

		const doctor2Address = document.getElementById(
			'doctor2Address'
		) as HTMLInputElement;
		if (doctor2Address.value !== '') {
			if (validateAddress(doctor2Address.value) === false) {
				valid = false;
				doctor2Address.nextElementSibling!.classList.add('active');
			} else {
				doctor2Address.nextElementSibling!.classList.remove('active');
			}
		}

		const zipCode = document.getElementById('doc-zip-2') as HTMLInputElement;
		const zipCode2 = document.getElementById('doc2-zip-2') as HTMLInputElement;

		if (zipCode.value.length !== 5) {
			valid = false;
			zipCode.nextElementSibling!.classList.add('active');
		} else {
			zipCode.nextElementSibling!.classList.remove('active');
		}
		if (zipCode2.value !== '') {
			if (zipCode2.value.length !== 5) {
				valid = false;
				zipCode2.nextElementSibling!.classList.add('active');
			} else {
				zipCode2.nextElementSibling!.classList.remove('active');
			}
		}
	}
	return valid;
}

// phone fax
const phoneInput = document.querySelectorAll('.phone-field');

function formatPhoneNumber(input: HTMLInputElement): void {
	input.addEventListener('input', function (this: HTMLInputElement) {
		this.value = this.value.replace(/\D/g, '');

		const input = this.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
		const areaCode = input.substring(0, 3);
		const middle = input.substring(3, 6);
		const last = input.substring(6, 10);

		if (input.length > 6) {
			this.value = `(${areaCode}) ${middle} - ${last}`;
		} else if (input.length > 3) {
			this.value = `(${areaCode}) ${middle}`;
		} else if (input.length > 0) {
			this.value = `(${areaCode}`;
		}
	});
}
phoneInput.forEach((input) => {
	formatPhoneNumber(input as HTMLInputElement);
});

const zipInput = document.querySelectorAll('input[placeholder="Zip code"]');
zipInput.forEach((input) => {
	input.addEventListener('input', function (this: HTMLInputElement) {
		// Remove non-numeric characters from the input
		this.value = this.value.replace(/\D/g, '');
		// Limit the input to 5 characters
		if (this.value.length > 5) {
			this.value = this.value.slice(0, 5);
		}
	});
});
//ssn
function formatSSN(input: string) {
	// Remove all non-numeric characters
	const cleanedInput = input.replace(/\D/g, '');
	// Add dashes after the first 3 digits and after the next 2 digits
	const formattedSSN = cleanedInput.replace(
		/^(\d{3})(\d{2})(\d{0,4})$/,
		(_, p1, p2, p3) => {
			if (p3) {
				return `${p1}-${p2}-${p3}`;
			} else if (p2) {
				return `${p1}-${p2}`;
			} else {
				return p1;
			}
		}
	);
	return formattedSSN;
}

const ssnInput = document.getElementById('ssn');
ssnInput!.addEventListener('input', function (this: HTMLInputElement) {
	this.value = formatSSN(this.value);
});
//gpa address validation
function validateAddress(address: string) {
	const regex = /^[^,]+,\s*[^,]+,\s*[A-Z]{2},\s*USA$/;
	return regex.test(address);
}

//income-fields
const incomeField = document.querySelector('.money-field') as HTMLInputElement;
incomeField.addEventListener('input', function (this: HTMLInputElement) {
	// remove all non-numric characters
	this.value = this.value.replace(/\D/g, '');
	if (this.value === '') return;
	// add $ at the beginning
	this.value = '$' + this.value;
});

//form step indicator
const barContainer = document.querySelector('.progress-bar-c') as HTMLElement;
const bar = document.querySelector('.progress-bar') as HTMLElement;
const options = {
	attributes: true,
};

function callback(mutationList: MutationRecord[]) {
	mutationList.forEach(function (mutation) {
		if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
			let index = Array.from(indicators).findIndex((element) =>
				element.classList.contains('current')
			);
			bar!.style.width = `${((index + 1) / indicators.length) * 100}%`;

			if (window.innerWidth < 768) {
				if (index === 2)
					barContainer!.style.transform = `translateX(-${
						516 - window.innerWidth
					}px)`;
				else if (index < 2) {
					barContainer!.style.transform = `translateX(0px)`;
				}
			}
		}
	});
}

let observer = new MutationObserver(callback);
indicators.forEach((indicator) => {
	observer.observe(indicator as Node, options);
});

//tabs
const tabs = document.querySelectorAll(
	'.doc-content-c-tab'
) as NodeListOf<HTMLElement>;
const tabsContent = document.querySelectorAll('.doc-content-w');
const openIcon = document.querySelectorAll('.tab-minus-icon');
const closeIcon = document.querySelectorAll('.tab-plus-icon');

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		tabsContent.forEach((tabContent) => {
			tabContent.classList.remove('active');
			if (tabContent.parentElement === tab) {
				tabContent.classList.add('active');
			}
		});

		openIcon.forEach((icon) => {
			icon.classList.remove('active');
			if (tab.querySelector('.tab-minus-icon') === icon) {
				icon.classList.add('active');
			}
		});
		closeIcon.forEach((icon) => {
			icon.classList.remove('active');
			if (tab.querySelector('.tab-plus-icon') !== icon) {
				icon.classList.add('active');
			}
		});
	});
});

//meds

const medicationWrapper = document.getElementById('medicationStep');
const medicationRow = medicationWrapper?.querySelector('.form-row-wrapper');
const addMedication = document.getElementById('addMed');
addMedication!.addEventListener('click', () => {
	const newMedication = medicationRow!.cloneNode(true) as Element;
	medicationWrapper!.insertBefore(newMedication, addMedication!.parentElement);
	newMedication
		.querySelector('.flex-grow:nth-child(1) > select')
		?.removeAttribute('required');
	newMedication
		.querySelector('.flex-grow:nth-child(4) > input')
		?.removeAttribute('required');
	(
		newMedication.querySelector(
			'.flex-grow:nth-child(4) > input'
		) as HTMLInputElement
	).value = '';
	newMedication.querySelector(
		'.flex-grow:nth-child(2) > select'
	)!.id = `med-name-${medicationWrapper!.childElementCount - 1}`;
	(newMedication.querySelector(
		'.flex-grow:nth-child(2) > select'
	) as HTMLInputElement)!.value = '';
	newMedication.querySelector(
		'.flex-grow:nth-child(3) > select'
	)!.id = `med-strength-${medicationWrapper!.childElementCount - 1}`;
	newMedication
		.querySelector('.flex-grow:nth-child(2) > select')!
		.addEventListener('change', (event) => {
			newMedication.querySelector(
				'.flex-grow:nth-child(3) > select'
			)!.innerHTML = '';

			const value = (event.target as HTMLSelectElement).value
				.toLocaleLowerCase()
				.split(' ')
				.join('-');

			const drug = document.querySelector(`[cd-name=${value}]`)?.parentElement;

			const strength = drug?.querySelectorAll('[cd=strength]');
			const drugStrength: { strength: string; webpapId: string }[] = [];
			strength?.forEach((strength) => {
				const strengthOption = {
					strength: strength.textContent!,
					webpapId: strength.getAttribute('cd-webpap-id')!,
				};

				if (strengthOption.strength !== null) {
					drugStrength.push(strengthOption);
				}
			});
			addOptionsToSelect(
				newMedication.querySelector('.flex-grow:nth-child(3) > select')!,
				drugStrength
			);
		});
});

function isBrandMed(value: string) {
	if (value === '') return false;
	if (value === brandMeds.find((med) => med === value)) {
		document.getElementById('insurance-row')!.classList.remove('hidden');
		(document.getElementById(
			'insurance-field'
		) as HTMLSelectElement)!.required = true;
		document.getElementById('brand-note')!.classList.remove('hidden');
	} else {
		document.getElementById('insurance-row')!.classList.add('hidden');
		(document.getElementById(
			'insurance-field'
		) as HTMLSelectElement)!.required = false;
		document.getElementById('brand-note')!.classList.add('hidden');
	}
}

//med step
for (let i = 1; i < 4; i++) {
	const selectElement = document.getElementById(
		`med-name-${i}`
	) as HTMLSelectElement;
	const strengthSelect = document.getElementById(
		`med-strength-${i}`
	) as HTMLSelectElement;
	selectElement.addEventListener('change', (event) => {
		if (i !== 1) {
			if (selectElement.value !== '') {
				(
					document.getElementById(`med-strength-${i}`) as HTMLSelectElement
				).required = true;
				(
					document.getElementById(`choose-doctor-${i}`) as HTMLSelectElement
				).required = true;
			} else {
				(
					document.getElementById(`med-strength-${i}`) as HTMLSelectElement
				).required = false;
				(
					document.getElementById(`choose-doctor-${i}`) as HTMLSelectElement
				).required = false;
			}
		}
		strengthSelect.innerHTML = '';
		const value = (event.target as HTMLSelectElement).value
			.toLocaleLowerCase()
			.replace(/[\(\)\/.]/g, '')
			.split(' ')
			.join('-');
		const drug = document.querySelector(`[cd-name=${value}]`)?.parentElement;
		const strength = drug?.querySelectorAll('[cd=strength]');
		const drugStrength: { strength: string; webpapId: string }[] = [];
		strength?.forEach((strength) => {
			const strengthOption = {
				strength: strength.textContent!,
				webpapId: strength.getAttribute('cd-webpap-id')!,
			};

			if (strengthOption.strength !== null) {
				drugStrength.push(strengthOption);
			}
		});
		addOptionsToSelect(strengthSelect, drugStrength);
		isBrandMed((event.target as HTMLSelectElement).value);
	});
}

function setMedicationNames(selectElement: HTMLSelectElement) {
	const medNames = document.querySelectorAll('[cd=drug]');
	medNames.forEach((medName) => {
		const nameOption = document.createElement('option');
		const medNameText = medName.textContent;
		const webpapName = medName.getAttribute('cd-webpap-name');
		const webpapProgram = medName.getAttribute('cd-program');
		const webpapDiagnosis = medName.getAttribute('cd-diagnosis');
		const webpapId = medName.getAttribute('cd-webpap-id');
		if (medNameText !== null) {
			nameOption.text = medNameText;
			nameOption.value = medNameText;
			nameOption.setAttribute('cd-webpap-name', webpapName!);
			nameOption.setAttribute('cd-program', webpapProgram!);
			nameOption.setAttribute('cd-diagnosis', webpapDiagnosis!);
			nameOption.setAttribute('cd-webpap-id', webpapId!);
			selectElement.add(nameOption);
		}
	});
}

function addOptionsToSelect(
	selectElement: HTMLSelectElement,
	options: { strength: string; webpapId: string }[]
) {
	if (options.length > 9) {
		selectElement.innerHTML = '';
		const defaultOption = document.createElement('option');
		defaultOption.text = 'Select Medication First';
		defaultOption.value = '';
		selectElement.add(defaultOption);
		return;
	}
	selectElement.removeAttribute('disabled');
	selectElement.classList.remove('disabled');
	// Remove any previous options
	selectElement.innerHTML = '';
	const defaultOption = document.createElement('option');
	defaultOption.text = 'Select Medication First';
	defaultOption.value = '';
	selectElement.add(defaultOption);
	// Add new options
	let zeroOptions = true;
	options.forEach((optons) => {
		if (optons.strength === '') {
			return;
		}
		zeroOptions = false;
		const option = document.createElement('option');
		option.text = optons.strength;
		option.value = optons.strength;
		option.setAttribute('cd-webpap-id', optons.webpapId);
		selectElement.add(option);
	});

	if (zeroOptions) {
		selectElement.setAttribute('disabled', 'true');
		selectElement.classList.add('disabled');
		selectElement.removeAttribute('required');
	}
}

//Payment
(function () {
	//@ts-ignore
	if (!window.AuthorizeNetIFrame) window.AuthorizeNetIFrame = {};
	//@ts-ignore
	AuthorizeNetIFrame.onReceiveCommunication = function (querystr) {
		var params = parseQueryString(querystr);
		//@ts-ignore
		switch (params['action']) {
			case 'resizeWindow':
				break;
			case 'successfulSave':
				break;
			case 'cancel':
				break;
			case 'transactResponse':
				//@ts-ignore
				var transResponse = JSON.parse(params['response']);
				if (transResponse.responseCode === '1') {
					sendToWebpap();
				}
		}
	};

	function parseQueryString(str: any) {
		var vars = [];
		var arr = str.split('&');
		var pair;
		for (var i = 0; i < arr.length; i++) {
			pair = arr[i].split('=');
			vars.push(pair[0]);
			vars[pair[0]] = unescape(pair[1]);
		}
		return vars;
	}
})();

let token = '';
//@ts-ignore
let communicatorUrl = '';
async function getpay(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		let res = await response.json();
		token = res.token;
		//@ts-ignore
		document.querySelector('input[name=token]').value = token;
	} catch (err) {
		console.log(err);
	}
}

const data = {
	getHostedPaymentPageRequest: {
		merchantAuthentication: {
			name: '9QRrX47T4DkY',
			transactionKey: '5GN3E8m559X9pdSf',
		},
		transactionRequest: {
			transactionType: 'authCaptureTransaction',
			amount: '200.00',
		},
		hostedPaymentSettings: {
			setting: [
				{
					settingName: 'hostedPaymentReturnOptions',
					settingValue:
						'{"showReceipt": false, "url": "https://www.transparentpricerx.com", "urlText": "Continue", "cancelUrl": "https://www.transparentpricerx.com", "cancelUrlText": "Cancel"}',
				},
				{
					settingName: 'hostedPaymentButtonOptions',
					settingValue: '{"text": "Pay"}',
				},
				{
					settingName: 'hostedPaymentStyleOptions',
					settingValue: '{"bgColor": "blue"}',
				},
				{
					settingName: 'hostedPaymentPaymentOptions',
					settingValue:
						'{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": true}',
				},
				{
					settingName: 'hostedPaymentSecurityOptions',
					settingValue: '{"captcha": false}',
				},
				{
					settingName: 'hostedPaymentShippingAddressOptions',
					settingValue: '{"show": false, "required": false}',
				},
				{
					settingName: 'hostedPaymentBillingAddressOptions',
					settingValue: '{"show": true, "required": true}',
				},
				{
					settingName: 'hostedPaymentCustomerOptions',
					settingValue:
						'{"showEmail": true, "requiredEmail": true, "addPaymentProfile": true}',
				},
				{
					settingName: 'hostedPaymentOrderOptions',
					settingValue:
						'{"show": false, "merchantName": "TrasnaparentPrice RX"}',
				},
				{
					settingName: 'hostedPaymentIFrameCommunicatorUrl',
					settingValue:
						'{"url": "https://www.transparentpricerx.com/communicator"}',
				},
			],
		},
	},
};

getpay('https://api.authorize.net/xml/v1/request.api', data);

document.querySelector('.navbar-container')!.addEventListener('click', () => {
	getDrugData();
});
