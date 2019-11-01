$(document).ready(function() {
    var topics = ["pony", "dog", "shark", "cat"];

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
    $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array

        topics.push(animal);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

    // Adding click event listen listener to all buttons
    $("#add-animal").on("click", function() {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-name");
        console.log("clicked")
            // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .then(function(response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var animalDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(animalDiv);
                }
            });
    });




});