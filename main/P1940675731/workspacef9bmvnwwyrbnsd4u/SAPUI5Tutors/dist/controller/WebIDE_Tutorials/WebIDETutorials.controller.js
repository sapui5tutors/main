sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sapui5tutors/model/Close"
], function(Controller,models) {
	"use strict";
function adSetter(){
var admobid = {};
// select the right Ad Id according to platform
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-2377379935274230/5282510107',
        interstitial: 'ca-app-pub-2377379935274230/5003308503'
    };
} 
 
if(window.AdMob) AdMob.createBanner( { 
    adId:admobid.banner, 
    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow:true} );
 
  if(window.AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
 
}
	return Controller.extend("com.sapui5tutors.controller.WebIDE_Tutorials.WebIDETutorials", {
		onInit: function() {
			document.addEventListener("deviceready", onDeviceReady, false);		
			if(window.AdMob){ AdMob.showInterstitial();}
		}
		
           
	});

});