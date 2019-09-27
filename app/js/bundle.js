const carousels = document.getElementsByClassName('carousel-inner'),
	  carouselButtons = document.getElementsByClassName('carousel-button'),
	  formsButtons = document.getElementsByName('form-button'), 
	  formsCloseButtons = document.getElementsByClassName('button-close-form'),
	  dropDownButtons = document.getElementsByClassName('drop-down-button');

let dropDownEls = [],
	carouselsInfo = [],
	newActiveCarouselItem;

window.onload = function () {

	document.getElementById('filter').style.height = document.body.offsetHeight + 'px';

	let carousel,
		items;
	for (let d = 0; d<dropDownButtons.length; d++) {

		dropDownEls[d] = {
			element: dropDownButtons[d].nextSibling.nextSibling,
			collapsed: false,
			parent: dropDownButtons[d].parentElement
		}

		dropDownButtons[d].onclick = function () {
			dropDownHandle(this, dropDownEls[d]);
		}
	}

	for (let a = 0; a < carousels.length; a++) {
		carousel = carousels[a];
		items = carousel.getElementsByClassName('carousel-item');
		carouselsInfo[a] = {
			parent: carousel,
			index: 0,
			items: items,
		}
	}

	for (let i = 0; i < carouselButtons.length; i++) {
		carouselButtons[i].onclick = function() {
			carouselScroll(Number(this.getAttribute('scroll-index')), this.parentElement.children[1].children[0]);
		}
	}

	for (let g = 0; g < formsButtons.length; g++) {
		formsButtons[g].onclick = function() {
			formOpening(this.getAttribute('data-form'));
		}
	}

	for (let n = 0; n < formsCloseButtons.length; n++) {
		formsCloseButtons[n].onclick = function() {
			formClosing(this.getAttribute('data-form'));
		}
	}

	document.getElementById('burger-button').onclick = function () {
		this.classList.toggle('fa-times');
		filter.classList.toggle('display-none');
		document.getElementById('header-nav').classList.toggle('media-display-none');
	}

}

function formOpening(data) {
	var form = document.getElementsByName(data);
	form[0].style.display = 'inline-block';
	filter.classList.toggle('display-none');
}

function formClosing(data) {
	var form = document.getElementsByName(data);
	form[0].style.display = 'none';
	filter.classList.toggle('display-none');
}

function dropDownHandle(button, el) {

	const buttons = button.parentElement.getElementsByTagName('li'),
		  expandEl = button.parentElement.parentElement;
	let counter = 0;

	for (let l = 0; l < buttons.length; l++) {
		if (buttons[l].classList.contains('menu-dropdown-active')) {
			counter++;
		}
	}

	console.log

	if ((button.classList.contains('menu-dropdown-active') && counter == 1) || counter == 0) {
		expandEl.classList.toggle('full-width');
		expandEl.nextSibling.nextSibling.classList.toggle('drop-down-display-none');
	}

	button.classList.toggle('menu-dropdown-active');
	el.element.classList.toggle('drop-down-display-none');

}

function carouselScroll(increment, parent) {

	const carouselIndex = parent.getAttribute('carousel-index'),
		  currentActiveCarouselItemWidth = Number(carouselsInfo[carouselIndex].items[carouselsInfo[carouselIndex].index].offsetWidth);
	let amountInRow,
		padding;
	
	if (document.body.offsetWidth < 750 || parent.classList.contains('carousel-media-decrease')) {
		amountInRow = 1;
	} else {
		amountInRow = Number(parent.getAttribute('carousel-amount-inRow')) || 1;
	}

	if (carouselsInfo[carouselIndex].index+increment == carouselsInfo[carouselIndex].items.length - (amountInRow - 1) 
		|| carouselsInfo[carouselIndex].index+increment == -1) return 0;
	
	carouselsInfo[carouselIndex].index += increment;

	newActiveCarouselItem = carouselsInfo[carouselIndex].items[carouselsInfo[carouselIndex].index];

	const newActiveCarouselItemWidth = Number(newActiveCarouselItem.offsetWidth);

	padding = (currentActiveCarouselItemWidth/2 + newActiveCarouselItemWidth/2) * carouselsInfo[carouselIndex].index * -1 + 'px';
	carouselsInfo[carouselIndex].parent.style.left = padding;

	return 0;
}