// Retrieving user options
chrome.extension.sendMessage({}, function (settings) {
  initOnHashChangeAction(settings['Domains'])
  initShortcuts(settings['Shortcut'], settings['BackgroundShortcut'], settings['MuteShortcut'])

  initListViewShortcut()
  initForInbox()
})

function initForInbox() {
  window.idled = true
}

function initOnHashChangeAction(domains) {
  var allDomains = '//github.com,'
  if(domains) allDomains += domains

  // Take string -> make array -> make queries -> avoid nil -> join queries to string
  var selectors = allDomains.replace(/\s/, '').split(',').map(function (name) {
    if (name.length) return (".AO [href*='" + name + "']")
  }).filter(function (name) { return name }).join(", ")

  intervals = []

  // Find GitHub link and append it to tool bar on hashchange
  window.onhashchange = function () {
    fetchAndAppendGitHubLink()
  }

  function fetchAndAppendGitHubLink () {
    // In case previous intervals got interrupted
    clearAllIntervals()

    var retryForActiveMailBody = setInterval(function () {
      var mail_body = Array.prototype.filter.call(document.querySelectorAll('.nH.hx'), function () { return this.clientHeight != 0 })[0]

      if (mail_body ) {
        var github_links = reject_unwanted_paths(mail_body.querySelectorAll(selectors))

        // Avoid multiple buttons
        Array.prototype.forEach.call(document.querySelectorAll('.github-link, .github-mute-button'), function (ele) {
          ele.remove()
        })

        if (github_links.length ) {
          var url = github_links[github_links.length-1].href
          var muteLink

          // skip notification unsubscribe links:
          if (url.match('notifications/unsubscribe')) {
            var muteURL = url
            url = github_links[github_links.length-2].href
            muteLink = document.createElement('button')
            muteLink.type = 'button'
            muteLink.className = 'github-mute-button T-I J-J5-Ji lS T-I-ax7 ar7'
            muteLink.innerText = 'Mute thread'
            muteLink.addEventListener('click', function () {
              muteLink.innerHTML = '&ctdot;'
              fetch(muteURL, {mode: 'no-cors'}).then(function () {
                muteLink.innerText = 'Muted!'
                muteLink.disabled = 'disabled'
              })
            })
          }

          // Go to thread instead of .diff link (pull request notifications)
          url = url.match(/\.diff/) ? url.slice(0, url.length-5) : url
          var link = document.createElement('a')
          link.href = url
          link.className = 'github-link T-I J-J5-Ji lS T-I-ax7 ar7'
          link.target = '_blank'
          link.innerText = 'Visit Thread on GitHub'

          document.querySelector('.iH > div').appendChild(link)

          if (muteLink) {
            document.querySelector('.iH > div').appendChild(muteLink)
          }

          window.idled = true

          document.getElementsByClassName('github-link')[0].addEventListener("DOMNodeRemovedFromDocument", function (ev) {
            fetchAndAppendGitHubLink()
          }, false)
        }

        clearInterval(retryForActiveMailBody)
      } else if ( !document.querySelector('.nH.hx') ) {
        // Not in a mail view
        clearInterval(retryForActiveMailBody)
      }
    }, 100)

    intervals.push(retryForActiveMailBody)
  }
}

function initShortcuts(shortcut, backgroundShortcut, muteShortcut) {
  document.addEventListener('keydown', function (event) {
    // Shortcut: bind user's combination, if a button exists and the event is not in a textarea
    if (document.querySelector('.gE')) {
      document.querySelector('.gE').classList.remove('github-link')
    }

    Array.prototype.forEach.call(document.querySelectorAll('.scroll-list-item-open .gE, .scroll-list-item-highlighted .gE'), function (ele) {
      ele.classList.add('github-link')
    })

    if (processRightCombinationBasedOnShortcut(shortcut, event) && window.idled && getVisible(document.getElementsByClassName('github-link')) && notAnInput(event.target)) {
      triggerGitHubLink(false)
    }

    // Background Shortcut: bind user's combination, if a button exists and the event is not in a textarea
    if (processRightCombinationBasedOnShortcut(backgroundShortcut, event) && window.idled && getVisible(document.getElementsByClassName('github-link')) && notAnInput(event.target)) {
      triggerGitHubLink(true)
    }

    // Mute Shortcut: bind user's combination, if a button exists and the event is not in a textarea
    if (processRightCombinationBasedOnShortcut(muteShortcut, event) && window.idled && getVisible(document.getElementsByClassName('github-mute-button')) && notAnInput(event.target)) {
      triggerGitHubLink(false, 'github-mute-button')
    }
  })
}

function initListViewShortcut() {
  document.addEventListener('keypress', function (event) {
    // Shortcut: bind ctrl + return
    var selected = getVisible(document.querySelectorAll('.zA[tabindex="0"]'))
    if (event.ctrlKey && event.keyCode == 13 && selected ) {
      generateUrlAndGoTo(selected)
    }
  })
}

// Trigger the appended link in mail view
function triggerGitHubLink (backgroundOrNot, className) {
  if (typeof className === 'undefined') {
    className = 'github-link'
  }
  // avoid link being appended multiple times
  window.idled = false
  var link = getVisible(document.getElementsByClassName(className))
  chrome.extension.sendMessage({url: link.href, active: !backgroundOrNot})

  setTimeout( function (){ window.idled = true }, 100)
}

// Go to selected email GitHub thread
function generateUrlAndGoTo (selected) {
  var gotoaction = selected.querySelectorAll('.aKS [role="button"]')[0]

  if(gotoaction) {
    gotoaction.dispatchEvent(fakeEvent('mousedown', true))
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
  keys.map(function (key) {
    index = combination.indexOf(key)
    if(index >= 0) {
      if(key == "shift") trueOrFalse.push(event.shiftKey)
      if(key == "alt")   trueOrFalse.push(event.altKey)
      if(key == "meta")  trueOrFalse.push(event.metaKey)
      if(key == "ctrl")  trueOrFalse.push(event.ctrlKey)

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

function linkWithUrl (url) {
  var l = document.createElement('a')
  l.href = url
  l.target = "_blank"
  return l
}

function getVisible (nodeList) {
  if(nodeList.length) {
    var node
    for(var i=0; i < nodeList.length; i++) {
      if(typeof node === 'undefined' && (nodeList[i].offsetHeight > 0 || nodeList[i].clientWidth > 0 || nodeList[i].clientHeight > 0)) {
        node = nodeList[i]
        break
      }
    }
    return node
  }
}

function notAnInput (element) {
  return !element.className.match(/editable/) && element.tagName != "TEXTAREA" && element.tagName != "INPUT"
}

function clearAllIntervals () {
  intervals.map(function (num) {
    clearInterval(num)
    delete intervals[intervals.indexOf(num)]
  })
}

// Reject unsubscribe, subscription and verification management paths
// Make sure the keywords((un)subscribe) can still be repository names
function reject_unwanted_paths (links) {
  var paths = ['\/\/[^\/]*\/mailers\/unsubscribe\?',
               '\/\/[^\/]*\/.*\/.*\/unsubscribe_via_email',
               '\/\/[^\/]*\/.*\/.*\/subscription$',
               '\/\/[^\/]*\/.*\/.*\/emails\/.*\/confirm_verification\/.*']
  var regexp = new RegExp(paths.join('|'))
  return Array.prototype.filter.call(links, function (link) {
    if(!link.href.match(regexp)) return this
  })
}
