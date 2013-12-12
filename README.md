## GitHub + Gmail

Open your GitHub notifications using `shift + g`, or this button in mail view:

![image](https://f.cloud.github.com/assets/1153134/1699454/20634378-5f9f-11e3-999c-c0c5e3e96684.png)

**or** 

The following is very much experimental, and requires 

1. Gmail shortcut mode enabled 
2. An organization named label as the first label for an email.

Open a selected GitHub notification email thread using `ctrl + return(enter)` in a list view where the label is present, and/or from any email view.

![image](https://f.cloud.github.com/assets/1153134/1608782/cf8e3000-5514-11e3-9d48-0d7307065c2e.png)

### Installation

#### The easy way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje)

#### The muan-might-steal-all-my-data-so-I-want-to-manually-load-it way

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

### GitHub Enterprise

If you are using GitHub enterprise and have a custom domain, you can set it in the extension options page.

![](https://f.cloud.github.com/assets/1153134/1715451/2fcb1c8a-61b3-11e3-9960-1f3ef6a48f48.png)

![](https://f.cloud.github.com/assets/1153134/1714892/1e258442-61aa-11e3-9732-f18fbdc5af49.png)

### Code

Just in case if you're not familiar with how Chrome extension is built, you can find all the relevant code in `src/inject/inject.js`.

### The end

Like it? Tell this little bird over at [`@muanchiou`](https://twitter.com/muanchiou) and I'll be thrilled.

Found a bug? [Open an issue](https://github.com/muan/github-gmail/issues/new) with some [emojis](http://emoji.muan.co). Issues without emojis are not valid.
