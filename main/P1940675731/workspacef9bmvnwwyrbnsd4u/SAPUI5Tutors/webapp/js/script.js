function adSetter() {
	var admobid = {};
	// select the right Ad Id according to platform
	if (/(android)/i.test(navigator.userAgent)) {
		admobid = { // for Android
			banner: 'ca-app-pub-2377379935274230/5282510107',
			interstitial: 'ca-app-pub-2377379935274230/5003308503'
		};
	}

	if (AdMob) {
		AdMob.createBanner({ //Remove this Before publishing your app
			adId: admobid.banner,
			position: AdMob.AD_POSITION.BOTTOM_CENTER,
			autoShow: true
		});
	}

}

function onDeviceReady() {
	adSetter();
}

function domLoaded() {
	document.addEventListener("deviceready", onDeviceReady, false);
}