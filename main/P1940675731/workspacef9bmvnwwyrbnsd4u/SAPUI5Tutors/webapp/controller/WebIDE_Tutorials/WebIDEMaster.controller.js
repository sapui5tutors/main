sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.WebIDE_Tutorials.WebIDEMaster", {
             onInit: function(){
             	
             	var basicList = this.getView().byId("WebIDEList");
             	var path="WebIDE>";
             	basicList.bindItems({
             		path:path+"/WebIDE",
             		template: new sap.m.ObjectListItem({
             			title:"{WebIDE>Title}",
             			type:"Active",
             			press: function(oEvent){
             				var item = oEvent.oSource.oBindingContexts.WebIDE.sPath;
             				var sel = item.split('/')[2];
             				if(sel==0)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("IntroDetail");
             					}
             					if(sel==1)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("SettingDetail");
             					}
             					if(sel==2)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("ConfigureDetail");
             					}
             				if(sel==3)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("HelloIDEDetail");
             				}
             				if(sel==4)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("MockIDEDetail");
             				}
         //    				if(sel==5)
         //    				{
         //    					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									// loRouter.navTo("VizFrame");
         //    				}
         //    				if(sel==6)
         //    				{
         //    					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									// loRouter.navTo("ComponentDetail");
         //    				}
             			}
             		})
             	});
             
             },
   //                       onNavBack: function(){
   ////          	var oHistory, sPreviousHash;
			// // oHistory = History.getInstance();
			// // sPreviousHash = oHistory.getPreviousHash();
			// // if (sPreviousHash !== undefined) {
			// 	window.history.go(-1);
			// // } else {
			// // 	this.getRouter().navTo("Dashboard", {}, true /*no history*/);
			// // }
   //          }
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