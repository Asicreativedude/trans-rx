document.addEventListener('DOMContentLoaded', async () => {
	const loader = document.querySelector('.loader-s') as HTMLDivElement;
	const queryParam = new URLSearchParams(window.location.search);
	queryParam.has('uniqueId');
	const uniqueId = queryParam.get('uniqueId');

	if (uniqueId) {
		await createNEwClient(uniqueId).then(() => {
			loader.classList.add('hide');
			setTimeout(() => {
				loader.style.display = 'none';
			}, 200);
		});
	} else {
		alert('Error occured, please contact support');
	}
});

async function createNEwClient(data: string) {
	try {
		const response = await fetch(
			'https://us-central1-transparent-rx.cloudfunctions.net/newClient',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ uniqueId: data }),
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
