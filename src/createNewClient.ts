// interface ClientData {
// 	patient: TPRXPatient;
// 	doctor: TPRXDoctor;
// 	doctor2?: TPRXDoctor;
// 	orders: TPRXOrderItem[];
// 	uniqueId: string;
// }

// document.addEventListener('DOMContentLoaded', async () => {
// 	const loader = document.querySelector('.loader-s') as HTMLDivElement;
// 	// Retrieve the form data from sessionStorage
// 	const formData = sessionStorage.getItem('formData');
// 	const parsedFormData = formData ? JSON.parse(formData) : null;
// 	if (parsedFormData) {
// 		console.log('Form data found in sessionStorage: ', parsedFormData);
// 		await createClient(parsedFormData).then(() => {
// 			// Optionally, clear the sessionStorage if you no longer need the data
// 			loader.classList.add('hide');
// 			setTimeout(() => {
// 				loader.style.display = 'none';
// 			}, 200);
// 		});
// 	} else {
// 		console.log('No form data found in sessionStorage.');
// 	}
// });

// // async function sendDataToDB(data: ClientData) {
// // 	try {
// // 		const response = await fetch(
// // 			'https://us-central1-transparent-rx.cloudfunctions.net/sendDataToFirebase',
// // 			{
// // 				method: 'POST',
// // 				headers: {
// // 					'Content-Type': 'application/json',
// // 				},
// // 				body: JSON.stringify(data),
// // 			}
// // 		);
// // 		if (!response.ok) {
// // 			throw new Error('Network response was not ok');
// // 		}

// // 		let res = await response.json();
// // 		return res;
// // 	} catch (err) {
// // 		console.log(err);
// // 	}
// // }

// async function createClient(data: ClientData) {
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
