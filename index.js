
// TODO Controller
var todoController = (function () {
  // Private local Scope


  // Public global scope
  return {

  }
})();




// UI Controller
var UIController = (function () {
  // Local

  // An Object to hold the class names for selecting
  var classNames = {
    todoInputText: '.add-todo-text',
    todoInputBtn: '.add-todo-button',
  };

  // Global
  return {
    // Get the input from text field and return it as an object
    getInput: function () {
      return {
        todo: document.querySelector(classNames.todoInputText).value
      };
    },
    // Makes the class Names function public so the Global controller can access
    getClassNames: function () {
      return classNames;
    }
  };
})();


// GLOBAL Controller
var controller = (function (todoCtrl, UIctrl) {

  var classNames = UIctrl.getClassNames(); // 

  ctrlAddItem = function () {
    // 1. Input value received from the getInput function in UIController
    var input = UIctrl.getInput();
    console.log(input);

    // 2. Add the item to the todo controller

    // 3. Add the item to the ui controller
  }

  // Add item function will run if submit button is clicked
  document.querySelector(classNames.todoInputBtn).addEventListener('click', ctrlAddItem);

  // Add item function will run if enter (key13) is pressed
  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      ctrlAddItem();
    }
  });

})(todoController, UIController);
/* Here I am passing the todoController and UIController as two
parameters to the controller function. This enables me to
use the public methods from those two modules in this controller
function. */