sap.ui.controller("com.vikalp.dealermgmt.view.orders.OrderReviewDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.orders.OrderReviewDetail
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.orders.OrderReviewDetail
*/
//	onBeforeRendering: function() {
////		debugger;
//// 		oDataModel.read("/ShipToPartyInfoSet?$filter=ImKunnr eq '"+customerId[0]+"' and ImSalesOrg eq '"+SalesOrg1[0]+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});	
////		var reviewListJson = new sap.ui.model.json.JSONModel();
////		reviewListJson.setData({data122:loginResult.results});
////		sap.ui.getCore().byId("reviewlist1").setModel(reviewListJson);
//		
//		
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.orders.OrderReviewDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.orders.OrderReviewDetail
*/
//	onExit: function() {
//
//	}

	placeorder: function(){
		debugger;
//		console.log("Product",temp[0].Product)
	var ImCity = 	sap.ui.getCore().byId("shpCity").getText();
	var corpName = sap.ui.getCore().byId("shpToParty").getSelectedItem().getText();
	             var  poitem =  sap.ui.getCore().byId("shpPO").getValue();
	             placeMatnrArray = [];
	             placeUnitArray = [];
	             placeQuantityArray = [];
	        	  var placeItems = sap.ui.getCore().byId("reviewTable").getItems();
       		   var len = placeItems.length;
       		   for(var i=0 ; i < len ; i++)
   		    {

   		      placeMatnrArray.push(placeItems[i].getAggregation("cells")[0].getText().split(" ")[0]);
   		   placeUnitArray.push(placeItems[i].getAggregation("cells")[1].getText().split(" ")[1]);   
   		placeQuantityArray.push(placeItems[i].getAggregation("cells")[1].getText().split(" ")[0]);
   		    }
       debugger;
		var oEntry = {};
	        oEntry.DocType = 'ZFOC';
	        oEntry.ImBaseQty = placeUnitArray[0];
//	        	Math.floor((Math.random() * 100000000) + 1);                       
	        oEntry.ImCity = ImCity ;
	        oEntry.ImCorpName = corpName ;
	        oEntry.ImDistrict = 'gtb n';
	        oEntry.ImDistrChan = disChannel[0];
	        oEntry.ImDivision= divison[0];
	        oEntry.ImItemsPlant ='VKM1';
	        oEntry.ImMatnr = placeMatnrArray[0];
	        oEntry.ImName = customerName[0];
	        oEntry.ImPartno =""+customerId[0]+"";
	        oEntry.ImPartnrRole= 'AG';
	        oEntry.ImPoItmNo = poitem;
	        oEntry.ImReqQty = placeQuantityArray[0];
	        oEntry.ImSalesOrg = SalesOrg1[0];
	        
	       oDataModel.create('/Create_SOSet', oEntry, null, function(oResponse){ 
//	        	alert("Create successful"); 
	    	   console.log(oResponse); 
//	        		   sap.ui.getCore().byId("BstrT").setEnabled(true);
//	        	       sap.ui.getCore().byId('trip').setValue(oResponse.ExSalesdocument);
	    	    abc = oResponse.ExSalesdocument;
	    	    alert("Your order has been submitted. Your order number is" + abc );
	    	    var router = sap.ui.core.routing.Router.getRouter("appRouter");// Get instance of router  
				 router.navTo("OrdersInfo");
					sap.ui.getCore().byId("cartTable").setModel();
        			sap.ui.getCore().byId("checkoutTable").setModel();
        			sap.ui.getCore().byId("shippingForm").setModel();
        			sap.ui.getCore().byId("reviewForm").setModel();
        			sap.ui.getCore().byId("reviewTable").setModel();
        			sap.ui.getCore().byId("cnt1").setText("0");
        			sap.ui.getCore().byId("cartTable").setHeaderText("Items (0)");
        			cartCnt = 0;
	        	       }
	          
	        	    	    
	        	       );
    	
	}
});