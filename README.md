# GitHub + Gmail

### 1

Open your GitHub notifications using `shift + g`(customizable), or this button in mail view:

![image](https://f.cloud.github.com/assets/1153134/1699454/20634378-5f9f-11e3-999c-c0c5e3e96684.png)

![shortcut option](https://f.cloud.github.com/assets/1153134/2075942/9c8e233e-8d97-11e3-82e9-8e7b8c323639.png)

### 2 (Require setup)

You have to have

1. Gmail shortcut mode enabled 
2. An organization named label matching the Regular Expression (default to `^\((.+)\)`).

Open a selected GitHub notification email thread using `ctrl + return(enter)` in a list view where the label is present.

![list view](https://f.cloud.github.com/assets/1153134/2073597/f19b6232-8d61-11e3-8e65-b03db4e72217.png)

Customise the Regular Expression on the options page:

![regexp option](https://f.cloud.github.com/assets/1153134/2075937/8508db64-8d97-11e3-9a74-73554178272e.png)

## Installation

### The easy way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje)

### The muan-might-steal-all-my-data-so-I-want-to-manually-load-it way

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

![image](https://f.cloud.github.com/assets/1153134/1749652/ae692df6-652e-11e3-869f-65447bfe1a68.png)

## GitHub Enterprise

If you are using GitHub enterprise and have a custom domain, you can set it in the extension options page.

![](https://f.cloud.github.com/assets/1153134/1715451/2fcb1c8a-61b3-11e3-9960-1f3ef6a48f48.png)

![domain option](https://f.cloud.github.com/assets/1153134/2075910/2f9b1f70-8d97-11e3-9798-9afcfb550e22.png)

## Code

Just in case if you're not familiar with how Chrome extension is built, you can find all the relevant code in `src/inject/inject.js`.

## The end

Like it? Tell this little bird over at [`@muanchiou`](https://twitter.com/muanchiou) and I'll be thrilled.

Found a bug? [Open an issue](https://github.com/muan/github-gmail/issues/new) with some [emojis](http://emoji.muan.co). Issues without emojis are not valid. :trollface:
