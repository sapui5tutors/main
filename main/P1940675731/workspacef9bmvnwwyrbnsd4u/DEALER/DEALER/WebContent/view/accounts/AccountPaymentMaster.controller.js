sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountPaymentMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountPaymentMaster
*/
//	   onInit: function() {
//           
//
//},
	
	onBeforeRendering: function() {
		debugger;
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
//	  sap.ui.getCore().byId("iT").setCount(count);
	  sap.ui.getCore().byId("counter1").setHeaderText("Items("+count+")");
    
	},
	
	
	onSearch: function(oEvent) {
		debugger;
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
        
        var oBind = sap.ui.getCore().byId("oMenuInvoice").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
    
    onLiveChange: function(oEvent) {
		debugger;
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
        
        var oBind = sap.ui.getCore().byId("oMenuInvoice").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
	
	onInvoiceMenuClick : function(oEvent)
	{
//		debugger;
		oEvent.getSource().setSelected(true);
//		   var app = sap.ui.getCore().byId("appId");
//			  var list = sap.ui.getCore().byId("salesOrderList")
			  var item = oEvent.oSource.getBindingContext().sPath;
			  var selected = parseInt(item.split('/')[2]);
//			  var selected= list.getSelectedItems();
			  var selectedData = oEvent.oSource.getModel().oData.data[selected];

		      var selectedInvoiceNumber = selectedData.Invoicenumber;
		      var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
				 router.navTo("AccountPaymentDetail",{invoice:selectedInvoiceNumber});
			  oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});
	 
			  var headerListJson = new sap.ui.model.json.JSONModel();
			  headerListJson.setData({data1:loginResult.results});
			  sap.ui.getCore().byId("headerListInvoice").setModel(headerListJson);
			  
			  
		      oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
				  console.log("error",oError);});
			  
		       var itemTableJson = new sap.ui.model.json.JSONModel();
		       itemTableJson.setData({data2:loginResult.results});
		       sap.ui.getCore().byId("itemTableInvoice").setModel(itemTableJson);
		       
		       var tab = sap.ui.getCore().byId("itemTableInvoice");
				  var count = tab.getItems().length;
//				  sap.ui.getCore().byId("iT").setCount(count);
				  
				  sap.ui.getCore().byId("counter1").setHeaderText("Items("+count+")");

				  
				  
				    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
						  console.log("error",oError);});

					  var overViewListJson = new sap.ui.model.json.JSONModel();
					  overViewListJson.setData({data3:loginResult.results});
					  sap.ui.getCore().byId("overViewList").setModel(overViewListJson);
					  
					  
					  
					    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
							  console.log("error",oError);});

						  var overViewListJson = new sap.ui.model.json.JSONModel();
						  overViewListJson.setData({data4:loginResult.results});
						  sap.ui.getCore().byId("informationList").setModel(overViewListJson);
		       
		       
