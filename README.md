# gifTastic

### Link to project https://shiprad25.github.io/gifTastic/

## Summary


In this assignment we were asked to use the GIPHY API to make a dynamic web page that populates with gifs of your choice.
To achieve this these following steps are taken-
* Global variables are declared in the begining.
* Buttons in the HTML are generated dynamicaly using JQuery.
* Then three event listeners are declared
* One that listens to clicks on submit button and forms new buttons.
* Second listens to the clicks on the topic buttons and makes an AJAX call which then gets 10 non-animated gifs from GIPHY API.
* Third event listerner listens to the clicks on gifs and toggles its state to either animate or still.
* Form is also added with small input field that allows user to submit a topic which will generate a new button.

This page is fully responsive.

Pseudocode put throughout to understand the functionality of code.

## Tech Used
* HTML
* Javascript
* Jquery
* AJAX
* GIPHY API
* Bootstrap
* Css 


## code snippet
```jquery
  $(document).on("click", ".animal", function() {
        //making gif area empty before adding new gifs
        $("#gifs-appear-here").empty();
        // Grabbing and storing the data-name property value from the button
        var newThing = $(this).attr("data-name");

        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            newThing + "&api_key=Ywn2mJtKjDMmqTbrwMvwKC0tQvah1wrr&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {


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
```


## Game Demo

![giftastic Demo!](https://media.giphy.com/media/htYWjHLbmqTHsWbRQG/giphy.gif)
