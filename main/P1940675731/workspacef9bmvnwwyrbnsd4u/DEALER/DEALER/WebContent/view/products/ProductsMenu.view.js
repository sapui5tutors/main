sap.ui.jsview("com.vikalp.dealermgmt.view.products.ProductsMenu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.accounts.Accounts
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.products.ProductsMenu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.accounts.Accounts
	*/ 
createContent : function(oController) {

	
	debugger;
	var oProductsMenu = new sap.m.List("oProductsMenu",{
		inset:false,
		visible:true,
		updateFinished : function(oEvent){  
			oEvent.getSource().getItems()[0].setSelected(true);
		} 
	});
	
	
	
	;
     var oMenuProductsItem = new sap.m.ObjectListItem({
			
    	 title:"{MatlDesc}",
    	   number:"{NetPrice}",
    	   numberUnit:"{Currency}",
    	   type:"Active",
    	   attributes: [
    	                {
    	                	text:""
    	                },
    		            {
    			text:"{Material}"
    		            },
    		            ],

			press:oController.onProductsMenuClick	
		})	;
     debugger;
		oDataModel.read("/ProductListUserInfoSet?$filter=ImUsername eq '"+data.userName+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
		var ProductsListJson = new sap.ui.model.json.JSONModel();
		ProductsListJson.setData({dataProducts:loginResult.results});
    console.log("ProductsListJson",ProductsListJson)
		sap.ui.getCore().byId("oProductsMenu").setModel(ProductsListJson);
    oProductsMenu.bindAggregation("items","/dataProducts",oMenuProductsItem);
	
	return new sap.m.Page({
//		title:"All Products",
		 headerContent: new sap.m.Label({text:"All Products",textAlign:sap.ui.core.TextAlign.Center,design: sap.m.LabelDesign.Bold,width:'100%'}),

			subHeader: 
				new sap.m.Bar({
					contentMiddle: [
			new sap.m.SearchField(  {
				placeholder: "Search",
				showMagnifier: false,
//				showRefreshButton: true,
				search: oController.onSearch,
				liveChange: oController.onLiveChange,
				width: "100%",
				tooltip: "Search for objects",
//				refreshButtonTooltip: "Refresh"
			})
		]
                              }),
		 content: [
oProductsMenu
		           ]
	 });
}
});