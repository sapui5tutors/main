sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/odata/v2/ODataModel",
               "sap/ui/model/resource/ResourceModel",
               'sap/m/MessageToast'
], function (UIComponent, JSONModel,ODataModel,ResourceModel,MessageToast){
		"use strict";
		return UIComponent.extend("vikalp.cus.sd.dealer.plus.Component", {
			//metadata of the Component
			metadata: {
				rootView : "vikalp.cus.sd.dealer.plus.view.App",
				manifest: "json"
			},
			
			//call the init function of parent
			init: function() {
				UIComponent.prototype.init.apply(this, arguments);
		
				var oRootPath = jQuery.sap.getModulePath("vikalp.cus.sd.dealer.plus");
				
				var oResourceModel = new ResourceModel({ 
					bundleUrl:[ oRootPath, "i18n/i18n.properties" ].join("/")
				});
				this.setModel(oResourceModel, "i18n");
				sap.ui.getCore().setModel(oResourceModel, "i18n");
				/**set dialog
				 *	
				 * Getting the Odata url
				 */
				var oConfig = this.getMetadata().getConfig();
				
				/**
				 * Instantiating the Odata Model 
				 */
				var oDealerModel = new ODataModel(oConfig.dealerRemote);
				oDealerModel.attachRequestFailed(this.oHandleRequestFailed);
				this.setModel(oDealerModel, "dealer");
				sap.ui.getCore().setModel(oDealerModel, "dealer");
										
				/**
				 * Initialize the Router
				 */
				this.getRouter().initialize();
			},
			
			/**
			 * On oData Request Failed
			 * 
			 * 
			 */
			
			oHandleRequestFailed: function(oEvent) {
				var loErrorMsg = oEvent.getParameters().response.message;
				MessageToast.show(loErrorMsg);
			}
		});
});