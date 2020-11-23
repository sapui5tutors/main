sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"com/sapui5tutors/model/Close"
], function(Controller,History,models) {
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

	function onDeviceReady() {
		adSetter();
	}
	return Controller.extend("com.sapui5tutors.controller.Blog_Tutorials.BlogTutorial", {
   
    onInit: function() {
    	// models.close();
    		if(sap.ui.Device.system.tablet)
					{
						var menubutton1 = this.getView().byId("menuBloButton1");
						menubutton1.setVisible(false);
					}
			document.addEventListener("deviceready", onDeviceReady, false);
              if(window.AdMob){ AdMob.showInterstitial();}
		},
             onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("Dashboard");
             },
             click: function(){
             	// <core:Fragment fragmentName="sap.myApp.view.NewFragment" type="XML"/>
             	this._Dialog = sap.ui.xmlfragment("com.sapui5tutors.view.Dialog",
		this);
	this._Dialog.open();
             	
             },
             onClose : function() {
	this._Dialog.close();
	sap.ui.getCore().byId("subject").destroy();
    	sap.ui.getCore().byId("textarea").destroy();
    },
    onSubmit: function(oEvent){
    	var loReciever = "sapui5tutors@gmail.com";
    	var loSubject = sap.ui.getCore().byId("subject").getValue();
    	var loContent = sap.ui.getCore().byId("textarea").getValue();
    	sap.m.URLHelper.triggerEmail(loReciever, loSubject, loContent);
    	this._Dialog.close();
    	sap.ui.getCore().byId("subject").destroy();
    	sap.ui.getCore().byId("textarea").destroy();
    }
	});

});