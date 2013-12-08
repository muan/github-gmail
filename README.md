## GitHub + Gmail

Open your GitHub notifications using `shift + g`, or this button in mail view:

![image](https://f.cloud.github.com/assets/1153134/1597409/bfa91b60-5310-11e3-8439-b2802d9cdf1a.png)

**or** 

The following is very much experimental, and requires 

1. Gmail shortcut mode enabled 
2. An organization named label as the first label for an email.

Open a selected GitHub notification email thread using `ctrl + return(enter)` in list view and/or any email view.

![image](https://f.cloud.github.com/assets/1153134/1608782/cf8e3000-5514-11e3-9d48-0d7307065c2e.png)

### Installation

#### The easy way

[Install the extension via Chrome webstore](https://chrome.google.com/webstore/detail/github-notification-helpe/gmhijkhbpihfmkmhmcfebmlkaekgmaje)

#### The muan-might-steal-all-my-data-so-I-want-to-manually-load-it way

1. Go to [Releases](https://github.com/muan/github-gmail/releases) and download the latest version.
2. Unzip the folder wherever you'd like.
3. Go to Chrome extensions page (`chrome://extensions/`) and load the folder as an **Unpacked extension**.

### Code

Just in case if you're not familiar with how Chrome extension is built, you can find all the relevent code in `src/inject/inject.js`.
