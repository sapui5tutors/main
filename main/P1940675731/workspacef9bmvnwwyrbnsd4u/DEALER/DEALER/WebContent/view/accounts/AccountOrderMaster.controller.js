sap.ui.controller("com.vikalp.dealermgmt.view.accounts.AccountOrderMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.accounts.AccountOrderMaster
*/
//	onInit: function() {
//		debugger;
//        var oBusyDialog=new sap.m.BusyDialog("oBusyDialog",{
//            customIcon : "util/image/flower.gif",  
//            customIconWidth : "120px",  
//            customIconHeight : "120px" , 
//            customIconRotationSpeed : 0,
////            customIconDensityAware: false,
////            busyIndicatorDelay: 0,
////            customIconDensityAware : false,
////        	size: 200%
////        	text:"Sales Orders",
////        	busy:true,
////        	customIcon:"sap-icon://visits",
//        });
//
//        oBusyDialog.open();
//        oBusyDialog.setVisible(true); 
////        sap.ui.core.BusyIndicator.show(0);
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.accounts.AccountOrderMaster
*/
	onBeforeRendering: function() {
debugger;
		setTimeout( function(){
//			sap.ui.getCore().getElementById("oBusyDialog").close();
//			oBusyDialog.setVisible(false);
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
    oDataModel.read("/CustomerCreditListInfoSet?$filter=ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
    var creditJson = new sap.ui.model.json.JSONModel();
    creditJson.setData({data4:loginResult.results});
    sap.ui.getCore().byId("creditlist").setModel(creditJson);
	
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.accounts.AccountOrderMaster
*/
	onAfterRendering: function() {
		
//		setTimeout( function(){
//			sap.ui.getCore().getElementById("oBusyDialog").close();
//		},
//		150);
		
//		  //default contact count
//	  	 var creditcount = sap.ui.getCore().byId("creditlist");
//  	  	 var count2 = creditcount.getItems().length;
//  	  	 sap.ui.getCore().byId("i3").setCount(count2); 
  	  	 
	  	 //dafault credit count
	  	 var contactcount = sap.ui.getCore().byId("contactlist");
	  	 var count3 = contactcount.getItems().length;
	  	 sap.ui.getCore().byId("Contactstab").setCount(count3);
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.accounts.AccountOrderMaster
*/
//	onExit: function() {
//
//	}
	onSearch: function(oEvent) {
		
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").query);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").query;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("OrderValue", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("PurchOrd", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("orderLists").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
	},

	onLiveChange: function(oEvent) {
		
		jQuery.sap.log.debug("searchField: search for: " + oEvent.getParameters("query").newValue);
//        var tpmla = oEvent.getParameter("Product Name");
		var searchString = oEvent.getParameters("query").newValue;
		var filters = new Array();
        var oFilter = [new sap.ui.model.Filter("SalesOrder", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("OrderValue", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.Contains, searchString),
                       new sap.ui.model.Filter("PurchOrd", sap.ui.model.FilterOperator.Contains, searchString),
        new sap.ui.model.Filter("DocStatus", sap.ui.model.FilterOperator.Contains, searchString)

        
                       ];
        filters.push(oFilter);
        
        var oBind = sap.ui.getCore().byId("orderLists").getBinding("items");
        oBind.filter(new sap.ui.model.Filter(oFilter, false));
        
//        this.customerList = sap.ui.getCore().byId("dealerListDialog");
//         this.customerList.getBinding("items").filter(filters);
    },
	
	
	
	
	onOrderMenuClick:function(oEvent){

//		var aContexts = oEvent.getParameter("selectedContexts");
//		var SalesOrder = aContexts.map(function(oContext) {console.log("oContext",oContext.getObject()); return oContext.getObject().SalesOrder; });
//		console.log("SalesOrder",SalesOrder);
//		
		
		oEvent.getSource().setSelected(true);
//	
				var item = oEvent.oSource.getBindingContext().sPath;
				var sel = parseInt(item.split('/')[2]);
				
			 y = oEvent.oSource.getModel().oData.data[sel];
			 var SalesOrder= y.SalesOrder;
//			 window.Saless = ("SalesOrder"+" " +"('"+ SalesOrder+"')"+" "+"/"+customerId[0]+" "+customerName[0]);				
window.Saless = ("SalesOrder"+" " +"('"+ SalesOrder+"')"+customerName[0]+"('"+customerId[0]+"')");
			 var app = sap.ui.getCore().byId("appId");
			 var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
			 router.navTo("AccountOrderDetail",{sales:window.Saless});

			//on click header detail 
			 oDataModel.read("/SalesOrderHeaderDetailsInfoSet?$filter=ImSalesorder eq '"+SalesOrder+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
			 var headerlistJson = new sap.ui.model.json.JSONModel();
	         headerlistJson.setData({data1:loginResult.results});
	         sap.ui.getCore().byId("headerlist").setModel(headerlistJson);
	         
	         //on click item detail
	         oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '"+SalesOrder+"'and ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	         var ItemJson = new sap.ui.model.json.JSONModel();
	         ItemJson.setData({data2:loginResult.results});
	         sap.ui.getCore().byId("itemstable").setModel(ItemJson);
	         sap.ui.getCore().byId("shippedTab").setModel(ItemJson);
		     sap.ui.getCore().byId("openTab").setModel(ItemJson);
		     sap.ui.getCore().byId("inProcessTab").setModel(ItemJson);
	         //item count
	    	 var itemscount = sap.ui.getCore().byId("itemstable");
	   	  	 var count1 = itemscount.getItems().length;
	   	  	 sap.ui.getCore().byId("infotab").setCount(count1);
	   	  	 
	   	  
		     var x ;
		     var c = 0, d =0 ,e= 0;
		     var p ;
          var y  = loginResult.results;
		     var len  = loginResult.results.length;
		     var shippedJson = new sap.ui.model.json.JSONModel();
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
	   	  	 
	   	  	 
	   	  	 
	   	  	 
	   	  	 
	   	  	 
	   	  	 
	   	  	 //credit count
//	   	  	 var creditcount = sap.ui.getCore().byId("creditlist");
//	   	  	 var count2 = creditcount.getItems().length;
//	   	  	 sap.ui.getCore().byId("i3").setCount(count2);
	   	  	 
	   	  	 //credit count
	   	  	 var contactcount = sap.ui.getCore().byId("contactlist");
	   	  	 var count3 = contactcount.getItems().length;
	   	  	 sap.ui.getCore().byId("Contactstab").setCount(count3);
	   	  	 
	   	  
	   	     //on click Contacts detail tab
	   	  oDataModel.read("/AccountOverviewInfoSet?$filter=ImUsername eq '"+data.userName+"'and ImCustomerid eq '"+customerId+"' and SalesOrg eq '"+SalesOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
			var contactsJson = new sap.ui.model.json.JSONModel();
	         contactsJson.setData({data3:loginResult.results});
	         sap.ui.getCore().byId("contactlist").setModel(contactsJson);
	         
	         //on click Credit tab
//	         oDataModel.read("/CustomerCreditListInfoSet?$filter=ImCustomerid eq '"+customerId+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//	         var creditJson = new sap.ui.model.json.JSONModel();
//	         creditJson.setData({data4:loginResult.results});
//	         sap.ui.getCore().byId("creditlist").setModel(creditJson);

//	 		var oApp = sap.ui.getCore().byId("appId");
//			oApp.toDetail('accountOrderDetail','slide');
//			var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
//			 router.navTo("AccountOrder",{customer:customerName[0]});
			
	}

});