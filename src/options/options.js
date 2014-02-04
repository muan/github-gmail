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

$(document).on('keypress', '[name=Shortcut]', function(e) {
  code = ''
  keys = ['shift', 'alt', 'meta', 'ctrl']
  keys.map(function(key) {
    if( eval('e.' + key + 'Key' ) ) { code += key + " + " }
  })
  code += e.keyCode
  $(this).val(code)
  return false
})

$(document).on('keypress', 'input[type]', function(e) {
  if( e.keyCode == 13 )
    $(this).blur()
    $('#save').click()
})

$(document).on('click', '#save', function() {
  fields = []
  $('input[name]').map(function(i, e) {
    if( localStorage[e.name] != e.value ) fields.push(e)
    localStorage[e.name] = e.value
  })

  // Update status to let user know options were saved.
  var save = document.getElementById('save')
  save.innerHTML = 'Updated!'
  $(fields).closest('.option').removeClass('saved').addClass('saved')
  setTimeout(function() {
    $(fields).closest('.option').removeClass('saved')
    save.innerHTML = 'Save'
  }, 2050)
})
