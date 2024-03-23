interface TPRXPatient {
	fname: string;
	lname: string;
	mname: string;
	dob: string;
	ssn: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone: string;
	email: string;
	marital: string;
	residency: boolean;
	employed: string;
	sex: string;
	disabled: boolean;
	numinhouse: string;
	EmerContactName: string;
	EmerContactPhone: string;
	Patwages__c: number;
	medicationType: string;
}
interface TPRXDoctor {
	fname: string;
	mname: string;
	lname: string;
	email: string;
	Phone: string;
	fax: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	Facility_Name__c: string;
}
interface TPRXOrderItem {
	Doctor__c: string;
	Medication_Name__c: string;
	Frequency__c: string;
	Strength__c: string;
	timeStamp: string;
}
interface newOrder {
	Patient__c: string;
	orderItems: TPRXOrderItem[];
}
const patientData: TPRXPatient = {
	fname: '',
	lname: '',
	mname: '',
	dob: '',
	ssn: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	country: 'USA',
	phone: '',
	email: '',
	marital: '',
	residency: true,
	employed: '',
	sex: '',
	disabled: false,
	numinhouse: '',
	EmerContactName: '',
	EmerContactPhone: '',
	Patwages__c: 0.0,
	medicationType: '',
};

const doctorData: TPRXDoctor = {
	fname: '',
	mname: '',
	lname: '',
	email: '',
	Phone: '',
	fax: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	Facility_Name__c: '',
	country: 'USA',
};
const doctor2Data: TPRXDoctor = {
	fname: '',
	mname: '',
	lname: '',
	email: '',
	Phone: '',
	fax: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	Facility_Name__c: '',
	country: 'USA',
};

const newOrder: newOrder = {
	Patient__c: '',
	orderItems: [],
};

const uniqueId = Date.now().toString() + Math.random().toString();
(
	document.querySelector('#unique-id') as HTMLInputElement
).value = `${uniqueId}`;

const paymentBtn = document.querySelector(
	'[cd="submit-data"]'
) as HTMLButtonElement;

const brandMeds = [
	'Adbry',
	'Admelog',
	'Admelog SoloStar',
	'Aimovig',
	'Anoro Ellipta',
	'Basaglar KwikPen',
	'Basaglar Tempo Pen',
	'Biktarvy',
	'Botox for migraines',
	'Breo Ellipta',
	'Combivent Respimat',
	'Cosentyx',
	'Cosentyx (300 MG Dose)',
	'Cosentyx Sensoready Pen',
	'Creon',
	'Delstrigo',
	'Dupixent',
	'Eliquis',
	'Emgality',
	'Enbrel',
	'Entyvio',
	'Epclusa',
	'Eucrisa',
	'Fasenra',
	'Forteo',
	'HumaLOG',
	'HumaLOG KwikPen',
	'HumaLOG Mix 50/50',
	'HumaLOG Mix 75/25',
	'HumaLOG Mix 75/25 KwikPen',
	'Humira',
	'InFLIXimab',
	'Insulin Degludec',
	'Insulin Degludec FlexTouch',
	'Invokana',
	'Janumet',
	'Janumet XR',
	'Januvia',
	'Jardiance',
	'Kazano',
	'Lantus',
	'Linzess',
	'Lovenox',
	'Lyumjev',
	'Lyumjev KwikPen',
	'Lyumjev Tempo Pen',
	'Motegrity',
	'Multaq',
	'Nesina',
	'NovoLIN 70/30',
	'NovoLIN 70/30 FlexPen',
	'NovoLIN R',
	'NovoLOG',
	'NovoLOG FlexPen',
	'NovoLOG Mix 70/30',
	'NovoLOG Mix 70/30 FlexPen',
	'Nucala',
	'Nurtec',
	'Ocrevus',
	'Olumiant',
	'Ozempic (0.25 or 0.5 MG Dose)',
	'Ozempic (1 MG Dose)',
	'Ozempic (2 MG Dose)',
	'Prezcobix',
	'Qulipta',
	'Remicade',
	'Rexulti',
	'Rinvoq',
	'Rybelsus',
	'Simponi',
	'Simponi Aria',
	'Skyrizi',
	'Skyrizi (150 MG Dose)',
	'Stelara',
	'Stiolto Respimat',
	'Symtuza',
	'Taltz',
	'Toujeo Max SoloStar',
	'Toujeo SoloStar',
	'Trelegy Ellipta',
	'Tremfya',
	'Tresiba',
	'Tresiba FlexTouch',
	'Trintellix',
	'Ubrelvy',
	'Viberzi',
	'Xarelto',
	'Xeljanz',
	'Xeljanz XR',
	'Zenpep',
	'Zepatier',
	'Zubsolv',
];
let fpl = 0;
paymentBtn.addEventListener('click', () => {
	saveToSessionStorage();
});

