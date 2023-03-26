var today = dayjs();
dayjs.today(today,null, true);
//display date on header
$("#currentDay").text(today.format("dddd, MMMM DD YYYY"));

//button
let saveButton = $(".saveBtn");

//get current hour
let todayHour = today.format("H");

//

//.ready ensures that dom is fully loaded before running function using jQuery
$(document).ready(function () {

  
  $(saveButton).click(function () {

    //timeblock/ variables
    //.closest() refers to the most relevant/closes id attr time-block 
    //instead of traversing through DOM with parent etc

   let timeblockId = $(this).closest('.time-block').attr('id');
    
   
    // usertext

    let timeblockText = $(this).siblings('.description').val();

    // || {} returns this object as an empty object by defaults
    let plannerObject = JSON.parse(localStorage.getItem('todoPlanner')) || {}

    plannerObject[timeblockId] = timeblockText;

    localStorage.setItem('todoPlanner', JSON.stringify(plannerObject));

  });

  function displayLocalStorage() {

    var savetext = JSON.parse(localStorage.getItem('todoPlanner')) || {};

    for (var [key, value] of Object.entries(savetext)) {
      $(`#textHour${key}`).val(value);

    }
    console.log(savetext);
    
  }

//conditional timeblock (changing colors based on time with dayjs)
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


  displayLocalStorage();
  timeBlock();

});


