// Retriving user options
browser.runtime.sendMessage({}, function (settings) {
  initOnHashChangeAction(settings['Domains'])
  initListViewShortcut()
})

browser.runtime.onMessage.addListener(function (req) {
  if (req['muteURL']) {
    const element = document.querySelector(`[href="${req['muteURL']}"]`)
    if (element) element.innerText = "Muted!"
  } else if (req['action']){
    if (req['action'] === "open-link") triggerGitHubLink(false)
    if (req['action'] === "open-link-in-background") triggerGitHubLink(true)
    if (req['action'] === "mute-link") getVisible(document.querySelectorAll('.github-mute')).click()
  }
})


function initOnHashChangeAction(domains) {
  var allDomains = '//github.com,'
  if(domains) allDomains += domains

  // Take string -> make array -> make queries -> avoid nil -> join queries to string
  var selectors = allDomains.replace(/\s/g, '').split(',').map(function (name) {
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

        // Avoid multple buttons
        Array.prototype.forEach.call(document.querySelectorAll('.github-link, .github-mute'), function (ele) {
          ele.remove()
        })

        if (github_links.length ) {
          var url = github_links[github_links.length-1].href
          var muteLink

          // skip notification unsubscribe links:
          if (url.match('notifications/unsubscribe')) {
            var muteURL = url
            url = github_links[github_links.length-2].href
            muteLink = document.createElement('a')
            muteLink.className = 'github-mute T-I J-J5-Ji T-I-Js-Gs mA mw T-I-ax7 L3 YV'
            muteLink.innerText = 'Mute thread'
            muteLink.href = muteURL

            muteLink.addEventListener('click', function (evt) {
              evt.preventDefault()
              browser.runtime.sendMessage({url: muteURL, active: false, mute: true})
              muteLink.innerHTML = '&ctdot;'
            })
          }

          // Go to thread instead of diffs or file views
          if (url.match(/^(.+\/(issue|pull)\/\d+)/)) url = url.match(/^(.+\/(issue|pull)\/\d+)/)[1]
          var link = document.createElement('a')
          link.href = url
          link.className = 'github-link T-I J-J5-Ji T-I-Js-Gs mA mw T-I-ax7 L3 YV'
          link.target = '_blank'
          link.innerText = 'View on GitHub'

          document.querySelector('.iH > div').appendChild(link)

          if (muteLink) {
            document.querySelector('.iH > div').appendChild(muteLink)
          }

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

function initListViewShortcut(regexp) {
  document.addEventListener('keypress', function (event) {
    // Shortcut: bind ctrl + return
    var selected = getVisible(document.querySelectorAll('.zA[tabindex="0"]'))
    if (event.ctrlKey && event.keyCode == 13 && selected ) {
      generateUrlAndGoTo(selected)
    }
  })
}

// Trigger the appended link in mail view
function triggerGitHubLink (backgroundOrNot) {
  var link = getVisible(document.getElementsByClassName('github-link'))
  browser.runtime.sendMessage({url: link.href, active: !backgroundOrNot})
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
