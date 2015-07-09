var app = {
	forEachMethod: Array.prototype.forEach, // для перебора коллекций

	loadResources: function () {
		console.log('ok');
	},

	startAnim: function () {
		var items = document.querySelectorAll('.js-items'),
			headerItems = document.querySelectorAll('.js-header-item');

		setTimeout(interval(items, 100, false), 1000);

		function interval(elem, delay, statEnd) {
			var count = 0, itemInterval;
			itemInterval = setInterval(function () {
				if (count < elem.length) {
					elem[count].style.opacity = 1;
					elem[count].style.transform = 'translate(0,0)';
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
			btn = event.currentTarget,
			startScreenHideClass = 'wrapper_state_hide';

		startScreen.classList.toggle(startScreenHideClass);
	}
};



app.init = function () {
	this.loadResources();
	this.startAnim();
};

document.addEventListener('DOMContentLoaded', app.init());
