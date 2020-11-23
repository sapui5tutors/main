var cusCount =  0 ; 
sap.ui.controller("com.vikalp.dealermgmt.view.orders.OrdersList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.OrdersList
*/
//	onInit: function(oEvent) {
//	
//	},
	onBeforeRendering: function() {
//		debugger;
		var x = loginResult.results[0].SalesOrder;	
		var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
		 router.navTo("OrdersInfo");
		oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
		var headerListJson = new sap.ui.model.json.JSONModel();
		headerListJson.setData({data1:loginResult.results});
	    sap.ui.getCore().byId("headerList").setModel(headerListJson);
	    oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//	  window.count =  oDataModel.read("/SalesOrderItemDetailsInfoSet$count?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);}); 
//	 debugger;
	    oDataModel.read("/SOContactDetailSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
	    var contactJson = new sap.ui.model.json.JSONModel();
        contactJson.setData({datacon:loginResult.results});
	       sap.ui.getCore().byId("contactList").setModel(contactJson);
	    
	       oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});
	    var itemTableJson = new sap.ui.model.json.JSONModel();
	        itemTableJson.setData({data2:loginResult.results});
		       sap.ui.getCore().byId("itemTable").setModel(itemTableJson);
		       sap.ui.getCore().byId("shippedTable").setModel(itemTableJson);
		       sap.ui.getCore().byId("openTable").setModel(itemTableJson);
		       sap.ui.getCore().byId("inProcessTable").setModel(itemTableJson);
	    
		 var tab = sap.ui.getCore().byId("itemTable");
		  var count = tab.getItems().length;
		  sap.ui.getCore().byId("i1").setCount(count);
		 
			 var listContact = sap.ui.getCore().byId("contactList");
			  var countContact = listContact.getItems().length;
			  sap.ui.getCore().byId("cont2").setCount(countContact);
			  
			  var shipTabCount = sap.ui.getCore().byId("shippedTable");
				var hju = shipTabCount.getItems().length;
				  sap.ui.getCore().byId("i4").setCount(hju);
				  
				  var openTabCount = sap.ui.getCore().byId("openTable");
					var hju1 = openTabCount.getItems().length;
					  sap.ui.getCore().byId("i2").setCount(hju1);
					  
					  var inProcessTabCount = sap.ui.getCore().byId("inProcessTable");
						var hju2 = inProcessTabCount.getItems().length;
						  sap.ui.getCore().byId("i3").setCount(hju2);
						  
						  if(hju == 0){
							  sap.ui.getCore().byId("shippedTable").setVisible(false);
						  }
						  else{
							  sap.ui.getCore().byId("shippedTable").setVisible(true);
						  }
						  if(hju1 == 0){
							  sap.ui.getCore().byId("openTable").setVisible(false);
						  }
						  else{
							  sap.ui.getCore().byId("openTable").setVisible(true);
						  }
						  if(hju2 == 0){
							  sap.ui.getCore().byId("inProcessTable").setVisible(false);
						  }
						  else{
							  sap.ui.getCore().byId("inProcessTable").setVisible(true);
						  }
		  
	
		      },
		    	 
		    
	

	onItemClick: function(oEvent){
		
//	      var app = sap.ui.getCore().byId("appId");
//		  var list = sap.ui.getCore().byId("salesOrderList")
		
		oEvent.getSource().setSelected(true);
		
		  var item = oEvent.oSource.getBindingContext().sPath;
		  var selected = parseInt(item.split('/')[2]);
//		  var selected= list.getSelectedItems();
		  var selectedData = oEvent.oSource.getModel().oData.data[selected];

	      var selectedSalesOrder = selectedData.SalesOrder;
	      var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
			 router.navTo("OrdersInfo");
		  
		  oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter= ImSalesorder eq '"+selectedSalesOrder+"'and ImUsername eq '"+data.userName+"' ",null,null,false,onSuccessLogin,function(oError){
			  console.log("error",oError);});
 
		  var headerListJson = new sap.ui.model.json.JSONModel();
		  headerListJson.setData({data1:loginResult.results});
		  sap.ui.getCore().byId("headerList").setModel(headerListJson);
		  

		    oDataModel.read("/SOContactDetailSet?$filter=ImSalesorder eq '"+selectedSalesOrder+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
		    var contactJson = new sap.ui.model.json.JSONModel();
	        contactJson.setData({datacon:loginResult.results});
		       sap.ui.getCore().byId("contactList").setModel(contactJson);	  
		 
		
		  
		       oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+selectedSalesOrder+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){
					  console.log("error",oError);});
	       var itemTableJson = new sap.ui.model.json.JSONModel();
	       itemTableJson.setData({data2:loginResult.results});
	    
	        sap.ui.getCore().byId("itemTable").setModel(itemTableJson);
	       sap.ui.getCore().byId("shippedTable").setModel(itemTableJson);
	       sap.ui.getCore().byId("openTable").setModel(itemTableJson);
	       sap.ui.getCore().byId("inProcessTable").setModel(itemTableJson);
  	      
