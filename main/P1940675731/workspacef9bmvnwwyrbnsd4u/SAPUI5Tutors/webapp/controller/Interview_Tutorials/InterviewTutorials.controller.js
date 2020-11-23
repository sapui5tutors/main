sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sapui5tutors/model/Close"
], function(Controller,models) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.Interview_Tutorials.InterviewTutorials", {
		onInit: function() {
			// models.close();
			if(sap.ui.Device.system.tablet)
					{
						var menubutton1 = this.getView().byId("menuInterButton1");
						menubutton1.setVisible(false);
					}	
			
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