var app = {
	forEachMethod: Array.prototype.forEach, // для перебора коллекций

	loadBgResources: function () {
		console.log('ok');
	},

	showItems: function () {
		var items = document.querySelectorAll('.js-items'),
			count = 0;
		setTimeout(function () {
			var itemInterval = setInterval(function () {
				if (count < items.length) {
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
			menuItemActiveClass = 'menu__item_state_active',
			obj = this;

		try {
			obj.forEachMethod.call(menuItemAll, function (elem) {
				elem.addEventListener('click', function () {
					obj.forEachMethod.call(menuItemAll, function (elem) {
						elem.classList.remove(menuItemActiveClass);
					});
					this.classList.add(menuItemActiveClass);
				});
			});
		} catch (err) {}
	}
};



app.init = function () {
	this.loadBgResources();
	this.showItems();
	this.menuToggle();
};

document.addEventListener('DOMContentLoaded', app.init());
