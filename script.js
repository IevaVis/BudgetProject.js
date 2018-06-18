
// BUDGET CONTROLLER
let budgetController = (function () {


})();

// UI CONTROLLER
let UIController = (function() {

	let DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn'


	}

	return {
		getInput: function() {
			return {
			type: document.querySelector(DOMStrings.inputType).value, // will be either + or -
			description: document.querySelector(DOMStrings.inputDescription).value,
			value: document.querySelector(DOMStrings.inputValue).value,
			};
		},

		getDOMStrings: function() {
			return DOMStrings;
		}
	};

})();





// GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

	let setupEventListeners = function() {
		let DOM = UICtrl.getDOMStrings();
		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
		if(event.keyCode === 13 || event.which === 13) {
			ctrlAddItem();
			}

		});

	};

	let ctrlAddItem = function() {
		// 1. get the input data
		let input = UICtrl.getInput();
		// 2. add item to budget controller
		// 3. add the item to UI
		// 4. calculate the budget
		// 5. Display the budget on the UI

	}

	return {
		init: function() {
			setupEventListeners();
		}
	};


})(budgetController, UIController); 

controller.init();




