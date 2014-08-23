var pageMod = require("sdk/page-mod")
var self = require("sdk/self")

pageMod.PageMod({
  include: "https://mail.google.com/*",
  contentStyleFile:  self.data.url("index.css"),
  contentScriptFile: [self.data.url("jquery.js"), self.data.url("index.js")]
})
