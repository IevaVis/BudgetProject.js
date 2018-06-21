
// BUDGET CONTROLLER
let budgetController = (function () {

	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};


	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	}

	return {
		addItem: function(type, des, val) {
			let newItem, ID;

			//Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			//Create new item based on inc or exp type 
			if (type === "exp") {
				newItem = new Expense(ID, des, val);
			} else if (type === "inc") {
				newItem = new Income(ID, des, val);
			}

			//Push it to the data structure
			data.allItems[type].push(newItem);

			//Return new element
			return newItem;
		},

		testing: function() {
			console.log(data)
		}
	};

	



})();



// UI CONTROLLER
let UIController = (function() {
    
	let DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMStrings.inputType).value, // will be either + or -
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
			};
		},

		addListItem: function(obj, type) {
			let html, newHtml, element;

			// Create HTML String with placeholder text

			if(type === 'inc') {
				element = DOMStrings.incomeContainer; 

				html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item-delete"><button class="item__delete--btn"><i class="far fa-times-circle"></i></button></div></div></div>';
			} else if(type === 'exp') {
				element = DOMStrings.expensesContainer;

				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="far fa-times-circle"></i></button></div></div></div>';
			};

			// Replace the placeholder text with actual data

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);


			// Insert the HTML into the DOM

			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);



		},

		clearFields: function() {
			let fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

			let fieldsArr = Array.prototype.slice.call(fields);
			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});
			fieldsArr[0].focus();
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

	let updateBudget = function() {

		// 1. calculate the budget

		// 2. return the budget

		// 3. Display the budget on the UI

	};

	let ctrlAddItem = function() {
		let input, newItem;

		// 1. get the input data
		input = UICtrl.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
		// 2. add item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		// 3. add the item to UI
		UICtrl.addListItem(newItem, input.type);

		// 4. clear the fields
		UICtrl.clearFields();

		// 5. calculate and update budget
		updateBudget();

	  }

	};

	return {
		init: function() {
			setupEventListeners();
		}
	};


})(budgetController, UIController); 

controller.init();




