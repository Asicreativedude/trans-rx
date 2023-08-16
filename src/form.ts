interface webPapData {
	[key: string]: string;
}

//webpap api
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
};

const submitBtn = document.querySelector(
	'[cd="submit-data"]'
) as HTMLButtonElement;

let patientId: number = 0;
let authToken: string = '';

// webPap get authtoken Api
const createURL = 'https://www.medserviceswebpap.com/api/patient/createpatient';
const createDoctorURL =
	'https://www.medserviceswebpap.com/api/physician/createphysician';
const generalURL = 'https://www.medserviceswebpap.com/auth/token?hcpid=89';
const authData = {
	grant_type: 'password',
	username: 'apiuser',
	password: '123456',
};

async function getAuth(
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
		await response.json();
	} catch (err) {
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
		console.log(err);
	}
}

submitBtn.addEventListener('click', () => {
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
	const allFields: any = [];
	(
		document.querySelectorAll('.input-field') as NodeListOf<HTMLInputElement>
	).forEach((field) => {
		let fieldId = field.id;
		let value = field.value;
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
		if (
			data.field === 'patwages' ||
			data.field === 'patdisab' ||
			data.field === 'patunemploy'
		) {
			patientIncomeData[data.field] = data.value.slice(1);
			return;
		}
		if (data.field.includes('doc-')) {
			let field = data.field.split('-')[1];
			doctorData[field] = data.value;
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

	getAuth(generalURL, authData).then((data) => {
		authToken = data.access_token;
		postData(createURL, patientData).then(() => {
			let incomeUrl = `https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${patientId}`;
			postIncomeData(incomeUrl, patientIncomeData);
		});
		postDoctorData(createDoctorURL, doctorData);
	});
});

// async function deletePatient(url: string) {
// 	await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization:
// 				'Bearer Bd7_aG9B_YHizPMt9zNOm9joC1etgQHoxR4hNVWAgcyX3NwzBth7JK6dyzbQdFQ8xVC_wtcVa-KqysCvkWefb9Hh-j0Numd81VdKZva_kYF3q3cwklRQunnKxQIQTt6XArEU4Qh3mAABIDoruv9kSR7PsTriOYD1qtNBwrojSu3kro38dNnF5zuJURZx2fZ4P5j3I-SzFxkofTC_7ZkF5Ko-n6zSqIwnmK1qE1wujTHwiVOEsMSG3lcu4CQc1dNFFMtWAxcpDadYo-736KbMzKtugxOjPGAEhrAQCeJY2q9qq0Lub_000xHT8gdRQAsjwJBNaQaoX43ujr-OjCGpfMQfvn0ntP8fOlQW5chRvfHswuFsinBkAcX-nlrjv5vS8xdQB4CHvmDZaTaSTwgu3LjanYkjGkvO_4r2LGC95CxwI9NM',
// 		},
// 	});
// }
// deletePatient(
// 	'https://www.medserviceswebpap.com/api/patient/deletepatient?patientId=10'
// );

//@ts-ignore
window.fsAttributes = window.fsAttributes || [];
//@ts-ignore
window.fsAttributes.push([
	'cmsload',
	(listInstances: any) => {
		// The callback passes a `listInstances` array with all the `CMSList` instances on the page.
		const [listInstance] = listInstances;
		for (let i = 1; i < 4; i++) {
			setMedicationNames(
				document.getElementById(`med-name-${i}`) as HTMLSelectElement
			);
		}
		// The `renderitems` event runs whenever the list renders items after switching pages.
		listInstance.on('renderitems', (renderedItems: any) => {
			console.log(renderedItems);
		});
	},
]);

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
	});

	nextButton.addEventListener('click', () => {
		if (currentStep === 4) {
			(document.querySelector('.payment-trigger') as HTMLElement).click();
			return;
		}
		const inputs = elements[currentStep].querySelectorAll(
			'input'
		) as NodeListOf<HTMLInputElement>;
		const selects = elements[currentStep].querySelectorAll(
			'select'
		) as NodeListOf<HTMLSelectElement>;

		if (!validateForm(inputs, selects, currentStep)) {
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
			if (currentStep === 4) {
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

		if (phoneInput.value.length !== 10) {
			valid = false;
			phoneInput.nextElementSibling!.classList.add('active');
		} else {
			phoneInput.nextElementSibling!.classList.remove('active');
		}
		if (phoneInput2.value.length !== 10) {
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
	}

	if (currentStep === 2) {
		const emailInput = document.getElementById('doc-email') as HTMLInputElement;
		const emailInput2 = document.getElementById(
			'doc2-email-2'
		) as HTMLInputElement;

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

		if (phoneInput.value.length !== 10) {
			valid = false;
			phoneInput.nextElementSibling!.classList.add('active');
		} else {
			phoneInput.nextElementSibling!.classList.remove('active');
		}
		if (fax.value.length !== 10) {
			valid = false;
			fax.nextElementSibling!.classList.add('active');
		} else {
			fax.nextElementSibling!.classList.remove('active');
		}
		if (phoneInput2.value !== '') {
			if (phoneInput2.value.length !== 10) {
				valid = false;
				phoneInput2.nextElementSibling!.classList.add('active');
			} else {
				phoneInput2.nextElementSibling!.classList.remove('active');
			}
		}
		if (fax2.value !== '') {
			if (fax2.value.length !== 10) {
				valid = false;
				fax2.nextElementSibling!.classList.add('active');
			} else {
				fax2.nextElementSibling!.classList.remove('active');
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
	//money fields
	if (currentStep === 4) {
		const moneyFields = document.querySelectorAll(
			'.money-field'
		) as NodeListOf<HTMLInputElement>;
		moneyFields.forEach((field) => {
			if (field.value !== '') {
				document.getElementById('income-error')!.classList.remove('active');
			} else {
				valid = false;
				document.getElementById('income-error')!.classList.add('active');
			}
		});
	}

	return valid;
}

// phone fax
const phoneInput = document.querySelectorAll('.phone-field');
const zipInput = document.querySelectorAll('input[placeholder="Zip code"]');

phoneInput.forEach((input) => {
	input.addEventListener('input', function (this: HTMLInputElement) {
		// Remove non-numeric characters from the input
		this.value = this.value.replace(/\D/g, '');

		// Limit the input to 10 characters
		if (this.value.length > 10) {
			this.value = this.value.slice(0, 10);
		}
	});
});

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

//income-fields
const incomeFields = document.querySelectorAll('.money-field');
incomeFields.forEach((input) => {
	input.addEventListener('input', function (this: HTMLInputElement) {
		// remove all non-numric characters
		this.value = this.value.replace(/\D/g, '');
		if (this.value === '') return;
		// add $ at the beginning
		this.value = '$' + this.value;
	});
});

//form step indicator
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
			const drugStrength: string[] = [];
			strength?.forEach((strength) => {
				const strengthText = strength.textContent;
				if (strengthText !== null) {
					drugStrength.push(strengthText);
				}
			});
			addOptionsToSelect(
				newMedication.querySelector('.flex-grow:nth-child(3) > select')!,
				drugStrength
			);
		});
});

//med step
for (let i = 1; i < 4; i++) {
	const selectElement = document.getElementById(
		`med-name-${i}`
	) as HTMLSelectElement;
	const strengthSelect = document.getElementById(
		`med-strength-${i}`
	) as HTMLSelectElement;
	selectElement.addEventListener('change', (event) => {
		strengthSelect.innerHTML = '';

		const value = (event.target as HTMLSelectElement).value
			.toLocaleLowerCase()
			.replace(/[\(\)\/]/g, '')
			.split(' ')
			.join('-');

		const drug = document.querySelector(`[cd-name=${value}]`)?.parentElement;
		const strength = drug?.querySelectorAll('[cd=strength]');
		const drugStrength: string[] = [];
		strength?.forEach((strength) => {
			const strengthText = strength.textContent;
			if (strengthText !== null) {
				drugStrength.push(strengthText);
			}
		});
		addOptionsToSelect(strengthSelect, drugStrength);
	});
}

function setMedicationNames(selectElement: HTMLSelectElement) {
	const medNames = document.querySelectorAll('[cd=drug]');
	medNames.forEach((medName) => {
		const nameOption = document.createElement('option');
		const medNameText = medName.textContent;
		if (medNameText !== null) {
			nameOption.text = medNameText;
			nameOption.value = medNameText;
			nameOption.setAttribute('cd', medNameText);
			selectElement.add(nameOption);
		}
	});
}

function addOptionsToSelect(
	selectElement: HTMLSelectElement,
	options: string[]
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
	options.forEach((optionText) => {
		if (optionText === '') {
			return;
		}
		zeroOptions = false;
		const option = document.createElement('option');
		option.text = optionText;
		option.value = optionText;
		selectElement.add(option);
	});

	if (zeroOptions) {
		selectElement.setAttribute('disabled', 'true');
		selectElement.classList.add('disabled');
	}
}

//Payment
(function () {
	//@ts-ignore
	if (!window.AuthorizeNetIFrame) window.AuthorizeNetIFrame = {};
	//@ts-ignore
	AuthorizeNetIFrame.onReceiveCommunication = function (querystr) {
		var params = parseQueryString(querystr);
		console.log(params);
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
				console.log(transResponse);
				if (transResponse.responseCode === '1') {
					(document.querySelector(
						'.thank-you-trigger'
					) as HTMLButtonElement)!.click();
					submitBtn.click();
					(document.querySelector('.submit-btn') as HTMLButtonElement)!.click();
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
						'{"showReceipt": false, "url": "https://www.transparentpricerx.com", "urlText": "Continue", "cancelUrl": "https://mysite.com/cancel", "cancelUrlText": "Cancel"}',
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
						'{"show": true, "merchantName": "G and S Questions Inc."}',
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

//show payment
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.getElementById('btnOpenAuthorizeNetIFrame')!.click();
	}, 1000);
});
