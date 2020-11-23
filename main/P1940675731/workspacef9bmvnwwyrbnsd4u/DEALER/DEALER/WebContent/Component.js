jQuery.sap.declare("com.vikalp.dealermgmt.Component");


new sap.ui.core.UIComponent.extend("com.vikalp.dealermgmt.Component",{

	metadata:{
		name : "Dealer Mnagement Application",
        version : "1.0",
        includes : [],
        dependencies : {
            libs : ["sap.m","sap.ui.unified","sap.suite.ui.commons"],
            components : []
        },
        rootView : "com.vikalp.dealermgmt.view",
        config: {
        	serviceConfig:{
        		name:"importance",
        		seviceUrl:"/sap/opu/odata/sap/ZDMA_UI5_SRV/",
        	},
        },
        routing : {        	
			config : {
				viewType:"JS",  
//				viewPath:"com.vikalp.dealermgmt.view",
				targetControl:"appNavContainer",    
                targetAggregation:"pages", 
				clearTarget : false,
			},
			routes : [
			          {
					pattern : "",
					name:"Login",
					view:"com.vikalp.dealermgmt.view.Login",
					targetControl:"appNavContainer",
					
//					subroutes:[{
//						pattern : "Dashboard",
//						name:"subContainer",
//						view:"com.vikalp.dealermgmt.view.subContainer",
//						targetControl:"appNavContainer",
//							  	targetAggregation:"pages",
			  
//					        subroutes:[{
//					         	 pattern : "Dashboard",
//					        	  name:"Dashboard",
//					        	  view:"com.vikalp.dealermgmt.view.Dashboard",
//					        	  targetControl:"appSubNavContainer",
//								  targetAggregation:"pages",
//					        }],
//					        },]
			          
			          
			          },	
//					{
//						pattern : "Dashboard",
//						name:"Dashboard",
//						view:"com.vikalp.dealermgmt.view.Dashboard",
//						targetControl:"appSubNavContainer",
//						targetAggregation:"pages",
//						},
//					 {
//						pattern : "Dashboard",
//						name:"subContainer",
//						view:"com.vikalp.dealermgmt.view.subContainer",
//						targetControl:"appNavContainer",
//							  	targetAggregation:"pages",
//			  
//					        subroutes:[{
//					         	 pattern : "Dashboard",
//					        	  name:"Dashboard",
//					        	  view:"com.vikalp.dealermgmt.view.Dashboard",
//					        	  targetControl:"appSubNavContainer",
//								  targetAggregation:"pages",
//					        }],
//					        },
					{
				pattern : "AccountMenu",
				name:"Accounts",
				view:"com.vikalp.dealermgmt.view.accounts.Accounts",
				targetControl:"appSubNavContainer",
				//	  	targetAggregation:"Pages",
	  
			        subroutes:[{
			         	 pattern : "AccountMenu",
			        	  name:"AccountMenu",
			        	  view:"com.vikalp.dealermgmt.view.accounts.AccountMenu",
			        	  targetControl:"SplitApp",
						  targetAggregation:"masterPages",
						  transition: "show",
				  
						  subroutes:[
						             {
							  pattern : "AccountProfile",
//							  /{customer}
							  name : "AccountProfile",
							  view : "com.vikalp.dealermgmt.view.accounts.AccountProfile",
							  targetAggregation:"detailPages",
							  targetControl:"SplitApp",
							  transition: "show",
							  //			viewPath : "routingdemo",
						  },
						  {
							  pattern : "AccountPerformance/{customer}",
							  name : "AccountPerformance",
							  view : "com.vikalp.dealermgmt.view.accounts.AccountPerformance",
							  targetAggregation:"detailPages",
							  targetControl:"SplitApp",
							  //			viewPath : "routingdemo",
						  },
						  {
							  pattern : "AccountPayment/{customer}",
							  name : "AccountPayment",
							  view : "com.vikalp.dealermgmt.view.accounts.DealerPaymentDetail",
							  targetAggregation:"detailPages",
							  targetControl:"SplitApp",
							  //			viewPath : "routingdemo",
						  },
						  {
					         	 pattern : "AccountOrder/{customer}",
					        	  name:"AccountOrderMaster",
					        	  view:"com.vikalp.dealermgmt.view.accounts.AccountOrderMaster",
					        	  targetControl:"SplitApp",
								  targetAggregation:"masterPages",
						  
								  subroutes:[
								             {
									  pattern : "AccountOrder/{sales}",
									  name : "AccountOrderDetail",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderDetail",
									  targetAggregation:"detailPages",
									  targetControl:"SplitApp",
									  //			viewPath : "routingdemo",
								  },
								  {
									  pattern : "AccountOrderitemDetailPage/{customer}",
									  name : "AccountOrderitemDetailPage",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderitemDetailPage",
									  targetAggregation:"detailPages",
									  targetControl:"SplitApp",
									  //			viewPath : "routingdemo",
								  },
								  {
									  pattern : "AccountOrderss",
									  name : "AccountMainOrder",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountMainOrder",
//									  targetAggregation:"pages",
									  targetControl:"appSubNavContainer",
									  subroutes:[{
									  pattern : "soCreateCart1",
									  name : "AccountOrderCart",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderCart",
									  targetAggregation:"pages",
									  targetControl:"accApp",
								  },
								  {
									  pattern : "quickCheckout1",
									  name : "AccountOrderCheckout",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderCheckout",
									  targetAggregation:"pages",
									  targetControl:"accApp",
								  },
								  {
									  pattern : "OrderShippingDetail1",
									  name : "AccountOrderShipping",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderShipping",
									  targetAggregation:"pages",
									  targetControl:"accApp",
								  },
								  {
									  pattern : "OrderReviewDetail1",
									  name : "AccountOrderReview",
									  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderReview",
									  targetAggregation:"pages",
									  targetControl:"accApp",
								  }]
									  //			viewPath : "routingdemo",
								  }
								             ],
					          },
					          /////////////
					          {
						         	 pattern : "AccountInventory",
						        	  name:"AccountInventoryMaster",
						        	  view:"com.vikalp.dealermgmt.view.accounts.AccountInventoryMaster",
						        	  targetControl:"SplitApp",
									  targetAggregation:"masterPages",
							  
									  subroutes:[
									             {
										  pattern : "AccountInventory",
										  name : "AccountInventoryDetail",
										  view : "com.vikalp.dealermgmt.view.accounts.AccountInventoryDetail",
										  targetAggregation:"detailPages",
										  targetControl:"SplitApp",
										  //			viewPath : "routingdemo",
									  },],
						          },
						          //////////////////
					          {
						         	 pattern : "AccountInvoice/{customer}",
						        	  name:"AccountPaymentMaster",
						        	  view:"com.vikalp.dealermgmt.view.accounts.AccountPaymentMaster",
						        	  
									  targetAggregation:"masterPages",
									  targetControl:"SplitApp",
									  subroutes:[
									             {
										  pattern : "AccountInvoice/{invoice}",
										  name : "AccountPaymentDetail",
										  view : "com.vikalp.dealermgmt.view.accounts.AccountPaymentDetail",
										  targetAggregation:"detailPages",
										  targetControl:"SplitApp",
										  //			viewPath : "routingdemo",
									  },
									
									             ],
						          },
						             ],
			          },]
					
},
{pattern : "Invoices",
	name:"Payments",
	view:"com.vikalp.dealermgmt.view.payments.Payments",
	targetControl:"appSubNavContainer",
	subroutes:[{
    	 pattern : "Invoices",
   	  name:"PaymentsMenu",
   	  view:"com.vikalp.dealermgmt.view.payments.PaymentsMenu",
   	  targetControl:"PaymentTab",
		  targetAggregation:"masterPages",
		  transition: "show",
 
		  subroutes:[
		             {
			  pattern : "Invoices",
			  name : "PaymentsInfo",
			  view : "com.vikalp.dealermgmt.view.payments.PaymentsInfo",
			  targetAggregation:"detailPages",
			  targetControl:"PaymentTab",
			  transition: "show",
			  //			viewPath : "routingdemo",
			  
		  },
		  {
	         	 pattern : "Payments",
	        	  name:"PaymentsMenu1",
	        	  view:"com.vikalp.dealermgmt.view.payments.PaymentsMenu1",
	        	  targetControl:"PaymentTab",
				  targetAggregation:"masterPages",
				  transition: "show",
		  
				  subroutes:[
				             {
					  pattern : "Payments",
					  name : "PaymentsInfo1",
					  view : "com.vikalp.dealermgmt.view.payments.PaymentsInfo1",
					  targetAggregation:"detailPages",
					  targetControl:"PaymentTab",
					  transition: "show",
					  //			viewPath : "routingdemo",
				  },],
	          },]
	}]
	},
	{pattern : "Orders",
		name:"MainOrder",
		view:"com.vikalp.dealermgmt.view.orders.MainOrder",
		targetControl:"appSubNavContainer",
		subroutes:[{
	    	 pattern : "Orders",
	   	  name:"Orders",
	   	  view:"com.vikalp.dealermgmt.view.orders.Orders",
	   	  targetControl:"orAppId",
//			  targetAggregation:"pages",
			  transition: "show",
	 
			  subroutes:[
			             {
				  pattern : "OrdersList",
				  name : "OrdersList",
				  view : "com.vikalp.dealermgmt.view.orders.OrdersList",
				  targetAggregation:"masterPages",
				  targetControl:"appId",
				  transition: "show",
				  //			viewPath : "routingdemo",
				  subroutes:[
				             {
					  pattern : "SalesOrder",
					  name : "OrdersInfo",
					  view : "com.vikalp.dealermgmt.view.orders.OrdersInfo",
					  targetAggregation:"detailPages",
					  targetControl:"appId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  {
					  pattern : "OrderItemDetail",
					  name : "OrderItemDetail",
					  view : "com.vikalp.dealermgmt.view.orders.OrderItemDetail",
					  targetAggregation:"detailPages",
					  targetControl:"appId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  {
					  pattern : "soCreateCart",
					  name : "OrderCartDetail",
					  view : "com.vikalp.dealermgmt.view.orders.OrderCartDetail",
					  targetAggregation:"pages",
					  targetControl:"orAppId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  {
					  pattern : "quickCheckout",
					  name : "OrderCheckoutDetail",
					  view : "com.vikalp.dealermgmt.view.orders.OrderCheckoutDetail",
					  targetAggregation:"pages",
					  targetControl:"orAppId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  {
					  pattern : "OrderShippingDetail",
					  name : "OrderShippingDetail",
					  view : "com.vikalp.dealermgmt.view.orders.OrderShippingDetail",
					  targetAggregation:"pages",
					  targetControl:"orAppId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  {
					  pattern : "OrderReviewDetail",
					  name : "OrderReviewDetail",
					  view : "com.vikalp.dealermgmt.view.orders.OrderReviewDetail",
					  targetAggregation:"pages",
					  targetControl:"orAppId",
					  transition: "show",
					  //			viewPath : "routingdemo",
					  
				  },
				  ]  
			  },
			  ],
		}],
	},
//	{pattern : "Products",
//		name:"Products",
//		view:"com.vikalp.dealermgmt.view.products.Products",
//		targetControl:"appSubNavContainer",
//		subroutes:[{
//	    	 pattern : "Products",
//	   	  name:"ProductsMenu",
//	   	  view:"com.vikalp.dealermgmt.view.products.ProductsMenu",
//	   	  targetControl:"Products",
//			  targetAggregation:"masterPages",
//			  transition: "show",
//	 
//			  subroutes:[
//			             {
//				  pattern : "Products",
//				  name : "ProductsInfo",
//				  view : "com.vikalp.dealermgmt.view.products.ProductsInfo",
//				  targetAggregation:"detailPages",
//				  targetControl:"Products",
//				  transition: "show",
//				  //			viewPath : "routingdemo",
//				  
//			  },
			 
//		          ]
//		}]
//		},
	
//{
//	pattern : "AccountOrder/{customer}",
//	name:"AccountOrder",
//	view:"com.vikalp.dealermgmt.view.accounts.AccountOrder",
//	targetControl:"appSubNavContainer",
//		  	targetAggregation:"pages",
//
//        subroutes:[{
//         	 pattern : "AccountOrder/{customer}",
//        	  name:"AccountOrderMaster",
//        	  view:"com.vikalp.dealermgmt.view.accounts.AccountOrderMaster",
//        	  targetControl:"appId",
//			  targetAggregation:"masterPages",
//	  
//			  subroutes:[
//			             {
//				  pattern : "AccountOrder/{sales}",
//				  name : "AccountOrderDetail",
//				  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderDetail",
//				  targetAggregation:"detailPages",
//				  targetControl:"appId",
//				  //			viewPath : "routingdemo",
//			  },
//			  {
//				  pattern : "AccountOrderitemDetailPage/{customer}",
//				  name : "AccountOrderitemDetailPage",
//				  view : "com.vikalp.dealermgmt.view.accounts.AccountOrderitemDetailPage",
//				  targetAggregation:"detailPages",
//				  targetControl:"appId",
//				  //			viewPath : "routingdemo",
//			  }
//			             ],
//          },]
//},
			          
		
			          ]
        }
	},
	
	
init:function(){
	//router and hashchanger libraries
	jQuery.sap.require("sap.ui.core.routing.History");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
	
	//call create content
	sap.ui.core.UIComponent.prototype.init.apply(this);
	
	this.router = this.getRouter();
	this.routeHandler = new sap.m.routing.RouteMatchedHandler(this.router);
	this.router.register("appRouter");  // Assign a name to Router, so that we can access it in all controllers by using this name  
	this.router.initialize(); // Initialise the Router  
	
	
	
	
	
	
	
},

createContent:function(){
	
	var oView = sap.ui.view({
		
		type:"JS",
		id:"main",
		viewName:"com.vikalp.dealermgmt.view.main",
		viewData:{component: this}
	});
	
	var oModel = new sap.ui.model.json.JSONModel("config/configData.json");
	oView.setModel(oModel);
	
//	var userId = sap.ui.getCore().byId("userId").getValue();
//	var password = sap.ui.getCore().byId("psswrd").getValue();
//////////////	
//	if(userId === ""){			
//
//		sap.ui.getCore().byId("userId").fireLiveChange();
//		sap.ui.getCore().byId("userId").focus();
//		return;			
//	}
//	
//	if(password === ""){	
//		
//		sap.ui.getCore().byId("psswrd").fireLiveChange();
//		sap.ui.getCore().byId("psswrd").focus();
//		return;			
//	}		
//	
//	oDataModel = new sap.ui.model.odata.ODataModel("http://vecc.vikalpsolutions.com:8000/sap/opu/odata/sap/ZDMA_UI5_SRV/", true,userId,password);
//	oView.setModel(oDataModel);
	//console.log("oModel",oModel);
//	oDataModel.read("/UserRolesSet?$filter=ImUsername eq '"+userId+"'and ImPassword eq'"+password+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});

	return oView; 

}
	
	
});



com.vikalp.dealermgmt.Component.prototype.destroy = function(){
	if(this.routeHandler){
		this.routeHandler.destroy();
	}
	sap.ui.core.UIComponent.destroy.apply(this,arguments);
};
//com.vikalp.dealermgmt.Component.prototype.createContent = function(){
//	this.view = sap.ui.view({viewName:"com.vikalp.dealermgmt.view.main",type:sap.ui.core.mvc.ViewType.JS});
//	return this.view;
//};

