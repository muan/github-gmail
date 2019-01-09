# Helper for GitHub notifications in Gmail

A browser extension for Chrome, ~~Firefox~~[(broken)](https://github.com/muan/github-gmail/issues/70), and Safari that adds keyboard shortcuts to the Gmail interface for GitHub notification emails.

## Features

### Mail View Shortcut

Open your GitHub notifications in mail view:

- Chrome/Firefox: <kbd>shift</kbd> + <kbd>g</kbd>, <kbd>shift</kbd> + <kbd>b</kbd> in the background
- Safari: <kbd>ctrl</kbd> + <kbd>g</kbd>, <kbd>ctrl</kbd> + <kbd>b</kbd> in the background

![Mail view button](https://user-images.githubusercontent.com/1153134/42123231-69153916-7c1c-11e8-8bf5-1d8fa2510b63.png)

### List View Shortcut

<kbd>ctrl</kbd> + <kbd>return</kbd> to trigger one the action button when an email is selected using gmail key navigation (when the blue bar appears):

![action button in list view](https://user-images.githubusercontent.com/1153134/42123260-fa87c648-7c1c-11e8-8d64-9ddd8899e594.png)

### Mute Thread

Mute thread in mail view. It will open a background window to load the mute thread URL, and close itself when done. This only works if you have an active GitHub session.

- Chrome/Firefox: <kbd>shift</kbd> + <kbd>h</kbd>
- Safari: <kbd>ctrl</kbd> + <kbd>h</kbd>

![Mute thread button](https://user-images.githubusercontent.com/1153134/42123234-7c6d271c-7c1c-11e8-9b13-3cd0cbea4eab.png)

## Installation

### The easy way

Chrome: [Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje)<br>
~~Firefox: [Install the addon via Firefox addons gallery](https://addons.mozilla.org/en-US/firefox/addon/github-for-gmail/)~~<br>
Safari: N/A I have not signed up for Apple Developer Program

### The manual way

#### Chrome

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version and unzip it.
2. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

#### Firefox

https://github.com/muan/github-gmail/issues/70

#### Safari

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version and unzip it.
2. `Preferences` > `Advanced` > `Show Develop menu in menu bar`
3. `Develop` > `Show Extension Builder` > `+` > `Add Extension` > Choose the folder > `Run`

## Settings

1. Custom domains
2. Mail view: open thread shortcut
3. Mail view: open thread in background shortcut
4. Mail view: mute thread shortcut

#### Custom Domains (for GitHub Enterprise)

If you are using GitHub Enterprise and have a custom domain, you can set it in the extension options page.

![domain option](https://user-images.githubusercontent.com/1153134/42123271-0dfcae8c-7c1d-11e8-87be-5c8b59fd8ecb.png  )

#### Mail View Shortcut

Customize the keyboard shortcut that triggers the `View on GitHub` button. Change the shortcut combination by focusing the input, and press whatever key(s) you want to be the shortcut. It will be displayed in `keyCode` which is why you see `71` here instead of `g`. Don't worry about it.

##### To open and focus the new window right away (`shift + g`):

![image](https://user-images.githubusercontent.com/1153134/42123274-1ff72090-7c1d-11e8-8635-5df120d72c44.png)

##### To open a new window in the background (`shift + b`) – Chrome only:

![image](https://user-images.githubusercontent.com/1153134/42123278-30653f8e-7c1d-11e8-871d-89829bd74390.png)

##### To mute a thread in the background (`shift + h`) – Chrome only:

![image](https://user-images.githubusercontent.com/1153134/42123283-445a047a-7c1d-11e8-8ca7-44912c4c85d4.png)

## Development

Load the extension manually and modify the code accordingly in these places:

Chrome: `chrome/src/inject/inject.js`.<br>
Firefox: `firefox/data/index.js`.<br>
Safari: `safari/github-gmail-safariextension/main.js`

## The End

**Love it?** [Tell me](https://twitter.com/muanchiou)!

**Found a bug?** [Open an issue](https://github.com/muan/github-gmail/issues/new).
