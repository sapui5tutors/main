sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "vikalp/cus/sd/dealer/plus/model/formatter"
], function (Controller,formatter) {
	"use strict";
	return Controller.extend("vikalp.cus.sd.dealer.plus.controller.ReturnOrderDetails", {
		formatter : formatter,
		
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* 
		*/
		onInit : function() {
			var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
			
			/**
			 * OnInit Hook
			 * 
			 */
			if (this.extHookReturnDetailOnInit) {
				this.extHookReturnDetailOnInit();
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
			var loPath = loObject.rOrder;
			var loBindingPath = "/"+loPath;
			var loView = this.getView();
			var loHeaderPath = "dealer>"+loBindingPath;
			var loHeader = loView.byId("returnObjectHeader");
			loHeader.bindElement(loHeaderPath);
			var loReturnItemTable = this.getView().byId("idReturnItemTable");
			
			loReturnItemTable.bindItems({
	        	path : loHeaderPath+"/ReturnOrdersItems",
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
	        		        new sap.m.Text({
	        		        	text : "{dealer>ReasonOfRejection}"
	        		        })
	        		        
	        		        ]
	        	})
			});
			
			}
			/**
			 * @ControllerHook  
			 * 
			 */
			
			if (this.extHookOnReturnOrderHandleRouteMatched) {
				this.extHookOnReturnOrderHandleRouteMatched(oEvent);
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
				if(key === "rOrder") {
		            return true;
				}
		    }
		    return false;
		}
	});
});