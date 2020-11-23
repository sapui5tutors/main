sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "vikalp/cus/sd/dealer/plus/model/formatter"
               
], function (Controller,formatter) {
	"use strict";
	return Controller.extend("vikalp.cus.sd.dealer.plus.controller.OrderDetails", {
		formatter : formatter,
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* 
		*/
		
		onInit : function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);	
			
			//onInit hook
			
			if (this.extHookOrderDetailOnInit) {
				this.extHookOrderDetailOnInit();
			}
		},
		
		/**
		 * 
		 * 
		 * @param [object] oEvent
		 */
		_handleRouteMatched : function(oEvent) {
			var _self = this;
			var loObject = oEvent.getParameters().arguments;
			if(_self._isObjectEmpty(loObject)) {
			var loPath = loObject.order;
			var loBindingPath = "/"+loPath;
			var loView = this.getView();
			var loHeaderPath = "dealer>"+loBindingPath;
			var loHeader = loView.byId("s4ObjectHeader");
			loHeader.bindElement(loHeaderPath);

			var loShipToForm = loView.byId("shipToForm");
			loShipToForm.bindElement(loHeaderPath);
			
			var loItemTable = this.getView().byId("idMaterialTable");
			
			loItemTable.bindItems({
	        	path : loHeaderPath+"/OrderItems",
	        	template : new sap.m.ColumnListItem({
	        		cells: [		                             
	        		        new sap.m.Text({
	        		        	text : "{dealer>Description}" 
	        		        }),
	        		        new sap.m.ObjectNumber({
	        		        	number : 
	        		        	{
									path : 'dealer>Quantity',
								    type: 'sap.ui.model.type.Float',
								    formatOptions: { groupingEnabled: true,
		                                            groupingSeparator: ',',
		                                           maxFractionDigits: 0}
								     },
							   numberUnit : "{dealer>UnitOfMeasure}" 
	        		        
	        		        }),        
	        		        new sap.m.ObjectNumber({
	        		        	number : {
									path : "dealer>PricePerUnit",
								    type: "sap.ui.model.type.Float",
								    formatOptions: { groupingEnabled: true,
		                                            groupingSeparator: ",",
		                                           maxFractionDigits: 2}
									},
								numberUnit : "{dealer>Currency}" 
	        		        }),
	        		        new sap.m.ObjectNumber({
	        		        	number : {
									path : "dealer>Amount",
								    type: "sap.ui.model.type.Float",
								    formatOptions: { groupingEnabled: true,
		                                            groupingSeparator: ",",
		                                           maxFractionDigits: 2}
									},
								numberUnit : "{dealer>Currency}" 
	        		        }),
	        		        new sap.m.Text({
	        		        	text :  {
	        		        		 path : "dealer>DeliveryDate" ,
		                        	 type : "sap.ui.model.type.Date"
	        		        	}
	        		        }),
	        		        new sap.m.Text({
	        		        	text : "{dealer>MaterialNumber}" 
	        		        }),
	        		        new sap.m.Text({
	        		        	text :{        		   
	        		        		path : "dealer>Itemstatuscode",
	        		        		formatter: formatter.Status
	        		        	} 
	        		        }),
	        		        new sap.m.Text({
	        		        	text : "{dealer>CustomerMaterialNumber}" 
	        		        })
	        		        ]
	        	})
	        });
			}
			
			/**
			 * @ControllerHook  
			 * 
			 */
			
			if (this.extHookOnOrderHandleRouteMatched) {
				this.extHookOnOrderHandleRouteMatched(oEvent);
			}
			
		},
		
		/**
		 * On Back button Press
		 * 
		 * 
		 */
		onBackPress: function(){
			window.history.go(-1);
		},
		
		
		/**
		 * To check the Object is Empty or Not
		 * 
		 * @param [object] oEvent : Router argument Object
		 */
		_isObjectEmpty: function(oEvent){
			for(var key in oEvent) {
				 if(key === "order") {
		            return true;
				 }
		    }
		    return false;
		}
	
	});
});