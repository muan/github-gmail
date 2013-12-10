defaultOptions = {
  // 'Button': '',
  // 'List view trigger': '',
  // 'Label RegExp': '',
  'Domains': ''
}

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

// Saves options to localStorage.
function save_options() {

  $('input[name]').map(function(i, e) {
    localStorage[e.name] = e.value
  })

  // Update status to let user know options were saved.
  var save = document.getElementById('save')
  save.innerHTML = 'Saved.'
  setTimeout(function() {
    save.innerHTML = 'Save'
  }, 750)
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage['favorite_color']
  if (!favorite) {
    return
  }
  var select = document.getElementById('color')
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i]
    if (child.value == favorite) {
      child.selected = 'true'
      break
    }
  }
}

document.ready = function() {
  document.addEventListener('DOMContentLoaded', restore_options)
  document.querySelector('#save').addEventListener('click', save_options)
  initOptions(defaultOptions)
}