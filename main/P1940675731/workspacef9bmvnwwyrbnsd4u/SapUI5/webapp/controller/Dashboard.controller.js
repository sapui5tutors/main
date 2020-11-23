sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sapui5.controller.Dashboard", {
              onInit: function(){
              	
              	var page = this.getView().byId("dashboard");
              	page.addStyleClass("myBackgroundStyle");  
              },
              onBasTutorialpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("Tutorials");
              },
              onIntTutorialpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("IntermediateTutorials");
              },
              onAdvTutorialpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("AdvancedTutorials");
              },
              onRoutPress:function(){
              		var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("RoutingTutorials");
              },
              onIDEpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("WebIDETutorials");
              },
              onBlogpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("BlogTutorials");
              },
              onVideopress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("VideoTutorials");
              },
              onInterviewpress: function(){
              	var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("InterviewTutorials");
              }
              
	});

});