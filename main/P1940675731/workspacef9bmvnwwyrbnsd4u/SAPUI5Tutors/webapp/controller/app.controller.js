sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sapui5tutors/model/Close"
], function(Controller,models) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.app", {
		onInit: function() {
			
			window.setInterval(function(){
  models.close();
}, 30000);
		}
			

	});

});