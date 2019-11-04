let data = {}

browser.runtime.onMessage.addListener(function(req, sender, sendMessage) {
  if(req.url) {
    browser.tabs.query(
      {windowId: sender.tab.windowId},
      function(tabs) {
        var position = sender.tab.index;
        for(var i = position; i < tabs.length; i++) {
          if(tabs[i].openerTabId == sender.tab.id) {
            position = i
          }
        }
        var mute = req.mute
        delete req.mute

        req.openerTabId = sender.tab.id
        req.index = position + 1
        browser.tabs.create(req, function(tab) {
          if (mute) listenAndCloseTab(tab, req.url, sender.tab.id)
        })
      }
    )
  } else {
    sendMessage(data)
  }
})


browser.commands.onCommand.addListener(function (command) {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs){
    browser.tabs.sendMessage(tabs[0].id, {action: command})
})
})

function listenAndCloseTab(tab, url, originalTabId) {
  var listener = setInterval(function () {
    browser.tabs.get(tab.id, function (tab) {
      if (tab.status === 'complete') {
        browser.tabs.remove(tab.id)
        clearInterval(listener)
        // Unsubscription finished
        browser.tabs.sendMessage(originalTabId, {muteURL: url})
      }
    })
  }, 500)
}
