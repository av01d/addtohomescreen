# addtohomescreen

Encourage visitors of your web app to add the app to the homescreen of their devices.
On compatible devices (Android and iOS devices, Chromium based desktop browsers), 
The script opens an always-on-top message inviting the user to add the application to their home screen.
It is *light weight*, *cross browser*, *stand alone* (doesn't depend on any other libraries) and it is highly *configurable*.

<img src="https://av01d.github.io/addtohomescreen/img/screenshot-android.png" width="50%">
<img src="https://av01d.github.io/addtohomescreen/img/screenshot-ios.png" width="50%">

On iOS devices (iPhone, iPad), it explains visitors how to add the App to their homescreen: "To add this web app to the home screen: tap `arrow box icon` and then *Add to Home Screen*".
On Chromium-based browsers on desktop and Android, including Google Chrome, Samsung Internet, and Microsoft Edge, it shows the message "Add this web app to my home screen". Users can click that message to actually install the app on their home screen.

## [Live Demo](https://av01d.github.io/addtohomescreen/index.html)

## Table of contents
- [Features](#features)
- [Demo](#demo)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Browser support](#browser-support)

## Features

- Shows 'install this web app to my home screen' message, either on top or bottom of the screen
- Native install banner on Android and Chromium-based desktop browsers.
- On iOS, explains visitors how to add the App to their homescreen.
- Supports 23 languages.
- Uses localStorage for storing user session.
- Comes with extensive debugging and logging options.
- Layout configurable through CSS.

## Demo

[Live demo](https://av01d.github.io/addtohomescreen/index.html).

## Getting started

### Installation

Add the following lines to the `<head>` of your document.

```html
<link href="/path/to/dist/addtohomescreen.min.css" rel="stylesheet">
<script src="/path/to/dist/addtohomscreen.js.min.js"></script>

```

### prerequisites

In order to be able to install a website or web app as a standalone Progressive Web App, there are some requirements.
For Chromium-based browsers on desktop and Android, including Google Chrome, Samsung Internet, and Microsoft Edge, these requirements are:

- Serving the web app over HTTPS.
- A web app manifest (`<link href="manifest.json" rel="manifest">`).
- A registered service worker.

### Usage

#### Syntax
```js
addToHomescreen.([options]);
```

- **options** (optional)
  - Type: `Object`
  - The options for the component. See available [options](#options).

#### Example


```js
const ath = addToHomescreen({
	appId: 'my-web-app',
	// debug: true,
	// lang: 'nl_nl',
	logging: true,
	position: 'bottom',
	allowOptout: false,
	showAppIcon: true,
	displayDelay: 0, // In seconds
	maxDisplayCount: 99,
	pauseBetweenDisplays: 0, // In minutes
	skipFirstVisit: true,
	onInstall: () => {
		console.log('onInstall event');
	},
	onShow: () => {
		console.log('onShow event');
	},
	onHide: () => {
		console.log('onHide event');
	},
	onCancel: () => {
		console.log('onCancel event');
	},
	onCanInstall: (e) => {
		console.log('onCanInstall event');
	}
});

```

The pwa-install-overlay automatically appears on screen, depending on the options provided. If `logging` equals `true`, your console will show what's happening and when/why the pwa-install-overlay was(n't) shown.

[⬆ back to top](#table-of-contents)

## Options

The addtohomescreen component expects a single argument, an options object that you can customise.

### appId

- Type: `String`
- Default: `a2hs`

You can have multiple instances of addtohomesscreen on the same domain by setting a different `appId` for each installation.
The `appId` is used as key for local storage.

### logging

- Type: `Boolean`
- Default: `true`

There are many factors that determine whether the pwa-install-overlay appears or not. Enabling `logging` makes it very clear, through `console.log` messages what's going on.

### debug

- Type: `Boolean`
- Default: `true`

The pwa-install-overlay only appears on compatible platforms. By setting `debug` to `true`, you force the overlay to appear on all browsers and platforms. (Please note: clicking the _install as pwa_ message won't actually install anything on non-supported browsers).

### position

- Type: `String`
- Default: `bottom`
- Options: `top`, `bottom`

Whether to show the pwa-install-overlay on top or on the bottom of the screen.

### lang

- Type: `String`
- Default: `undefined`
- Options: `en_us`, `cs_cs`, `de_de`, `da_dk`, `el_gr`, `es_es`, `fi_fi`, `fr_fr`, `he_il`, `hu_hu`, `it_it`, `ja_jp`, `ko_kr`, `nb_no`, `pt_br`, `pt_pt`, `nl_nl`, `ru_ru`, `sk_sk`, `sv_se`, `tr_tr`, `uk_ua`, `zh_cn`

By default, this addtohomescreen script will show the pwa-install-overlay in the language it detects from the browser.
If you want to override this behavior, you can supply a `lang` configuration option.

### allowOptout

- Type: `Boolean`
- Default: `true`

When users click the `close` icon in the overlay, they will never see the pwa-install-overlay again. Also, when they click the *install* button, then click `Cancel` instead of `Install`, they will never see the pwa-install-overlay overlay again.

### showAppIcon

- Type: `Boolean`
- Default: `true`

Whether or not to show the app's icon in the pwa-install-overlay. This icon is extracted from the `<link rel="shortcut icon">` tag (Android/Chromium) or `<link rel="apple-touch-icon">` (iOS).

### displayDelay

- Type: `Number`
- Default: `1`
- Unit: `seconds`

How many seconds to wait before the pwa-install-overlay is displayed to the user.

### maxDisplayCount

- Type: `Number`
- Default: `3`

Absolute maximum number of times the pwa-install-overlay will be shown to a user (0 = no limit).

### pauseBetweenDisplays

- Type: `Number`
- Default: `1440`
- Unit: `minutes`

The amount of minutes before the message is shown to the user again. By default it's set to 1440, meaning that we will be showing the message only once per day.

### onShow

- Type: `function`
- Default: `undefined`

Callback function to be executed when the pwa-install-overlay is shown.

### onHide

- Type: `function`
- Default: `undefined`

Callback function to be executed when the pwa-install-overlay is hidden/dismissed.

### onInstall

- Type: `function`
- Default: `undefined`

This callback is called when the user saw the native install-as-webapp prompt, and clicked `Install`.
This callback will only be called on Android devices and in Chromium based browsers (not on iOS).

### onCancel

- Type: `function`
- Default: `undefined`

This callback is called when the user saw the native install-as-webapp prompt, and clicked `Cancel`.
This callback will only be called on Android devices and in Chromium based browsers (not on iOS).

### onCanInstall

- Type: `function`
- Default: `undefined`

This callback is called when the user's browser is capable of adding webapps to the homepage by means of the `beforeinstallprompt` event.
Example use: Display a "install this webapp" icon somewhere on the page, outside the install-as-webapp overlay. See [example](https://av01d.github.io/addtohomescreen/index.html).


[⬆ back to top](#table-of-contents)

## Methods

### reset

Resets the user's session (removes the localStorage item).
```js
const ath = addToHomescreen({...});
ath.reset();
````

### setDict

Override a word in the default dictionary.

```js
const ath = addToHomescreen({...});
ath.setDict('en_us', 'native', 'Add this awesome game to my home screen.');
````

[⬆ back to top](#table-of-contents)

## Real world examples

The addtohomescreen component is used in all HTML5 games found on [HTMLgames.com](https://www.htmlgames.com/).

[⬆ back to top](#table-of-contents)

## Donations

If you like what I've made here, you can sponsor me with a donation. Thank you so much!

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VUVAC8EA3X468)

[⬆ back to top](#table-of-contents)

## License

This plugin is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with the code.
[More Information](http://en.wikipedia.org/wiki/MIT_License)

The development of this component was funded by [Zygomatic](https://www.zygomatic.nl/).

[⬆ back to top](#table-of-contents)


