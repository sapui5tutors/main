sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sapui5tutors/model/Close"
], function(Controller,models) {
	"use strict";
	//////////////////////////////////////
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
 
  
 
}

	function onDeviceReady() {
		adSetter();
	}
  ////////////////
	return Controller.extend("com.sapui5tutors.controller.Dashboard", {
		onInit: function() {
			// models.close();
			var page = this.getView().byId("dashboard");
			debugger;
			// var Tile1 = page.getContent()[0].getTiles()[1];
			// var Tile1 = this.getView().byId("avbx");
			// Tile1.bindElement("mylocaldata>/Collection/percentValue");
			page.addStyleClass("myBackgroundStyle");
			document.addEventListener("deviceready", onDeviceReady, false);
			},
			onAfterRendering: function(){
			},
		onBasTutorialpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("Tutorials");
		},
		onIntTutorialpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("IntermediateTutorials");
		},
		onAdvTutorialpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("AdvancedTutorials");
		},
		onRoutPress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("RoutingTutorials");
		},
		onIDEpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("WebIDETutorials");
		},
		onBlogpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("BlogTutorials");
		},
		onVideopress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("VideoTutorials");
		},
		onInterviewpress: function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("InterviewTutorials");
		}
	});

});