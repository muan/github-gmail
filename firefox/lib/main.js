var pageMod = require("sdk/page-mod")
var self    = require("sdk/self")
var simple  = require('sdk/simple-prefs')

pageMod.PageMod({
  include: "https://mail.google.com/*",
  contentStyleFile:  self.data.url("index.css"),
  contentScriptFile: [self.data.url("jquery.js"), self.data.url("index.js")],
  onAttach: function(worker) {
    function onPref () {
      worker.port.emit('prefload', simple.prefs)
    }
    simple.on("", onPref)
    onPref()
  }
})
