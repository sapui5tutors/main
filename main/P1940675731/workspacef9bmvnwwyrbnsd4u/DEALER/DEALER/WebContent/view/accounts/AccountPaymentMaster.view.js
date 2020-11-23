sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountPaymentMaster", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountPaymentMaster
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountPaymentMaster";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountPaymentMaster
	*/ 
	createContent : function(oController) {
		
		var oMenuInvoice = new sap.m.List("oMenuInvoice",{
			inset:false,
			updateFinished : function(oEvent){  
				oEvent.getSource().getItems()[0].setSelected(true);
			}

		});
         
         var oMenuInvoiceItem = new sap.m.ObjectListItem({
//        	 "oMenuInvoiceItem",
        	   title:"{Invoicenumber}",
	    	   number:"{Amount}",
	    	   numberUnit:"{Currency}",
	    	   intro:"Invoice",
	    	   type:"Active",
//	    	   mode:SingleSelect,
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
		text : "{Status}",
		 state:{
	    	 
	        	path:"Status",
	        	formatter:function(id)
        		{
        			if(id=="Past Due")
        			{
        			return "Error"
        			}
        			else if(id=="Unpaid")
        			{
        			return "Error"
        			}
        			else if(id=="Disputed")
        			{
        			return "Error"
        			}
        		}
	              		} }
				                          ], 
	    		
 			press:oController.onInvoiceMenuClick	
 		});

//         oMenuInvoice.addEventDelegate({
//       	  onBeforeRendering: function() {
////       		  debugger;
//       	    // check if nothing is selected
//       	    if (this.getSelectedItem() === null) {
//       	      var items = this.getItems();
//
//       	      // check if there are items
//       	      if (items && loginResult.results.length > 0) {
////       	    	  sap.ui.getCore().byId("orderList").setSelectedItem(loginResult.results[0],true); 
//       	        this.setSelectedItem(loginResult.results[0], true);
////       	        x = loginResult.results[0].SalesOrder;
////       	        console.log("sales",x);
//       	       
//       	      }
//       	    }
//       	  }
//       	}, oMenuInvoice);

         
         oDataModel.read("/InvoiceListSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//         "+customerId+"
         var invoiceListJson = new sap.ui.model.json.JSONModel();
         invoiceListJson.setData({data:loginResult.results});        
         console.log("invoiceListJson",invoiceListJson);			
         oMenuInvoice.setModel(invoiceListJson);			
         oMenuInvoice.bindAggregation("items","/data",oMenuInvoiceItem);
         
         
     
       
         
  		 return new sap.m.Page({
//			title: "All Customers Invoices",
   			headerContent: new sap.m.Label("customerLabel1",{textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),
   			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField({
//				"searchField",
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
                              
                     		 footer: new sap.m.Toolbar({
             					active: true ,
             					design : sap.m.ToolbarDesign.Solid,
             					content:[
             					         new sap.m.ToolbarSpacer({}),
             					        new sap.m.Button({
               					    	  icon:"sap-icon://sort",
               					    	 press:oController.onSortButtonClick
               					    	   }),   
             					      new sap.m.Button({
             					    	  icon:"sap-icon://filter",
             					    	 press:oController.onFilterButtonClick
             					    	   })
             					      ]
             				}).addStyleClass("footerColor") ,
 
                              
			content: [
                 oMenuInvoice
			]
		});
 			

	}
});

