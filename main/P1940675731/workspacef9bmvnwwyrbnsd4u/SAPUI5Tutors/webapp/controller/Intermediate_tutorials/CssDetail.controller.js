sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sapui5tutors.controller.Intermediate_tutorials.CssDetail", {
		onInit: function(){
					if(sap.ui.Device.system.tablet)
					{
						var menubutton1 = this.getView().byId("menuIntButton2");
						menubutton1.setVisible(false);
					}
				},
             onNavBack: function(){
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("IntermediateMaster");
             },
    //          onRead: function(oEvt){
             	
             	
             	
             	
    //          	// var oList = sap.ui.getCore().byId("__xmlview3--basiclist1");
    //          	// var oitem1 = oList.getItems()[0];
    //          	// var oImage = sap.ui.getCore().byId("__item0-__xmlview3--basiclist1-0-img");
    //          	var oList = this.getView().getParent().getParent().getMasterPages()[0].byId("basiclist1");
    //          	var oImage = oList.mAggregations.items[0]._oImageControl;
             	
    //          	// var loPage = sap.ui.getCore().byId("__xmlview1--dashboard").getContent();
    //          	var loPage = this.getView().getParent().getParent().getParent().getParent().mAggregations.pages[0].getContent()[0].getPages()[0].getContent();
			
				// var loTile = loPage[0].getTiles()[1];
				// var oItems = loTile.getContent().getItems()[3];
				// oItems.bindElement("mylocaldata>/Collection");
				// var oPercentValue = oItems.getPercentValue();
				// var oDisplayValue = oItems.getDisplayValue();

    //          	if(oEvt.getSource().getText()==="Mark as Read")
    //          	{
    //          	oEvt.getSource().setType("Emphasized");
    //          	oEvt.getSource().setText("Mark as Unread");
    //          	oImage.setColor("green");
    // //          	oItems.setPercentValue(oPercentValue+18);
				// // oItems.setDisplayValue(oPercentValue+18);
    //          	}
    //          	else{
    //          	oEvt.getSource().setType("Default");
    //          	oEvt.getSource().setText("Mark as Read");
    //          	oImage.setColor("grey");
    //          	oItems.setPercentValue(oPercentValue-18);
				// oItems.setDisplayValue(oPercentValue-18);
    //          	}
    //          }
	});

});