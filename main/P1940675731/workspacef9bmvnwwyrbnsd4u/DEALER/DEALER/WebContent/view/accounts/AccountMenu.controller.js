var customerName;
var acccusCount = 0;
sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountMenu", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountMenu
*/
	onInit: function() {
//		var oBusyDialog=new sap.m.BusyIndicator("oBusyDialog",{
////            customIcon : "util/image/flower.gif",  
////            customIconWidth : "120px",  
////            customIconHeight : "120px" , 
////            customIconRotationSpeed : 0,
////            customIconDensityAware: false,
////            busyIndicatorDelay: 0,
////            customIconDensityAware : false,
////        	size: "1000",
////        	text:"Screen Loading...Hang on!!",
////        	title:"Loading Data",
////        	busy:true,
////        	customIcon:"sap-icon://visits",
//        }).addStyleClass("sapUiBusy");

		
		var customerListDialog = new sap.m.SelectDialog("dealerListDialog",{
			title:"Select Dealer",
			noDataText:"No Dealer found",
			rememberSelections:true,
			confirm:this.onCustomerSelect,
			search:this.onSearch,
			liveChange:this.onSearch,
			
				});

		
		var customerList = new sap.m.ObjectListItem("dealerList",{
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
		debugger;
		oDataModel.read("/AccountListInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		var customerListJson = new sap.ui.model.json.JSONModel();
		customerListJson.setData({data:loginResult.results});
		console.log("customerListJson",customerListJson);
		customerListDialog.setModel(customerListJson);
		customerListDialog.bindAggregation("items","/data",customerList);
//		customerListDialog.open();
		setTimeout( function(){
			sap.ui.getCore().getElementById("dealerListDialog").open();
		},
		150);
		},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountMenu
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountMenu
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountMenu
*/
//	onExit: function() {
//
//	},
	
	onSearch: function(oEvent) {
		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").value);
		var searchString = oEvent.getParameters("query").value;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("CustomerName", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("CustomerId", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("SalesOrganization", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("DistributionChannel", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Divison", sap.ui.model.FilterOperator.Contains, searchString)
        				];
        filters.push(oFilter);
        var oBind = sap.ui.getCore().byId("dealerListDialog").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
		},
	
	
		onCustomerSelect:function(oEvent){		
			debugger;
			var aContexts = oEvent.getParameter("selectedContexts");
			console.log("aContexts",aContexts);
			 customerName = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerName; });
			console.log("customerName",customerName);
			 customerId = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().CustomerId; });
			console.log("customerId",customerId);
			SalesOrg = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().SalesOrg; });
			accdisChannel = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().DistChannel; });
			accdivison = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().Division01; });
			sap.ui.getCore().byId("customerButton").setText(customerName +" " + "Overview");
			sap.ui.getCore().byId("menulist").getItems()[0].setSelected(true);
			
//			var context = oEvent.getParameter("dealerList").getBindingContext();
//			var odata = context.getPath();
//			this.oHasher  = sap.ui.core.routing.HashChanger.getInstance();
//			this.oHasher.setHash(context);
//			var sViewId = this.oHasher.getHash().split("/")[2];
//			var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//			router.navTo("DealerMenu",{customer:customerName});
			
			var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
			router.navTo("AccountProfile");
