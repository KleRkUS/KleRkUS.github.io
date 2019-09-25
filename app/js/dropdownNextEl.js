const dropDownButtons = document.getElementsByClassName('drop-down-button');

let dropDownEls = [];

window.onload = function () {

	for (let d = 0; d<dropDownButtons.length; d++) {

		dropDownEls[d] = {
			element: dropDownButtons[d].nextSibling.nextSibling
		}

		dropDownButtons[d].onclick = function () {
			dropDownHandle(this, dropDownEls[d]);
		}
	}

}

function dropDownHandle(button, el) {

	button.classList.toggle('menu-dropdown-active');
	el.element.classList.toggle('drop-down-display-none');

}