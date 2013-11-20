var readyStateCheckInterval = setInterval(function() {

  if( $(".nH").length ) {
    clearInterval(readyStateCheckInterval);
    console.log("Boom");

    $(window).on('hashchange', function() {
      
      github_links = document.querySelectorAll('[href^="https://github.com/"]');

      $(document).on("keypress", function(event) { 
        
        
        var fakeClickEvent = document.createEvent("MouseEvents");
        fakeClickEvent.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        displayBtn = document.getElementsByClassName("dNDeCd")[0];
        if(event.ctrlKey && event.keyCode == 4 && displayBtn) { 
          displayBtn.dispatchEvent(fakeClickEvent);
        }
      });

      if(github_links.length) {
        
        url = github_links[github_links.length-1].href;
        link = $("<a class='github-link T-I J-J5-Ji lS T-I-ax7 ar7' target='_blank' href='"+ url +"'>Visit Thread on GitHub</a>")
        
        window.idled = true;
        $(".iH > div").append(link);

        $(document).on("keypress", function(event) {  

          var fakeClickEvent = document.createEvent("MouseEvents");
          fakeClickEvent.initMouseEvent("click", true, true, window,
              0, 0, 0, 0, 0, false, false, false, false, 0, null);
          if(event.shiftKey && event.keyCode == 71 && window.idled) { 
            window.idled = false;
            link[0].dispatchEvent(fakeClickEvent);

            setTimeout( function(){ window.clicked = true; }, 1000);
          }

        });

        console.log("hello");
      }

    });

  }
}, 100);