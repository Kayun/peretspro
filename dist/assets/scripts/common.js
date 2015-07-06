var app = {
	loadBgResources: function () {
		console.log('ok');
	},
	showItems: function () {
		var items = document.querySelectorAll('.js-items'),
			itemsLength = items.length,
			count = 0;
		setTimeout(function () {
			var itemInterval = setInterval(function () {
				if (count < itemsLength) {
					items[count].style.opacity = 1;
					items[count].style.transform = 'translate(0,0)';
					count++;
				} else {
					clearInterval(itemInterval);
				}
			}, 100);
		}, 1000);
	},
	menuToggle: function () {
		var menuItemAll = document.querySelectorAll('.js-menu-item'),
			menuItemActiveClass = 'menu__item_state_active';

		menuItemAll.forEach(function (elem)) {
			elem.addEventListener('click', function () {
				//for (var j = 0; j < menuItemAll.length; j++) {
				menuItemAll.forEach(function (elem)) {
					elem.classList.remove(menuItemActiveClass);

				});
				this.classList.add(menuItemActiveClass);
			});
		});

	}
};

app.init = function () {
	this.loadBgResources();
	this.showItems();
	this.menuToggle();
};

document.addEventListener('DOMContentLoaded', app.init());