//             	debugger;      
			 var tab = sap.ui.getCore().byId("itemTable");
			  var count = tab.getItems().length;
			  sap.ui.getCore().byId("i1").setCount(count);
			  
				 var listContact = sap.ui.getCore().byId("contactList");
			  var countContact = listContact.getItems().length;
			  sap.ui.getCore().byId("cont2").setCount(countContact);
			  
			var shipTabCount = sap.ui.getCore().byId("shippedTable");
			var hju = shipTabCount.getItems().length;
			  sap.ui.getCore().byId("i4").setCount(hju);
			  
			  var openTabCount = sap.ui.getCore().byId("openTable");
				var hju1 = openTabCount.getItems().length;
				  sap.ui.getCore().byId("i2").setCount(hju1);
				  
				  var inProcessTabCount = sap.ui.getCore().byId("inProcessTable");
					var hju2 = inProcessTabCount.getItems().length;
					  sap.ui.getCore().byId("i3").setCount(hju2);
					  
					  if(hju == 0){
						  sap.ui.getCore().byId("shippedTable").setVisible(false);
					  }
					  else{
						  sap.ui.getCore().byId("shippedTable").setVisible(true);
					  }
					  
					  if(hju1 == 0){
						  sap.ui.getCore().byId("openTable").setVisible(false);
					  }
					  else{
						  sap.ui.getCore().byId("openTable").setVisible(true);
					  }
					  if(hju2 == 0){
						  sap.ui.getCore().byId("inProcessTable").setVisible(false);
					  }
					  else{
						  sap.ui.getCore().byId("inProcessTable").setVisible(true);
					  }
			  
			  
			  

//			  var   app = sap.ui.getCore().byId("appId");  
//              app.to("orderInfo");
			},
		
		onSearch: function(oEvent) {
			
			jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//	        var tpmla = oEvent.getParameter("Product Name");
			var searchString = oEvent.getParameters("query").query;
			var filters = new Array();
	        var oFilter = [new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("OrderValue", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("PurchOrd", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString),
	                       new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, searchString)

	        
	                       ];
	        filters.push(oFilter);
	        
	        var oBind = sap.ui.getCore().byId("salesOrderList").getBinding("items");
	        oBind.filter(new sap.ui.model.Filter(oFilter, false));//false for (or) and true for (and) 
		},
			onLiveSearch: function(oEvent) {
				
				jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//		        var tpmla = oEvent.getParameter("Product Name");
				var searchString = oEvent.getParameters("query").newValue;
				var filters = new Array();
		        var oFilter = [new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("OrderValue", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("PurchOrd", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString),
		                       new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, searchString)

		        
		                       ];
		        filters.push(oFilter);
		        
		        var oBind = sap.ui.getCore().byId("salesOrderList").getBinding("items");
		        oBind.filter(new sap.ui.model.Filter(oFilter, false));//false for (or) and true for (and) 
			},
