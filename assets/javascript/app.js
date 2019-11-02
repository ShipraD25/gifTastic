$(document).ready(function() {
    var topics = ["pony", "dog", "shark", "cat"];

    // Function for displaying topic data
    function renderButtons() {
        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise we will have repeat buttons)
        $(".button-area").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var newButton = $("<button>");
            // Adding a class
            newButton.addClass("animal");
            // Adding a data-attribute with a value of the topic at index i
            newButton.attr("data-name", topics[i]);
            // Providing the button's text with a value of the topic at index i
            newButton.text(topics[i]);
            // Adding the button to the HTML
            $(".button-area").append(newButton);
            //console.log("Adding button with text=", topics[i]);
        }
    }

    // This function handles events where submit button is clicked
    $(".btn-submit").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.

        event.preventDefault();

        // This line will grab the text from the input box
        var newTopic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        //console.log("Topic Input=", newTopic)
        topics.push(newTopic);

        // calling renderButtons which handles the processing of our topics array
        renderButtons();


    });

    // Calling the renderButtons function at least once to display the initial list of topics
    renderButtons();

    // Adding click event listen listener to all buttons
    $(document).on("click", ".animal", function() {
        // Grabbing and storing the data-name property value from the button
        var newThing = $(this).attr("data-name");
        console.log("this=", this);
        console.log("clicked");
        console.log("newThing=", newThing)
            // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            newThing + "&api_key=Ywn2mJtKjDMmqTbrwMvwKC0tQvah1wrr&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {


            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    // Creating and storing a div tag
                    var topicDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var topicImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-state", "still");
                    topicImage.addClass("gif");
                    // Appending the paragraph and image tag to the topicDiv
                    topicDiv.append(p);
                    topicDiv.append(topicImage);

                    // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(topicDiv);
                }
            }
        });
    });
    $(document).on("click", ".gif", function() {
        //event.preventDefault();
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});