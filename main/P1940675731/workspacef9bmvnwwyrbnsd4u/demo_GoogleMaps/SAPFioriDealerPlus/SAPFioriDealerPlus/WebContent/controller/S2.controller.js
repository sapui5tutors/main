sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/odata/v2/ODataModel",
               "vikalp/cus/sd/dealer/plus/model/formatter"
               
], function (Controller, JSONModel, ODataModel, formatter) {
	"use strict";
	return Controller.extend("vikalp.cus.sd.dealer.plus.controller.S2", {
		formatter : formatter,

		/**
		 * Get the Count of the Customer Table
		 * 
		 */
		onUpdateFinished: function() {
			var loTable = this.getView().byId("idDealersTable");
			var loTableTitleContent = loTable.getHeaderToolbar().getContent()[0];
			
			var loTitle = loTableTitleContent.getText().replace(/[\d+()]/g, "")+"(" +loTable.getGrowingInfo().total+")";
			loTableTitleContent.setText(loTitle);
			
		},
		
		/**
		 * On Table row Click
		 * 
		 * @param [object] oEvent
		 */
		onTableRowClick : function (oEvent) {
			var loData= oEvent.getSource().getBindingContext("dealer"); 
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail",{
				cusId: loData.getPath().substr(1)
			});
		},
		
		/**
		 * On Search of the Customer.
		 * 
		 * @param [object] oEvent : Search Field 
		 */
		onSearch : function(oEvent){
			   var laFilter = [];
			   var loValue = oEvent.getSource().getValue();
			   var loTable = oEvent.getSource().getParent().getParent();
			   loTable.setNoDataText(this.getView().getModel("i18n").getResourceBundle().getText("noSearchDataText"));
			   var laParam = ["ContactNumber"];
			   for(var i=0;i<laParam.length;i++){
			   
			    var filter = new sap.ui.model.Filter(laParam[i], sap.ui.model.FilterOperator.Contains, loValue);       
			    laFilter.push(filter);
			    }
			   
			    var loFilters = new sap.ui.model.Filter(laFilter, false);
				var loBinding = loTable.getBinding("items");
				loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
		
		}

		
	});
});