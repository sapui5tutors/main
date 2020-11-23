sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.wallpaper.controller.S1", {
onPress: function(){
 
	   /* var link = new sap.m.Link("idLink",{
	        href:"{i18n>link1}",
	        text:"wallpaper",
	        enabled:"true"
	    });*/
	   this.link.placeAt("content");

}
	});

});