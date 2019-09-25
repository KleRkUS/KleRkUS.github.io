const dropDownButtons = document.getElementsByClassName('drop-down-button');

let dropDownEls = [],
	carousels = document.getElementsByClassName('carousel-inner'),
	carouselButtons = document.getElementsByClassName('carousel-button'),
	carouselsInfo = [],
	newActiveCarouselItem;

window.onload = function () {
	let carousel,
		items;
	for (let d = 0; d<dropDownButtons.length; d++) {

		dropDownEls[d] = {
			element: dropDownButtons[d].nextSibling.nextSibling
		}

		dropDownButtons[d].onclick = function () {
			dropDownHandle(this, dropDownEls[d]);
		}
	}

	for (let a = 0; a < carousels.length; a++) {
		carousel = carousels[a];
		items = carousel.getElementsByClassName('carousel-item');
		for (let c = 0; c < items.length; c++) {
			//items[c].style.width = carousel.parentElement.offsetWidth + 'px';
		}
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

}

function dropDownHandle(button, el) {

	button.classList.toggle('menu-dropdown-active');
	el.element.classList.toggle('drop-down-display-none');

}

function carouselScroll(increment, parent) {

	const carouselIndex = parent.getAttribute('carousel-index'),
		  currentActiveCarouselItemWidth = Number(carouselsInfo[carouselIndex].items[carouselsInfo[carouselIndex].index].offsetWidth);
	let padding;
	
	if (carouselsInfo[carouselIndex].index+increment == carouselsInfo[carouselIndex].items.length 
		|| carouselsInfo[carouselIndex].index+increment == -1) return 0;
	
	carouselsInfo[carouselIndex].index += increment;

	newActiveCarouselItem = carouselsInfo[carouselIndex].items[carouselsInfo[carouselIndex].index];

	const newActiveCarouselItemWidth = Number(newActiveCarouselItem.offsetWidth);

	console.log(carouselsInfo[carouselIndex].index);
	padding = (currentActiveCarouselItemWidth/2 + newActiveCarouselItemWidth/2) * carouselsInfo[carouselIndex].index * -1 + 'px';
	carouselsInfo[carouselIndex].parent.style.left = padding;

	return 0;
}