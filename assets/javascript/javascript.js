var dogs = ["Bulldog","Dachshund","German Shepherd", "Golden Retriever","Labrador Retriever", "Beagle","Siberian Husky", "Poodle"];

$("#buttons-view").on("click", ".cuteDog", function(){
  var dog = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + dog + "&api_key=SZzDh1LvwG0Jv2Z1vfvy0NorAihpEXXk&limit=15";

  $.ajax({
    url: queryURL,
    method:"GET"
  }).done(function(response) {

    $("#dogs-view").empty();
    
    for (var i = 0; i < response.data.length; i++) {
      var still = response.data[i].images.fixed_width_still.url;
      var moving = response.data[i].images.fixed_width.url;
      //holding the images
      var dogBox = $("<div>")
      dogBox.addClass("dogBox");
      var dogImages = $("<img>");
      
      //creating a class to hold the dogs images
      dogImages.addClass("doggy");
      dogImages.attr("src", still);
      dogImages.attr("data-state", "still");
      dogImages.attr("data-still", still);
      dogImages.attr("data-moving", moving);
      dogBox.append(dogImages);
      $("#dogs-view").append(dogBox);

      var pDiv = $("<div>")
      pDiv.addClass("tag");
      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      pDiv.append(p);
      dogBox.append(pDiv);
      
    }
  });
});

//using this function to control the image's state to still or moving when it is clicked
$(document).on("click",".doggy", function() {
  if($(this).attr("data-state") === "still") {
    $(this).attr("src", $(this).attr("data-moving"));
    $(this).attr("data-state","moving");
  } 
  else if ($(this).attr("data-state") === "moving") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  } 
});

  //This function will display dogs data 
function renderButtons() {
  //getting rid of the previous dog's data, then adding new dogs
  $("#buttons-view").empty();
    // loopting the array of dogs 
  for (var j = 0; j < dogs.length; j++) {
    //generating buttons for each dog in the array
    var generate = $("<button>");
    //adding a class to the each buttons
    generate.addClass("cuteDog");
    //adding a data-attribute to each one
    generate.attr("data-name", dogs[j]);

    generate.text(dogs[j]);
    //adding teh button to the buttons-view div
    $("#buttons-view").append(generate);
  }

}

//adding a click event listener to all elements with a 'dog 'class
$("#add-dogs").on("click", function(event) {
  event.preventDefault();

//taking the input texbox from users
  var dogDog = $("#dogs-input").val().trim();
//pushing dog types from the textbox to the dog array
  dogs.push(dogDog);
//calling redendButtons 
    renderButtons();
});

//Prevent users search dogs without put any text
$("#dogs-input").keyup(function(){
  //To check if input takes any value based on "keyup" event
  if ($(this).val() === '') {
    $(".enableOnInput").prop("disabled", true);
  } else {
    $(".enableOnInput").prop("disabled", false);
  }
});

//calling the renderButtons function to display the intial buttons
renderButtons();