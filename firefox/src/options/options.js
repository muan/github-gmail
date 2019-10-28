const save = document.getElementById('save')
const form = document.getElementById('form')

fetch('options.json').then(function(res) {
  return res.json()
}).then(function(data) {
  defaultOptions = data
  initOptions(defaultOptions)
})

function initOptions (defaultOptions) {
  var options = defaultOptions

  for (var key in defaultOptions) {
    if( localStorage[key] ) { options[key].val = localStorage[key] }
  }

  var optionsWrapper = document.getElementById('options')

  for (var key in options) {
    optionsWrapper.innerHTML += `
      <div class="option"><label>${key}</label>
      <p class="description">${options[key].description}<br><span class="help">*${options[key].hint}</span></p>
      <input name="${key}" value="${options[key].val}" type="text"></div>
    `
  }

  for(const el of document.querySelectorAll('[name="Shortcut"], [name="BackgroundShortcut"], [name="MuteShortcut"]')) {
    el.addEventListener('keypress', function(e) {
      if (e.keyCode == 13 && !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey ) return false
      code = ''
      keys = ['shift', 'alt', 'meta', 'ctrl']
      keys.map(function(key) {
        if( eval(`e.${key}Key` ) ) { code += `${key} + ` }
      })
      code += e.keyCode
      el.value = code
      e.preventDefault()
    })
  }
}


form.addEventListener('submit', function(e) {
  fields = []
  for(const el of document.querySelectorAll('input[name]')) {
    if( localStorage[el.name] !== el.value ) fields.push(el)
    localStorage[el.name] = el.value
  }

  // Update status to let user know options were saved.
  var save = document.getElementById('save')
  document.querySelector('.notice').hidden = false
  window.scrollTo(0, 10000)
  save.innerHTML = 'Updated!'
  fields.forEach(function(el) {
    var option = el.closest('.option')
    option.classList.remove('saved')
    option.classList.add('saved')
    setTimeout(function() {
      option.classList.remove('saved')
      save.innerHTML = 'Save'
    }, 2050)
  })
  e.preventDefault()
})
