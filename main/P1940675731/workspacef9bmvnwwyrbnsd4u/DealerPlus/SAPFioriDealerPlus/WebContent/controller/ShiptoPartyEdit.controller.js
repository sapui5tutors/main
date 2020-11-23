sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/odata/ODataModel",
               "sap/m/MessageToast"


               ], function(Controller, ODataModel, MessageToast) {
	"use strict";
	return Controller.extend("vikalp.cus.sd.dealer.plus.controller.ShiptoPartyEdit", {


		/**
		 * 
		 */
		onInit: function() {
			
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		/**
		 *
		 * @param [object] oEvent
		 */
		_handleRouteMatched: function(oEvent) {
			var _self = this;
			var loObject = oEvent.getParameters().arguments;
			if (_self._isObjectEmpty(loObject)) {
				
				var loPath = loObject.ship;
				var loPage = this.getView().getContent()[0];
				var loBindingPath = "/" + loPath;
//				var loHeader = loPage.getContent()[0];
				var loHeaderPath = "dealer>" + loBindingPath;
				var loEditShipForm = this.getView().byId("idShipEditForm");
				loEditShipForm.bindElement(loHeaderPath);
				var loDataPath = loEditShipForm.getBindingContext("dealer").sPath;
				var loData = this.getView().getModel("dealer").getData(loDataPath);
				var loCountryPath = "dealer>" + "/CountrySet"
				var loSelectCountry = this.getView().byId("idshipcountry"); 
				
				loSelectCountry.bindItems({
					path: loCountryPath,
					template: new sap.ui.core.Item({
						text:"{dealer>Countryname}",
						key:"{dealer>Countrykey}"
					})
				});
				var loStatePath = "dealer>" + "/CountrySet('"+loData.Country+"')/Region"
				var loSelectState = this.getView().byId("idshipstate");
				loSelectState.bindItems({
					path: loStatePath,
					template: new sap.ui.core.Item({
						text:"{dealer>Statename}",
						key:"{dealer>State}"
					})
				});
				
				
				
				loSelectCountry.setSelectedKey(loData.Country);
				loSelectState.setSelectedKey(loData.Region);
			}
		
		
		},
		/**
		 * on Back button Press
		 */
		onBackPress: function(){
			window.history.go(-1);
		},
		
		/**
		 * on Cancel
		 */
		handleCancelPress: function(){
			window.history.go(-1);
		},
		
		/**
		 * To Update data
		 */
		
		handleSavePress: function(){
			var dataModel = this.getView().getModel("dealer");
			var loUpdateModel = new ODataModel(dataModel.sServiceUrl, true);
			var loBindingPath = this.getView().byId("idShipEditForm").getBindingContext("dealer").sPath;
			var loData = dataModel.getData(loBindingPath);
			var loFormData = {};
			
			var loForm = this.getView().byId("idShipEditForm");
			var loFormElement = loForm.getFormContainers()[0].getFormElements();
			
			loData.Street = loFormElement[2].getFields()[0].getValue();
			loData.CountryName = loFormElement[3].getFields()[0].getSelectedItem().getText();
			loData.Country = loFormElement[3].getFields()[0].getSelectedKey();
			loData.RegionName = loFormElement[4].getFields()[0].getSelectedItem().getText();
			loData.Region = loFormElement[4].getFields()[0].getSelectedKey();
			loData.City = loFormElement[5].getFields()[0].getValue();
			loData.PostalCode = loFormElement[6].getFields()[0].getValue();
			loData.ContactNumber = loFormElement[7].getFields()[0].getValue();
			loData.MailId = loFormElement[8].getFields()[0].getValue();
		
			loUpdateModel.update("/ShiptopartySet(CustomerId='"+loData.CustomerId+"',SalesOrganization='"+loData.SalesOrganization+"',DistributionChannel='"+loData.DistributionChannel+"',Division='"+loData.Division+"')", loData, null, function(data, oResponds){
				MessageToast.show("Update Successful");
				window.history.go(-1);
				
				
			},function(oData){
				var loIndexValue = oData.response.body.indexOf("value");
				var loIndexValueEnd = oData.response.body.substring(loIndexValue).indexOf("}");
				if (loIndexValueEnd > -1) {
				var	loMessage = oData.response.body.substring(loIndexValue+8,loIndexValue+loIndexValueEnd-1);			
				}
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.show(loMessage, sap.m.MessageBox.Icon.ERROR, "Invalid", [sap.m.MessageBox.Action.OK]);
				})
		},
		/**
		 * To Change the State on the basis of country selected
		 *
		 * @param [object] oEvent : Router argument Object
		 */
		
		onCountryChange : function(oEvent) {
			var loCountry = oEvent.getSource().getSelectedKey();
			var loSelectState = this.getView().byId("idshipstate");
			var loStatePath = "dealer>" + "/CountrySet('"+loCountry+"')/Region";
			loSelectState.bindItems({
				path: loStatePath,
				template: new sap.ui.core.Item({
					text:"{dealer>Statename}",
					key:"{dealer>State}"
				})
			});
			
		},
		/**
		 * To check the Object is Empty or Not
		 *
		 * @param [object] oEvent : Router argument Object
		 */
		_isObjectEmpty: function(oEvent) {
			for (var key in oEvent) {
				if (key === "ship") {
					return true;
				}
			}
			return false;
		}

})});