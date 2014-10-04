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
      sendMessage(data)
    }
  )
}

