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
		sendErrorToSlack();
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
		return res.message;
	} catch (err) {
		console.log(err);
	}
}

export async function sendErrorToSlack() {
	const message = {
		blocks: [
			{
				type: 'header',
				text: {
					type: 'plain_text',
					text: '🚨 *Error Occurred* 🚨',
					emoji: true,
				},
			},
			{
				type: 'section',
				fields: [
					{
						type: 'mrkdwn',
						text: `*Message:*\n Thank you page without uniqueId`,
					},
				],
			},
			{
				type: 'divider',
			},
		],
	};

	try {
		const response = await fetch(
			'https://us-central1-transparent-rx.cloudfunctions.net/slackErrors',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(message),
			}
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	} catch (err) {
		console.log(err);
	}
}
