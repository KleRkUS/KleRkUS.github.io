var carousels = document.getElementsByClassName('carousel-inner'),
	carouselButtons = document.getElementsByClassName('carousel-button'),
	carouselsInfo = [],
	newActiveCarouselItem;



/*
	
	Функция устанавливает карусель на
	первый элемент, собирает массив объектов
	всех каруселей на странице

*/

window.onload = function () {
	var carousel,
		items;
	for (var a = 0; a < carousels.length; a++) {
		carousel = carousels[a];
		items = carousels[a].getElementsByClassName('carousel-item');
		carouselsInfo[a] = {
			parent: carousels[a],
			index: 0,
			items: items
		}
		items[0].scrollIntoView();
	}

	for (var i = 0; i < carouselButtons.length; i++) {
		carouselButtons[i].onclick = function() {
			carouselScroll(Number(this.getAttribute('scroll-index')), this.parentElement.children[1].children[0]);
		}
	}
}


/*

	Функция устанавливает новый элемент карусели
	в зависимости от carousel-index у кнопки, обновляет 
	индекс скролла у объекта карусели

*/

function carouselScroll(increment, parent) {

	var carouselIndex = parent.getAttribute('carousel-index');

	if (carouselsInfo[carouselIndex].index+increment == carouselsInfo[carouselIndex].items.length || carouselsInfo[carouselIndex].index+increment == -1) return 0;
	
	carouselsInfo[carouselIndex].index += increment;

	newActiveCarouselItem = carouselsInfo[carouselIndex].items[carouselsInfo[carouselIndex].index];
	newActiveCarouselItem.scrollIntoView();

	return 0;
}