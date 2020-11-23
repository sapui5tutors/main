sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";

	return Controller.extend("com.sapui5.controller.Basic_Tutorials.TutorialsMaster", {
             onInit: function(){
             	var basicList = this.getView().byId("basiclist");
             	var path="basic>";
             	basicList.bindItems({
             		path:path+"/Basic",
             		template: new sap.m.ObjectListItem({
             			title:"{basic>Title}",
             			type:"Active",
             			press: function(oEvent){
             				var item = oEvent.oSource.oBindingContexts.basic.sPath;
             				var sel = item.split('/')[2];
             				if(sel==0)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("TutorialsDetail");
             					}
             					if(sel==1)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("HelloWorld");
             					}
             					if(sel==2)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("SplitApp");
             					}
             				if(sel==3)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("StructuringDetail");
             				}
             				if(sel==4)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("Globalization");
             				}
             				if(sel==5)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("Margins");
             				}
             			}
             		})
             	});
             },
   //          onNavBack: function(){
   //          	var oHistory, sPreviousHash;
			// oHistory = History.getInstance();
			// sPreviousHash = oHistory.getPreviousHash();
			// if (sPreviousHash !== undefined) {
			// 	window.history.go(-1);
			// } else {
			// 	this.getRouter().navTo("appHome", {}, true /*no history*/);
			// }
   //          }
   onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("Dashboard");
             },
             click: function(){
             	// <core:Fragment fragmentName="sap.myApp.view.NewFragment" type="XML"/>
             	this._Dialog = sap.ui.xmlfragment("com.sapui5.view.Dialog",
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