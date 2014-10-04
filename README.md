# GitHub :octocat: :on: :love_letter: Gmail

This is a **Chrome and Firefox Extension** that allows you to open threads in GitHub notification emails with a shortcut. :sparkles:

## Features

#### Mail View Shortcut

Open your GitHub notifications using a shortcut (default to `shift + g`, or `shift + b` to open in the background in Chrome), or this button in mail view:

![image](https://f.cloud.github.com/assets/1153134/1699454/20634378-5f9f-11e3-999c-c0c5e3e96684.png)

#### List View Shortcut

The shortcut is `ctrl + return(enter)`, currently non-customisable. It will trigger one of these two when an email is selected using key navigation(when the blue bar appears):

1. [Gmail action buttons](https://github.com/blog/1891-view-issue-pull-request-buttons-for-gmail).
2. A GitHub Issue/ PR that has an organization named label matching the Regular Expression (default to `^\((.+)\)`).

The function will only look for a label if there is no action buttons.

##### Action button

![action button in list view](https://cloud.githubusercontent.com/assets/1153134/4344159/52248e7c-407b-11e4-9c80-fdc9f8a9f8cc.png)

##### Label

![label in list view](https://f.cloud.github.com/assets/1153134/2073597/f19b6232-8d61-11e3-8e65-b03db4e72217.png)

## Installation

#### The Easy Way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje) or [Install the addon via Firefox addons gallery](https://addons.mozilla.org/en-US/firefox/addon/github-for-gmail/)

#### The Mu-An-might-steal-all-my-data-so-I-want-to-manually-load-it Way (for Chrome)

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Read Mu-An's code making sure there is no data stealing.
4. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

As:

![image](https://f.cloud.github.com/assets/1153134/1749652/ae692df6-652e-11e3-869f-65447bfe1a68.png)

## Options and preferences

There are 3 preference settings:

1. Custom domains
2. Mail view shortcut
3. List view regular expression

**Attention** After updating a setting, please refresh both the extensions page and the Gmail page.

#### Custom Domains (for GitHub Enterprise)

If you are using GitHub enterprise and have a custom domain, you can set it in the extension options page.

![domain option](https://f.cloud.github.com/assets/1153134/2075910/2f9b1f70-8d97-11e3-9798-9afcfb550e22.png)

#### Mail View Shortcut

Customize the keyboard shortcut that triggers the `View on GitHub` button. Change the shortcut combination by focusing the input, and press whatever key(s) you want to be the shortcut. It will be displayed in `keyCode` which is why you see `71` here instead of `g`. Don't worry about it.

##### To open and focus the new window right away (`shift + g`):

![image](https://f.cloud.github.com/assets/1153134/2457119/3a485f38-af2e-11e3-978a-ece296676337.png)

##### To open a new window in the background (`shift + b`) – Chrome only:

![image](https://f.cloud.github.com/assets/1153134/2466997/e381dbc2-afb7-11e3-9470-bc722133a265.png)

#### List View Regular Expression

Custom Regular Expression for matching labeled Organization name. Eg. `/^\((.+)\)/` matches `muan` in `(muan)\github-gmail`, and will be use to build the url: `https://github.com/`**`muan`**`/github-gmail/issues`.

This is **not needed** if all you need is triggering the action button. 

![image](https://f.cloud.github.com/assets/1153134/2457127/ac41d204-af2e-11e3-9271-328aeb7a11bf.png)

## Code

Chrome: `chrome/src/inject/inject.js`.<br>
Firefox: `firefox/data/index.js`.

## The End

**Love :heart: it?** Tell this little bird over at [`@muanchiou`](https://twitter.com/muanchiou) and I'll be thrilled.

**Found a :bug: bug?** [Open an issue](https://github.com/muan/github-gmail/issues/new) with some [emojis](http://emoji.muan.co). Issues without emojis are not valid. :trollface:
