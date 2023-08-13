//Search Inside Navbar
const search = document.querySelector('#search') as HTMLInputElement;
const searchResultsList = document.querySelector(
	'.drug-list-c'
) as HTMLDivElement;
document.addEventListener('click', (e) => {
	//Hide the menus if visible
	if (e.target === search) {
		return;
	}
	if (searchResultsList.contains(e.target as Node)) {
		return;
	}
	if (searchResultsList.classList.contains('active')) {
		searchResultsList.classList.remove('active');
		search.value = '';
	}
});

search.addEventListener('input', () => {
	if (!searchResultsList.classList.contains('active')) {
		searchResultsList.classList.add('active');
	}
});

const closeBtn = document.querySelector(
	'.drug-list-close-c'
) as HTMLButtonElement;
closeBtn.addEventListener('click', () => {
	searchResultsList.classList.remove('active');
	search.value = '';
});
