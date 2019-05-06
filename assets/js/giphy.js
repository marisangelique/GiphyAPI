$( document ).ready(function(){


    var topics = ["MOON", "SPACE", "GALAXY", "ROCKET SHIP", "ASTRONAUT"];
    // var favorite = [ ];

    function displayRequests(){
        var search = $(this).data("search");
        console.log("You searched: " + search);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=lmapTubZ9xW5vUeDZtzSt3LnlXPztBHL&limit=10"

        console.log("Searching: " + queryURL + "...");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            var results = response.data;
            console.log("Results: "+ results);
            for(var i = 0; i < results.length; i++){

                var showDiv = $("<div class='results'>");

                var rating = results[i].rating;
                var defaultImg = results[i].images.fixed_height_still.url;
                var staticImg = results[i].images.fixed_width.url;
                var showImage= $("<img>");
                var p = $("<p>").text("Rating: " + rating);
                // var add = $("<p class='addButton' id='addingButton' >").text("+");

                showImage.attr("src", staticImg);
                showImage.attr("data-state", "still");
                showImage.attr("data-still", defaultImg);
                showImage.attr("data-animate", staticImg);
                showDiv.append(p);
                showDiv.append(showImage);
                // showDiv.append(add);
                $("#canvas").prepend(showDiv);

            }
        });
    }


        $("#submit").on("click", function(event){
            event.preventDefault();

            var newButton = $("#search").val().trim();
            topics.push(newButton);
            console.log(topics);
            $("#search").val(" ");
            displayButtons();
        });

        function displayButtons(){
            $("#topics").empty();
            for (var i = 0; i < topics.length; i++){
                var a = $('<button class="topics">');
                a.attr("id", "show");
                a.attr("class", "show");
                a.attr("data-search", topics[i]);
                a.text(topics[i]);
                $("#topics").append(a);
            }
        }

        displayButtons();

        $(document).on("click", "#show", displayRequests);
        $(document).on("click", ".results", pausePlayGifs);

        function pausePlayGifs(){
            var state = $(".results").attr("data-state");
            console.log("data-state= ", state)

            if(state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }

  
});
