sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sapui5tutors/model/Close"
], function(Controller,models) {
	"use strict";
		function adSetter() {
		var admobid = {};
		// select the right Ad Id according to platform
		if (/(android)/i.test(navigator.userAgent)) {
			admobid = { // for Android
				interstitial: 'ca-app-pub-2377379935274230/5003308503'
			};
		}

		// if (AdMob) AdMob.createBanner({
		// 	// isTesting: true, //Remove this Before publishing your app
		// 	adId: admobid.banner,
		// 	position: AdMob.AD_POSITION.BOTTOM_CENTER,
		// 	autoShow: true
		// });
		if(window.AdMob){ 
			AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
			
		}

	}

	function onDeviceReady() {
		adSetter();
	}

	return Controller.extend("com.sapui5tutors.controller.Basic_Tutorials.Tutorials", {
             onInit:function(){
             	// models.close();
             		document.addEventListener("deviceready", onDeviceReady, false);
             		window.onbeforeunload = function(){
              if(window.AdMob){ AdMob.showInterstitial();}
        };
             }
	});

});