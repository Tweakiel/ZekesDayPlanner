// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

/*GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar*/

var today = dayjs();

//display date on header
$("#currentDay").text(today.format("dddd, MMMM DD YYYY"));

//button
let saveButton = $(".saveBtn");

//get current hour
let todayHour = today.format("H");

function timeBlock() {
  $(".time-block").each(function () {
    //conditionals for the timeblocks, past present future

    //present
    if (this.id == todayHour) {
      $(this).removeClass("future past").addClass("present");
    }
    //past
    else if (this.id < todayHour || todayHour > 17 || todayHour < 9) {
      $(this).removeClass("future present").addClass("past");
    }
    //future
    else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}


/*
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock*/

/*
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/


//ensures that dom is fully loaded before running function using jQuery
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(saveButton).click(function(){

    //timeblock/ variables
    //.closest() refers to the most relevant/closes id attr time-block 
    //instead of traversing through DOM with parent etc
    
    let timeblockId=$(this.closest('time-block').attr('id'));
    // usertext
    let timeblockText=$(this.siblings('.description').val());
    
    // || {} returns this object as an empty object by defaults
    let plannerObject=JSON.parse(localStorage.getitem('todoPlanner')) || {}
    
    
    });


    function displayLocalStorage(){

      var savetext=JSON.parse(localStorage.getItem('todoPlanner')) ||{};

      for (var [key,value]of Object.entries(savetext)){
        $('#')
      }

    }


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

timeBlock();