async function saveToSessionStorage() {
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
		if (field.name === 'residency') {
			allFields.push({ field: fieldId, value: 'US Citizen/Resident' });
		} else {
			allFields.push({ field: fieldId, value: value });
		}
	});

	allFields.forEach((data: { field: string; value: string }) => {
		if (data.field.includes('choose') && data.value !== '') {
			newOrder.orderItems.push({
				Doctor__c: data.value,
				Medication_Name__c: '',
				Frequency__c: '',
				Strength__c: '',
				timeStamp: '',
			});
		}
	});
	allFields.forEach((data: { field: string; value: string }) => {
		if (data.field.includes('doc-')) {
			let field = data.field.split('-')[1];
			(doctorData as any)[field] = data.value;
			if (field === 'office') {
				doctorData['Facility_Name__c'] = data.value;
				return;
			}
			if (field === 'officephone') {
				doctorData.Phone = data.value;
				return;
			}
			return;
		}
		if (data.field.includes('doc2-')) {
			let field = data.field.split('-')[1];
			(doctor2Data as any)[field] = data.value;
			if (field === 'office') {
				doctor2Data['Facility_Name__c'] = data.value;
				return;
			}
			if (field === 'officephone') {
				doctor2Data.Phone = data.value;
				return;
			}
			return;
		}
		if (data.field === 'month') {
			const month = data.value.length === 1 ? `0${data.value}` : data.value;
			patientData['dob'] = `${month}`;
			return;
		}
		if (data.field === 'marital') {
			patientData.marital = data.value;
			return;
		}
		if (data.field === 'employed') {
			patientData.employed = data.value;
			return;
		}
		if (data.field === 'patwages') {
			patientData.Patwages__c = parseFloat(
				data.value.split('$')[1].replace(/,/g, '')
			);
			return;
		}
		if (data.field === 'day' || data.field === 'year') {
			patientData['dob'] = `${patientData['dob']}-${data.value}`;
			return;
		}
		if (data.field === 'disabled') {
			(patientData as any)[data.field as keyof TPRXPatient] =
				data.value === 'Yes' ? true : false;
			return;
		}

		if (data.field === 'ssn') {
			(patientData as any)[data.field as keyof TPRXPatient] =
				data.value.replace(/-/g, '');
			return;
		}
		if (data.field === 'dayphone') {
			(patientData as any)['phone'] = data.value.replace(/-/g, '');
			return;
		}
		if (data.field.includes('choose') || data.field.includes('residency'))
			return;

		if (data.field.includes('med-name-') && data.value !== '') {
			let index = data.field.split('-')[2] as unknown as number;
			(newOrder.orderItems[index - 1] as any).Medication_Name__c = data.value;
			return;
		}
		if (data.field.includes('med-strength-') && data.value !== '') {
			let index = data.field.split('-')[2] as unknown as number;
			(newOrder.orderItems[index - 1] as any).Strength__c = data.value;
			return;
		}
		if (data.field.includes('Frequency') && data.value !== '') {
			let index = data.field.split('-')[1] as unknown as number;
			(newOrder.orderItems[index - 1] as any).Frequency__c = data.value;
			return;
		}

		if (data.field.includes('segment-field')) {
			patientData['medicationType'] = data.value;
		}
		(patientData as any)[data.field as keyof TPRXPatient] = data.value;
	});
	const dateParts = patientData['dob'].split('-');
	patientData['dob'] = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

	newOrder.orderItems.forEach((order) => {
		order.timeStamp = new Date().toISOString();
	});
	const formData = {
		patient: patientData,
		doctor: doctorData,
		doctor2: doctor2Data,
		orders: newOrder,
		uniqueId: uniqueId,
	};

	// Save the form data to session storage
	sessionStorage.setItem('formData', JSON.stringify(formData));
	sessionStorage.setItem(uniqueId, JSON.stringify(formData));
	redirectToStripePayment(uniqueId);
}

