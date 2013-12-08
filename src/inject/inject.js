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

$(document).on("keypress", function(event) {  
  // Shortcut: bind shift + G, if a button exist and event not in a textarea
  if( event.shiftKey && event.keyCode == 71 && window.idled && $(".github-link:visible")[0] && !event.target.className.match(/editable/)) { 
    triggerGitHubLink()
  }

  // Shortcut: bind ctrl + return
  selected = getVisible(document.querySelectorAll('.PE ~ [tabindex="0"]'))
  if( event.ctrlKey && event.keyCode == 13 && selected ) { 
    generateUrlAndGoTo(selected)
  }
})


// Trigger the appended link in mail view
function triggerGitHubLink () {
  // avoid link being appended multiple times    
  window.idled = false

  $(".github-link:visible")[0].dispatchEvent(fakeClick())
  setTimeout( function(){ window.clicked = true }, 1000)
}

// Go to selected email GitHub thread
function generateUrlAndGoTo (selected) {
  if( (title = selected.innerText.match(/\[(.*)\]\s.*\s\(\#(\d*)\)/)) ) {

    // org name coms from a label
    org = selected.querySelectorAll('.av')[0].innerText.toLowerCase()

    if(org) {
      repo = title[1]
      issue_no = title[2]

      url = "https://github.com/" + org + "/" + repo + "/issues/" + issue_no
      linkWithUrl(url).dispatchEvent(fakeClick())
    }
  }
}

// 
// Helpers
// 

// .click() doesn't usually work as expected
function fakeClick () {
  var click = document.createEvent("MouseEvents")
  click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  return click
}

function linkWithUrl (url) {
  var l = document.createElement('a')
  l.href = url
  l.target = "_blank"
  return l
}

function getVisible (nodeList) {
  if(nodeList.length) {
    var node;
    $(nodeList).map(function() {
      if(typeof node == 'undefined' && (this.offsetTop > 0 || this.offsetLeft > 0)) {
        node = this 
      }
    })
    return node 
  }
}
