sap.ui.controller("com.vikalp.dealermgmt.view.orders.OrderShippingDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.OrderShippingDetail
//*/
//	onInit: function() {
		
//		  oDataModel.read("/SalesOrderItemDetailsInfoSet?$filter=ImSalesorder eq '203'and ImUsername eq 'hemendra_S'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
//		    var shipJson = new sap.ui.model.json.JSONModel();
//	          shipJson.setData({datacon1:loginResult.results});
//	  	   sap.ui.getCore().byId("shippingForm").setModel(shipJson);
//	  	 
//	  	   
//	
//	
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.orders.OrderShippingDetail
*/
//	onBeforeRendering: function() {
//		debugger;
//		cusId = customerId[0];
//		salOrg = SalesOrg1[0];
//		 oDataModel.read("/ShipToPartyInfoSet?$filter=ImKunnr eq '"+cusId+"' and ImSalesOrg eq '"+salOrg+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
//	    	var shipListJson = new sap.ui.model.json.JSONModel();
//	      shipListJson.setData({data121:loginResult.results});
//	       sap.ui.getCore().byId("shiplist1").setModel(shipListJson);
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.OrderShippingDetail
*/
//	onAfterRendering: function() {
//
//	},
	
//	placeorder: function(){
//		console.log("Product",temp[0].Product)
////		var abc = 
//		debugger;
//		var oEntry = {};
//	        oEntry.DocType = 'ZFOC';
//	        oEntry.ImBaseQty = temp[0].BaseUnit;
////	        	Math.floor((Math.random() * 100000000) + 1);                       
//	        oEntry.ImCity = 'Noida' ;
//	        oEntry.ImCorpName = 'ABC Company';
//	        oEntry.ImDistrict = 'GTB NAgar';
//	        oEntry.ImDistrChan = 'V4';
//	        oEntry.ImDivision= '21';
//	        oEntry.ImItemsPlant ='VKM1';
//	        oEntry.ImMatnr = temp[0].Material;
//	        oEntry.ImName ='ABC';
//	        oEntry.ImPartno ="17";
//	        oEntry.ImPartnrRole= 'SP';
//	        oEntry.ImPoItmNo = 'AAFFAF';
//	        oEntry.ImReqQty = temp[0].Quantity;
//	        oEntry.ImSalesOrg = 'VKS1';
//	        
//	       oDataModel.create('/Create_SOSet', oEntry, null, function(oResponse){ 
////	        	alert("Create successful"); 
//	    	   console.log(oResponse); 
////	        		   sap.ui.getCore().byId("BstrT").setEnabled(true);
////	        	       sap.ui.getCore().byId('trip').setValue(oResponse.ExSalesdocument);
//	    	    abc = oResponse.ExSalesdocument;
//	    	    alert("Trip has already saved" + abc );
//	        	       },
//	        	       function(){ 
////	        	    	   oDataModel.read('/Create_SOSet');
////	        	    	   var oText = new sap.ui.commons.TextView("l1", {text: "{ExSalesdocument}"});   
//	        	    	    
//	        	       });}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.OrderShippingDetail
*/
//	onExit: function() {
//
//	}

});