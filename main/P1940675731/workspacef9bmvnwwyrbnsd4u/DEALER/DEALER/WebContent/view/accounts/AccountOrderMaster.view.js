sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountOrderMaster", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountOrderMaster
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountOrderMaster";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountOrderMaster
	*/ 
	createContent : function(oController) {
		
		var oMenuOrders = new sap.m.List("orderLists",{
//			headerToolbar:new sap.m.Toolbar("MenuOdersToolbar",{
//				
//				content:[
//				         new sap.m.SearchField("SearchField",{
//				        	 placeholder: "Search",
//				                showRefreshButton: true,
//				         })
//				         
//				         ]
//				         new sap.m.Button({ icon:"sap-icon://customer", iconFirst:false}).addStyleClass("dealerButton")]
//			}),
			inset:false,
			           
//		            updateFinished : function(oEvent){ 
//		            	debugger;
//		            var oMenuOrders = oEvent.getSource();  
//		            oMenuOrders.getItems()[0].setSelected(true);   
//		            }  
			
			
//			select: function(){
//				oController.ItemSelected();
//			}
			
			updateFinished : function(oEvent){   
			
//		          var firstItem = sap.ui.getCore().byId("orderList").getItems()[0];
//		          console.log("firstItem",firstItem);
//		          sap.ui.getCore().byId("orderList").setSelectedItem(firstItem,true);  
//		          
		          oEvent.getSource().getItems()[0].setSelected(true);
				
				
//		          oMenuOrders.getItems()[0].setSelected(true);
//		            
		          } 
		});
         
         
         var oMenuOrdersItem = new sap.m.ObjectListItem("orderListtemplate",{
 			
        	 title:"SO {SalesOrder}",
	    	   number:"{OrderValue}",
	    	   numberUnit:"{Currency}",
	    	   selected:true,
//	    	   intro:"{DocStatus}",
	    	   type:"Active",
	    	   attributes: [
	    		            {
	    			text:"{SalesOrg}"
	    		            },
	    		            {
	    		   	text:"PO {PurchOrd}"
	    		            },
	    		            {
			             		text:{
			             			path:"OrderDate",
			             			formatter: com.vikalp.dealermgmt.util.Formatter.OrderDate
			             		}
			             	},
	    		],
	    		firstStatus:[{
	            	text:"{DocStatus}",
	            state:{
	            	path:"DocStatus",
	            		formatter:function(id)
	            		{
	            			if(id=="Shipped")
	            			{
	            			return "Success"
	            			}
	            		if(id=="Not Shipped")
	            			{
	            			return "Error"
	            			}
	            		if(id=="In Process")
	            			{
	            			return "Warning"
	            			}
	            		}
	            }
	            }],
	    		selectionChange: function(oEvent) {
	    		    console.debug(oEvent);
	    		  },
	    	
 			press:oController.onOrderMenuClick	
 		});
         debugger;
//         oMenuOrders.addEventDelegate({
//        	  onBeforeRendering: function() {
////        		  debugger;
//        	    // check if nothing is selected
//        	    if (this.getSelectedItem() === null) {
//        	      var items = this.getItems();
//
//        	      // check if there are items
//        	      if (items && loginResult.results.length > 0) {
////        	    	  sap.ui.getCore().byId("orderList").setSelectedItem(loginResult.results[0],true); 
//        	        this.setSelectedItem(loginResult.results[0], true);
////        	        x = loginResult.results[0].SalesOrder;
////        	        console.log("sales",x);
//        	       
//        	      }
//        	    }
//        	  }
//        	}, oMenuOrders);

//         oMenuOrders.placeAt("content");
//     	oDataModel.read("/ItSOrderSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
         oDataModel.read("/SalesOrderListCustomerInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
         var orderListJson = new sap.ui.model.json.JSONModel();
         orderListJson.setData({data:loginResult.results});
         
         console.log("orderListJson",orderListJson);
			
         oMenuOrders.setModel(orderListJson);
 			
         oMenuOrders.bindAggregation("items","/data",oMenuOrdersItem);
         if(loginResult.results.length == 0)
    	 {
    	 jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show("No Orders for this Customer");
			sap.ui.core.BusyIndicator.hide();
			var tempp = sap.ui.getCore().byId("orderLists").destroy();
			var temp0 = sap.ui.getCore().byId("orderListtemplate").destroy();
    	 }
         var Sales = loginResult.results[0].SalesOrder
         
         
         
         
  		return new sap.m.Page({
//			title: "Orders",
  			
  			headerContent: new sap.m.Label("customerLabel",{design: sap.m.LabelDesign.Bold,textAlign: sap.ui.core.TextAlign.Center,  width:'100%'}),
  			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField( "searchField1", {
				placeholder: "Search",
				showMagnifier: false,
//				showRefreshButton: true,
				search: oController.onSearch,
				liveChange: oController.onLiveChange,
				width: "100%",
				tooltip: "Search for objects..",
//				refreshButtonTooltip: "Refresh"
			})
		]
                              }),   
  			content: [
oMenuOrders
			]
		});
 			
// 		oMenuOrdersItem.open();


//         var  oFilters = null;

//         oMenuOrders.bindItems( "/results",template, null);
// 		return oMenuOrders;
	}

});