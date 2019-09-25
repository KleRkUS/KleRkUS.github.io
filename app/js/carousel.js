let carousels = document.getElementsByClassName('carousel-inner'),
	carouselButtons = document.getElementsByClassName('carousel-button'),
	carouselsInfo = [],
	newActiveCarouselItem;



/*
	
	Функция устанавливает карусель на
	первый элемент, собирает массив объектов
	всех каруселей на странице

*/

window.onload = function () {
	let carousel,
		items;
	for (let a = 0; a < carousels.length; a++) {
		carousel = carousels[a];
		items = carousel.getElementsByClassName('carousel-item');
		for (let c = 0; c < items.length; c++) {
			items[c].style.width = carousel.parentElement.offsetWidth + 'px';
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


/*

	Функция устанавливает новый элемент карусели
	в зависимости от carousel-index у кнопки, обновляет 
	индекс скролла у объекта карусели, скроллит к следующему элементу

*/

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