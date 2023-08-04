//Search Inside Navbar
const search = document.querySelector('#search') as HTMLInputElement;
search.addEventListener('input', () => {
	const q = search.value;
	$.ajax({
		url: '/search?query=' + q,
		type: 'GET',
		success: function (data: Document) {
			const searchResultsList = $('#searchresults-list');
			const searchResultWrapper = $(data).find('.search-result-wrapper');
			searchResultsList.html(searchResultWrapper.html());
			searchResultsList.addClass('active');
		},
	});
	return false;
});
//close search results
const searchResultsList = $('#searchresults-list');
const searchField = $('#search');

$(window).on('click', () => {
	//Hide the menus if visible
	if (searchResultsList.hasClass('active')) {
		searchResultsList.removeClass('active');
		searchField.val('');
	}
});

$('.search-input-c').on('click', (event) => {
	event.stopPropagation();
});
