/**
 * addtohomescreen.js
 *
 * Encourages visitors of a PWA-compatible website to add the site to
 * their device's homepage or browser's app drawer.
 *
 * Made by Arjan Haverkamp, https://www.webgear.nl
 * Copyright 2023 Arjan Haverkamp
 * MIT Licensed
 * @version 1.0 - 2023-05-01
 * @url https://github.com/av01d/addtohomescreen
 *
 * Code inspired by Matteo Spinelli and Chris Love
 */

((window, document) => {
	let config = {
		appId: 'a2hs',
		position: 'bottom', // 'top' or 'bottom'
		logging: true,
		debug: false,

		allowOptout: true, // When users click `close`, they will never see the PWA bar again
		skipFirstVisit: true, // Show only to returning visitors (ie: skip the first time you visit)

		maxDisplayCount: 3, // Maximum number of times the message will be shown to the user (0: no limit)
		pauseBetweenDisplays: 1440, // In minutes
		displayDelay: 1, // In seconds
		showAppIcon: true, // Show app icon in PWA-bar?

		onInstall: null,
		onShow: null,
		onHide: null,
		onCancel: null,
		onCanInstall: null,

		dict: {
			cs_cs: {
				ios: 'Pro přidáni této webové aplikace na úvodní obrazovku: stlačte #icon# a pak <strong>Přidat na úvodní obrazovku</strong>.',
				native: 'Přidání této webové aplikace na domovskou obrazovku.'
			},
			de_de: {
				ios: 'Um diese Web-App zum Home-Bildschirm hinzuzufügen, tippen Sie auf #icon# und dann <strong>Zum Home-Bildschirm</strong>.',
				native: 'Fügen Sie diese Webanwendung zu meinem Startbildschirm hinzu.'
			},
			da_dk: {
				ios: 'For at tilføje denne web app til hjemmeskærmen: Tryk #icon# og derefter <strong>Føj til hjemmeskærm</strong>.',
				native: 'Tilføj denne webapp til min startskærm.'
			},
			el_gr: {
				ios: 'Για να προσθέσετε την εφαρμογή στην αρχική οθόνη: πατήστε το #icon# και μετά <strong>Πρόσθεσε στην αρχική οθόνη</strong>.',
				native: 'Προσθέστε αυτή την εφαρμογή ιστού στην αρχική μου οθόνη.'
			},
			en_us: {
				ios: 'To add this web app to the home screen: tap #icon# and then <strong>Add to Home Screen</strong>.',
				native: 'Add this web app to my home screen.'
			},
			es_es: {
				ios: 'Para añadir esta aplicación web a la pantalla de inicio: pulsa #icon# y selecciona <strong>Añadir a pantalla de inicio</strong>.',
				native: 'Añadir esta aplicación web a mi pantalla de inicio.'
			},
			fi_fi: {
				ios: 'Liitä tämä sovellus kotivalikkoon: klikkaa #icon# ja tämän jälkeen <strong>Lisää kotivalikkoon</strong>.',
				native: 'Lisää tämä verkkosovellus aloitusnäyttööni.'
			},
			fr_fr: {
				ios: 'Pour ajouter cette application web sur l\'écran d\'accueil : Appuyez #icon# et sélectionnez <strong>Ajouter sur l\'écran d\'accueil</strong>.',
				native: 'Ajouter cette application web à mon écran d\'accueil.'
			},
			he_il: {
				ios: '<span dir="rtl">להוספת האפליקציה למסך הבית: ללחוץ על #icon# ואז <strong>הוסף למסך הבית</strong>.</span>',
				native: '<span dir="rtl">הוסף את אפליקציית האינטרנט הזו למסך הבית שלי.</span>'
			},
			hu_hu: {
				ios: 'Ha hozzá szeretné adni ezt az alkalmazást a kezdőképernyőjéhez, érintse meg a következő ikont: #icon# , majd a <strong>Hozzáadás a kezdőképernyőhöz</strong> menüpontot.',
				native: 'Adja hozzá ezt a webes alkalmazást a kezdőképernyőmhöz.'
			},
			it_it: {
				ios: 'Per aggiungere questa web app alla schermata iniziale: premi #icon# e poi <strong>Aggiungi a Home</strong>.',
				native: 'Aggiungere questa applicazione web alla mia schermata iniziale.'
			},
			ja_jp: {
				ios: 'このウェプアプリをホーム画面に追加するには、#icon#をタップして<strong>ホーム画面に追加</strong>してください。',
				native: 'このウェブアプリを私のホーム画面に追加します。'
			},
			ko_kr: {
				ios: '홈 화면에 바로가기 생성: #icon# 을 클릭한 후 <strong>홈 화면에 추가</strong>.',
				native: '이 웹 앱을 내 홈 화면에 추가합니다.'
			},
			nb_no: {
				ios: 'For å installere denne appen på hjem-skjermen: trykk på #icon# og deretter <strong>Legg til på Hjem-skjerm</strong>.',
				nmative: 'Legg til denne webappen på startskjermen min.'
			},
			pt_br: {
				ios: 'Para adicionar este app à tela de início: clique #icon# e então <strong>Tela de início</strong>.',
				native: 'Adicione esse aplicativo da Web à minha tela inicial.'
			},
			pt_pt: {
				ios: 'Para adicionar esta app ao ecrã principal: clique #icon# e depois <strong>Ecrã principal</strong>.',
				native: 'Adicionar esta aplicação Web ao meu ecrã inicial.'
			},
			nl_nl: {
				ios: 'Om deze webapp aan je startscherm toe te voegen, klik op #icon# en dan <strong>Zet op beginscherm</strong>.',
				native: 'Voeg deze webapp toe aan mijn startscherm.',
			},
			ru_ru: {
				ios: 'Чтобы добавить этот сайт на свой домашний экран, нажмите на иконку #icon# и затем <strong>На экран "Домой"</strong>.',
				native: 'Добавьте это веб-приложение на мой домашний экран.'
			},
			sk_sk: {
				ios: 'Pre pridanie tejto webovej aplikácie na úvodnú obrazovku: stlačte #icon# a potom <strong>Pridať na úvodnú obrazovku</strong>.',
				native: 'Pridanie tejto webovej aplikácie na domovskú obrazovku.'
			},
			sv_se: {
				ios: 'För att lägga till denna webbapplikation på hemskärmen: tryck på #icon# och därefter <strong>Lägg till på hemskärmen</strong>.',
				native: 'Lägg till den här webbappen på min startskärm.'
			},
			tr_tr: {
				ios: 'Uygulamayı ana ekrana eklemek için, #icon# ve ardından <strong>ana ekrana ekle</strong> butonunu tıklayın.',
				native: 'Bu web uygulamasını ana ekranıma ekleyin.'
			},
			uk_ua: {
				ios: 'Щоб додати цей сайт на початковий екран, натисніть #icon#, а потім <strong>На початковий екран</strong>.',
				native: 'Додати цей веб-додаток на мій домашній екран.'
			},
			zh_cn: {
				ios: '如要把应用程序加至主屏幕,请点击#icon#, 然后<strong>添加到主屏幕</strong>',
				native: '把这个网络应用添加到我的主屏幕上。'
			}
		}
	}, beforeInstallPrompt = null;

	/*
	const dict = {
		en: 'To add this game to the home screen: tap #icon# and then <b>Add to Home Screen</b>.',
		es: 'Para añadir este juego a la pantalla de inicio: pulsa #icon# y selecciona <b>Añadir a pantalla de inicio</b>.',
		de: 'Um dieses Spiel zum Home-Bildschirm hinzuzufügen, tippen Sie auf #icon# und dann <b>Zum Home-Bildschirm</b>',
		fr: 'Pour ajouter ce jue sur l\'écran d\'accueil : Appuyez #icon# et sélectionnez <b>Ajouter sur l\'écran d\'accueil</b>.',
		nl: 'Om dit spel aan je startscherm toe te voegen, klik op #icon# en dan <b>Zet op beginscherm</b>',
		it: 'Per aggiungere questo gioco alla schermata iniziale: premi #icon# e poi <b>Aggiungi a Home</b>.',
		pt: 'Para adicionar este jogo ao ecrã principal: clique #icon# e depois <b>Ecrã principal</b>.',
		ru: 'Чтобы добавить эта игра на свой домашний экран, нажмите на иконку #icon# и затем <b>На экран "Домой"</b>.',
		tr: 'Bu oyunu ana ekrana eklemek için, #icon# ve ardından <b>ana ekrana ekle</b> butonunu tıklayın.',
		cn: '如要把应用程序加至主屏幕,请点击#icon#, 然后<b>添加到主屏幕</b>'
	};
	*/

	// Add 2 characters language support
	for (let lang in config.dict) {
		config.dict[lang.substr(0, 2)] = config.dict[lang];
	}

	//let language = navigator.language && navigator.language.toLowerCase().replace('-', '_') || '';
	let language;

	const platform = {
		isCompatible: false,
		hasNativePrompt: 'onbeforeinstallprompt' in window
	};

	const ath = settings => {
		config = {...config, ...settings};
		if (config.debug) { config.logging = true; }

		// Determine language
		if (config.lang) {
			language = config.lang; 
		}
		else {
			language = navigator.language && navigator.language.toLowerCase().replace('-', '_') || '';
		}
		language = language && language in config.dict ? language : 'en_us';

		// Check for service worker
		if ('serviceWorker' in navigator) {
			// Is there a manifest file?
			const manifestEl = document.querySelector("[rel='manifest']");
			if (!manifestEl) {
				log('No manifest file!');
			}
			else {
				navigator.serviceWorker.getRegistration().then(main);
			}
		}
		else {
			log('No support for service workers!');
		}
		return ath;
	}
	
	const log = msg => {
		config.logging && console.log('AddToHomescreen: ' + msg);
	}

	const getSession = () => {
		return JSON.parse(localStorage.getItem(config.appId)) || {};
	}

	const getSessionProperty = prop => {
		const session = getSession();
		return (prop in session) ? session[prop] : undefined;
	}

	const setSessionProperty = (prop, value) => {
		const session = getSession();
		session[prop] = value;
		localStorage.setItem(config.appId, JSON.stringify(session));
	}

	const main = (sw) => {
		if (!sw) {
			log('No service worker!');
			return;
		}

		checkPlatform();

		if (platform.isCompatible) {
			// All requirements fulfilled:
			log('Platform is PWA compatible 👍.');

			// Set install prompt handler (Android, Chrome desktop)
			if (platform.hasNativePrompt) {
				window.addEventListener('beforeinstallprompt', e => {
					e.preventDefault();
					const firstTime = (null === beforeInstallPrompt);
					firstTime && config.onCanInstall && config.onCanInstall(e);
					beforeInstallPrompt = e;
					if (firstTime) { renderPWABar(); }
				});
			}
			else {
				renderPWABar();
			}
		}
		else {
			log('Platform is not PWA compatible 👎.');
			if (config.debug) {
				log('Showing PWA bar, as debugging is enabled.');
				renderPWABar();
			}
		}
	}

	const renderPWABar = () => {
		let displayCount = getSessionProperty('displayCount') || 0;

		const tmpl = {
			ios: `${config.dict[language].ios.replace('#icon#', '<span class="iosIcon"></span>')}`,
			native: `<span class="installNative">${config.dict[language].native}</span>`
		};
		
		const updateDisplayCount = () => {
			displayCount++;
			setSessionProperty('displayCount', displayCount);
		}

		if (getSessionProperty('optedOut')) {
			log('Not showing PWA bar, you opted out.');
			return false;
		}

		if (0 != config.maxDisplayCount && displayCount >= config.maxDisplayCount) {
			log(`Not showing PWA bar, already shown ${config.maxDisplayCount} times.`);
			return false;
		}

		if (config.skipFirstVisit && 0 == displayCount) {
			log(`Not showing PWA bar, this is your first visit.`);
			updateDisplayCount();
			return false;
		}

		if (platform.isStandalone) {
			log('Not showing PWA bar, running app from homescreen (standalone).');
			return false;
		}

		if (platform.hasNativePrompt && !beforeInstallPrompt) {
			log('Not showing PWA bar, app is already installed.');
			return false;
		}

		const lastDisplayTime = getSessionProperty('lastDisplayTime') || 0;
		if (Date.now() - lastDisplayTime < config.pauseBetweenDisplays * 60000) {
			log(`Not showing PWA bar, already displayed less than ${config.pauseBetweenDisplays} minutes ago.`);
			return false;
		}

		const athDiv = document.createElement('div');
		athDiv.setAttribute('class', 'ath flex ' + config.position + ' athSlideIn' + ('bottom' == config.position ? 'Up' : 'Down'));
		athDiv.innerHTML = [
			'<div class="appIcon"></div>',
			'<div>' + (tmpl[platform.isIDevice ? 'ios' : 'native']) + '</div>',
			'<div class="close"></div>'
		].join('');

		const appIcon = document.querySelector("head link[rel='" + (platform.isIDevice ? 'apple-touch-icon' : 'shortcut icon') + "']");
		if (config.showAppIcon && appIcon) {
			const appImg = new Image();
			appImg.src = appIcon.href;
			athDiv.querySelector('.appIcon').appendChild(appImg);
		}

		const hidePWABar = () => {
			athDiv.classList.remove('athSlideInDown', 'athSlideInUp');
			athDiv.classList.add('bottom' == config.position ? 'athSlideOutDown' : 'athSlideOutUp');
			config.onHide && config.onHide();
		}

		athDiv.querySelector('.close').addEventListener('click', (e) => {
			config.allowOptout && setSessionProperty('optedOut', true);
			hidePWABar();
		});

		if (platform.hasNativePrompt) { // Android, Chrome desktop
			athDiv.querySelector('.installNative').addEventListener('click', async e => {
				e.preventDefault();
				if (!beforeInstallPrompt) { return; }
				beforeInstallPrompt.prompt();
				const { outcome } = await beforeInstallPrompt.userChoice;
				beforeInstallPrompt = false; // Can only be used once

				if ('accepted' == outcome) {
					log('You successfully installed this web app. Thanks!');
					config.onInstall && config.onInstall();
				}
				else {
					config.allowOptout && setSessionProperty('optedOut', true);
					log('You dismissed the install request.');
					config.onCancel && config.onCancel();
					hidePWABar();
				}
			})
		}

		if (config.displayDelay > 0) {
			log(`Waiting ${config.displayDelay} seconds...`);
		}

		setTimeout(() => {
			document.body.append(athDiv);

			config.onShow && config.onShow();

			updateDisplayCount();
			setSessionProperty('lastDisplayTime', Date.now());

			log(`Shown PWA bar ${displayCount} times.`);
		}, config.displayDelay * 1000);

		return true;
	}

	const checkPlatform = () => {
		const ua = window.navigator.userAgent;

		platform.isIDevice = /ip(hone|pod|pad)/i.test(navigator.platform);
		platform.isSamsung = /Samsung/i.test(ua);
		platform.isFireFox = /Firefox/i.test(ua);
		platform.isOpera = /opr/i.test(ua);
		platform.isEdge = /edg/i.test(ua);

		// Opera & FireFox only Trigger on Android
		if (platform.isFireFox) {
			platform.isFireFox = /android/i.test(ua);
		}

		if (platform.isOpera) {
			platform.isOpera = /android/i.test(ua);
		}

		platform.isChromium = 'onbeforeinstallprompt' in window;
		platform.isInWebAppiOS = window.navigator.standalone === true;
		platform.isInWebAppChrome =
			window.matchMedia('(display-mode: fullscreen)').matches ||
			window.matchMedia('(display-mode: standalone)').matches ||
			window.matchMedia('(display-mode: minimal-ui)').matches;
		platform.isMobileSafari =
			platform.isIDevice &&
			ua.indexOf('Safari') > -1 &&
			ua.indexOf('CriOS') < 0;
		platform.isStandalone = platform.isInWebAppiOS || platform.isInWebAppChrome;
		platform.isiPad = platform.isMobileSafari && ua.indexOf('iPad') > -1;
		platform.isiPhone = platform.isMobileSafari && ua.indexOf('iPad') === -1;
		platform.isCompatible =
			platform.isChromium ||
			platform.isMobileSafari ||
			platform.isSamsung ||
			platform.isFireFox ||
			platform.isOpera ||
			platform.isIDevice;
	}
	
	//
	// Publicly exposed functions on `ath` object
	//

	// Reset session
	ath.reset = () => {
		localStorage.removeItem(config.appId);
		log('Reset complete');
	}

	// Change a word/sentence in the default dictionary
	ath.setDict = (lang, id, text) => {
		config.dict[lang][id] = text;
		config.dict[lang.substr(0, 2)][id] = text;
	}

	window.addToHomescreen = ath;

})(window, document);
