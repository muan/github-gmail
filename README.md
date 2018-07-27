# Helper for GitHub notifications in Gmail

This is a **Chrome extension**~~/Firefox addon~~[(out of date)](https://github.com/muan/github-gmail/issues/70) that allows you to open threads in GitHub notification emails with a shortcut. :sparkles:

## Features

#### Mail View Shortcut

Open your GitHub notifications using a shortcut (default to `shift + g`, or `shift + b` to open in the background in Chrome), or this button in mail view:

![Mail view button](https://user-images.githubusercontent.com/1153134/42123231-69153916-7c1c-11e8-8bf5-1d8fa2510b63.png)

#### List View Shortcut

The shortcut is `ctrl + return(enter)` (currently non-customizable). It will trigger one the action button when an email is selected using key navigation (when the blue bar appears):

![action button in list view](https://user-images.githubusercontent.com/1153134/42123260-fa87c648-7c1c-11e8-8d64-9ddd8899e594.png)

#### Mute Thread
If you no longer want to receive notifications for a certain thread on GitHub, click the `Mute thread` button or using a shortcut `shift + h`, it will open a background window to load the mute thread request, and close itself when done.

![Mute thread button](https://user-images.githubusercontent.com/1153134/42123234-7c6d271c-7c1c-11e8-9b13-3cd0cbea4eab.png)

## Installation

### Chrome 
#### The Easy Way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje).

#### The Mu-An-might-steal-all-my-data-so-I-want-to-manually-load-it Way (for Chrome)

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Read Mu-An's code, making sure there is no data stealing.
4. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

As:

![load unpacked](https://user-images.githubusercontent.com/1153134/42123174-45ecb064-7c1b-11e8-81fd-9722627af801.png)

### Firefox

~~[Install the addon via Firefox addons gallery](https://addons.mozilla.org/en-US/firefox/addon/github-for-gmail/)~~ 

Firefox addon is out of date, see https://github.com/muan/github-gmail/issues/70.

## Options and preferences

There are 3 preference settings:

1. Custom domains
2. Mail view shortcut
3. List view regular expression

**Attention** After updating a setting, please refresh both the extensions page and the Gmail page.

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

## Code

Chrome: `chrome/src/inject/inject.js`.<br>
Firefox: `firefox/data/index.js`.

## The End

**Love :heart: it?** [Tell me](https://twitter.com/muanchiou)!

**Found a :bug: bug?** [Open an issue](https://github.com/muan/github-gmail/issues/new) with some [emojis](http://emoji.muan.co). Issues without emojis are not valid. :trollface:
