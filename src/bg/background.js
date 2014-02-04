request = new XMLHttpRequest
request.open('GET', '../options/options.json', true)
request.send()

request.onload = function() {
  data = JSON.parse(this.response)
  for (var attr in localStorage) { data[attr] = localStorage[attr] }

  chrome.extension.onMessage.addListener(
    function(request, sender, sendMessage) {
      sendMessage(data)
    }
  )
}