//			,{customer:customerName[0]}
			
	    //default profile view on selecting the customer
		//first list in account profile
		oDataModel.read("/CustomerDetailsInfoSet?$filter=ImUsername eq '"+data.userName+"'and CustomerId eq '"+customerId+"' and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
		var profileHeaderListJson = new sap.ui.model.json.JSONModel();
		profileHeaderListJson.setData({data:loginResult.results});
		sap.ui.getCore().byId("headerProfilelist").setModel(profileHeaderListJson);	
		//default contact list in account profile	  
		oDataModel.read("/AccountOverviewInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerid eq '"+customerId+"' and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
		var contactListJson = new sap.ui.model.json.JSONModel();
		contactListJson.setData({data:loginResult.results});
		sap.ui.getCore().byId("contactlists").setModel(contactListJson);	
		
		//default contact count		  
		var contactcount = sap.ui.getCore().byId("contactlists");
		var count1 = contactcount.getItems().length;
		sap.ui.getCore().byId("c1").setCount(count1);
		//default credit info tab click
        oDataModel.read("/ItCustomerCreditSet?$filter=ImCustomerid eq '"+customerId[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
        var creditJson = new sap.ui.model.json.JSONModel();
        creditJson.setData({data4:loginResult.results});
        sap.ui.getCore().byId("creditlist").setModel(creditJson);
        //default credit count		  
		var creditcount = sap.ui.getCore().byId("creditlist");
		var count2 = creditcount.getItems().length;
		sap.ui.getCore().byId("c2").setCount(count2);
		
		//default sales summary
		oDataModel.read("/ItCustomerCreditSet?$filter=ImCustomerid eq '"+customerId[0]+"'", null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		var salesListJson = new sap.ui.model.json.JSONModel();
		salesListJson.setData({data5:loginResult.results});
		sap.ui.getCore().byId("saleslist").setModel(salesListJson);
		
		//default count sales summary
		var salescount = sap.ui.getCore().byId("saleslist");
		var count3 = salescount.getItems().length;
		sap.ui.getCore().byId("salesTab").setCount(count3);
	 
		var oApp = sap.ui.getCore().byId("SplitApp");
		oApp.toDetail('accountProfileDetail','slide');
		
//		var masterPage = sap.ui.view({viewName:"com.vikalp.dealermgmt.view.accounts.AccountMenu", type:sap.ui.core.mvc.ViewType.JS});
//		oApp.addMasterPage(masterPage);
//		oApp.toMaster('accountMenu','slide')
		
	},
	
	onAccountMenuClick:function(oEvent){
//		oEvent.getSource().getItems()[0].setSelected(true);
		oEvent.getSource().setSelected(true);
		
		var item = oEvent.oSource.getBindingContext().sPath;
		var sel = item.split('/')[2];
		if(sel==0)
			{
			 var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
				router.navTo("AccountProfile");
//				,{customer:customerName[0]}
				
				oDataModel.read("/CustomerDetailsInfoSet?$filter=ImUsername eq '"+data.userName+"'and CustomerId eq '"+customerId+"' and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var profileHeaderListJson = new sap.ui.model.json.JSONModel();
				profileHeaderListJson.setData({data:loginResult.results});
				sap.ui.getCore().byId("headerProfilelist").setModel(profileHeaderListJson);	
				//on click contact tab	  
				oDataModel.read("/AccountOverviewInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerid eq '"+customerId+"'and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var contactListJson = new sap.ui.model.json.JSONModel();
				contactListJson.setData({data:loginResult.results});
				sap.ui.getCore().byId("contactlists").setModel(contactListJson);	
						  
				var contactcount = sap.ui.getCore().byId("contactlists");
				var count1 = contactcount.getItems().length;
				sap.ui.getCore().byId("c1").setCount(count1);
				
		         //on click Credit tab
		         oDataModel.read("/ItCustomerCreditSet?$filter=ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		         var creditJson = new sap.ui.model.json.JSONModel();
		         creditJson.setData({data4:loginResult.results});
		         sap.ui.getCore().byId("creditlist").setModel(creditJson);
		         
		         //default credit count		  
		 		var creditcount = sap.ui.getCore().byId("creditlist");
		 		var count2 = creditcount.getItems().length;
		 		sap.ui.getCore().byId("c2").setCount(count2);
		 		
		 		//on click sales summary
		 		debugger;
		 		oDataModel.read("/ItCustomerCreditSet?$filter=ImCustomerid eq '"+customerId+"'", null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				var salesListJson = new sap.ui.model.json.JSONModel();
				salesListJson.setData({data5:loginResult.results});
				sap.ui.getCore().byId("saleslist").setModel(salesListJson);
			 
//				var oApp = sap.ui.getCore().byId("SplitApp");
//				oApp.toDetail('accountProfileDetail','slide');
				}
		
		else breakme:if(sel==1)
		 	{ 
			 debugger;
//			 var AccountOrderMaster = new sap.ui.view({ viewName:"com.vikalp.dealermgmt.view.accounts.AccountOrder",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
//			 //id:"accountOM",
//			 appCon.addPage(AccountOrderMaster);
//			 appCon.to(AccountOrderMaster);
			 sap.ui.core.BusyIndicator.show(0);
//			 sap.ui.core.BusyIndicator.attachOpen();
//			 sap.ui.getCore().getElementById("oBusyDialog").open();
			 oDataModel.read("/SalesOrderListCustomerInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	         var orderListJson = new sap.ui.model.json.JSONModel();
	         orderListJson.setData({dss:loginResult.results});
	         if(loginResult.results.length == 0)
        	 {
        	 jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("No Orders for "+customerName+"");
        	 sap.ui.core.BusyIndicator.hide();
				break breakme;			 
				
        	 }
	         
			 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
			 router.navTo("AccountOrderMaster",{customer:customerName[0]});
			 


	         oDataModel.read("/SalesOrderListCustomerInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerId eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	         var orderListJson = new sap.ui.model.json.JSONModel();
	         orderListJson.setData({data:loginResult.results});
	         sap.ui.getCore().byId("orderLists").setModel(orderListJson);

	    	
	         setTimeout( function(){
//				sap.ui.getCore().getElementById("oBusyDialog").close();
//				oBusyDialog.setVisible(false);
				
	        	 sap.ui.core.BusyIndicator.hide();
			},
			150);
	         var x = loginResult.results[0].SalesOrder;
	 		
	 		//setting by default value of dealer name on master view
	 		var y = loginResult.results[0].CustomerName;
	 		sap.ui.getCore().byId("customerLabel").setText(y +" " + "Orders");
	     	//default header detail
	     	oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
	     	var headerlistJson = new sap.ui.model.json.JSONModel();
	         headerlistJson.setData({data1:loginResult.results});
	         sap.ui.getCore().byId("headerlist").setModel(headerlistJson);
	         //default item detail
	         oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+x+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	         var ItemJson = new sap.ui.model.json.JSONModel();
	         ItemJson.setData({data2:loginResult.results});
	         sap.ui.getCore().byId("itemstable").setModel(ItemJson);
	         sap.ui.getCore().byId("shippedTab").setModel(ItemJson);
	         sap.ui.getCore().byId("openTab").setModel(ItemJson);
	         sap.ui.getCore().byId("inProcessTab").setModel(ItemJson);

	         //default item count 
	     	 var itemscount = sap.ui.getCore().byId("itemstable");
	     	 var count1 = itemscount.getItems().length;
	     	 sap.ui.getCore().byId("infotab").setCount(count1);
	     	  var x ;
	          var p ;
	          var c = 0, d =0 ,e= 0;
	          var y  = loginResult.results;
	          var len  = loginResult.results.length;
	           for (var i = 0;i<len;i++ ){
	         	  for (x in y[i]){
	              var  p  = y[i].StatusSummery;
	         	 
	            }
	         	  if(p == "Shipped"){
	             	  c++;
	             	 
	             	  }
	               else if(p == "Open"){
	                 d++;
	                
	                 }
	               else if(p == "In Process"){
	             	  e++;
	             	 
	     	 }
	         	  p = "";
	         	  x = "";
	         		  }
	           
	           if(c == 0){
	         	 var x = sap.ui.getCore().byId("shippedTab");
	         	  x.setVisible(false);
	           }
	           else {
	         	  var x = sap.ui.getCore().byId("shippedTab");
	         	  x.setVisible(true);
	         	  
	           }
	           if(d == 0){
	         	 var y= sap.ui.getCore().byId("openTab");
	         	   y.setVisible(false);
	           } 
	           else {
	         	  var y = sap.ui.getCore().byId("openTab");
	         	  y.setVisible(true);
	         	  
	           }
	           if(e == 0){
	         	 var z= sap.ui.getCore().byId("inProcessTab");
	         	  z.setVisible(false);
	           }
	           else {
	         	  var z = sap.ui.getCore().byId("inProcessTab");
	         	  z.setVisible(true);
	         	  
	           }
	           sap.ui.getCore().byId("openicontab").setCount(d);
	           sap.ui.getCore().byId("inProcessicontab").setCount(e);
	           sap.ui.getCore().byId("shippedicontab").setCount(c);

	         //default contacts tab

	           oDataModel.read("/AccountOverviewInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerid eq '"+customerId+"' and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
	     		var contactsJson = new sap.ui.model.json.JSONModel();
	         contactsJson.setData({data3:loginResult.results});
	         sap.ui.getCore().byId("contactlist").setModel(contactsJson);
	         
	         //default credit info
	         oDataModel.read("/ItCustomerCreditSet?$filter=ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	         var creditJson = new sap.ui.model.json.JSONModel();
	         creditJson.setData({data4:loginResult.results});
	         sap.ui.getCore().byId("creditlist").setModel(creditJson);
//	         var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
//			 router.navTo("AccountOrderMaster",{customer:customerName[0]});
			}
		 else breakout:if(sel==2)
			{
			 debugger;
//			 var AccountPayment = new sap.ui.view({ viewName:"com.vikalp.dealermgmt.view.accounts.AccountPayment",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
//			 //id:"accountSP",
//			 appCon.addPage(AccountPayment);
//			 appCon.to(AccountPayment);
			 oDataModel.read("/InvoiceListSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			 var invoiceListJson = new sap.ui.model.json.JSONModel();
	         invoiceListJson.setData({dzz:loginResult.results});
	         if(loginResult.results.length == 0)
        	 {
        	 jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("No Invoice for "+customerName+"");
				break breakout;
        	 }
			 
			 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
			 router.navTo("AccountPaymentMaster",{customer:customerName[0]});
//			 ,{customer:customerName[0]}
		        oDataModel.read("/InvoiceListSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//		         "+customerId+"
		         var invoiceListJson = new sap.ui.model.json.JSONModel();
		         invoiceListJson.setData({data:loginResult.results});        
		         console.log("invoiceListJson",invoiceListJson);		
		         sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson);
//		         oMenuInvoice.setModel(invoiceListJson);
			 
		       
		         
			 x = loginResult.results[0].Invoicenumber;
				var c = loginResult.results[0].Name1;
				sap.ui.getCore().byId("customerLabel1").setText(c + " " + "Invoices");
			oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
			var headerlistJson = new sap.ui.model.json.JSONModel();
		    headerlistJson.setData({data1:loginResult.results});
		    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson);
		    
		    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		    var ItemJson = new sap.ui.model.json.JSONModel();
		    ItemJson.setData({data2:loginResult.results});
		    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson);
		    
		    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});

			  var overViewListJson = new sap.ui.model.json.JSONModel();
			  overViewListJson.setData({data3:loginResult.results});
			  sap.ui.getCore().byId("overViewList").setModel(overViewListJson);
			  
			  
			    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
					  console.log("error",oError);});

				  var overViewListJson = new sap.ui.model.json.JSONModel();
				  overViewListJson.setData({data4:loginResult.results});
				  sap.ui.getCore().byId("informationList").setModel(overViewListJson);	  
			  
		    
		    var tab = sap.ui.getCore().byId("itemTableInvoice");
			  var count = tab.getItems().length;
//			  sap.ui.getCore().byId("iT").setCount(count);
			  sap.ui.getCore().byId("counter1").setHeaderText("Items("+count+")");
			}
		 else if(sel==3)
			 {
			 debugger;
			 var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
				router.navTo("AccountInventoryMaster");
				
				
				oDataModel.read("/ProductListInfoSet?$filter=ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		 		var InventoryListJson = new sap.ui.model.json.JSONModel();
		 		InventoryListJson.setData({inventorydata:loginResult.results});
		 		sap.ui.getCore().byId("inventoryLists").setModel(InventoryListJson);
		 		sap.ui.getCore().byId("CustomerLabelnew").setText(customerName[0] +" " + "Inventory");
		 		BaseUomDesc = loginResult.results[0].BaseUomDesc;
		 		
		 		material = loginResult.results[0].Material;
		 		oDataModel.read("/ProductDetailsSet?$filter=Material eq '"+material+"' and ImCustomerid eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		 		var InventoryListJson = new sap.ui.model.json.JSONModel();
		 		InventoryListJson.setData({inventoryheaderdata:loginResult.results});
		 		console.log("supw",InventoryListJson);
		 		sap.ui.getCore().byId("inventoryheaderlist").setModel(InventoryListJson);
		 		sap.ui.getCore().byId("infoForm").setModel(InventoryListJson);
		 		
		 		
			 }
		 else breakin:if(sel==4)
			{
//			 var AccountPerformance = new sap.ui.view({ viewName:"com.vikalp.dealermgmt.view.accounts.AccountPerformance",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
			 //id:"accountSP",
			 //performance table data
			 oDataModel.read("/OverallPerformanceInfoSet?$filter=ImKunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var performancetableJson = new sap.ui.model.json.JSONModel();
				performancetableJson.setData({dataPerform:loginResult.results});
				if(loginResult.results.length == 0)
	        	 {
	        	 jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("No Information for this Customer");
	        	 
					break breakin;			 
					
	        	 }
			 var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
				router.navTo("AccountPerformance",{customer:customerName[0]});
			 oDataModel.read("/OverallPerformanceInfoSet?$filter=ImKunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var performancetableJson = new sap.ui.model.json.JSONModel();
				performancetableJson.setData({data7:loginResult.results});
				sap.ui.getCore().byId("performancetabledata").setModel(performancetableJson);
				sap.ui.getCore().byId("cht").setModel(performancetableJson);
				
//				var oApp = sap.ui.getCore().byId("SplitApp");
//				oApp.toDetail('accountPerformanceDetail','slide');
				
				var z = sap.ui.getCore().byId("select").mProperties.selectedKey;
				console.log("x equals",z);
				var b = [04,05];
				oDataModel.read("/PerBasedOnProductInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImMonth eq '04'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var ProductJson = new sap.ui.model.json.JSONModel();
				ProductJson.setData({data9:loginResult.results});
				
				sap.ui.getCore().byId("dualSC").setModel(ProductJson);
				
				
			}
		 else breakoff:if(sel==6)
			{
//			 var AccountPerformance = new sap.ui.view({ viewName:"com.vikalp.dealermgmt.view.accounts.AccountPerformance",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
			 //id:"accountSP",
			 //performance table data
			 oDataModel.read("/AgeingReportInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var paymentListJson = new sap.ui.model.json.JSONModel();
				paymentListJson.setData({dataPayment:loginResult.results});
				if(loginResult.results.length == 0)
	        	 {
	        	 jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("No Payments for "+customerName+"");
	        	 
					break breakoff;			 
					
	        	 }
				
			 var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
				router.navTo("AccountPayment",{customer:customerName[0]});
			 debugger;
			 oDataModel.read("/AgeingReportInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var paymentListJson = new sap.ui.model.json.JSONModel();
				paymentListJson.setData({dataPayment:loginResult.results});
//				sap.ui.getCore().byId("itemTablePayment").setModel(paymentListJson);
				sap.ui.getCore().byId("PiePayment").setModel(paymentListJson);
				
				oDataModel.read("/AgeingDataInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var paymentTableJson = new sap.ui.model.json.JSONModel();
				paymentTableJson.setData({dataTable:loginResult.results});
				sap.ui.getCore().byId("itemTablePayment").setModel(paymentTableJson);

				oDataModel.read("/AgeingReportDataSet?$filter=ImKunnr eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var paymentTableJson2 = new sap.ui.model.json.JSONModel();
				paymentTableJson2.setData({dataTable2:loginResult.results});
				sap.ui.getCore().byId("itemTablePayment2").setModel(paymentTableJson2);
				
				oDataModel.read("/AgeingDataInfoSet?$filter=ImKunnr eq '"+customerId+"' and ImSalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
				var stackChartJson = new sap.ui.model.json.JSONModel();
				stackChartJson.setData({dataStack:loginResult.results});
				
				sap.ui.getCore().byId("DualSC1").setModel(stackChartJson);

				
				
				//				debugger;
				//based on products
//				oDataModel.read("/PerBasedOnProductInfoSet?$filter=ImKunnr eq '"+customerId+"' and  ImMonth eq '04'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
//				var performancetableJson = new sap.ui.model.json.JSONModel();
//				performancetableJson.setData({data7:loginResult.results});
//				sap.ui.getCore().byId("performancetabledata").setModel(performancetableJson);
//				sap.ui.getCore().byId("dualSC").setModel(performancetableJson);
				
				
//			 var oApp = sap.ui.getCore().byId("SplitApp");
//				oApp.toDetail('AccountPaymentDetail','slide');
			}
	}

});
