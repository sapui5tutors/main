var oModel = new sap.ui.model.json.JSONModel("config/configData.json");
var data;
sap.ui.jsview("com.vikalp.dealermgmt.view.Dashboard", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Dashboard
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.Dashboard";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Dashboard
	*/ 
	createContent : function(oController) {
		debugger;
		data = this.getViewData();
		
		console.log("data",data);
		
		var Z_DMA_MyVisitTitle = new sap.m.Text({text:"My Visits"}).addStyleClass("sapMStdTileTitle tileHder");
		
		var Z_DMA_MyVisit_Time = new sap.m.FlexBox("visitTimeKPI",{
			
			width:"100%",
			direction:"Row",
			items:[new sap.ui.core.Icon({src:"sap-icon://fob-watch"}).addStyleClass("visitTimeIcon"),new sap.m.Text({text:"1:00 P.M."}).addStyleClass("visitTimeText")]
			
		}).addStyleClass("visitTimeKPI");
		
		var Z_DMA_MyVisit_location = new sap.m.FlexBox("visitLocationKPI",{
			
			width:"100%",
			direction:"Row",
			items:[new sap.ui.core.Icon({src:"sap-icon://explorer"}).addStyleClass("visitLocationIcon"),new sap.m.Text({text:"Hindustan Uniliver, GZB"}).addStyleClass("visitLocationText")]
			
		}).addStyleClass("visitLocationKPI");
		
		
		var Z_DMA_MyVisitKPIWrapper = new sap.m.FlexBox("visitsKPIWrapper",{
			
			width:"100%",
			direction:"Column",
			items:[Z_DMA_MyVisit_Time,Z_DMA_MyVisit_location]
			
		}).addStyleClass("KPIWrapper");
		
			
		var Z_DMA_MyVisitFooterWrapper = new sap.m.FlexBox("visitsFooterWrapper",{
			width:"100%",
			direction:"Row",
			items:[new sap.ui.core.Icon({src:"sap-icon://visits"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
				direction:"Column",items:[new sap.m.Text({text:"03"}).addStyleClass("ftrCountSuccess"), new sap.m.Text({text:"Today's Visit"}).addStyleClass("ftrTextSuccess")]}).addStyleClass("tileFtr")]
			
		}).addStyleClass("ftrWrapper");

		
		var Z_DMA_MyVisitTileWrapper = new sap.m.FlexBox("visitsWrapper",{
			
			width:"100%",
			direction:"Column",
			items:[Z_DMA_MyVisitTitle,Z_DMA_MyVisitKPIWrapper,Z_DMA_MyVisitFooterWrapper]
			
		});
		
		var Z_DMA_MyVisit = new sap.m.CustomTile("visits",{				
			content:[Z_DMA_MyVisitTileWrapper],
			press:function(){alert("Visitss Tile clicked");}
		}).addStyleClass("myVisittile");
			
/*Accounts Tile*/
			
			var Z_DMA_AccountsTitle = new sap.m.Text({text:"Accounts"}).addStyleClass("sapMStdTileTitle tileHder");	
			 
			var customerList = new sap.m.List("customerList",{growing:true,growingThreshold:3,growingScrollToLoad:true}).addStyleClass("customerList");
			
			var custoerListTemplate = new sap.m.StandardListItem("customerListItem",{icon:"{icon}", title:"{name}"}).addStyleClass("customerListItem");
			customerList.setModel(oModel);
			customerList.bindAggregation("items","/favouriteListItem",custoerListTemplate);
			
			var Z_DMA_Accounts_FavouriteCustomer = new sap.m.FlexBox("favouriteCustomeKPI",{
				
				width:"100%",
				direction:"Row",
				items:[customerList]
				
			});
			
			
			var Z_DMA_AccountsKPIWrapper = new sap.m.FlexBox("accountsKPIWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[new sap.ui.core.Icon({src:"sap-icon://favorite-list"}).addStyleClass("tileIcn KPIInfoIconNeutral"),Z_DMA_Accounts_FavouriteCustomer]
				
			}).addStyleClass("KPIWrapper");
			
			var Z_DMA_AccountsFooterWrapper = new sap.m.FlexBox("accountsFooterWrapper",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://customer"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
					direction:"Column",items:[new sap.m.Text({text:"125"}).addStyleClass("ftrCountSuccess"), new sap.m.Text({text:"No. Of Customers"}).addStyleClass("ftrTextSuccess")]}).addStyleClass("tileFtr")]
				
			}).addStyleClass("ftrWrapper");

			
			var Z_DMA_AccountsTileWrapper = new sap.m.FlexBox("accountsWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_AccountsTitle,Z_DMA_AccountsKPIWrapper,Z_DMA_AccountsFooterWrapper]
				
			});
			
			var Z_DMA_Accounts = new sap.m.CustomTile("accounts",{				
				content:[Z_DMA_AccountsTileWrapper],
				press:oController.onAccountsTileClicked
			}).addStyleClass("accountTile");
			
