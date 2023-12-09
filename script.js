

$(document).ready(function () {
 
    var timeDisplayEl = $('#time-display');
    function displayTime()
    {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
    setInterval(displayTime,1000);
    }
    displayTime();
  


   // Assign saveBtn click listener for user input and get row id and save to local storage
   $(".saveBtn").on("click", function () {
      var rootEl = $('.time-block');
      var khoi = $(this).closest(rootEl).children("#hourBlock").text();
      var heo = $(this).closest(rootEl).children(".description").val();
      localStorage.setItem(khoi, heo);
    
   });

   $("#clear").on("click", function () {
  
    var confirm = window.confirm("Are you sure you want to clear all data? "); 
    if(confirm)
   {
      localStorage.clear();
      window.location.reload();
   }
   });

 


   function hourTracker() {
     // Get current number of hours.
     var currentHour = dayjs().hour();
   // $("#i_am_a_href").attr('id').split('_')[1] // will return 'am'


    var rootEl = $('.time-block');
   
   $(".time-block").each(function () {
    var blockHour;
    var khoi = $(this).closest(rootEl).children("#hourBlock").text(); // this will get the text from
    if(khoi.includes("AM")|| khoi.includes("12PM")){
     blockHour = parseInt(khoi.replace(/[^0-9]/g, ''));
    }
   
    else
    {
      blockHour = (parseInt(khoi.replace(/[^0-9]/g, ''))+12); //
    }
//-----------------------------------------------------
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  //  console.log("h1 "+ blockHour + " -- h2 "+currentHour);
   
   });
   
  
   }

   hourTracker();
 
// Create a function to loop over time blocks to retrieve and display data from local storage
function displayText() {
  // Loop over time blocks
  $(".time-block").each(function () {
 
    var blockHour = $(this).children('#hourBlock').text();
  
    $(this).children(".description").val(localStorage.getItem(blockHour));
  });
}
displayText();

});




/* Just want to see how many classes or ids in the html
var allClasses = [];

var allElements = document.querySelectorAll('*');

for (var i = 0; i < allElements.length; i++) {
  var classes = allElements[i].className.toString().split(/\s+/);
  for (var j = 0; j < classes.length; j++) {
    var cls = classes[j];
    if (cls && allClasses.indexOf(cls) === -1)
      allClasses.push(cls);
  }
}
console.log(allClasses);







// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.




//$( "li.third-item" ).siblings().css( "background-color", "red" );


//$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a")) 
//$( "li.third-item" ).siblings().css( "background-color", "red" );
*/