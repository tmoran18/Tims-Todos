
// TODO Controller
var todoController = (function () {

  // Function constructor for the todo's. This will make each todo enter an object.
  var Todo = function (id, description) {
    this.id = id;
    this.description = description;
  };
  // The array where the Todos will be stored.
  var allTodos = [];

  return {
    // Add the todo to the array
    addTodo: function (description) {
      var newTodo, ID;

      //Create new ID
      if (allTodos.length > 0) {
        ID = allTodos[allTodos.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new todo
      newTodo = new Todo(ID, description);
      // Push new todo into array
      allTodos.push(newTodo);
      // Return the new object
      return newTodo;
    },

    deleteTodo: function (id) {
      var ids, index;

      // Returns a new array with all the current ids in it
      ids = allTodos.map(function (current) {
        return current.id;
      });
      // The index location in the array of the passed in id number for the todo object
      index = ids.indexOf(id);

      // If the id number is not equal to 1 remove the id(index) from the array
      if (index !== -1) {
        allTodos.splice(index, 1);
      }

    },
    testing: function () {
      console.log(allTodos);
    }
  };
})();




// UI Controller
var UIController = (function () {
  // An Object to hold the class names for selecting
  var classNames = {
    todoInputText: '.add-todo-text',
    todoInputBtn: '.add-todo-button',
    todoList: '.todo-list-container',
    deleteIcon: '.delete-icon',
    date: '.date'
  };

  return {
    // Get the input from text field and return it as an object
    getInput: function () {
      return {
        todoDescription: document.querySelector(classNames.todoInputText).value
      };
    },

    addTodo: function (todoObj) {
      var html, newHtml;
      // Create HTML string with placeholder text that will be inserted into the DOM
      html = '<div class="todo-list" id="%id%"><label class="checkbox-container"><input type="checkbox" id="checkbox"><span class="checkmark"></span><span class="text" id="text"> %todoString%</span></label><div class="img-container"><img class="delete-icon" id="delete-icon" src="/images/delete.png" alt="A red delete cross icon"></div></div>';

      // Replace the %todoString% and %id% placeholder text with the todo Object description
      newHtml = html.replace('%todoString%', todoObj.description);
      newHtml = newHtml.replace('%id%', todoObj.id);

      // Get the todo list container for inserting the Html string into
      var todoList = document.querySelector(classNames.todoList);

      // Insert the todo object description into todo container
      todoList.insertAdjacentHTML('beforeend', newHtml);
    },

    deleteTodo: function (selectorID) {
      // Traverse up DOM to remove the child element
      var el = document.getElementById(selectorID)
      el.parentNode.removeChild(el);
    },

    // Gets the span text and the checkbox, checks if checkbox is check, if so line through
    lineThroughTodo: function (todoContainer) {
      var todoText = todoContainer.querySelector("#text");
      var checkbox = todoContainer.querySelector("#checkbox");
      if (checkbox.checked) {
        todoText.style.textDecoration = "line-through";
      } else {
        todoText.style.textDecoration = "none";
      }
    },

    displayDate: function () {
      var now, day, months, month, year;
      now = new Date();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      day = now.getDate();
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(classNames.date).textContent = `${day} ${months[month]} ${year}`;
    },

    // Makes the class Names function public so the Global controller can access
    getClassNames: function () {
      return classNames;
    },
    // Clears the input text field
    clearField: function () {
      var field = document.querySelector(classNames.todoInputText);
      field.value = ""; // Sets the field to blank
      field.focus(); // Puts the focus back on the input field
    },
  };
})();


// App Controller
var controller = (function (todoCtrl, UIctrl) {
  // Function to hold all event listeners - will be run in init()
  var setupEventListeners = function () {
    // Gives access to the classnames in UI controller
    var classNames = UIctrl.getClassNames();

    // Add item function will run if submit button is clicked
    document.querySelector(classNames.todoInputBtn).addEventListener('click', ctrlAddTodo);

    // Add item function will run if enter (key13) is pressed
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        ctrlAddTodo();
      }
    });
    document.querySelector(classNames.todoList).addEventListener('click', ctrlDeleteTodo);
    document.querySelector(classNames.todoList).addEventListener('change', ctrlLineThroughTodo);
  };

  ctrlAddTodo = function () {
    var input, newTodo;
    // 1. Input value received from the getInput function in UIController
    input = UIctrl.getInput();
    if (input.todoDescription !== "") {
      // 2. Add the item to the todo controller
      newTodo = todoCtrl.addTodo(input.todoDescription);
      // 3. Add the item to the ui controller
      UIctrl.addTodo(newTodo);
      // 4. Clear the text input field
      UIctrl.clearField();
    }
  };

  var ctrlDeleteTodo = function (e) {
    var deleteIconID = "delete-icon";
    // Delete the Todo only if the X is clicked
    if (e.target.id === deleteIconID) {
      var itemID = parseInt(e.target.parentNode.parentNode.id);
      // Delete the item from the data structure
      todoCtrl.deleteTodo(itemID);
      // Delete the item from the UI
      UIctrl.deleteTodo(itemID);
    }
  };

  var ctrlLineThroughTodo = function (e) {
    // Get the todo container
    var todoContainer = e.target.parentNode;
    // Put a line through the todo span text
    UIctrl.lineThroughTodo(todoContainer);
  };

  return {
    // Init function to run any locally scoped functions in controller
    init: function () {
      console.log("App has started");
      UIctrl.displayDate();
      setupEventListeners();
    }
  };



})(todoController, UIController);
/* Here I am passing the todoController and UIController as two
parameters to the controller function. This enables me to
use the public methods from those two modules in this controller
function. */

// The init function is placed outside all the IIFE's so it can start up the controller on load.
controller.init();