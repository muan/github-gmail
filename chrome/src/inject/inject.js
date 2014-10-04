// Retriving user options
chrome.extension.sendMessage({}, function(settings) {
  initOnHashChangeAction(settings['Domains'])
  initShortcuts(settings['Shortcut'], settings['BackgroundShortcut'])
  initListViewShortcut(settings['RegExp'])
})

function initOnHashChangeAction(domains) {
  allDomains = "//github.com,"
  if(domains) allDomains += domains

  // Take string -> make array -> make queries -> avoid nil -> join queries to string
  selectors = allDomains.replace(/\s/, '').split(',').map(function (name) {
    if (name.length) return (".AO [href*='" + name + "']")
  }).filter(function(name) { return name }).join(", ")

  intervals = []

  // Find GitHub link and append it to tool bar on hashchange
  window.onhashchange = function() {
    fetchAndAppendGitHubLink()
  }

  function fetchAndAppendGitHubLink() {
    // In case previous intervals got interrupted
    clearAllIntervals()

    retryForActiveMailBody = setInterval(function() {
      mail_body = $('.nH.hx').filter(function() { return this.clientHeight != 0 })[0]

      if( mail_body ) {

        github_links = mail_body.querySelectorAll(selectors)
        github_links = reject_unwanted_paths(github_links)

        // Avoid multple buttons
        $('.github-link').remove()

        if( github_links.length ) {

          url = github_links[github_links.length-1].href
          // Go to thread instead of .diff link (pull request notifications)
          url = url.match(/\.diff/) ? url.slice(0, url.length-5) : url
          link = $("<a class='github-link T-I J-J5-Ji lS T-I-ax7 ar7' target='_blank' href='"+ url +"'>Visit Thread on GitHub</a>")

          $(".iH > div").append(link)
          window.idled = true

          document.getElementsByClassName('github-link')[0].addEventListener("DOMNodeRemovedFromDocument", function (ev) {
            fetchAndAppendGitHubLink()
          }, false)
        }

        clearInterval(retryForActiveMailBody)
      } else if ( $('.nH.hx').length == 0 ) {
        // Not in a mail view
        clearInterval(retryForActiveMailBody)
      }
    }, 100)

    intervals.push(retryForActiveMailBody)
  }
}

function initShortcuts(shortcut, backgroundShortcut) {
  $(document).on("keydown", function(event) {
    // Shortcut: bind user's combination, if a button exist and event not in a textarea
    if( processRightCombinationBasedOnShortcut(shortcut, event) && window.idled && getVisible(document.getElementsByClassName('github-link')) && notAnInput(event.target)) {
      triggerGitHubLink(false)
    }

    // Bacground Shortcut: bind user's combination, if a button exist and event not in a textarea
    if( processRightCombinationBasedOnShortcut(backgroundShortcut, event) && window.idled && getVisible(document.getElementsByClassName('github-link')) && notAnInput(event.target)) {
      triggerGitHubLink(true)
    }
  })
}

function initListViewShortcut(regexp) {
  $(document).on("keypress", function(event) {
    // Shortcut: bind ctrl + return
    selected = getVisible(document.querySelectorAll('.zA[tabindex="0"]'))
    if( event.ctrlKey && event.keyCode == 13 && selected ) {
      generateUrlAndGoTo(selected, regexp)
    }
  })
}

// Trigger the appended link in mail view
function triggerGitHubLink (backgroundOrNot) {
  // avoid link being appended multiple times
  window.idled = false
  event = backgroundOrNot ? fakeBackgroundClick() : fakeEvent('click', false)

  getVisible(document.getElementsByClassName('github-link')).dispatchEvent(event)
  setTimeout( function(){ window.idled = true }, 100)
}

// Go to selected email GitHub thread
function generateUrlAndGoTo (selected, regexp) {
  gotoaction = selected.querySelectorAll('.aKS [role="button"]')[0]

  if(gotoaction) {
    // if there's a gotoaction
    gotoaction.dispatchEvent(fakeEvent('mousedown', true))

  } else if( (title = selected.innerText.match(/\[(.*)\]\s.*\s\(\#(\d*)\)/)) ) {
    // If the title looks like a GitHub notification email.
    // org name coms from a label
    regexp = new RegExp(regexp)
    label   = selected.querySelectorAll('.av')[0]

    if(label) org = label.innerText.toLowerCase().match(regexp)

    if(org) {
      org = org[1]
      repo = title[1]
      issue_no = title[2]

      url = "https://github.com/" + org + "/" + repo + "/issues/" + issue_no
      linkWithUrl(url).dispatchEvent(fakeEvent('click', false))
    }
  }
}

//
// Helpers
//

function processRightCombinationBasedOnShortcut (shortcut, event) {
  // Processing shortcut from preference
  combination = shortcut.replace(/\s/g, '').split('+')

  keys = ['shift', 'alt', 'meta', 'ctrl']
  trueOrFalse = []

  // If a key is in the combination, push the value to trueOrFalse array, and delete it from the combination
  keys.map(function(key) {
    index = combination.indexOf(key)
    if(index >= 0) {
      if(key == "shift") trueOrFalse.push(event.shiftKey)
      if(key == "alt")   trueOrFalse.push(event.altKey)
      if(key == "meta")  trueOrFalse.push(event.metaKey)
      if(key == "crtl")  trueOrFalse.push(event.ctrlKey)

      combination.splice(index, 1)
    }
  })

  // If there is a keyCode left, add that to the mix.
  if(combination.length) trueOrFalse.push(event.keyCode.toString() == combination[0])

  // Evaluate trueOrFalse by looking for the existence of False
  return trueOrFalse = (trueOrFalse.indexOf(false) < 0)
}

// .click() doesn't usually work as expected
function fakeEvent (event, bubbles) {
  var click = new MouseEvent(event, {bubbles: bubbles})
  return click
}

function fakeBackgroundClick () {
  var click = new MouseEvent('click', {metaKey: true})
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
    var node
    $(nodeList).map(function() {
      if(typeof node == 'undefined' && (this.clientWidth > 0 || this.clientHeight > 0)) {
        node = this
      }
    })
    return node
  }
}

function notAnInput (element) {
  return !element.className.match(/editable/) && element.tagName != "TEXTAREA" && element.tagName != "INPUT"
}

function clearAllIntervals () {
  intervals.map(function(num) {
    clearInterval(num)
    delete intervals[intervals.indexOf(num)]
  })
}

// Reject unsubscribe, subscription and verification management paths
// Make sure the keywords((un)subscribe) can still be repository names
function reject_unwanted_paths (links) {
  paths = ['\/\/[^\/]*\/mailers\/unsubscribe\?',
           '\/\/[^\/]*\/.*\/.*\/unsubscribe_via_email',
           '\/\/[^\/]*\/.*\/.*\/subscription$',
           '\/\/[^\/]*\/.*\/.*\/emails\/.*\/confirm_verification\/.*'
  ]
  regexp = new RegExp(paths.join('|'))
  return $(links).filter(function() {
    if(!this.href.match(regexp)) return this
  })
}
