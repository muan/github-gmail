// Find GitHub link and append it to tool bar on hashchange
$(window).on('hashchange', function() {
  github_links = document.querySelectorAll('[href^="https://github.com/"]')

  if( github_links.length ) {
    url = github_links[github_links.length-1].href

    // Go to thread instead of .diff link (pull request notifications)
    url = url.match(/\.diff/) ? url.slice(0, url.length-5) : url

    link = $("<a class='github-link T-I J-J5-Ji lS T-I-ax7 ar7' target='_blank' href='"+ url +"'>Visit Thread on GitHub</a>")
    $(".iH > div").append(link)

    window.idled = true
  }
})

// Shortcut: bind shift + G to trigger the GitHub link
$(document).on("keypress", function(event) {  
  if( event.shiftKey && event.keyCode == 71 && window.idled && $(".github-link:visible")[0] ) { 
    // abort event if in an editable area
    if ( !!event.target.className.match(/editable/) ) return 

    // avoid link being appended multiple times    
    window.idled = false

    $(".github-link:visible")[0].dispatchEvent(fakeClick())
    setTimeout( function(){ window.clicked = true }, 1000)
  }
})

// Shortcut: bind ctrl + return to selected thread (everywhere)
$(document).on("keypress", function(event) {  
  if( event.ctrlKey && event.keyCode == 13 && (selected = document.querySelectorAll('.PE ~ [tabindex="0"] .y6')[0]) ) { 
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

// 
// Helpers
// 

// .click() doesn't usually work as expected
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
