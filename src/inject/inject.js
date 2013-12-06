var readyStateCheckInterval = setInterval(function() {

  if( $(".nH").length ) {
    clearInterval(readyStateCheckInterval)

    $(window).on('hashchange', function() {
      github_links = document.querySelectorAll('[href^="https://github.com/"]')

      if(github_links.length) {
        url = github_links[github_links.length-1].href
        url = url.match(/\.diff/) ? url.slice(0, url.length-5) : url

        link = $("<a class='github-link T-I J-J5-Ji lS T-I-ax7 ar7' target='_blank' href='"+ url +"'>Visit Thread on GitHub</a>")
        
        window.idled = true
        $(".iH > div").append(link)
      }

    })

  }
}, 100)

// bind shift + G to thread (mail view)
$(document).on("keypress", function(event) {  
  if(event.shiftKey && event.keyCode == 71 && window.idled && $(".github-link:visible")[0] ) { 
    if (!!event.target.className.match(/editable/)) return 
    window.idled = false
    $(".github-link:visible")[0].dispatchEvent(fakeClick())
    setTimeout( function(){ window.clicked = true }, 1000)
  }
})

// bind ctrl + return to selected thread (everywhere)
$(document).on("keypress", function(event) {  
  if(event.ctrlKey && event.keyCode == 13 && (selected = document.querySelectorAll('.PE ~ [tabindex="0"] .y6')[0]) ) { 
    if( (title = selected.innerText.match(/\[(.*)\]\s.*\s\(\#(\d*)\)/)) ) {

      // org name coms from a label
      org = document.querySelectorAll('.PE ~ [tabindex="0"] .av')[0].innerText.toLowerCase()

      repo = title[1]
      issue_no = title[2]
  
      url = "https://github.com/" + org + "/" + repo + "/issues/" + issue_no
      linkWithUrl(url).dispatchEvent(fakeClick())
    }
  }
})

function fakeClick() {
  var click = document.createEvent("MouseEvents")
  click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  return click
}

function linkWithUrl(url) {
  var l = document.createElement('a')
  l.href = url
  l.target = "_blank"
  return l
}
