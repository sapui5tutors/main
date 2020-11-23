sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
"sap/ui/model/FilterOperator",
], function(Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("com.sample.controller.View1", {
		// onNavPress: function(){
		// 	this.nav = this.getView().oParent;
		// 	this.nav.back();
		// },
		onFilterChange: function(oEvent){
			var loValue = oEvent.getSource().getSelectedKey();
			
			
			if (loValue === "Current Disruption"){
			var oCurrDisVal = "Disruption 1";
			}
			if (loValue==="Current Workgroup"){
			var oCurrWo_noVal = "26557";
			}
			if (loValue === "Current Operation"){
			var oCurrop_noVal= "50002137-1-0-0011";
			}
			
			var aFilter = [];
			var oList = this.getView().byId("idList");
			var oBinding = oList.getBinding("items");
				if(oCurrop_noVal){
				aFilter.push(new Filter("op_no", FilterOperator.Contains, oCurrop_noVal));
				}
				if(oCurrWo_noVal){
				aFilter.push(new Filter("wo_no", FilterOperator.Contains, oCurrWo_noVal));
				}
				if(oCurrDisVal){
				aFilter.push(new Filter("dis_des", FilterOperator.Contains, oCurrDisVal));	
				}
			oBinding.filter(aFilter);
			// var loSelectState = this.getView().byId("idshipstate");
			// var loStatePath = "dealer>" + "/CountrySet('"+loCountry+"')/Region";
			// loSelectState.bindItems({
			// 	path: loStatePath,
			// 	template: new sap.ui.core.Item({
			// 		text:"{dealer>Statename}",
			// 		key:"{dealer>State}"
			// 	})
			// });
			
		},
		onSelectAll: function(){
			var aFilter = [];
			var oCurrWo_noVal = "26557";
			var oList = this.getView().byId("idList");
			var oBinding = oList.getBinding("items");
			aFilter.push(new Filter("wo_no", FilterOperator.Contains, oCurrWo_noVal));
			oBinding.filter(aFilter);
		}

		// 	onSearch : function(oEvent){
		// 	   var laFilter = [];
		// 	   var loValue = oEvent.getSource().getValue();
		// 	   var loTable = oEvent.getSource().getParent().getParent();
		// 	   loTable.setNoDataText(this.getView().getModel("i18n").getResourceBundle().getText("noSearchDataText"));
		// 	   var laParam = ["ContactNumber"];
		// 	   for(var i=0;i<laParam.length;i++){
			   
		// 	    var filter = new sap.ui.model.Filter(laParam[i], sap.ui.model.FilterOperator.Contains, loValue);       
		// 	    laFilter.push(filter);
		// 	    }
			   
		// 	    var loFilters = new sap.ui.model.Filter(laFilter, false);
		// 		var loBinding = loTable.getBinding("items");
		// 		loBinding.filter(loFilters, sap.ui.model.FilterType.Application);
		
		// }
	});
});