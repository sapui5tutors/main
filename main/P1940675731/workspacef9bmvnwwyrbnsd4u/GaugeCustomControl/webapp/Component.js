sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/resource/ResourceModel"
], function (UIComponent,ResourceModel){
		"use strict";
		return UIComponent.extend("sap.st.Gauge.Component", {
			//metadata of the Component
			metadata: {
				rootView : "sap.st.Gauge.view.App",
				manifest: "json"
			},
			
			//call the init function of parent
			init: function() {
				UIComponent.prototype.init.apply(this, arguments);

	    		var oModel = new sap.ui.model.json.JSONModel();
	    		oModel.loadData("model/sampledata.json");
	    	    this.setModel(oModel, "GaugeControl");
	    	    sap.ui.getCore().setModel(oModel, "GaugeControl");
		
//				var oRootPath = jQuery.sap.getModulePath("sap.st.Gauge");
//				
//				var oResourceModel = new ResourceModel({ 
//					bundleUrl:[ oRootPath, "i18n/i18n.properties" ].join("/")
//				});
//				this.setModel(oResourceModel, "i18n");
//				sap.ui.getCore().setModel(oResourceModel, "i18n");
				
				// create the views based on the url/hash
				this.getRouter().initialize();
			}
		});
});