sap.ui.jsview("com.vikalp.dealermgmt.view.accounts.AccountProfile", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.AccountProfile
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.accounts.AccountProfile";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.AccountProfile
	*/ 
	createContent : function(oController) {
		
		var oHeaderProfileDetail = new sap.m.List("headerProfilelist",{
			inset:false,
			  
//			
		});
		var oHeaderProfileDetailItem = new sap.m.ObjectListItem({

       	 title:"{CustomerName}",
//	    	   number:"{TelephoneNo}",	
//	    	   numberUnit:"{Currency}",
//	    	   intro:"{}",
//	    	   type:"Active",
	    	   attributes: [
//	    	                {
//
//	    	   
//	    	                
//	    	                	text:"Telephone No: {TelephoneNo}"
//	            },
	    		            {
	    		    		            	text:"Ship To: {ShipTo}",
	    		    		            	
	    		    		            	    		    		            	
	    		    		            },
	    		    		            {
	    		    		            	text:"{SalesOrganization}",
	    		    		            
	    		    		            },
	    		    		            {
	    		    		            	text:"{DistributionChannel}",
	    			    		            }
	    		    		            
	    		            ],
	    		            firstStatus:[{
	    		            	icon:"sap-icon://iphone",
	    		    		   	text:"{TelephoneNo}",
	    		    		   	 
	    		            	
	    		            },],
	    		            secondStatus:[{
	    		            	icon:"sap-icon://email",
	    		    		   	text:"{Mail}"
	    		            }]
	    		
	   });
		
		oHeaderProfileDetail.bindAggregation("items","/data", oHeaderProfileDetailItem);
		var Z_DMA_ProfileList = new sap.m.FlexBox({
			
			width:"100%",
			direction:"Column",
			items:[oHeaderProfileDetail]
		});
		
		
		var oContactLists = new sap.m.List("contactlists",{
  			inset:false,});
         
  		var oContactliststemplate = new sap.m.ObjectListItem({
  			title:"{Firstname} {Lastname}",
//	    	   number:"{MobileNumber}",
	    	   intro:"{ImCustomerid}",
	    	  attributes: [{
    		   	text:"{SalesOrganization}"
            },
            {
    			
    			text:"{DistributionChannel}"
    		             },
    		            {
    			text:"Address: {Street},{Region},{City},{Country},{PostalCode}"
    		            },
    		            {
    		   	text:"Division: {Divison}"
    		            },
    		            
    		],
    		firstStatus: {
    			 icon:"sap-icon://iphone",
	     			text:"{MobileNumber}"
    			
    		             },
    		             secondStatus: {
    		            	 icon:"sap-icon://email",
    		     			text:"{EMail}"
    		             }
  		});
  		oContactLists.bindAggregation("items","/data",oContactliststemplate);


		var contactTab = new sap.m.IconTabFilter("c1",{
			
			icon:"sap-icon://company-view",
			count:"",
			text:"Contacts",
			content:[oContactLists]
		});
		
		//Credit info list
		var oCreditList = new sap.m.List("creditlist",{
  			inset:false,});
         
  		var oCreditlisttemplate = new sap.m.ObjectListItem({
  			title:"Control Area: {ControlArea}",
	    	   number:"Credit Limit: {CreditLimit}",
//	    	   intro:"{ImCustomerid}",
	    	  attributes: [{
    		   	text:"Credit exposure: {CreditExposure}"
            },
    		            {
    			text:"Credit available: {CreditAvailable}"
    		            },
//    		            {
//    		   	text:"Receivables: {Receivables}"
//    		            }
    		],
    		firstStatus: {
    			
    			text:"Credit limit used: {CreditLimitUsed} %"
    		             },
    		             secondStatus: {
    			    			
    			    			text:"Currency: {Currency}"
    			    		             }
  		});
  		oCreditList.bindAggregation("items","/data4",oCreditlisttemplate);
  
		//credit info tab
var creditTab = new sap.m.IconTabFilter("c2",{
			
			icon:"sap-icon://credit-card",
			count:"",
			text:"Credit Info",
			content:[oCreditList]
		});
debugger;
var oSalesList = new sap.m.List("saleslist",{
		inset:false,});
 
	var oSaleslisttemplate = new sap.m.ObjectListItem({
		title:"Sales Summary",
//	   number:"Pending Amount: {PendingAmount}",
//	   intro:"{ImCustomerid}",
	  attributes: [{
	   	text:"SalesValue: {SalesValue}"
    },
	            {
		text:"Receivables: {Receivables}"
	            },
	            
	           
	],
	firstStatus: {
		
		text:"Currency: {Currency} "
	             },
	});
	oSalesList.bindAggregation("items","/data5",oSaleslisttemplate);
	
	var SalesSum = new sap.m.IconTabFilter("salesTab",{
			
			icon:"sap-icon://my-sales-order",
			count:"",
			text:"Sales Summary",
			content:[oSalesList]
		});
		
		
		
		
		var profileTabFilters = new sap.m.IconTabBar({
			
			items:[contactTab,creditTab,SalesSum],
			
		}).addStyleClass("Z_DMA_oContainer");
		
 		return new sap.m.Page({
			title: "Profile",
			
			content: [
Z_DMA_ProfileList,profileTabFilters
			]
		});
	}

});