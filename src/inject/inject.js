// Find GitHub link and append it to tool bar on hashchange
$(window).on('hashchange', function() {
  // Lookup Enterprise Domains stored in cookie
  var enterprise_domains = jQuery.cookie('github-gmail-enterprise');
  if(typeof enterprise_domains == 'undefined'){
    enterprise_domains = [];
  }
  else{
    enterprise_domains = enterprise_domains.split(',');
  }

  // Search for github.com and GitHub Enterprise links
  // Write new Enterprise links to cookie.
  var github_links = [];
  links = document.querySelectorAll('a');
  for (var i = 0; i < links.length; ++i) {
    var item = links[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
    if(item.text.match('View it on GitHub Enterprise')){
      github_links.push(item.href);
      base_url = item.href.split('/',3).join("/");
      if(enterprise_domains.indexOf(base_url) == -1){
        enterprise_domains.push(base_url);
        jQuery.cookie('github-gmail-enterprise', enterprise_domains.join(','));
      }
    }
    else if(item.href.match("https://github.com/")){
      github_links.push(item.href);
    }
    else if(enterprise_domains.length){
      for (var j = 0; j < enterprise_domains.length; ++j) {
        if(item.href.match(enterprise_domains[j])){
          github_links.push(item.href);
        }
      }
    }
  }

  if( github_links.length ) {
    url = github_links[github_links.length-1]

    // Go to thread instead of .diff link (pull request notifications)
    url = url.match(/\.diff/) ? url.slice(0, url.length-5) : url

    link = $("<a class='github-link T-I J-J5-Ji lS T-I-ax7 ar7' target='_blank' href='"+ url +"'>Visit Thread on GitHub</a>")
    $(".iH > div").append(link)

    window.idled = true
  }
})

$(document).on("keypress", function(event) {  

  // Shortcut: bind shift + G, if a button exist and event not in a textarea
  if( event.shiftKey && event.keyCode == 71 && window.idled && $(".github-link:visible")[0] && notAnInput(event.target)) { 
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
  setTimeout( function(){ window.idled = true }, 1000)
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

function notAnInput (element) {
  return !element.className.match(/editable/) && element.tagName != "TEXTAREA" && element.tagName != "INPUT"
}