//			noDataText:"No Dealer found",
//			rememberSelections:true,
//		liveChange: this.onSearchFunction,
			
			
			
			onToolbarClicks : function()
			{
				debugger;
				
				var customerDialog = new sap.m.SelectDialog({
					title:"Select Dealer",
					
				     	confirm: function(oEvent){
				     		debugger;
				     		var aContexts = oEvent.getParameter("selectedContexts");
    						console.log("aContexts",aContexts);
    					    
    						customerName = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerName; });
    						console.log("customerName",customerName);
    					    customerId = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerId; });
    						console.log("customerId",customerId);
    						SalesOrg1 = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().SalesOrg; });
    						disChannel = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().DistChannel; });
    						divison = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().Division01; });
    						sap.ui.getCore().byId("customerTitle").setText(customerName +" " + "Sales Orders");
                        if(cusCount == 0){					
//						var aContexts = oEvent.getParameter("selectedContexts");
//						console.log("aContexts",aContexts);
//						var customerName = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerName; });
//						console.log("customerName",customerName);
//					    var	 customerId = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerId; });
//						console.log("customerId",customerId);
//						sap.ui.getCore().byId("customerTitle").setText(customerName +" " + "Sales Orders");
//                           
						oDataModel.read("/SalesOrderListCustomerInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
						
					    var cusorderListJson = new sap.ui.model.json.JSONModel();
					         cusorderListJson.setData({data:loginResult.results});
			 		         
					         console.log("orderListJson",cusorderListJson);
								
					       sap.ui.getCore().byId("salesOrderList").setModel(cusorderListJson);
					       
					       var x = loginResult.results[0].SalesOrder;
							oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
							var headerListJson = new sap.ui.model.json.JSONModel();
							headerListJson.setData({data1:loginResult.results});
						    sap.ui.getCore().byId("headerList").setModel(headerListJson);
						    
						    oDataModel.read("/SOContactDetailSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
						    var contactJson = new sap.ui.model.json.JSONModel();
					        contactJson.setData({datacon:loginResult.results});
						       sap.ui.getCore().byId("contactList").setModel(contactJson);
						    
						    
						    
						    
						    oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//						  window.count =  oDataModel.read("/SalesOrderItemDetailsInfoSet$count?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);}); 
						    var itemTableJson = new sap.ui.model.json.JSONModel();
						        itemTableJson.setData({data2:loginResult.results});
							       sap.ui.getCore().byId("itemTable").setModel(itemTableJson);
							       sap.ui.getCore().byId("shippedTable").setModel(itemTableJson);
							       sap.ui.getCore().byId("openTable").setModel(itemTableJson);
							       sap.ui.getCore().byId("inProcessTable").setModel(itemTableJson);
						    
							 var tab = sap.ui.getCore().byId("itemTable");
							  var count = tab.getItems().length;
							  sap.ui.getCore().byId("i1").setCount(count);
							  
							  var shipTabCount = sap.ui.getCore().byId("shippedTable");
								var hju = shipTabCount.getItems().length;
								  sap.ui.getCore().byId("i4").setCount(hju);
								  
								  var openTabCount = sap.ui.getCore().byId("openTable");
									var hju1 = openTabCount.getItems().length;
									  sap.ui.getCore().byId("i2").setCount(hju1);
									  
									  var inProcessTabCount = sap.ui.getCore().byId("inProcessTable");
										var hju2 = inProcessTabCount.getItems().length;
										  sap.ui.getCore().byId("i3").setCount(hju2);
										  
										  if(hju == 0){
											  sap.ui.getCore().byId("shippedTable").setVisible(false);
										  }
										  if(hju1 == 0){
											  sap.ui.getCore().byId("openTable").setVisible(false);
										  }
										  if(hju2 == 0){
											  sap.ui.getCore().byId("inProcessTable").setVisible(false);
										  }
							
							      sap.ui.getCore().byId("btn_add").setEnabled(true);
//							      sap.ui.getCore().byId("btn_chk").setEnabled(true);
							  	  cusCount ++ ;
                        }
                        else{
                        	var confirmDialog = new sap.m.Dialog({
                        		title: "Confirmation",
                        		width: "50%",
                        		content: [ new sap.m.Text({
                        			text : "Navigating out of this view will clear the cart. Do you want to continue?"
                        		}),
                        		new sap.m.Text({
                        			text : ""
                        		}),
                        		],
                        		
                        		endButton : new sap.m.Button({
                        			text :"Cancel",
                        			press: function(){
                        				confirmDialog.close();
                        			}
                        		}),
                        		beginButton : new sap.m.Button({
                        			text :"Yes",
                        			press: function(){
                        				
                        				debugger;
                        				confirmDialog.destroy();
                        				var prev = sap.ui.core.routing.History.getInstance();
                        		if(prev.aHistory.includes("soCreateCart"))
                        			{sap.ui.getCore().byId("cartTable").setModel();
                        			sap.ui.getCore().byId("cartTable").setHeaderText("Items (0)");
                    				sap.ui.getCore().byId("cnt1").setText("0");
                        				if(prev.aHistory.includes("quickCheckout"))
                        					{sap.ui.getCore().byId("checkoutTable").setModel();
                        					if(prev.aHistory.includes("OrderShippingDetail"))
                        						{sap.ui.getCore().byId("shippingForm").setModel();
                        						if(prev.aHistory.includes("OrderReviewDetail"))
                        							{sap.ui.getCore().byId("reviewForm").setModel();
                        							 sap.ui.getCore().byId("reviewTable").setModel();
                        								}}}}
//                        			confirmDialog.close();
                        				 
                        				
//                        			b.getModel().refresh(true);
                        		
//                        				sap.ui.getCore().byId("cartTable").setHeaderText("Items (0)");
//                        				sap.ui.getCore().byId("cnt1").setText("0");
                        				
                        				
                        				
                                           
                						oDataModel.read("/SalesOrderListCustomerInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
                						
                					    var cusorderListJson = new sap.ui.model.json.JSONModel();
                					         cusorderListJson.setData({data:loginResult.results});
                			 		         
                					         console.log("orderListJson",cusorderListJson);
                								
                					       sap.ui.getCore().byId("salesOrderList").setModel(cusorderListJson);
                					       
                					       var x = loginResult.results[0].SalesOrder;
                							oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
                							var headerListJson = new sap.ui.model.json.JSONModel();
                							headerListJson.setData({data1:loginResult.results});
                						    sap.ui.getCore().byId("headerList").setModel(headerListJson);
                						    
                						    oDataModel.read("/SOContactDetailSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
                						    var contactJson = new sap.ui.model.json.JSONModel();
                					        contactJson.setData({datacon:loginResult.results});
                						       sap.ui.getCore().byId("contactList").setModel(contactJson);
                						    
                						    
                						    
                						    
                						    oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//                						  window.count =  oDataModel.read("/SalesOrderItemDetailsInfoSet$count?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);}); 
                						    var itemTableJson = new sap.ui.model.json.JSONModel();
                						        itemTableJson.setData({data2:loginResult.results});
                							       sap.ui.getCore().byId("itemTable").setModel(itemTableJson);
                							       sap.ui.getCore().byId("shippedTable").setModel(itemTableJson);
                							       sap.ui.getCore().byId("openTable").setModel(itemTableJson);
                							       sap.ui.getCore().byId("inProcessTable").setModel(itemTableJson);
                						    
                							 var tab = sap.ui.getCore().byId("itemTable");
                							  var count = tab.getItems().length;
                							  sap.ui.getCore().byId("i1").setCount(count);
                							  
                							  var shipTabCount = sap.ui.getCore().byId("shippedTable");
                								var hju = shipTabCount.getItems().length;
                								  sap.ui.getCore().byId("i4").setCount(hju);
                								  
                								  var openTabCount = sap.ui.getCore().byId("openTable");
                									var hju1 = openTabCount.getItems().length;
                									  sap.ui.getCore().byId("i2").setCount(hju1);
                									  
                									  var inProcessTabCount = sap.ui.getCore().byId("inProcessTable");
                										var hju2 = inProcessTabCount.getItems().length;
                										  sap.ui.getCore().byId("i3").setCount(hju2);
                										  
                										  if(hju == 0){
                											  sap.ui.getCore().byId("shippedTable").setVisible(false);
                										  }
                										  if(hju1 == 0){
                											  sap.ui.getCore().byId("openTable").setVisible(false);
                										  }
                										  if(hju2 == 0){
                											  sap.ui.getCore().byId("inProcessTable").setVisible(false);
                										  }
                							
                							      sap.ui.getCore().byId("btn_add").setEnabled(true);
//                							      sap.ui.getCore().byId("btn_chk").setEnabled(true);
                							      cartCnt = 0;
                        				cusCount ++;
                        				
                        				
                        				
                        			}
                        		}),
                        	});
                        	confirmDialog.open();
                        }
                        },
                        
//                      
							
					
					search: function(oEvent){
				
						jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").value);
						var searchString = oEvent.getParameters("query").value;
						var filters = new Array();
				        var oFilter = [new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, 
				        		searchString),
				                       new sap.ui.model.Filter("CustomerId", sap.ui.model.FilterOperator.Contains, 
				                    		   searchString),
				                       new sap.ui.model.Filter("SalesOrganization", sap.ui.model.FilterOperator.Contains,
				                    		   searchString),
				                       new sap.ui.model.Filter("DistributionChannel", sap.ui.model.FilterOperator.Contains,
				                    		   searchString),
				                       new sap.ui.model.Filter("Divison", sap.ui.model.FilterOperator.Contains, searchString)
				        				];
				        filters.push(oFilter);
				        var oBind = this.customerDialog.getBinding("items");
				        oBind.filter(new sap.ui.model.Filter(oFilter, false));
			   },
			   
					liveChange: function(oEvent){
					
						jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").value);
						var searchString = oEvent.getParameters("query").value;
						var filters = new Array();
				        var oFilter = [new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, 
				        		searchString),
				                       new sap.ui.model.Filter("CustomerId", sap.ui.model.FilterOperator.Contains, 
				                    		   searchString),
				                       new sap.ui.model.Filter("SalesOrganization", sap.ui.model.FilterOperator.Contains,
				                    		   searchString),
				                       new sap.ui.model.Filter("DistributionChannel", sap.ui.model.FilterOperator.Contains,
				                    		   searchString),
				                       new sap.ui.model.Filter("Divison", sap.ui.model.FilterOperator.Contains, searchString)
				        				];
				        filters.push(oFilter);
				        var oBind = sap.ui.getCore().byId("der").getBinding("items");
				        oBind.filter(new sap.ui.model.Filter(oFilter, false));
				        
			   },
//			   cancel : function()
//			   {
//				   this.customerDialog.close();
//			   }
//				
			   
						
						
					
						
					});
			
				var customerList = new sap.m.ObjectListItem({
					title : "{CustomerName}({CustomerId})",
					 attributes: [
					             {
					            	text: "Sales Area",
					             },
			    		            {
			    			text:"{SalesOrganization}, {DistributionChannel}, {Divison}"
			    		            }
			    		],
			        type:"Active"
			        	
				});
				oDataModel.read("/AccountListInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				var customerJson = new sap.ui.model.json.JSONModel();
				customerJson.setData({data10:loginResult.results});
				customerDialog.setModel(customerJson);
				customerDialog.bindAggregation("items","/data10",customerList);
				customerDialog.open();
			 
				},

			

				
