# Helper for GitHub notifications in Gmail

This is a **Chrome and Firefox Extension** that allows you to open threads in GitHub notification emails with a shortcut. :sparkles:

## Features

#### Mail View Shortcut

Open your GitHub notifications using a shortcut (default to `shift + g`, or `shift + b` to open in the background in Chrome), or this button in mail view:

![Mail view button](http://cl.ly/3v2M1s2w3O2i/Image%202016-02-18%20at%206.40.11%20PM.png)

#### List View Shortcut

The shortcut is `ctrl + return(enter)` (currently non-customizable). It will trigger one the action button when an email is selected using key navigation (when the blue bar appears):

![action button in list view](http://cl.ly/2d0N0N1U2h3P/Image%202016-02-18%20at%206.44.49%20PM.png)

#### Mute Thread
If you no longer want to receive notifications for a certain thread on GitHub, click the `Mute thread` button or using a shortcut `shift + h`, it will open a background window to load the mute thread request, and close itself when done.

![Mute thread button](https://s22.postimg.org/4cwbsva0h/687474703a2f2f636c2e6c792f32313272334d336b316330.gif)

## Installation

#### The Easy Way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje) or [Install the addon via Firefox addons gallery](https://addons.mozilla.org/en-US/firefox/addon/github-for-gmail/)

#### The Mu-An-might-steal-all-my-data-so-I-want-to-manually-load-it Way (for Chrome)

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Read Mu-An's code, making sure there is no data stealing.
4. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

As:

![image](http://cl.ly/182s2G3P082a/Image%202016-02-18%20at%206.45.49%20PM.png)

## Options and preferences

There are 3 preference settings:

1. Custom domains
2. Mail view shortcut
3. List view regular expression

**Attention** After updating a setting, please refresh both the extensions page and the Gmail page.

#### Custom Domains (for GitHub Enterprise)

If you are using GitHub Enterprise and have a custom domain, you can set it in the extension options page.

![domain option](http://cl.ly/0M1A2Z1o1m2O/Image%202016-02-18%20at%206.47.20%20PM.png)

#### Mail View Shortcut

Customize the keyboard shortcut that triggers the `View on GitHub` button. Change the shortcut combination by focusing the input, and press whatever key(s) you want to be the shortcut. It will be displayed in `keyCode` which is why you see `71` here instead of `g`. Don't worry about it.

##### To open and focus the new window right away (`shift + g`):

![image](http://cl.ly/1T1Z3Z2R2Z1j/Image%202016-02-18%20at%206.47.26%20PM.png)

##### To open a new window in the background (`shift + b`) – Chrome only:

![image](http://cl.ly/2b16172q421S/Image%202016-02-18%20at%206.47.33%20PM.png)

## Code

Chrome: `chrome/src/inject/inject.js`.<br>
Firefox: `firefox/data/index.js`.

## The End

**Love :heart: it?** Tell this little bird over at [`@muanchiou`](https://twitter.com/muanchiou) and I'll be thrilled.

**Found a :bug: bug?** [Open an issue](https://github.com/muan/github-gmail/issues/new) with some [emojis](http://emoji.muan.co). Issues without emojis are not valid. :trollface:
