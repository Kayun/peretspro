var app = {

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

		forEachMethod.call(menuItemAll, function (elem) {
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

			isClass(btn, btnClassHide) ? parallax.desable() : parallax.enable()

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
	},

	request: {

		nextStep: function () {
			var currentStep = event.currentTarget.closest('.form__step'),
				nextStep = currentStep.nextElementSibling,
				stepClassActive = 'form__step_state_active';

			if (currentStep.classList.contains('form__step_start')) {
				this.name();
			}

			currentStep.classList.remove(stepClassActive);
			setTimeout(function () {
				currentStep.classList.add('hide');
				nextStep.classList.remove('hide');
				setTimeout(function () {
					nextStep.classList.add(stepClassActive);
				}, 200);
			}, 800);
		},

		name: function () {
			var inputName = document.getElementById('inputName'),
				nameSpan = document.querySelectorAll('.js-input-name');

			forEachMethod.call(nameSpan, function (elem) {
				elem.innerHTML = inputName.value;
			});
		},

		formSend: function () {
			var form = document.getElementById('formSend'),
				petals = document.getElementById('petals');

			petals.classList.add('petals_state_show');
			this.nextStep();
			form.submit();
		},

		validForm: function () {
			var form = document.getElementById('formSend'),
				validate = {};

			validate.validName = function () {
				var input = event.currentTarget,
					btn = input.closest('.form__step').querySelector('.button-small');

				if (input.value.length < 4) {
					input.classList.add('error');
					btn.disabled = true;
				} else {
					input.classList.remove('error');
					btn.disabled = false;
				}
			};

			validate.validMail = function () {
				var input = event.currentTarget,
					btn = input.closest('.form__step').querySelector('.button-small'),
					reg = /^(\w|[.])+@[a-z]+[.][a-z]{2,}$/i;

				if (!reg.test(input.value)) {
					input.classList.add('error');
					btn.disabled = true;
				} else {
					input.classList.remove('error');
					btn.disabled = false;
				}
			};

			validate.validPhone = function () {
				var input = event.currentTarget,
					btn = input.closest('.form__step').querySelector('.button-small'),
					reg = /^((\+[7])|[8])(([-]?|\s)|[(]?)[0-9]{3,4}([)]?|([-]?|\s))[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/i;

				if (!reg.test(input.value)) {
					input.classList.add('error');
					btn.disabled = true;
				} else {
					input.classList.remove('error');
					btn.disabled = false;
				}
			};

			form.elements.name.oninput = validate.validName;
			form.elements.mail.oninput = validate.validMail;
			form.elements.phone.oninput = validate.validPhone;
		}
	},

	parallax: function Parallax(cont, param) {
		var obj = this
		this.cont = cont;
		this.active = (param.active.toString() !== '') ? param.active : true;

		this.mousePos = function () {
			return {top: event.clientY, left: event.clientX}
		};

		this.pos = function (elem) {
			var box = elem.getBoundingClientRect(),
				top, left;

			top = box.top + window.pageYOffset + elem.offsetWidth / 2;
			left = box.left + window.pageXOffset + elem.offsetHeight / 2;
			return {top: top, left: left}
		};

		this.enable = function () {
			this.active = true;
			Array.prototype.forEach.call(cont.children, function (elem) {
				obj.init(elem);
			});
		}

		this.desable = function () {
			this.active = false;
			Array.prototype.forEach.call(cont.children, function (elem) {
				obj.init(elem);
			});
		}

		this.init = function (elem) {

			window.addEventListener('mousemove', function () {

				if (!obj.active) return false

				var deffY = obj.mousePos().top - obj.pos(elem).top;
				var deffX = obj.mousePos().left - obj.pos(elem).left;
				var windowHeight = document.documentElement.clientHeight,
					windowWidth = document.documentElement.clientWidth,
					y, x;

				var kY = windowHeight - obj.pos(elem).top;
				var kX = windowWidth - obj.pos(elem).left;
				var depth = elem.dataset.depth;

				if (deffY < 0) {
					y = -param.deviation * depth * (obj.pos(elem).top - obj.mousePos().top) / obj.pos(elem).top;
				} else if (deffY > 0) {
					y = param.deviation * depth * (obj.mousePos().top - obj.pos(elem).top) / kY;
				} else {
					y = 0;
				}

				if (deffX < 0) {
					x = -param.deviation * depth * (obj.pos(elem).left - obj.mousePos().left) / obj.pos(elem).left;
				} else if (deffX > 0) {
					x = param.deviation * depth * (obj.mousePos().left - obj.pos(elem).left) / kX;
				} else {
					x = 0;
				}

				elem.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
			});
		};

		Array.prototype.forEach.call(cont.children, function (elem) {
			obj.init(elem);
		});
	}

};

var forEachMethod = Array.prototype.forEach, // для перебора коллекций
	parallax;

app.init = function () {
	var petals = document.getElementById('petals');

	parallax = new this.parallax(petals, {
		deviation: 30,
		active: false
	});
	this.loadResources();
	this.startAnim();
	this.buttonFormSend();
	this.request.validForm();
};

document.addEventListener('DOMContentLoaded', app.init());