const redirectToStripePayment = async (uniqueId: string) => {
	const response = await fetch(
		'https://voluble-axolotl-2e6e1c.netlify.app/.netlify/functions/create-stripe-session',
		{
			method: 'POST',
			body: JSON.stringify({ uniqueId }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	const data = await response.json();
	// Assuming the response contains a URL for Stripe Checkout
	window.location.href = data.checkoutURL;
};

function fillSegmentFields() {
	const segmentField = document.getElementById(
		'segment-field'
	) as HTMLInputElement;

	for (let i = 1; i < 5; i++) {
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
		if (currentStep === 3) {
			nextButton.innerHTML = 'Continue';
		}
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
		if (currentStep === 2) {
			fpl = fplCalculator(
				parseFloat(
					(document.getElementById('numinhouse') as HTMLInputElement).value
				),
				parseFloat(
					(document.getElementById('patwages') as HTMLInputElement).value
						.split('$')[1]
						.replace(/,/g, '')
				)
			);
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
			if (input.id === 'doc2-mname') {
				return;
			}
			valid = false;
			input.nextElementSibling!.classList.add('active');
		} else {
			if (input.id === 'doc2-mname') {
				return;
			}
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
	} else if (citizenRadio[0].id === 'No') {
		document.querySelector('.error-announcement-c')!.classList.add('active');
		valid = false;
	} else {
		document.querySelector('.error-announcement-c')!.classList.remove('active');
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

		for (let i = 1; i < 5; i++) {
			setMedicationNames(
				document.getElementById(`med-name-${i}`) as HTMLSelectElement
			);
		}
		const re = /\S+@\S+\.\S+/;
		if (!re.test(emailInput.value) && emailInput.value !== '') {
			valid = false;
			emailInput.nextElementSibling!.classList.add('active');
		} else {
			emailInput.nextElementSibling!.classList.remove('active');
		}
		if (emailInput2.value !== '') {
			if (!re.test(emailInput2.value)) {
				valid = false;
				emailInput2.nextElementSibling!.classList.add('active');
			} else {
				emailInput2.nextElementSibling!.classList.remove('active');
			}
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

	if (currentStep === 3) {
		for (let i = 1; i < 5; i++) {
			const coverageRow = document.getElementById(
				`coverage-${i}`
			) as HTMLElement;
			const coverageCheckbox = document.getElementById(
				`coverage-checkbox-${i}`
			) as HTMLInputElement;
			if (
				!coverageRow.classList.contains('hidden') &&
				!coverageCheckbox.checked
			) {
				valid = false;
				coverageRow.querySelector('.error-message')!.classList.add('active');
			} else {
				coverageRow.querySelector('.error-message')!.classList.remove('active');
			}
		}
	}
	return valid;
}

//doc2 fields
const secondDoc = document.querySelector('.second-doc') as HTMLElement;
(
	secondDoc.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
).forEach((field) => {
	field.addEventListener('change', () => {
		if (field.value !== '') {
			(
				secondDoc.querySelectorAll(
					'.input-field'
				) as NodeListOf<HTMLInputElement>
			).forEach((field) => {
				if (field.name === 'doc2-email' || field.name === 'doc2-mname') {
					return;
				}
				field.required = true;
			});
		} else {
			let allEmpty = Array.from(
				secondDoc.querySelectorAll(
					'.input-field'
				) as NodeListOf<HTMLInputElement>
			).every((field) => field.value === '');
			if (allEmpty) {
				(
					secondDoc.querySelectorAll(
						'.input-field'
					) as NodeListOf<HTMLInputElement>
				).forEach((field) => {
					field.required = false;
					field.nextElementSibling!.classList.remove('active');
				});
			}
		}
	});
});

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
function capitalizeValue(input: string) {
	// Ensure the first character is uppercase and the rest are lowercase
	const formattedInput =
		input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

	return formattedInput;
}
document.querySelectorAll('[cd="capitelize"]').forEach((input) => {
	input.addEventListener('change', function (this: HTMLInputElement) {
		this.value = capitalizeValue(this.value);
	});
});
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

const employed = document.getElementById('employed') as HTMLSelectElement;
employed.addEventListener('change', function (this: HTMLSelectElement) {
	if (this.value === 'Unemployed') {
		incomeField.value = '$25,000';
		return;
	}
	incomeField.value = '';
});
incomeField.addEventListener('input', function (this: HTMLInputElement) {
	// remove all non-numeric characters
	this.value = this.value.replace(/\D/g, '');
	if (this.value === '') return;
	// add $ at the beginning and commas for thousands separator
	this.value = '$' + parseInt(this.value).toLocaleString();
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

//meds

function anyBrandMeds() {
	let allEligible = true;
	for (let i = 1; i < 5; i++) {
		const selectElement = document.getElementById(
			`med-name-${i}`
		) as HTMLSelectElement;
		const value = selectElement.value;

		const isEligible = checkEligibilty(fpl, value);
		if (!isEligible) {
			allEligible = false;
			document
				.querySelector('.eligibility-announcement-c')!
				.classList.remove('hidden');
			document.querySelector('.eligability-med-name')!.textContent = value;
		}
	}

	if (allEligible) {
		document
			.querySelector('.eligibility-announcement-c')!
			.classList.add('hidden');
	}
}

//med step
for (let i = 1; i < 5; i++) {
	const selectElement = document.getElementById(
		`med-name-${i}`
	) as HTMLSelectElement;
	const strengthSelect = document.getElementById(
		`med-strength-${i}`
	) as HTMLSelectElement;
	selectElement.addEventListener('change', (event) => {
		anyBrandMeds();
		const coverageRow = document.getElementById(`coverage-${i}`) as HTMLElement;
		const coverageCheckbox = document.getElementById(
			`coverage-checkbox-${i}`
		) as HTMLInputElement;
		console.log(selectElement.value);
		if (brandMeds.find((med) => med === selectElement.value)) {
			coverageRow.classList.remove('hidden');
			coverageCheckbox.required = true;
		} else {
			coverageRow.classList.add('hidden');
			coverageCheckbox.required = false;
		}

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
		let value = (event.target as HTMLSelectElement).value
			.toLocaleLowerCase()
			.replace(/[\(\)\/.]/g, '')
			.split(' ')
			.join('-');
		if (value === '') {
			const defaultOption = document.createElement('option');
			defaultOption.text = 'Select Medication First';
			defaultOption.value = '';
			strengthSelect.add(defaultOption);
			return;
		}
		//ozempric fix
		if (value === 'ozempic-025-or-05-mg-dose') {
			value = 'ozempic-0-25-or-0-5-mg-dose';
		} else if (value === 'novolog-mix-7030') {
			value = 'novolog-mix-70-30';
		} else if (value === 'novolin-7030') {
			value = 'novolin-70-30';
		} else if (value === 'novolin-7030-flexpen') {
			value = 'novolin-70-30-flexpen';
		} else if (value === 'novolog-mix-7030-flexpen') {
			value = 'novolog-mix-70-30-flexpen';
		} else if (value === 'humalog-mix-5050') {
			value = 'humalog-mix-50-50';
		} else if (value === 'humalog-mix-7525') {
			value = 'humalog-mix-75-25';
		} else if (value === 'humalog-mix-7525-kwikpen') {
			value = 'humalog-mix-75-25-kwikpen';
		} else if (value === 'prodigy-insulin-syringe-31g-8mm-13cc') {
			value = 'prodigy-insulin-syringe-31g-8mm-1-3cc';
		} else if (value === 'prodigy-insulin-syringe-31g-8mm-12cc') {
			value = 'prodigy-insulin-syringe-31g-8mm-1-2cc';
		} else if (value === 'prodigy-insulin-syringe-28g-127mm-1cc') {
			value = 'prodigy-insulin-syringe-28g-12-7mm-1cc';
		} else if (value === 'entocort-ecr') {
			value = 'entocort-ec-r';
		}
		const drug = document.querySelector(`[cd-name=${value}]`)!.parentElement;

		const strength = drug?.querySelectorAll('[cd=strength]');
		const drugStrength: { strength: string }[] = [];
		strength?.forEach((strength) => {
			const strengthOption = {
				strength: strength.textContent!,
			};

			if (strengthOption.strength !== null) {
				drugStrength.push(strengthOption);
			}
		});
		addOptionsToSelect(strengthSelect, drugStrength);
	});

	if (i !== 1) {
		const row = document.getElementById(`med-row-${i}`) as HTMLElement;
		(
			row.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
		).forEach((field) => {
			field.addEventListener('change', () => {
				if (field.value !== '') {
					(
						row.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
					).forEach((field) => {
						field.required = true;
					});
				} else {
					let allEmpty = Array.from(
						row.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
					).every((field) => field.value === '');
					if (allEmpty) {
						(
							row.querySelectorAll(
								'.input-field'
							) as NodeListOf<HTMLInputElement>
						).forEach((field) => {
							field.required = false;
							field.nextElementSibling!.classList.remove('active');
						});
					}
				}
			});
		});
	}
}

function setMedicationNames(selectElement: HTMLSelectElement) {
	const medNames = document.querySelectorAll('[cd=drug]');
	medNames.forEach((medName) => {
		const nameOption = document.createElement('option');
		const medNameText = medName.textContent;
		const genericName = medName.getAttribute('cd-generic');
		const medProgram = medName.getAttribute('cd-program');
		const medDiagnosis = medName.getAttribute('cd-diagnosis');
		if (medNameText !== null) {
			nameOption.text = `${medNameText} (${genericName})`;
			nameOption.value = medNameText;
			nameOption.setAttribute('cd-program', medProgram!);
			nameOption.setAttribute('cd-diagnosis', medDiagnosis!);
			selectElement.add(nameOption);
		}
	});
}

function addOptionsToSelect(
	selectElement: HTMLSelectElement,
	options: { strength: string }[]
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
		selectElement.add(option);
	});

	if (zeroOptions) {
		selectElement.setAttribute('disabled', 'true');
		selectElement.classList.add('disabled');
		selectElement.removeAttribute('required');
	}
}

// make sure we send data to webflow before leaving the page
document
	.getElementById('wf-form-application-form')!
	.addEventListener('submit', () => {
		paymentBtn.click();
	});

//FPL Calculator
function fplCalculator(household: number, income: number) {
	const yearlyRate = 15060;
	const theFactor = 5380; //added income for each additional person
	const fpl = Math.round(
		(income / (yearlyRate + (household - 1) * theFactor)) * 100
	);
	return fpl;
}

function checkEligibilty(fpl: number, drugName: string) {
	switch (drugName) {
		case 'Adbry':
			return fpl <= 600;
		case 'Admelog':
			return fpl <= 500;
		case 'Admelog SoloStar':
			return fpl <= 500;
		case 'Aimovig':
			return fpl <= 290;
		case 'Anoro Ellipta':
			return fpl <= 300;
		case 'Basaglar KwikPen':
			return fpl <= 500;
		case 'Basaglar Tempo Pen':
			return fpl <= 500;
		case 'Biktarvy':
			return fpl <= 500;
		case 'Botox for migraines':
			return fpl <= 600;
		case 'Breo Ellipta':
			return fpl <= 300;
		case 'Cimzia':
			return fpl <= 500;
		case 'Combivent Respimat':
			return fpl <= 200;
		case 'Cosentyx':
			return fpl <= 550;
		case 'Cosentyx (300 MG Dose)':
			return fpl <= 550;
		case 'Cosentyx Sensoready Pen':
			return fpl <= 550;
		case 'Creon':
			return fpl <= 600;
		case 'Delstrigo':
			return fpl <= 400;
		case 'Dupixent For Asthma':
			return fpl <= 400;
		case 'Dupixent for Prurigo Nodularis':
			return fpl <= 400;
		case 'Dupixent for Rhinosinusitis with Nasal Polyposis':
			return fpl <= 400;
		case 'Dupixent for Eosinophilic Esophagitis':
			return fpl <= 400;
		case 'Dupixent for Atopic Dermatitis':
			return fpl <= 400;
		case 'Eliquis':
			return fpl <= 250;
		case 'Emgality':
			return fpl <= 400;
		case 'Enbrel':
			return fpl <= 290;
		case 'Entyvio':
			return fpl <= 500;
		case 'Epclusa':
			return fpl <= 500;
		case 'Eucrisa':
			return fpl <= 300;
		case 'Fasenra':
			return fpl <= 300;
		case 'Forteo':
			return fpl <= 300;
		case 'HumaLOG':
			return fpl <= 500;
		case 'HumaLOG KwikPen':
			return fpl <= 500;
		case 'HumaLOG Mix 50/50':
			return fpl <= 400;
		case 'HumaLOG Mix 75/25':
			return fpl <= 400;
		case 'HumaLOG Mix 75/25 KwikPen':
			return fpl <= 400;
		case 'Humira':
			return fpl <= 600;
		case 'inFLIXimab':
			return fpl <= 600;
		case 'Invokana':
			return fpl <= 305;
		case 'Janumet':
			return fpl <= 400;
		case 'Janumet XR':
			return fpl <= 400;
		case 'Januvia':
			return fpl <= 400;
		case 'Jardiance':
			return fpl <= 250;
		case 'Kazano':
			return fpl <= 500;
		case 'Lantus':
			return fpl <= 400;
		case 'Linzess':
			return fpl <= 600;
		case 'Lovenox':
			return fpl <= 400;
		case 'Lyumjev':
			return fpl <= 400;
		case 'Lyumjev KwikPen':
			return fpl <= 500;
		case 'Lyumjev Tempo Pen':
			return fpl <= 500;
		case 'Motegrity':
			return fpl <= 500;
		case 'Multaq':
			return fpl <= 400;
		case 'Nesina':
			return fpl <= 500;
		case 'NovoLIN 70/30':
			return fpl <= 400;
		case 'NovoLIN 70/30 FlexPen':
			return fpl <= 400;
		case 'NovoLIN R':
			return fpl <= 500;
		case 'NovoLOG':
			return fpl <= 400;
		case 'NovoLOG FlexPen':
			return fpl <= 400;
		case 'NovoLOG Mix 70/30':
			return fpl <= 400;
		case 'NovoLOG Mix 70/30 FlexPen':
			return fpl <= 400;
		case 'Nucala':
			return fpl <= 600;
		case 'Nurtec':
			return fpl <= 300;
		case 'Ocrevus':
			return fpl <= 1000;
		case 'Olumiant':
			return fpl <= 500;
		case 'Ozempic (0.25 or 0.5 MG Dose)':
			return fpl <= 400;
		case 'Ozempic (1 MG Dose)':
			return fpl <= 400;
		case 'Ozempic (2 MG Dose)':
			return fpl <= 400;
		case 'Qulipta':
			return fpl <= 600;
		case 'Remicade':
			return fpl <= 600;
		case 'Rexulti':
			return fpl <= 400;
		case 'Rinvoq':
			return fpl <= 600;
		case 'Rybelsus':
			return fpl <= 400;
		case 'Simponi':
			return fpl <= 600;
		case 'Simponi Aria':
			return fpl <= 600;
		case 'Skyrizi':
			return fpl <= 600;
		case 'Skyrizi (150 MG Dose)':
			return fpl <= 600;
		case 'Stelara':
			return fpl <= 600;
		case 'Stiolto Respimat':
			return fpl <= 200;
		case 'Symtuza':
			return fpl <= 300;
		case 'Taltz':
			return fpl <= 500;
		case 'Toujeo Max SoloStar':
			return fpl <= 400;
		case 'Toujeo SoloStar':
			return fpl <= 400;
		case 'Trelegy Ellipta':
			return fpl <= 600;
		case 'Tremfya':
			return fpl <= 600;
		case 'Tresiba':
			return fpl <= 500;
		case 'Tresiba FlexTouch':
			return fpl <= 400;
		case 'Trintellix':
			return fpl <= 500;
		case 'Ubrelvy':
			return fpl <= 600;
		case 'Viberzi':
			return fpl <= 600;
		case 'Xarelto':
			return fpl <= 300;
		case 'Xeljanz':
			return fpl <= 500;
		case 'Xeljanz XR':
			return fpl <= 500;
		case 'Zenpep':
			return fpl <= 400;
		case 'Zepatier':
			return fpl <= 400;
		case 'Zubsolv':
			return fpl <= 300;
		default:
			return true;
	}
}
