request = new XMLHttpRequest
request.open('GET', '../options/options.json', true)
request.send()

request.onload = function() {
  data = JSON.parse(this.response)
  for (var key in data) {
    data[key] = data[key].val
    if(localStorage[key]) { data[key] = localStorage[key] }
  }

  chrome.extension.onMessage.addListener(
    function(request, sender, sendMessage) {
      if(request.url) {
        chrome.tabs.query(
          {windowId: sender.tab.windowId},
          function(tabs) {
            var position = sender.tab.index;
            for(var i = position; i < tabs.length; i++) {
              if(tabs[i].openerTabId == sender.tab.id) {
                position = i
              }
            }
            request.openerTabId = sender.tab.id
            request.index = position + 1
            chrome.tabs.create(request)
          })
      } else {
        sendMessage(data)
      }
    }
  )

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // avoid conflict with other listner
    if(request.unwatchUrl) {
        chrome.tabs.create({url: request.unwatchUrl, active: false}, function(tab) {
          chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function() {
            chrome.tabs.executeScript(tab.id, {file: 'js/unwatch.js'}, function() {
              chrome.tabs.remove(tab.id)
            })
          })
        })
      }
    }
  )

}