//				onCustomerSelection:function(oEvent){		
//					
//					var aContexts = oEvent.getParameter("selectedContexts");
//					console.log("aContexts",aContexts);
//					var customerName = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerName; });
//					console.log("customerName",customerName);
//					 customerId = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerId; });
//					console.log("customerId",customerId);
//					sap.ui.getCore().byId("customerButton").setText(customerName +" " + "Overview");
////
////
////					
//				    //default profile view on selecting the customer
//					//first list in account profile
//					oDataModel.read("/CustomerDetailsInfoSet?$filter=ImUsername eq '"+data.userName+"'and CustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
//					var profileHeaderListJson = new sap.ui.model.json.JSONModel();
//					profileHeaderListJson.setData({data:loginResult.results});
//					sap.ui.getCore().byId("headerProfilelist").setModel(profileHeaderListJson);	
//					//second list in account profile	  
//					oDataModel.read("/AccountOverviewInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
//					var contactListJson = new sap.ui.model.json.JSONModel();
//					contactListJson.setData({data:loginResult.results});
//					sap.ui.getCore().byId("contactlists").setModel(contactListJson);	
//					
//					//default contact count		  
//					var contactcount = sap.ui.getCore().byId("contactlists");
//					var count1 = contactcount.getItems().length;
//					sap.ui.getCore().byId("c1").setCount(count1);
//					//default credit info tab click
//			        oDataModel.read("/CustomerCreditListInfoSet?$filter=ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//			        var creditJson = new sap.ui.model.json.JSONModel();
//			        creditJson.setData({data4:loginResult.results});
//			        sap.ui.getCore().byId("creditlist").setModel(creditJson);
//			        //default credit count		  
//					var creditcount = sap.ui.getCore().byId("creditlist");
//					var count2 = creditcount.getItems().length;
//					sap.ui.getCore().byId("c2").setCount(count2);
//				 
//					var oApp = sap.ui.getCore().byId("SplitApp");
//					oApp.toDetail('accountProfileDetail','slide');
//					
//					
//				},
				
				
				
				
				
			
		 /**}
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.OrdersList
*/
//	onAfterRendering: function() {
//		function  onSearchFunction(){
//			
//			alert("hi");
//		}
//	}
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.OrdersList
*/
//	onExit: function() {
//
//	}

});