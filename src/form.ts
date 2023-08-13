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
	//@ts-ignore
	all_data.forEach((data: { field: string; value: string }) => {
		if (
			data.field === 'patwages' ||
			data.field === 'patdisab' ||
			data.field === 'patunemploy'
		) {
			patientIncomeData[data.field] = data.value;
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

function setMedicationNames() {
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
	// Remove any previous options
	selectElement.innerHTML = '';
	const defaultOption = document.createElement('option');
	defaultOption.text = 'Select Medication First';
	defaultOption.value = '';
	selectElement.add(defaultOption);
	// Add new options

	options.forEach((optionText) => {
		console.log(optionText);
		if (optionText === '') {
			return;
		}
		const option = document.createElement('option');
		option.text = optionText;
		option.value = optionText;
		selectElement.add(option);
	});
}

const selectElement = document.getElementById(
	'Medication-Name-9'
) as HTMLSelectElement;
const strengthSelect = document.getElementById(
	'med-strength-2'
) as HTMLSelectElement;
selectElement.addEventListener('change', (event) => {
	const value = (event.target as HTMLSelectElement).value
		.replace(' ', '-')
		.toLocaleLowerCase();

	const drug = document.querySelector(`[cd-name=${value}]`)?.parentElement;

	const strength = drug?.querySelectorAll('[cd=strength]');
	strength?.forEach((strength) => {
		const strengthOption = document.createElement('option');
		const strengthText = strength.textContent;
		if (strengthText !== null) {
			strengthOption.text = strengthText;
			strengthOption.value = strengthText;
			strengthSelect?.add(strengthOption);
		}
	});
});

//@ts-ignore
window.fsAttributes = window.fsAttributes || [];
//@ts-ignore
window.fsAttributes.push([
	'cmsload',
	(listInstances: any) => {
		console.log('cmsload Successfully loaded!');

		// The callback passes a `listInstances` array with all the `CMSList` instances on the page.
		const [listInstance] = listInstances;

		setMedicationNames();
		// The `renderitems` event runs whenever the list renders items after switching pages.
		listInstance.on('renderitems', (renderedItems: any) => {
			console.log(renderedItems);
		});
	},
]);

function createMultiStepForm(
	elements: NodeListOf<HTMLElement>,
	prevButton: HTMLButtonElement,
	nextButton: HTMLButtonElement,
	indicatiors: NodeListOf<HTMLElement>
) {
	let currentStep = 0;
	const numSteps = elements.length;

	// Hide all elements except the first one
	elements.forEach((element, index) => {
		if (index !== currentStep) {
			element.style.display = 'none';
		}
	});
	indicatiors.forEach((indicator, index) => {
		if (index !== currentStep) {
			indicator.classList.remove('current');
		} else {
			indicator.classList.add('current');
		}
	});
	// Add event listeners to the buttons
	prevButton.addEventListener('click', () => {
		if (currentStep > 0) {
			elements[currentStep].style.display = 'none';
			currentStep--;
			elements[currentStep].style.display = 'block';
		}
	});

	nextButton.addEventListener('click', () => {
		if (currentStep < numSteps - 1) {
			elements[currentStep].style.display = 'none';
			currentStep++;
			elements[currentStep].style.display = 'block';
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

//form step indicator
const stepIndicators = document.querySelectorAll(
	'.step-text-c'
) as NodeListOf<HTMLElement>;
const bar = document.querySelector('.progress-bar') as HTMLElement;
const options = {
	attributes: true,
};

function callback(mutationList: MutationRecord[]) {
	mutationList.forEach(function (mutation) {
		if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
			let index = Array.from(stepIndicators).findIndex((element) =>
				element.classList.contains('current')
			);
			bar!.style.width = `${((index + 1) / stepIndicators.length) * 100}%`;
		}
	});
}

let observer = new MutationObserver(callback);
stepIndicators.forEach((indicator) => {
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

//doc tabs
// const accSettings = {
// 	speed: 300,
// 	oneOpen: true,
// 	offsetAnchor: true,
// 	offsetFromTop: 180,
// 	scrollTopDelay: 400,
// 	classes: {
// 		accordion: 'doc-tabs-w',
// 		header: 'doc-link',
// 		item: 'doc-content-c-tab',
// 		body: 'doc-content-w',
// 		icon: 'tab-plus-icon',
// 		iconOpen: 'tab-minus-icon',
// 		active: 'active',
// 	},
// };

// const prefix = accSettings.classes;

// const accordion = (function () {
// 	const accordionElem = $(`.${prefix.accordion}`);
// 	const accordionHeader = accordionElem.find(`.${prefix.header}`);
// 	const accordionItem = $(`.${prefix.item}`);
// 	const accordionBody = $(`.${prefix.body}`);
// 	const accordionIcon = $(`.${prefix.icon}`);
// 	const accordionIconOpen = $(`.${prefix.iconOpen}`);
// 	const activeClass = prefix.active;

// 	return {
// 		// pass configurable object literal

// 		//@ts-ignore
// 		init: function (settings) {
// 			accordionHeader.on('click', function () {
// 				accordion.toggle($(this));
// 				if (accSettings.offsetAnchor) {
// 					setTimeout(() => {
// 						$('html').animate(
// 							//@ts-ignore
// 							{ scrollTop: $(this).offset().top - accSettings.offsetFromTop },
// 							accSettings.speed
// 						);
// 					}, accSettings.scrollTopDelay);
// 				}
// 			});

// 			$.extend(accSettings, settings);
// 			// ensure only one accordion is active if oneOpen is true
// 			if (settings.oneOpen && $(`.${prefix.item}.${activeClass}`).length > 1) {
// 				$(`.${prefix.item}.${activeClass}:not(:first)`)
// 					.removeClass(activeClass)
// 					.find(`.${prefix.header} > .${prefix.icon}`)
// 					.removeClass(activeClass);
// 			}
// 			// reveal the active accordion bodies
// 			$(`.${prefix.item}.${activeClass}`).find(`> .${prefix.body}`).show();
// 		},
// 		//@ts-ignore
// 		toggle: function ($this) {
// 			if (
// 				accSettings.oneOpen &&
// 				$this[0] !=
// 					$this
// 						.closest(accordionElem)
// 						.find(`> .${prefix.item}.${activeClass} > .${prefix.header}`)[0]
// 			) {
// 				$this
// 					.closest(accordionElem)
// 					.find(`> .${prefix.item}`)
// 					.removeClass(activeClass)
// 					.find(accordionBody)
// 					.slideUp(accSettings.speed);
// 				$this
// 					.closest(accordionElem)
// 					.find(`> .${prefix.item}`)
// 					.find(`> .${prefix.header} > .${prefix.icon}`)
// 					.removeClass(activeClass);

// 				$this.find(accordionIconOpen).toggleClass(activeClass);
// 				$this.find(accordionIcon).toggleClass(activeClass);
// 			}
// 			let icons = $this
// 				.closest(accordionItem)
// 				.siblings()
// 				.find(accordionIconOpen);

// 			for (let i = 0; i < icons.length; i++) {
// 				if (icons[i].classList.contains(activeClass)) {
// 					icons[i].classList.toggle(activeClass);
// 					icons[i].nextElementSibling.classList.toggle(activeClass);
// 				}
// 			}
// 			if (
// 				$this
// 					.closest(accordionItem)
// 					.siblings()
// 					.find(accordionIconOpen)
// 					.hasClass(activeClass)
// 			) {
// 				$this
// 					.closest(accordionItem)
// 					.siblings()
// 					.find(accordionIconOpen)
// 					.toggleClass(activeClass);
// 				$this
// 					.closest(accordionItem)
// 					.siblings()
// 					.find(accordionIcon)
// 					.toggleClass(activeClass);
// 			}
// 			// show/hide the clicked accordion item
// 			$this
// 				.closest(accordionItem)
// 				.toggleClass(`${activeClass}`)
// 				.find(`> .${prefix.header} > .${prefix.icon}`)
// 				.toggleClass(activeClass);
// 			$this.next().stop().slideToggle(accSettings.speed);
// 			if (!$this.closest(accordionItem).hasClass(activeClass)) {
// 				$this
// 					.closest(accordionItem)
// 					.find(accordionIconOpen)
// 					.toggleClass(activeClass);
// 				$this
// 					.closest(accordionItem)
// 					.find(accordionIcon)
// 					.toggleClass(activeClass);
// 			}
// 		},
// 	};
// })();

// $(document).ready(function () {
// 	accordion.init(accSettings);
// });