/* Orders Tile*/
			
			var Z_DMA_OrdersTitle = new sap.m.Text({text:"Orders"}).addStyleClass("sapMStdTileTitle tileHder");
			
			var Z_DMA_Orders_ShippingKPI = new sap.m.FlexBox("ordersShippingKPI",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://shipping-status"}).addStyleClass("tileIcn KPIInfoIconSuccess"),new sap.m.Text({text:"24"}).addStyleClass("KPIInfoTextSuccess")]
				
			}).addStyleClass("KPIRows");
			
			var Z_DMA_Orders_ProgressKPI = new sap.m.FlexBox("ordersProgressKPI",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://step"}).addStyleClass("tileIcn KPIInfoIconNeutral"),new sap.m.Text({text:"05"}).addStyleClass("KPIInfoTextNeutral")]
				
			}).addStyleClass("KPIRows");					
			
			
			var Z_DMA_OrdersKPIWrapper = new sap.m.FlexBox("ordersKPIWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_Orders_ShippingKPI,Z_DMA_Orders_ProgressKPI]
				
			}).addStyleClass("KPIWrapper");
			
			var Z_DMA_OrdersFooterWrapper = new sap.m.FlexBox("ordersFooterWrapper",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://sales-order"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
					direction:"Column",items:[new sap.m.Text({text:"05"}).addStyleClass("ftrCountError"), new sap.m.Text({text:"Pending Orders"}).addStyleClass("ftrTextError")]}).addStyleClass("tileFtr")]
				
			}).addStyleClass("ftrWrapper");

			
			var Z_DMA_OrdersTileWrapper = new sap.m.FlexBox("ordersWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_OrdersTitle,Z_DMA_OrdersKPIWrapper,Z_DMA_OrdersFooterWrapper]
				
			});
			
			debugger;
			
			var Z_DMA_Orders = new sap.m.CustomTile({				
				content:[Z_DMA_OrdersTileWrapper],
				press:oController.onOrdersTileClick
			}).addStyleClass("ordersTile");			

			
/* Payments Tile*/
			
			var Z_DMA_PaymentsTitle = new sap.m.Text({text:"Invoices & Payments"}).addStyleClass("sapMStdTileTitle tileHder");	
			
			var Z_DMA_Payments_PendingPaymentsKPI = new sap.m.FlexBox("pendingPaymentsKPI",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://pending"}).addStyleClass("tileIcn KPIInfoIconError"),new sap.m.Text({text:"05"}).addStyleClass("KPIInfoTextError")]
				
			}).addStyleClass("KPIRows");
			
			
			var Z_DMA_PaymentsKPIWrapper = new sap.m.FlexBox("paymentsKPIWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_Payments_PendingPaymentsKPI]
				
			}).addStyleClass("KPIWrapper");
			
			var Z_DMA_PaymentsFooterWrapper = new sap.m.FlexBox("paymentsFooterWrapper",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://monitor-payments"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
					direction:"Column",items:[new sap.m.Text({text:"05"}).addStyleClass("ftrCountSuccess"), new sap.m.Text({text:"Total Payment"}).addStyleClass("ftrTextSuccess")]}).addStyleClass("tileFtr")]
				
			}).addStyleClass("ftrWrapper");

			
			var Z_DMA_PaymentsTileWrapper = new sap.m.FlexBox("paymentsWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_PaymentsTitle,Z_DMA_PaymentsKPIWrapper,Z_DMA_PaymentsFooterWrapper]
				
			});
			
			var Z_DMA_Payments = new sap.m.CustomTile("payments",{				
				content:[Z_DMA_PaymentsTileWrapper],
				press:oController.onPaymentsTileClicked
			}).addStyleClass("paymentsTile");			

			
