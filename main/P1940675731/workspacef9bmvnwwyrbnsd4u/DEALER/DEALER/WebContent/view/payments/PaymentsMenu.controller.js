sap.ui.controller("com.vikalp.dealermgmt.view.payments.PaymentsMenu", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountPaymentMaster
*/
	   onInit: function() {
		      oDataModel.read("/InvoiceListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//		    "+customerId+"
		    var invoiceListJson = new sap.ui.model.json.JSONModel();
		    invoiceListJson.setData({data:loginResult.results});        
		    sap.ui.getCore().byId("oMenuInvoice1").setModel(invoiceListJson);

},
	
	onBeforeRendering: function() {
		debugger;
		    x = loginResult.results[0].Invoicenumber;
		var c = loginResult.results[0].Name1;
//		sap.ui.getCore().byId("customerLabel2").setText(c);
		var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
		 router.navTo("PaymentsInfo",{invoice:x});
	oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
	var headerlistJson = new sap.ui.model.json.JSONModel();
    headerlistJson.setData({data1:loginResult.results});
    sap.ui.getCore().byId("headerList1").setModel(headerlistJson);
    
    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
    var ItemJson = new sap.ui.model.json.JSONModel();
    ItemJson.setData({data2:loginResult.results});
    sap.ui.getCore().byId("itemTable1").setModel(ItemJson);
    
    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
		  console.log("error",oError);});

	  var overViewListJson = new sap.ui.model.json.JSONModel();
	  overViewListJson.setData({data3:loginResult.results});
	  sap.ui.getCore().byId("overViewList1").setModel(overViewListJson);
	  
	  
	    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
			  console.log("error",oError);});

		  var overViewListJson = new sap.ui.model.json.JSONModel();
		  overViewListJson.setData({data4:loginResult.results});
		  sap.ui.getCore().byId("informationList1").setModel(overViewListJson);	  
	  
    
    var tab = sap.ui.getCore().byId("itemTable1");
	  var count = tab.getItems().length;
//	  sap.ui.getCore().byId("iT").setCount(count);
	  sap.ui.getCore().byId("counter2").setHeaderText("Items("+count+")");
	  
	  
      oDataModel.read("/InvoiceListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//    "+customerId+"
    var invoiceListJson = new sap.ui.model.json.JSONModel();
    invoiceListJson.setData({data:loginResult.results});        
    sap.ui.getCore().byId("oMenuInvoice1").setModel(invoiceListJson);
    header = "All Customer Invoices";
    sap.ui.getCore().byId("customerLabel2").setText(header);
    
	},
	
	
	onSearch: function(oEvent) {
//		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").query;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("Invoicenumber", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Amount", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Invoice", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//                       new sap.ui.model.Filter("Duedate", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("oMenuInvoice1").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
    
    onLiveChange: function(oEvent) {
//		debugger;
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").newValue;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("Invoicenumber", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Amount", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Invoice", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Po", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Salesorder", sap.ui.model.FilterOperator.Contains, searchString),
//        new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("oMenuInvoice1").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
	
	onInvoiceMenuClick : function(oEvent)
	{
		debugger;
		oEvent.getSource().setSelected(true);
//		   var app = sap.ui.getCore().byId("appId");
//			  var list = sap.ui.getCore().byId("salesOrderList")
			  var item = oEvent.oSource.getBindingContext().sPath;
			  var selected = parseInt(item.split('/')[2]);
//			  var selected= list.getSelectedItems();
			  var selectedData = oEvent.oSource.getModel().oData.data[selected];

		      var selectedInvoiceNumber = selectedData.Invoicenumber;
			  
		      var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
				 router.navTo("PaymentsInfo",{invoice:selectedInvoiceNumber});
				 
			  oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});
	 
			  var headerListJson = new sap.ui.model.json.JSONModel();
			  headerListJson.setData({data1:loginResult.results});
			  sap.ui.getCore().byId("headerList1").setModel(headerListJson);
			  
			  
		      oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});
			  
		       var itemTableJson = new sap.ui.model.json.JSONModel();
		       itemTableJson.setData({data2:loginResult.results});
		       sap.ui.getCore().byId("itemTable1").setModel(itemTableJson);
		       
		       var tab1 = sap.ui.getCore().byId("itemTable1");
				  var count1 = tab1.getItems().length;
