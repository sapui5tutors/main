sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.Advanced_Tutorials.AdvancedMaster", {
             onInit: function(){
             	
             	var basicList = this.getView().byId("basiclist2");
             	var path="Advanced>";
             	basicList.bindItems({
             		path:path+"/Advanced",
             		template: new sap.m.ObjectListItem({
             			title:"{Advanced>Title}",
             			type:"Active",
             			press: function(oEvent){
             				
             				var item = oEvent.oSource.oBindingContexts.Advanced.sPath;
             				var sel = item.split('/')[2];
             				if(sel==0)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("CustomDetail");
             					}
             					if(sel==1)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("MockServer");
             					}
             					if(sel==2)
             				{
             						var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("GoogleMaps");
             					}
             				if(sel==3)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("ResponsiveTable");
             				}
             				if(sel==4)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("VizCharts");
             				}
             				if(sel==5)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("VizFrame");
             				}
             				if(sel==6)
             				{
             					var loRouter = sap.ui.core.routing.Router.getRouter("appRouter");
									loRouter.navTo("ComponentDetail");
             				}
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