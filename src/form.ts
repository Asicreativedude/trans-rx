interface webPapData {
	[key: string]: string;
}

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
