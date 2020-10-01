# Helper for GitHub notifications in Gmail

A web extension for Chrome and Firefox which adds keyboard shortcuts for opening and muting GitHub notification emails.

## Features

### Mail View Shortcut

You can open your github notification in a mail view.

For chrome browser:
- Chrome: <kbd>shift</kbd> + <kbd>g</kbd>, <kbd>shift</kbd> + <kbd>b</kbd> in the background
For firefox browser:
- Firefox: <kbd>ctrl</kbd> + <kbd>g</kbd>, <kbd>ctrl</kbd> + <kbd>b</kbd> in the background

![Mail view button](https://user-images.githubusercontent.com/1153134/42123231-69153916-7c1c-11e8-8bf5-1d8fa2510b63.png)

### Mute Thread

Mute thread in mail view. It will open a background window to load the mute thread URL, and close itself when done. This only works if you have an active GitHub session.
For chrome:
- Chrome: <kbd>shift</kbd> + <kbd>h</kbd>
For firefox :
- Firefox: <kbd>ctrl</kbd> + <kbd>h</kbd>

![Mute thread button](https://user-images.githubusercontent.com/1153134/42123234-7c6d271c-7c1c-11e8-9b13-3cd0cbea4eab.png)

### List View Shortcut

<kbd>ctrl</kbd> + <kbd>return</kbd> to trigger one the action button when an email is selected using gmail key navigation (when the blue bar appears):

![action button in list view](https://user-images.githubusercontent.com/1153134/42123260-fa87c648-7c1c-11e8-8d64-9ddd8899e594.png)

## Installation
For chrome:
- [Download in Chrome Web Store](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje)<br>
For firefox
- [Download in Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/github-for-gmail/)

## Shortcuts
For chrome:
- Chrome: `Select extension` -> `Details` -> `Extension options`
For firefox
- [Setting extension shortcuts in Firefox](https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox)

## Development

Load the extension manually and modify the code accordingly in these places:

Chrome: `chrome/src/inject/inject.js`.<br>
Firefox: `firefox/src/inject/inject.js`.<br>
