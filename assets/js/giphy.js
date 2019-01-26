$( document ).ready(function(){


    var topics = ["MOON", "SPACE", "GALAXY", "ROCKET SHIP", "ASTRONAUT"];


    var gif ;
    var pausedGif;
    var animatedGif;
    var stillGif;

    function makeButtons(){
        $("#topics").empty();

        for (var i = 0; i < topics.length; i++){
            var buttons = $("<button>").text(topics[i]).addClass(topics).attr({'data-name': topics[i]});
            $("#topics").append(buttons);
        };

        $('#topics').on("click", function(){
            $("#canvas").empty();

            var that = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + that + "&limit=10&api_key=lmapTubZ9xW5vUeDZtzSt3LnlXPztBHL";

            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            
            .done(function(response){
                console.log(response)
                gif = response.data;
                $.each(gif, function(index,value){
                    animatedGif = value.images.original.url;
                    pausedGif = value.images.original_still.url;

                    var rating= value.rating;
                    var thisRating = $('<h5>').html("Rated: " + rating).addClass('description');

                    stillGif = $("<img>").attr("data-animated", animatedGif).attr("data-paused", pausedGif).attr("src", pausedGif);
                    var fullGifDisplay = $("<button>").append(thisRating, stillGif);
                    $("#canvas").append(fullGifDisplay);
                });
            })
        })

    }





    $(document).on("click", function(){
        $(this).attr("src", $(this).data("animated"));
    });

    $(document).on("click", function(){
        $(this).attr("src", $(this).data("paused"));
    });


    $("#submit").click(function(){
        var newTopic = $("#search").val().trim();
        topics.push(newTopic);

        makeButtons();
        return false;
    });

    makeButtons();

});
