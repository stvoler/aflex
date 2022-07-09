window.addEventListener('load',function(){
  document.querySelector('body').classList.remove("loading")  
});

/* MODAL START */
class Modal{
	static returnModalBg(){
		return document.getElementById('modal-bg');
	}
	static returnModalOpenButton(){
		return document.querySelectorAll('[data-toggle="modal"]');
	}
	static returnCloseAllModalButton(){
		return document.querySelectorAll('.close-js');
	}
	static returnCloseModalButton(){
		return document.querySelectorAll('.close-current-js');
	}

	initializeModal(){
		this.constructor.returnModalOpenButton().forEach(el => {
			el.addEventListener('click', () => {
				let target = el.getAttribute('data-target');
				if (target) {
					let modalWindow = document.querySelector("[data-modal="+target);
					this.constructor.trigger_modal(modalWindow);
				}
        if (target == 'login-modal') {
          document.querySelector('.app-modal').classList.add('show');
        }
			})
		});
	}
	close_modals() {
		let modalsCollection = document.querySelectorAll('[data-modal]');
		modalsCollection.forEach(el => {
			el.classList.remove('show');
			Modal.returnModalBg().classList.remove('open');
		})
	}
	close_modal(modal) {
		modal.classList.remove('show');
		let modalsCollection = document.querySelectorAll('[data-modal]');
		let openedModals = 0;
		modalsCollection.forEach(el => {
			if(el.classList.contains('show')){
				openedModals++;
			}
		})
		if(openedModals < 1){
			Modal.returnModalBg().classList.remove('open');
		}
	}
	static trigger_modal(modal){
		if (modal) {
			modal.classList.add('show');
			Modal.returnModalBg().classList.add('open');
		}
	}
}

let modal = new Modal();
modal.initializeModal();
Modal.returnCloseAllModalButton().forEach(el => {
	el.addEventListener('click', () => {
		modal.close_modals();
	})
})
window.onclick = function (event) {
	if (event.target == Modal.returnModalBg()) {
		modal.close_modals();
	}
}
Modal.returnCloseModalButton().forEach(el => {
	el.addEventListener('click', () => {
		let currentModal = el.closest('[data-modal]');
		modal.close_modal(currentModal);
	})
})
/* MODAL END */

/* SELECT OPTION Style START */
const CLASS_NAME_SELECT = 'select';
const CLASS_NAME_ACTIVE = 'select_show';
const CLASS_NAME_SELECTED = 'select-option-selected';
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]';
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
const SELECTOR_OPTION_SELECTED = '.select-option-selected';
class CustomSelect {
  constructor(target, params) {
    this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    if (this._params['options']) {
      this._elRoot.classList.add(CLASS_NAME_SELECT);
      this._elRoot.innerHTML = CustomSelect.template(this._params);
    }
    this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
    this._elRoot.addEventListener('click', this._onClick.bind(this));
  }
  _onClick(e) {
    const target = e.target;
    const type = target.closest(SELECTOR_DATA).dataset.select;
    switch (type) {
      case 'toggle':
        this.toggle();
        break;
      case 'option':
        this._changeValue(target);
        break;
    }
  }
  _update(option) {
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    option.classList.add(CLASS_NAME_SELECTED);
    this._elToggle.textContent = option.textContent;
    this._elToggle.value = option.dataset['value'];
    this._elToggle.dataset.index = option.dataset['index'];
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, option) : null;
    return option.dataset['value'];
  }
  _reset() {
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    this._elToggle.textContent = 'Выберите из списка';
    this._elToggle.value = '';
    this._elToggle.dataset.index = -1;
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return '';
  }
  _changeValue(option) {
    if (option.classList.contains(CLASS_NAME_SELECTED)) {
      this.hide();
    }
    this._update(option);
    this.hide();
		scroll.start();
  }
  show() {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
    this._elRoot.classList.add(CLASS_NAME_ACTIVE);
		scroll.stop();
  }
  hide() {
    this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
  }
  toggle() {
    if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
      this.hide();
    } else {
      this.show();
    }
  }
  dispose() {
    this._elRoot.removeEventListener('click', this._onClick);
  }
  get value() {
    return this._elToggle.value;
  }
  set value(value) {
    let isExists = false;
    this._elRoot.querySelectorAll('.select-option').forEach((option) => {
      if (option.dataset['value'] === value) {
        isExists = true;
        return this._update(option);
      }
    });
    if (!isExists) {
      return this._reset();
    }
  }
  get selectedIndex() {
    return this._elToggle.dataset['index'];
  }
  set selectedIndex(index) {
    const option = this._elRoot.querySelector(`.select-option[data-index="${index}"]`);
    if (option) {
      return this._update(option);
    }
    return this._reset();
  }
}
CustomSelect.template = params => {
  const name = params['name'];
  const options = params['options'];
  const targetValue = params['targetValue'];
  let items = [];
  let selectedIndex = -1;
  let selectedValue = '';
  let selectedContent = 'Выберите из списка';
  options.forEach((option, index) => {
    let selectedClass = '';
    if (option[0] === targetValue) {
      selectedClass = ' select-option-selected';
      selectedIndex = index;
      selectedValue = option[0];
      selectedContent = option[1];
    }
    items.push(`<li class="select-option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
  });
  return `<button type="button" class="select-toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  <div class="select-dropdown">
    <ul class="select-options">${items.join('')}</ul>
  </div>`;
};
document.addEventListener('click', (e) => {
  if (!e.target.closest('.select')) {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
			scroll.start();
    });
  }
});
const selects = document.querySelectorAll('.select');
selects.forEach(el => {
  new CustomSelect(el);
})
/* SELECT Style END */


const triggerMenu = document.querySelector('.trigger-menu-catalog');
const menuCatalog = document.querySelector('.menu-top');
const menuCatalogLi = document.querySelectorAll('.menu-top .menu > li');
// const menuTop = document.querySelector('.menu-top');
const modalBg = document.querySelector('#modal-bg');
triggerMenu.onclick = function() {
  this.classList.toggle('active');
	menuCatalog.classList.toggle('show');
  // menuTop.classList.toggle('show');
  modalBg.classList.toggle('menu-bg');
  modalBg.classList.toggle('open');
}
modalBg.onclick = function() {
	triggerMenu.classList.remove('active');
	menuCatalog.classList.remove('show');
  // menuTop.classList.remove('show');
	modalBg.classList.remove('open', 'menu-bg');
}
menuCatalogLi.forEach(el => {
  el.addEventListener('click', () => {
    menuCatalogLi.forEach((item) => {
      item.classList.remove("active");
    });
    el.classList.toggle('active');
  })
})