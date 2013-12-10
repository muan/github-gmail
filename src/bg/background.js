chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
    sendMessage(localStorage);
  }
);