//		      oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+selectedInvoiceNumber+"'",null,null,false,onSuccessLogin,function(oError){
//		 		  console.log("error",oError);});
//		 	  
//		     var overViewDetailJson = new sap.ui.model.json.JSONModel();
//		     overViewDetailJson.setData({data2:loginResult.results});
//		     sap.ui.getCore().byId("hBox").setModel(overViewDetailJson);
     
				  
	},
	

		
	onSortButtonClick : function(oEvent){
		debugger;
		
		var model2 = new sap.ui.model.json.JSONModel();
        model2.loadData("config/configData.json");
        sap.ui.getCore().setModel(model2);
        
		var sortList = new sap.m.List({
			items:{
			       path:"/sortItem",
			       template: new sap.m.ObjectListItem({
			    	   type:"Active",
//			    	   attributes:[
//			    	               {
//			    	            	   text:"{Status}"
//			    	               },
//			    	               ],
			    	   title:"{Date}",
			       press:function(evt){
			    	   debugger;			    	   
			    	   var selectedDate= evt.getSource().mProperties.title;
			    	   console .log("selectedDate",selectedDate);
			    	   
			    	   if (selectedDate == "Document Date"){
			    		   oDataModel.read("/InvoicesOrderByDocDateSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   var y = loginResult.results[0].Invoicenumber;
			    		   console.log("y",y);
			    		   var invoiceListJson3 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson3.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson3);
						   
						   
						   

				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+y+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson2 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson2.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson2);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+y+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson2 = new sap.ui.model.json.JSONModel();
				    	    ItemJson2.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson2);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+y+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson2 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson2.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson2);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+y+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson2 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson2.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson2);
				    	   
			    	   }
			    	   
			    	   else{
			    		   oDataModel.read("/InvoiceListSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   var z = loginResult.results[0].Invoicenumber;
			    		   console.log("z",z);
			    		   var invoiceListJson4 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson4.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson4); 
						   

				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+z+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson3 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson3.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson3);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+z+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson3 = new sap.ui.model.json.JSONModel();
				    	    ItemJson3.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson3);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+z+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson3 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson3.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson3);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+z+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson3 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson3.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson3);
				    	   
			    	   } 			    	   	   
			    	   
			    	   popover1.destroy(this);
			    	   
			    	   
			       }
			    	   })	
			       }
          })

		
		var popover1 = new sap.m.Popover({       	 
	     	 title:"Sort",
	     	 contentWidth:"10%",
	     	 placement : "Top",
	     	 content:[
                    sortList	     	      	     	        
	     	          ]
	      });
		popover1.openBy(this);
	},
	
	
	onFilterButtonClick : function(oEvent){
		debugger;
		
		var model1 = new sap.ui.model.json.JSONModel();
        model1.loadData("config/configData.json");
        sap.ui.getCore().setModel(model1);
        
		var filterList = new sap.m.List({
			items:{
			       path:"/filterItem",
			       template: new sap.m.ObjectListItem({
			    	   type:"Active",
//			    	   attributes:[
//			    	               {
//			    	            	   text:"{Status}"
//			    	               },
//			    	               ],
			    	   title:"{Status}",
			       press:function(evt){
			    	   debugger;			    	   
			    	   var selectedStatus = evt.getSource().mProperties.title;
			    	   console .log("selectedStatus",selectedStatus);
			    	   if (selectedStatus == "All"){
			    		   oDataModel.read("/InvoiceListSet?$filter=Kunnr eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   var i1 = loginResult.results[0].Invoicenumber;
			    		   console.log("i1",i1);
			    		   
			    		   var invoiceListJson1 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson1.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson1);
						   
						   
				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i1+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson4 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson4.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson4);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+i1+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson4 = new sap.ui.model.json.JSONModel();
				    	    ItemJson4.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson4);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i1+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson4 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson4.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson4);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+i1+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson4 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson4.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson4);
			    		   
			    	   }
			    	   if (selectedStatus == "Past Due"){
			    		   oDataModel.read("/InvoiceStatusSet?$filter=Kunnr eq '"+customerId+"' and Status eq '"+selectedStatus+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   if(loginResult.results.length == 0)
				          	 {
				          	 jQuery.sap.require("sap.m.MessageToast");
				  				sap.m.MessageToast.show("No Data found");
				  				popover.destroy(this);
				          	 }
			    		   else{
  		    		       var i2 = loginResult.results[0].Invoicenumber;
			    		   console.log("i2",i2);
			    		   
			    		   var invoiceListJson2 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson2.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson2);
							  
						   
						   
				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i2+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson5 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson5.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson5);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+i2+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson5 = new sap.ui.model.json.JSONModel();
				    	    ItemJson5.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson5);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i2+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson5 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson5.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson5);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+i2+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson5 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson5.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson5);
			    		   }
			    	   }
			    	  
			    	   if (selectedStatus == "Unpaid"){
			    		   oDataModel.read("/InvoiceStatusSet?$filter=Kunnr eq '"+customerId+"' and Status eq '"+selectedStatus+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   if(loginResult.results.length == 0)
			          	 {
			          	 jQuery.sap.require("sap.m.MessageToast");
			  				sap.m.MessageToast.show("No Data found");
			  				popover.destroy(this);
			          	 }
			    		   else{
			    		   var i3 = loginResult.results[0].Invoicenumber;
			    		   console.log("i3",i3);
			    		   
			    		   var invoiceListJson5 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson5.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson5);
							  
						   
						   
				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i3+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson6 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson6.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson6);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+i3+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson6 = new sap.ui.model.json.JSONModel();
				    	    ItemJson6.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson6);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i3+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson6 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson6.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson6);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+i3+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson6 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson6.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson6);
			    		   }
			    		   }

			    	   if (selectedStatus == "Disputed"){
			    		   oDataModel.read("/InvoiceStatusSet?$filter=Kunnr eq '"+customerId+"' and Status eq '"+selectedStatus+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			    		   if(loginResult.results.length == 0)
			          	 {
			          	 jQuery.sap.require("sap.m.MessageToast");
			  				sap.m.MessageToast.show("No Data found");
			  				popover.destroy(this);
			          	 }
			    		   else{
			    		   var i4 = loginResult.results[0].Invoicenumber;
			    		   console.log("i4",i4);
			    		   
			    		   var invoiceListJson6 = new sap.ui.model.json.JSONModel();
			    		   invoiceListJson6.setData({data:loginResult.results});
						   sap.ui.getCore().byId("oMenuInvoice").setModel(invoiceListJson6);
							  
						   
						   
				    	   oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i4+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	   
				    		var headerlistJson7 = new sap.ui.model.json.JSONModel();
				    	    headerlistJson7.setData({data1:loginResult.results});
				    	    sap.ui.getCore().byId("headerListInvoice").setModel(headerlistJson7);
				    	    
				    	    oDataModel.read("/InvoiceItemInfoSet?$filter=ImBillingDocument eq '"+i4+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
				    	    var ItemJson7 = new sap.ui.model.json.JSONModel();
				    	    ItemJson7.setData({data2:loginResult.results});
				    	    sap.ui.getCore().byId("itemTableInvoice").setModel(ItemJson7);
				    	    
				    	    oDataModel.read("/InvoiceHeaderInfoSet?$filter=ImBillingDocument eq '"+i4+"'",null,null,false,onSuccessLogin,function(oError){
				    			  console.log("error",oError);});

				    		  var overViewListJson7 = new sap.ui.model.json.JSONModel();
				    		  overViewListJson7.setData({data3:loginResult.results});
				    		  sap.ui.getCore().byId("overViewList").setModel(overViewListJson7);
				    		  
				    		  
				    		    oDataModel.read("/ContactDeatilsSet?$filter=Billingdocument eq '"+i4+"'",null,null,false,onSuccessLogin,function(oError){
				    				  console.log("error",oError);});

				    			  var overViewListJson7 = new sap.ui.model.json.JSONModel();
				    			  overViewListJson7.setData({data4:loginResult.results});
				    			  sap.ui.getCore().byId("informationList").setModel(overViewListJson7);
			    	   }
			    	   }
			    	   
			    	   popover.destroy(this);
			    	   
			    	   
			       }
			    	   })	
			       }
          })

		
		var popover = new sap.m.Popover({       	 
	     	 title:"Status",
	     	 contentWidth:"10%",
	     	 placement : "Top",
	     	 content:[
                    filterList	     	      	     	        
	     	          ]
	      });
		popover.openBy(this);
	},
	
	
	
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

