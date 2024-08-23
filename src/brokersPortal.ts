import htmx from 'htmx.org';
const mainArea = document.getElementById('brokers-main') as HTMLDivElement;
const drugLookup = document.getElementById('drug-lookup') as HTMLDivElement;
const drugLookupLink = document.querySelectorAll('[cd="drug-lookup"]');
const mobileMenuBurger = document.querySelector(
	'.mobile-broker-menu-icon'
) as HTMLDivElement;
drugLookupLink.forEach((link) => {
	link.addEventListener('click', () => {
		if (window.innerWidth < 992) {
			mobileMenuBurger.click();
		}
		drugLookup.style.display = 'block';
		mainArea.style.display = 'none';
	});
});
let hasRun = false;

htmx.onLoad(function (content) {
	const links = document.querySelectorAll('.brokers-menu-link');
	// Check if the function has already run

	// Run the function only if it hasn't run before
	if (!hasRun) {
		checkQueryParams();
		hasRun = true;
	}

	content.addEventListener('htmx:load', function (event) {
		if ((event.target as Element).id === 'request') {
			// Re-init forms
			//@ts-ignore
			Webflow.require('forms').ready();
			const requestMedForm = document.getElementById(
				'wf-form-request-medication'
			) as HTMLFormElement;
			const requestCta = document.getElementById(
				'submit-med-request'
			) as HTMLButtonElement;

			requestCta!.addEventListener('click', function (e) {
				if (
					(requestMedForm.querySelector('#broker-name') as HTMLInputElement)
						.value === '' ||
					(requestMedForm.querySelector('#medication-name') as HTMLInputElement)
						.value === ''
				)
					return;

				e.preventDefault();
				const data = {
					agentName: (requestMedForm.querySelector(
						'#broker-name'
					) as HTMLInputElement)!.value,
					requestedMed: (
						requestMedForm.querySelector('#medication-name') as HTMLInputElement
					).value,
				};
				requestCta!.value = 'Sending...';
				fetch(
					'https://us-central1-transparent-rx.cloudfunctions.net/requestMed',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					}
				)
					.then((response) => {
						response;
						requestMedForm.style.display = 'none';
						(
							document.querySelector('.request-med-success') as HTMLDivElement
						).style.display = 'block';
					})

					.catch((error) => {
						console.error('Error:', error);
					});
			});
			return;
		}

		if ((event.target as Element).id === 'video-tutorial') {
			//@ts-ignore
			const player = new Plyr('#player');
		}
	});
	content.addEventListener('htmx:afterSwap', function () {
		mainArea!.scrollTop = 0;
	});
	links.forEach((link) => {
		link.addEventListener('click', function () {
			if (drugLookup.style.display === 'block') {
				drugLookup.style.display = 'none';
				mainArea.style.display = 'block';
			}
			if (window.innerWidth < 992) {
				mobileMenuBurger.click();
			}
			link.classList.add('current');
			links.forEach((l) => {
				if (l !== link) {
					l.classList.remove('current');
				}
			});
		});
	});
});

function checkQueryParams() {
	const urlParams = new URLSearchParams(window.location.search);
	const param1 = urlParams.get('section');

	if (param1 === 'medications') {
		document
			.querySelector('[cd="drug-lookup"]')!
			.dispatchEvent(new Event('click'));
	} else if (param1 === 'info') {
		document
			.querySelector('[hx-select="#pre-enrollment"]')!
			.dispatchEvent(new Event('click'));
	}
}