/* Products Tile*/
			
			var Z_DMA_ProductsTitle = new sap.m.Text({text:"Products"}).addStyleClass("sapMStdTileTitle tileHder");
			
			var Z_DMA_Products_PendingPaymentsKPI = new sap.m.FlexBox("topSellingProductsKPI",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://drill-up"}).addStyleClass("tileIcn KPIInfoIconSuccess"),new sap.m.Text({text:"Product A"}).addStyleClass("KPIInfoTextSuccess")]
				
			}).addStyleClass("KPIRows");			
			
			
			var Z_DMA_ProductsKPIWrapper = new sap.m.FlexBox("productsKPIWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_Products_PendingPaymentsKPI]
				
			}).addStyleClass("KPIWrapper");
			
			var Z_DMA_ProductsFooterWrapper = new sap.m.FlexBox("productsFooterWrapper",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://product"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
					direction:"Column",items:[new sap.m.Text({text:"05"}).addStyleClass("ftrCountError"), new sap.m.Text({text:"Total Products"}).addStyleClass("ftrTextError")]}).addStyleClass("tileFtr")]
				
			}).addStyleClass("ftrWrapper");

			
			var Z_DMA_ProductsTileWrapper = new sap.m.FlexBox("productsWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_ProductsTitle,Z_DMA_ProductsKPIWrapper,Z_DMA_ProductsFooterWrapper]
				
			});
			
			var Z_DMA_Products = new sap.m.CustomTile("products",{				
				content:[Z_DMA_ProductsTileWrapper],
				press:oController.onProductsTileClicked
			}).addStyleClass("productsTile");		
			
/* MyTask Tile*/			
			
			var Z_DMA_MyTasksTitle = new sap.m.Text({text:"My Tasks"}).addStyleClass("sapMStdTileTitle tileHder");
			
			
			
			var Z_DMA_MyTasksKPIWrapper = new sap.m.FlexBox("myTaskKPIWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[]
				
			}).addStyleClass("KPIWrapper");
			
			var Z_DMA_MyTasksFooterWrapper = new sap.m.FlexBox("myTaskFooterWrapper",{
				
				width:"100%",
				direction:"Row",
				items:[new sap.ui.core.Icon({src:"sap-icon://task"}).addStyleClass("tileIcn"),new sap.m.FlexBox({width:"50%",
					direction:"Column",items:[new sap.m.Text({text:"03"}).addStyleClass("ftrCountError"), new sap.m.Text({text:"Pending Task"}).addStyleClass("ftrTextError")]}).addStyleClass("tileFtr")]
				
			}).addStyleClass("ftrWrapper");

			
			var Z_DMA_MyTasksTileWrapper = new sap.m.FlexBox("myTaskWrapper",{
				
				width:"100%",
				direction:"Column",
				items:[Z_DMA_MyTasksTitle,Z_DMA_MyTasksKPIWrapper,Z_DMA_MyTasksFooterWrapper]
				
			});
	
			var Z_DMA_MyTasks = new sap.m.CustomTile("myTasks",{				
				content:[Z_DMA_MyTasksTileWrapper],
				press:function(){alert("tile clicked");}
			}).addStyleClass("myTasktile");			
			  
//			var Z_DMA_ImageWrapper = new sap.m.FlexBox("ImageWrapper",{
//				width:"100%",
//				direction:"Column",
//			});
//			
//			
//			var Z_DMA_Image = new sap.m.CustomTile({
//				
//				content:[Z_DMA_ImageWrapper],
////				press:function(){alert("image clicked");}
//			}).addStyleClass("mySapImage");
		
		var oContainer = new sap.m.TileContainer("tilecontainer");
		
		var d = data.Role;
		
		console.log("d",d);
		
		var length = data.Role.length;
		for(i=0;i<length; i++){
			
			switch(d[i]){
			
			case 'ZDMA_MYVISIT':oContainer.addTile(Z_DMA_MyVisit);
					break;
			case 'ZDMA_ACCOUNTS':oContainer.addTile(Z_DMA_Accounts);
					break;
			case 'ZDMA_ORDERS':oContainer.addTile(Z_DMA_Orders);
					break;
			case 'ZDMA_PAYMENTS':oContainer.addTile(Z_DMA_Payments);
					break;
			case 'ZDMA_PRODUCTS':oContainer.addTile(Z_DMA_Products);
					break;
			case 'ZDMA_MYTASKS':oContainer.addTile(Z_DMA_MyTasks);
					break;
			
			}
		}
		
		
		var oTile = new sap.m.CustomTile({
			
		}).addStyleClass("sapMTile");
		
		var T1 = new sap.m.StandardTile({});  
		oContainer.addTile(T1);
		
//		oContainer.addTile(Z_DMA_Image);
		

//		var oShell = new sap.ui.unified.Shell("shell",{
//			content:new sap.m.Shell("mainWrapper",{
//				app:oContainer
//			})
//		});
			
 		return oContainer;
	}

});