//				  sap.ui.getCore().byId("iT").setCount(count);
				  
				  sap.ui.getCore().byId("counter2").setHeaderText("Items("+count1+")");

				  
				  
				    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
						  console.log("error",oError);});

					  var overViewListJson = new sap.ui.model.json.JSONModel();
					  overViewListJson.setData({data3:loginResult.results});
					  sap.ui.getCore().byId("overViewList1").setModel(overViewListJson);
					  
					  
					  
					    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
							  console.log("error",oError);});

						  var overViewListJson = new sap.ui.model.json.JSONModel();
						  overViewListJson.setData({data4:loginResult.results});
						  sap.ui.getCore().byId("informationList1").setModel(overViewListJson);
		       
		       
//		      oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
//		 		  console.log("error",oError);});
//		 	  
//		     var overViewDetailJson = new sap.ui.model.json.JSONModel();
//		     overViewDetailJson.setData({data2:loginResult.results});
//		     sap.ui.getCore().byId("hBox").setModel(overViewDetailJson);
     
					
	 },
						  
	onInvoiceButtonClick : function(oEvent)
	  {

   debugger;
//   oEvent.getSource().setSelected(true);
	  oDataModel.read("/InvoiceListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		//   "+customerId+"
		   var invoiceListJson = new sap.ui.model.json.JSONModel();
		   invoiceListJson.setData({data:loginResult.results});        
		   console.log("invoiceListJson",invoiceListJson);			
		   sap.ui.getCore().byId("oMenuInvoice1").setModel(invoiceListJson);			   		   
		   sap.ui.getCore().byId("customerLabel2").setText(header);
   
   
			oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
			var headerlistJson = new sap.ui.model.json.JSONModel();
		    headerlistJson.setData({data1:loginResult.results});
		    sap.ui.getCore().byId("headerList1").setModel(headerlistJson);
		    
		    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		    var ItemJson = new sap.ui.model.json.JSONModel();
		    ItemJson.setData({data2:loginResult.results});
		    sap.ui.getCore().byId("itemTable1").setModel(ItemJson);
		    
		    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});

			  var overViewListJson = new sap.ui.model.json.JSONModel();
			  overViewListJson.setData({data3:loginResult.results});
			  sap.ui.getCore().byId("overViewList1").setModel(overViewListJson);
			  
			  
			    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+x+"'",null,null,false,onSuccessLogin,function(oError){
					  console.log("error",oError);});

				  var overViewListJson = new sap.ui.model.json.JSONModel();
				  overViewListJson.setData({data4:loginResult.results});
				  sap.ui.getCore().byId("informationList1").setModel(overViewListJson);	  
			  
		    
		    var tab2 = sap.ui.getCore().byId("itemTable1");
			  var count2 = tab2.getItems().length;
//			  sap.ui.getCore().byId("iT").setCount(count);
			  sap.ui.getCore().byId("counter2").setHeaderText("Items("+count2+")");
	  },
	 
	 onPaymentButtonClick : function(oEvent)
	 {
		// var app = sap.ui.getCore().byId("PaymentTab");
		//	app.toMaster('paymentsMenu1','show');
		//	app.toDetail('paymentsInfo1','show'); 
			var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
			 router.navTo("PaymentsInfo1");
	 }
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountPaymentMaster
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountPaymentMaster
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountPaymentMaster
*/
//	onExit: function() {
//
//	}
//	onInvoiceMenuClick:function(oEvent){
//		var item = oEvent.oSource.getBindingContext().sPath;
//		var sel = item.split('/')[2];
//        var accountDetailPage = new sap.ui.view({id:"accountDetail1", viewName:"com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail",viewData:data.userName, type:sap.ui.core.mvc.ViewType.JS});
//		appCon.to(detailPage1);
//	}
//
	});

