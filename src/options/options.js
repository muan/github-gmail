$.getJSON('options.json', function(data) {
  defaultOptions = data
  initOptions(defaultOptions)
})

function initOptions (defaultOptions) {
  options = defaultOptions

  for (var key in defaultOptions) {
    if( localStorage[key] ) {
      // Legacy check for string
      options[key].val = typeof localStorage[key] == "string" ? localStorage[key] : localStorage[key].val
    }
  }

  optionsWrapper = document.getElementById('options')

  for (var key in options) {
    html  = '<div class=\'option\'><label>' + key + ' ' + options[key].hint + '</label>'
    html += '<p class=\'description\'>' + options[key].description + '</p>'
    html += '<input name=\'' + key + '\' value=\'' + options[key].val +'\' type=\'text\' /></div>'
    $(optionsWrapper).append(html)
  }

}

$(document).on('click', '#save', function() {
  $('input[name]').map(function(i, e) {
    localStorage[e.name] = e.value
  })

  // Update status to let user know options were saved.
  var save = document.getElementById('save')
  save.innerHTML = 'Saved.'
  setTimeout(function() {
    save.innerHTML = 'Save'
  }, 750)
})
