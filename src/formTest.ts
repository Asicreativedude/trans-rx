const generalURL2 = 'https://www.medserviceswebpap.com/auth/token?hcpid=89';
const authData2 = {
	grant_type: 'password',
	username: 'apiuser',
	password: '123456',
};

let authToken2: string;

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

// getAuth2(generalURL2, authData2).then((data) => {
// 	authToken2 = data.access_token;
// 	// getDoc(
// 	// 	'https://www.medserviceswebpap.com/api/physician/getphysician?lname=test'
// 	// );
// 	deletePatient(
// 		'https://www.medserviceswebpap.com/api/patient/deletepatient?patientId=48'
// 	);
// 	deleteDoc(
// 		'https://www.medserviceswebpap.com/api/physician/deletephysician?physicianId=42'
// 	);
// });

// async function deletePatient(url: string) {
// 	await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${authToken2}`,
// 		},
// 	});
// }
// async function deleteDoc(url: string) {
// 	await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${authToken2}`,
// 		},
// 	});
// }
// async function getDoc(url: string) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken2}`,
// 			},
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();
// 		console.log(res);
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function getPatients(url: string) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${authToken2}`,
// 			},
// 		});
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok');
// 		}

// 		let res = await response.json();
// 		console.log(res);
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
