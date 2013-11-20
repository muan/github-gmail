chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
  	chrome.pageAction.show(sender.tab.id);
    console.log(sendMessage);
    console.log("sendMessage");
    sendMessage();
  }
);