sap.ui.define([
	"jquery.sap.global",
	"./Formatter",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button"
], function (jQuery, Fragment, Formatter, Controller, JSONModel, Popover, Button) {
	"use strict";

	var CController = Controller.extend("RealMadrid.Page1", {
		model : new sap.ui.model.json.JSONModel(),
		data : {
			navigation: [{
				title: "HOME",
				icon: "sap-icon://home",
				expanded: false,
				key: "home"
			}, {
				title: "FOOTBALL",
			//	icon: "sap-icon://building",
			//	key: "root2",
				expanded: false,
				items: [{
					title: "LATEST"
				},{
					title: "NEWS"
				},{
					title: "VIDEO GALLERY"
				},{
					title: "PHOTO GALLERY"
				},{
					title: "SQUAD"
				},{
					title: "HISTORY"
				}]
			}, {
				title: "BASKETBALL",
			//	icon: "sap-icon://card",
				expanded: false,
				items: [{
					title: "LATEST"
				},{
					title: "NEWS"
				},{
					title: "VIDEO GALLERY"
				},{
					title: "PHOTO GALLERY"
				},{
					title: "SQUAD"
				},{
					title: "HISTORY"
				}]
			}, {
				title: "ABOUT RMA",
			//	icon: "sap-icon://action",
				expanded: false,
				items: [{
					title: "THE CLUB"
				}, {
					title: "HONOURS"
				}, {
					title: "HISTORY"
				}, {
					title: "FOUNDATION"
				}]
			}, {
				title: "MEMBERS",
			//	icon: "sap-icon://action-settings",
				expanded: false,
				items: [{
					title: "MEMBERS"
				}, {
					title: "ARRANGEMENTS"
				}, {
					title: "DISCOUNTS"
				}]
			}, {
				title: "FAN ZONE",
			//	icon: "sap-icon://activate",
				expanded: false,
				items: [{
					title: "MADRIDISTAS"
				}, {
					title: "FANCLUBS"
				}, {
					title: "SOCIAL NETWORKS"
				}, {
					title: "WALLPAPERS"
				}]
			}, {
				title: "RMTV",
			//	icon: "sap-icon://badge",
				expanded: false,
				items: [{
					title: "RMA TV LIVE"
				}, {
					title: "CODE OF ETHICS"
				}, {
					title: "CONTACT"
				}]
			}, {
				title: "TROPHIES",
			//	icon: "sap-icon://bookmark",
				expanded: false,
				key: "trophy"
			}
			],
			fixedNavigation: [{
				title: "ONLINE STORE",
				//icon: "sap-icon://employee"
				key : "onlineStore"
			}, {
				title: "FIFA 17 RATINGS",
				key: "fifa17Ratings"
			}, {
				title: "SPONSORS",
				key:"sponsors",
				icon: "sap-icon://card"
			}]
		},
		onInit : function() {
			this.model.setData(this.data);
			this.getView().setModel(this.model);

			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
			
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			this.getView().setModel(oModel, "products");
			
			var oImgModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/img.json"));
			this.getView().setModel(oImgModel, "img");
		},
		
		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		//	console.log(item.getKey());
		//	console.log(viewId);
		},

		onSideNavButtonPress : function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.getView().byId("sideNavigationToggleButton");
			if (bLarge) {
				toggleButton.setTooltip("Large Size Navigation");
			} else {
				toggleButton.setTooltip("Small Size Navigation");
			}
		},
		
		addtoCart : function(){
			sap.m.MessageToast.show("Product added to Cart");
		}

	});


	return CController;

});