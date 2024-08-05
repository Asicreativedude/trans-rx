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

htmx.onLoad(function (content) {
	const links = document.querySelectorAll('.brokers-menu-link');
	checkQueryParams();

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
		if ((event.target as Element).id === 'eligibility-calc') {
			const incomeFieldAgent = document.getElementById(
				'income'
			) as HTMLInputElement;
			const householdFieldAgent = document.getElementById(
				'household'
			) as HTMLInputElement;
			const medFieldAgent = document.getElementById(
				'medications'
			) as HTMLSelectElement;
			const eligbleBtn = document.getElementById(
				'eligible-btn'
			) as HTMLButtonElement;
			incomeFieldAgent.addEventListener(
				'input',
				function (this: HTMLInputElement) {
					// remove all non-numeric characters
					this.value = this.value.replace(/\D/g, '');
					if (this.value === '') return;
					// add $ at the beginning and commas for thousands separator
					this.value = '$' + parseInt(this.value).toLocaleString();
				}
			);

			function fplCalculatorAgent(household: number, income: number) {
				const yearlyRate = 15060;
				const theFactor = 5380; //added income for each additional person
				const fpl = Math.round(
					(income / (yearlyRate + (household - 1) * theFactor)) * 100
				);
				return fpl;
			}

			function checkEligibiltyAgent(fpl: number, drugName: string) {
				switch (drugName) {
					case 'Abilify Maintena':
						return fpl <= 300;
					case 'Abilify Asimtufii':
						return fpl <= 300;
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

			function setMedications(selectElement: HTMLSelectElement) {
				const medNames = document.querySelectorAll('[cd=drug]');
				medNames.forEach((medName) => {
					const nameOption = document.createElement('option');
					const medNameText = medName.textContent;
					const genericName = medName.getAttribute('cd-generic');

					if (medNameText !== null) {
						nameOption.text = `${medNameText} (${genericName})`;
						nameOption.value = medNameText;
						selectElement.add(nameOption);
					}
				});
			}

			eligbleBtn.addEventListener('click', function () {
				const household = parseInt(householdFieldAgent.value);
				const income = parseInt(incomeFieldAgent.value.replace(/\D/g, ''));
				const fpl = fplCalculatorAgent(household, income);
				const drugName = medFieldAgent.value;
				const eligibility = checkEligibiltyAgent(fpl, drugName);
				const result = document.getElementById('result') as HTMLDivElement;
				const resultProgrmas = document.getElementById(
					'result-programs'
				) as HTMLDivElement;
				if (eligibility) {
					result.classList.remove('not-eligible');
					result.classList.add('eligible');
					result.textContent = `Your client is eligible for ${drugName}`;
					resultProgrmas.classList.remove('active');
				} else {
					result.classList.remove('eligible');
					result.classList.add('not-eligible');
					result.textContent = `Your client isn't eligible for ${drugName}`;
				}
			});

			//@ts-ignore
			window.fsAttributes = window.fsAttributes || [];
			//@ts-ignore
			window.fsAttributes.push([
				'cmsload',
				() => {
					console.log('cmsload Successfully loaded!');
					setMedications(medFieldAgent);
				},
			]);
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
