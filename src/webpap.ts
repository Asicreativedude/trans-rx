// // interface ClientData {
// // 	patient: TPRXPatient;
// // 	doctor: TPRXDoctor;
// // 	doctor2?: TPRXDoctor;
// // 	orders: TPRXOrderItem[];
// // 	uniqueId: string;
// // }

// document.addEventListener('DOMContentLoaded', async () => {
// 	// Retrieve the form data from sessionStorage
// 	const formData = sessionStorage.getItem('formData');
// 	const parsedFormData = formData ? JSON.parse(formData) : null;
// 	const formDataSales = JSON.parse(sessionStorage.getItem('formDataSales')!);
// 	console.log(formDataSales);
// 	if (parsedFormData && formDataSales) {
// 		await createClient(formDataSales);

// 		await sendData(parsedFormData).then(() => {
// 			// Optionally, clear the sessionStorage if you no longer need the data
// 			sessionStorage.clear();
// 		});
// 	} else {
// 		console.log('No form data found in sessionStorage.');
// 	}
// });

// //send data to webpap
// let patientId = 0;
// let authToken = '';

// // webPap get authtoken Api
// const createURL = 'https://www.medserviceswebpap.com/api/patient/createpatient';
// const createDoctorURL =
// 	'https://www.medserviceswebpap.com/api/physician/createphysician';
// const generalURL = 'https://www.medserviceswebpap.com/auth/token?hcpid=89';
// const authData = {
// 	grant_type: 'password',
// 	username: import.meta.env.VITE_USERNAME,
// 	password: import.meta.env.VITE_PASSWORD,
// };

// async function getAuth(
// 	url: string,
// 	data: { grant_type: string; username: string; password: string }
// ) {
// 	const response = await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 		body: new URLSearchParams(data).toString(),
// 	});
// 	if (!response.ok) {
// 		throw new Error(response.statusText);
// 	}

// 	return response.json();
// }

// async function postDoctorData(url: string, data: webPapData) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken}`,
// 			},
// 			body: JSON.stringify(data),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const docData = await response.json();

// 		data.id = docData.Id;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function postData(url: string, data: webPapData) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken}`,
// 			},
// 			body: JSON.stringify(data),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 		const responseJson = await response.json();
// 		patientId = responseJson.Id;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
// async function postIncomeData(url: string, data: webPapData) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken}`,
// 			},
// 			body: JSON.stringify(data),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
// async function postIsuranceData(url: string, data: string) {
// 	let insuranceData;
// 	data === 'private'
// 		? (insuranceData = {
// 				privateins: 'true',
// 		  })
// 		: (insuranceData = {
// 				none: 'true',
// 		  });

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken}`,
// 			},
// 			body: JSON.stringify(insuranceData),
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
// async function getDoc(url: string) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken}`,
// 			},
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();

// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
// async function addDrugs(data: any) {
// 	try {
// 		const response = await fetch(
// 			'https://www.medserviceswebpap.com/api/paporders/additem',
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${authToken}`,
// 				},
// 				body: JSON.stringify(data),
// 			}
// 		);
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function sendData(formData: any) {
// 	const loader = document.querySelector('.loader-s') as HTMLDivElement;
// 	loader.style.display = 'flex';
// 	return new Promise<void>(async (resolve, reject) => {
// 		try {
// 			await getAuth(generalURL, authData)
// 				.then((data) => {
// 					authToken = data.access_token;
// 				})
// 				.then(async () => {
// 					await postData(createURL, formData.patientData);
// 					let incomeUrl = `https://www.medserviceswebpap.com/api/patient/updatepatientincome?patientId=${patientId}`;
// 					await postIncomeData(incomeUrl, formData.patientIncomeData);
// 					formData.drugData.webpapOrder.customerId = patientId;
// 					let insuranceUrl = `https://www.medserviceswebpap.com/api/patient/updatepatientinsurance?patientId=${patientId}`;
// 					await postIsuranceData(insuranceUrl, formData.insurance);
// 					await postDoctorData(createDoctorURL, formData.doctorData);

// 					if (formData.doctor2Data.fname !== '') {
// 						await postDoctorData(createDoctorURL, formData.doctor2Data);
// 					}
// 					await Promise.all(
// 						formData.drugData.webpapOrder.orderItems.map(async (item: any) => {
// 							await getDoc(
// 								`https://www.medserviceswebpap.com/api/physician/getphysician?fname=${formData.doctorData.fname}&lname=${formData.doctorData.lname}`
// 							);
// 							if (
// 								item.physicianid.includes(formData.doctorData.fname) &&
// 								item.physicianid.includes(formData.doctorData.lname)
// 							) {
// 								item.physicianid = formData.doctorData.id;
// 							} else if (
// 								item.physicianid.includes(formData.doctor2Data.fname) &&
// 								item.physicianid.includes(formData.doctor2Data.lname)
// 							) {
// 								item.physicianid = formData.doctor2Data.id;
// 							}
// 						})
// 					);
// 					formData.patientData.webpapId = patientId;
// 					formData.patientData.submissionDate = new Date();

// 					await addDrugs(formData.drugData.webpapOrder);
// 					formData.drugData.webpapOrder.orderItems.forEach((item: any) => {
// 						item.orderDate = new Date();
// 						formData.drugData.drugData.forEach((drug: any) => {
// 							if (item.name === drug.name) {
// 								item.strength = drug.strength;
// 							}
// 						});
// 					});
// 					await sendDataToDB(formData);
// 				});
// 			//handle loader sceen
// 			loader.classList.add('hide');
// 			setTimeout(() => {
// 				loader.style.display = 'none';
// 			}, 200);
// 			resolve();
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// async function sendDataToDB(data: any) {
// 	try {
// 		const response = await fetch(
// 			'https://us-central1-transparent-rx.cloudfunctions.net/sendDataToFirebase',
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(data),
// 			}
// 		);
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function createClient(data: any) {
// 	try {
// 		const response = await fetch(
// 			'http://127.0.0.1:5001/transparent-rx/us-central1/addClient',
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(data),
// 			}
// 		);
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
