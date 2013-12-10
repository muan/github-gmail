defaultOptions = {
  'Domains': ''
}

$(document).ready(function (){
  initOptions(defaultOptions)
})

function initOptions (defaultOptions) {
  options = {}

  for (var key in defaultOptions) {
    options[key] = localStorage[key] || defaultOptions[key]
  }

  optionsWrapper = document.getElementById('options')

  for (var key in options) {
    title = key
    if (key == 'Domains') {
      title += " (comma separated if multiple)"
    }

    $(optionsWrapper).append('<label>' + title + '</label>')
    $(optionsWrapper).append('<input name=\'' + key + '\' value=\'' + options[key] +'\' type=\'text\'>')
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
