sap.ui.jsview("com.vikalp.dealermgmt.view.payments.PaymentsMenu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.payments.PaymentsMenu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
createContent : function(oController) {
		
	
//	debugger;
//	var oNavCheck = new sap.m.SegmentedButton("Test",{
//		buttons: [
//          new sap.m.Button("Off", {text: "Invoices"}), 
//          new sap.m.Button("On", {text: "Payments"}),
//          
//        ],
//        select:function(oEvent){
//			debugger;
//			 test = sap.ui.getCore().byId("Test");
//            var z = test.getSelectedButton();
//            
//            
//            
//			if(z == "Off")
//				{
//				
////				alert("Invoices Data");
////				oController.onInvoiceButtonClick 
//				
//				
//				   debugger;
//				//   oEvent.getSource().setSelected(true);
//					  oDataModel.read("/InvoiceListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//						//   "+customerId+"
//						   var invoiceListJson = new sap.ui.model.json.JSONModel();
//						   invoiceListJson.setData({data:loginResult.results});        
//						   console.log("invoiceListJson",invoiceListJson);			
//						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson);			   		   
//						   sap.ui.getCore().byId("customerLabel2").setText(header);
//				   
//				   
//							oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
//							var headerlistJson = new sap.ui.model.json.JSONModel();
//						    headerlistJson.setData({data1:loginResult.results});
//						    sap.ui.getCore().byId("headerList").setModel(headerlistJson);
//						    
//						    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//						    var ItemJson = new sap.ui.model.json.JSONModel();
//						    ItemJson.setData({data2:loginResult.results});
//						    sap.ui.getCore().byId("itemTable").setModel(ItemJson);
//						    
//						    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
//								  console.log("error",oError);});
//
//							  var overViewListJson = new sap.ui.model.json.JSONModel();
//							  overViewListJson.setData({data3:loginResult.results});
//							  sap.ui.getCore().byId("overViewList").setModel(overViewListJson);
//							  
//							  
//							    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
//									  console.log("error",oError);});
//
//								  var overViewListJson = new sap.ui.model.json.JSONModel();
//								  overViewListJson.setData({data4:loginResult.results});
//								  sap.ui.getCore().byId("informationList").setModel(overViewListJson);	  
//							  
//						    
//						    var tab1 = sap.ui.getCore().byId("itemTable");
//							  var count = tab1.getItems().length;
////							  sap.ui.getCore().byId("iT").setCount(count);
//							  sap.ui.getCore().byId("con2").setHeaderText("Items("+count+")");
//				
//				
//				
//				
//				}
//			if(z == "On")
//				{
//				debugger;
//				var app = sap.ui.getCore().byId("PaymentTab");
//				app.toMaster('paymentsMenu1');
//				app.toDetail('paymentsInfo1');
//			
//				}
//		}
//	
//	
//	 });	
	
	
	
	    var button1 = new sap.m.Button({
	    	text:"Invoices",
	    	type:"Emphasized",
	    	width:"155px",
//	    	styled: false,
	    	
//	    	enabled:true,
//	    	updateFinished : function(oEvent){  
//				oEvent.getSource().getItems()[0].setSelected(true);
//	    	},
	    	press:oController.onInvoiceButtonClick        
	    });
	    var button2 = new sap.m.Button({
	    	text:"Payments",
	    	width:"155px",
//	    	type:"Accept",
//	    	enabled:true,
	    	press:oController.onPaymentButtonClick 
	    });
	    
	    var hBox = new sap.m.HBox({
	     	   items:[button1,button2]
	    
			})
	    
	    var oMenuInvoice1 = new sap.m.List("oMenuInvoice1",{
			inset:false,
			updateFinished : function(oEvent){  
				oEvent.getSource().getItems()[0].setSelected(true);
			}

		});
	    
	    var oMenuInvoiceItem = new sap.m.ObjectListItem({
//       	 "oMenuInvoiceItem",
       	   title:"{Invoicenumber}",
	    	   number:"{Amount}",
	    	   numberUnit:"{Currency}",
	    	   intro:"Invoice",
	    	   type:"Active",
	    	   attributes: [
//	    		            {
//	    			text:"{Name2}"
//	    		            },
	    		            {
	    		    			text:"PO {Po}"
	    		    		            },
	    		    		{
	    		  	            text:"SO {Salesorder}"
                                       },
	    		    		            
	    		            {
	    		            	 text: {
	    		            		 
	    		                      path: "Duedate",
	    		                      formatter: function(id){
//	    		              			debugger;
	    		                    	if(id != null){
	    		            			date_value = id.getDate();
	    		                        mon_value = id.getMonth();
	    		                        year_value  = id.getFullYear();
	    		                        
	    		                        switch  (mon_value){
	    		                        case  0:
	    		                         {
	    		          	             mon_value = "01";
	    		          	              break;
	    		                         }
	    		                        case  1:
	    		                         {
	    		          	             mon_value = "02";
	    		          	             break;
	    		                          }
	    		                        case  2:
	    		                         {
	    		          	             mon_value = "03";
	    		          	             break;
	    		                         }
	    		                        case  3:
	    		                         {
	    		          	             mon_value = "04";
	    		          	             break;
	    		                         }
	    		                        case  4:
	    		                         {
	    		          	             mon_value = "05";
	    		          	             break;
	    		                         }
	    		                        case  5:
	    		                         {
	    		          	             mon_value = "06";
	    		          	             break;
	    		                         }
	    		                        case  6:
	    		                         {
	    		          	             mon_value = "07";
	    		          	             break;
	    		                         }
	    		                        case  7:
	    		                         {
	    		          	             mon_value = "08";
	    		          	             break;
	    		                         }
	    		                        case  8:
	    		                         {
	    		          	             mon_value = "09";
	    		          	            break;
	    		                        }
	    		                        case  9:
	    		                         {
	    		          	             mon_value = "10";
	    		          	             break;
	    		                         }
	    		                        case  10:
	    		                     	{ 
	    		          	             mon_value = "11";
	    		          	             break;
	    		                         }
	    		                        case  11:
	    		                         {
	    		          	             mon_value = "12";
	    		          	             break;
	    		                         }
	    		                }
	    		                        
	    		                var date ="Due on " + date_value + "." + mon_value +"."+ year_value; 
	    		                return date;
	    		               }
	    		                      
	    		            		         
	    		                 }
	    		            	 }
	    		            }
	    		], 
	    		
	    		
	    		firstStatus:[
	                           {
		text : "{PaymentStatus}",
		 state:{
	    	 
	        	path:"PaymentStatus",
	        	formatter: function(id){
	             
	              			if(id == "Past Due")
	              			{
	              			return "Warning"
	              			}
//	              		if(id  == "Not Shipped")
//	              			{
//	              			return "Error"
//	              			}
//	              		if(id =="In Process")
//	              			{
//	              			return "Warning"
//	              			}
	              		}
	              		} }
				                          ],
	    		
	    		 secondStatus:[
	                           {
		text : "{DocStatus}",
		 state:{
	    	 
	        	path:"DocStatus",
	        	formatter: function(id){
	             
	              			if(id == "Shipped")
	              			{
	              			return "Success"
	              			}
	              		if(id  == "Not Shipped")
	              			{
	              			return "Error"
	              			}
	              		if(id =="In Process")
	              			{
	              			return "Warning"
	              			}
	              		}
	              		} }
				                          ], 
	    		
			press:oController.onInvoiceMenuClick	
		});   	    
//        oMenuInvoice.addEventDelegate({
//         	  onBeforeRendering: function() {
////         		  debugger;
//         	    // check if nothing is selected
//         	    if (this.getSelectedItem() === null) {
//         	      var items = this.getItems();
//
//         	      // check if there are items
//         	      if (items && loginResult.results.length > 0) {
////         	    	  sap.ui.getCore().byId("orderList").setSelectedItem(loginResult.results[0],true); 
//         	        this.setSelectedItem(loginResult.results[0], true);
////         	        x = loginResult.results[0].SalesOrder;
////         	        console.log("sales",x);
//         	       
//         	      }
//         	    }
//         	  }
//         	}, oMenuInvoice); 	    	    
	    
	    
	    oMenuInvoice1.bindAggregation("items","/data",oMenuInvoiceItem);


  		 return new sap.m.Page({
//			title: "All Customers Invoices",
   			headerContent: new sap.m.Label("customerLabel2",{textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),
   			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField({
//				 "searchField1", 
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
//			showNavButton: true,			
//			 navButtonPress:function(evt){ 
////				 var oApp = sap.ui.getCore().byId("SplitApp");
////					
////					oApp.backToPage("accountMenu");
//				 this.nav.back("accountMaster1");
//	                 
//             },
			content: [
                 hBox,oMenuInvoice1
//                 oNavCheck,
			]
		});
 			

	}

});