var Select = function(target, settings) {

	this.target   = null;
	this.select   = null;
	this.display  = null;
	this.list     = null;
	this.options  = [];
	this.isLarge  = false;
	this.value    = null;
	this.selected = null;
	this.settings = null;

	this.init = function() {
		switch(typeof target) {
			case 'object':
				this.target = target;
				break;
			case 'string': 
				this.target = document.querySelector(target);
				break;
		}

		this.settings = this.getSettings(settings);
		this.buildSelect();

		this.target.parentNode.replaceChild(this.select, this.target);
		this.target.style.display = 'none';
		this.select.appendChild(this.target);

		document.addEventListener('click', this.handleClickOff.bind(this));
		this.positionList();
	};

	this.buildSelect = function() {
		this.select = document.createElement('div');
		this.select.classList.add('select');

		this.display = document.createElement('span');
		this.display.classList.add('value');
		this.display.addEventListener('click', this.handleDisplayClick.bind(this));
		this.select.appendChild(this.display);

		this.buildList();

		if(this.options.length) {
			this.value = this.options[this.target.selectedIndex].getAttribute('data-value');
			this.selected = this.options[this.target.selectedIndex];
			this.display.innerHTML = this.selected.innerHTML;
		}

		if(
			(this.settings.filtered === 'auto' && this.options.length >= this.settings.filter_threshold) ||
			this.settings.filtered === true
		) {
			this.isLarge = true;
			this.select.classList.add('large');
		}

	};

	this.buildList = function() {
		this.list = document.createElement('div');
		this.list.classList.add('list');

		this.buildFilter();
		this.buildOptions();

		this.select.appendChild(this.list);
	};

	this.buildFilter = function() {
		var wrapper = document.createElement('div');
		    wrapper.classList.add('filter');

		this.filter = document.createElement('input');
		this.filter.type = 'text';
		this.filter.setAttribute('placeholder',this.settings.filter_placeholder);
		this.filter.addEventListener('keyup', this.handleFilterKeyup.bind(this));

		wrapper.appendChild(this.filter);
		this.list.appendChild(wrapper);
	};

	this.buildOptions = function() {
		var ul = document.createElement('ul');

		var options = this.target.querySelectorAll('option');

		for(var i = 0; i < options.length; i++) {
			var li = document.createElement('li');
			    li.setAttribute('data-value', options[i].value);
			    li.innerHTML = options[i].innerHTML;
			    li.addEventListener('click', this.handleOptionClick.bind(this));

			ul.appendChild(li);
			this.options.push(li);
		}

		this.list.appendChild(ul);
	};

	this.positionList = function() {
		if(!this.isLarge) {
			this.list.style.top = '-' + this.selected.offsetTop + 'px';
		}
	};

	this.clearFilter = function() {
		this.filter.value = '';

		for(var i = 0; i < this.options.length; i++) {
			this.options[i].style.display = 'block';
		}
	};

	this.closeList = function() {
		this.list.classList.remove('open');
	};

	this.getSettings = function(settings) {
		var defaults = {
			filtered: 'auto',
			filter_threshold: 8,
			filter_placeholder: 'Filter options...'
		};

		for(var p in settings) {
			defaults[p] = settings[p];
		}

		return defaults;
	};

	// EVENT HANDLERS

	this.handleDisplayClick = function(e) {
		this.list.classList.add('open');

		if(this.isLarge) {
			this.filter.focus();
		}
	};

	this.handleFilterKeyup = function(e) {
		var self = this;

		this.options.filter(function(li) {
			if(li.innerHTML.substring(0, self.filter.value.length).toLowerCase() == self.filter.value.toLowerCase()) {
				li.style.display = 'block';
			} else {
				li.style.display = 'none';
			}
		});
	};

	this.handleOptionClick = function(e) {
		this.display.innerHTML = e.target.innerHTML;
		this.target.value      = e.target.getAttribute('data-value');
		this.value             = this.target.value;
		this.selected          = e.target;

		this.closeList();
		this.clearFilter();

		setTimeout(this.positionList.bind(this), 200);
	};

	this.handleClickOff = function(e) {
		if(!this.select.contains(e.target)) {
			this.closeList();
		}
	};

	this.init();

};
