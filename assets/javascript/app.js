$(document).ready(function() {
    var topics = ["Monkey", "Dog", "Cat"];

    // Function for displaying movie data
    function renderButtons() {
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#animal-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var newButton = $("<button>");
            // Adding a class
            newButton.addClass("animal");
            // Adding a data-attribute with a value of the movie at index i
            newButton.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index i
            newButton.text(topics[i]);
            // Adding the button to the HTML
            $("#animal-view").append(newButton);
        }
    }

    // This function handles events where one button is clicked
    $("newButton").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        //event.preventDefault();

        //This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array

        topics.push(animal);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

    /* $(".animal").on("click", function() {

         // Storing our giphy API URL for a random cat image
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=kittens&limit=1&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4";

         // Perfoming an AJAX GET request to our queryURL
         $.ajax({
             url: queryURL,
             method: "GET"
         })

         // After the data from the AJAX request comes back
         .then(function(response) {

             // Saving the image_original_url property
             var imageUrl = response.data.image_original_url;

             // Creating and storing an image tag
             var animalImage = $("<img>");

             // Setting the catImage src attribute to imageUrl
             animalImage.attr("src", imageUrl);
             animalImage.attr("alt", "cat image");

             // Prepending the catImage to the images div
             $("#images").prepend(animalImage);
         });
     });*/




});