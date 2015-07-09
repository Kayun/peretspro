var app = {
	forEachMethod: Array.prototype.forEach, // для перебора коллекций

	loadResources: function () {
		console.log('ok');
	},

	startAnim: function () {
		var itemsCollect = document.querySelectorAll('.js-items'),
			headerItems = document.querySelectorAll('.js-header-item'),
			orderQueue;

		orderQueue = function (array) {
			var trueArray = Array.prototype.slice.call(array, 0);

			function sortArray(a, b) {
				return a.dataset.num - b.dataset.num;
			}

			return trueArray.sort(sortArray);
		};

		function interval(elems, delay, statEnd) {
			var count = 0, itemInterval,
				items = elems[0].dataset.num ? orderQueue(elems) : elems;

			itemInterval = setInterval(function () {
				if (count < items.length) {
					items[count].style.opacity = 1;
					items[count].style.transform = 'translate(0,0)';
					count++;
				} else {
					if (statEnd) {
						clearInterval(itemInterval);
					} else {
						clearInterval(itemInterval);
						interval(headerItems, 1000, true);
					}
				}
			}, delay);
		}

		setTimeout(interval(itemsCollect, 100, false), 1000);
	},

	menuToggle: function () {
		var menuItemAll = document.querySelectorAll('.js-menu-item'),
			menuItemActiveClass = 'menu__item_state_active',
			elem = event.currentTarget;

		this.forEachMethod.call(menuItemAll, function (elem) {
			elem.classList.remove(menuItemActiveClass);
		});
		elem.classList.add(menuItemActiveClass);
	},

	buttonFormSend: function () {
		var startScreen = document.getElementById('startScreen'),
			itemOrg = document.getElementById('itemOrg'),
			btn = document.getElementById('btnGoForm'),
			blockRequest = document.getElementById('request'),
			slider = document.getElementById('slider'),
			btnText = btn.childNodes[0],
			colorOrangeHide = 'rgba(222, 164, 82, 0)',
			colorOrangeShow = 'rgba(222, 164, 82, 1)',
			colorWhiteHide = 'rgba(255, 255, 255, 0)',
			colorWhiteShow = 'rgba(255, 255, 255, 1)',
			btnClassHide = 'button_state_hide',
			itemOrgClassHide = 'organizer_state_hide',
			itemOrgClassTrans = 'organizer_trans',
			blockRequestClassShow = 'request_state_show',
			sliderClassTop = 'slider_pos_top',
			sliderClassNoTrans = 'slider_no_trans',
			isClass,
			startScreenHideClass = 'wrapper_state_hide';

		isClass = function (elem, hasClass) {
			return elem.classList.contains(hasClass);
		};

		setTimeout(function () {
			itemOrg.classList.add(itemOrgClassTrans);
		}, 1000);

		btn.addEventListener('click', function () {

			startScreen.classList.toggle(startScreenHideClass);
			blockRequest.classList.toggle(blockRequestClassShow);

			btn.classList.toggle(btnClassHide);

			slider.classList.toggle(sliderClassNoTrans);
			slider.classList.toggle(sliderClassTop);
			setTimeout(function () {
				slider.classList.toggle(sliderClassNoTrans);
			}, 500);

			btn.style.color = isClass(btn, btnClassHide) ? colorOrangeHide : colorWhiteHide;
			itemOrg.style.opacity = 0;
			setTimeout(function () {
				btnText.data = isClass(btn, btnClassHide) ? 'Вернуться на сайт' : btn.dataset.text;
				btn.style.color = isClass(btn, btnClassHide) ? colorWhiteShow : colorOrangeShow;

				itemOrg.classList.toggle(itemOrgClassHide);
				itemOrg.style.opacity = 1;
			}, 250);
		});
	}
};



app.init = function () {
	this.loadResources();
	this.startAnim();
	this.buttonFormSend();
};

document.addEventListener('DOMContentLoaded', app.init());
