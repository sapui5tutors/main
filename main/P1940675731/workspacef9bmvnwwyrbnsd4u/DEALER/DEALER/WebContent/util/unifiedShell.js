/*
 * @File : Event for the controls of Shell Header
 */

// Function for Click on Menu

loginResult = {};

// Function to open Menu on click of Icon

function onClick(oEvent){
	var oShell = sap.ui.getCore().byId("shell");
	var oState = oShell.getShowPane();
	if(oState){
		oShell.setShowPane(false);
	}
	else{oShell.setShowPane(true);}
}

function onHomeClick(){
	debugger;
//	sap.ui.getCore().byId("appSubNavContainer").to("Dashboard"); 
	var router = sap.ui.core.routing.Router.getRouter("appRouter");
//	var history = sap.ui.core.routing.History.getInstance();
//	router.navTo("Dashboard");
	oHasher = sap.ui.core.routing.HashChanger.getInstance(); 
	
	if(oHasher.getHash() == "AccountMenu"){
//		window.history.go(-1);
		oHasher.setHash("Dashboard")  
//	router._oRouter._prevMatchedRequest.replace("AccountMenu","");
	sap.ui.getCore().byId("appSubNavContainer").to("Dashboard");
	}
	else
		{
		oHasher.setHash("Dashboard");
		sap.ui.getCore().byId("appSubNavContainer").to("Dashboard");
		}
//	var history = sap.ui.core.routing.History.getInstance();
//	 var b = history.aHistory.indexOf("AccountMenu")
//	 history.aHistory.splice(b,1).pop();
	 
	 
	 
	 
//    var x=	sap.ui.getCore().byId("appSubNavContainer").getModel();

	var temp = sap.ui.getCore().byId("order");
	var accn = sap.ui.getCore().byId("account");
	if(temp != null){
//		if(temp == undefined){
			
//		}
//		else{
	temp.destroy();
//	var temp1 = sap.ui.getCore().byId("appId");
//	temp1.destroy();
	var temp2 = sap.ui.getCore().byId("salesOrderListItem");
	temp2.destroy();
	var temp3 = sap.ui.getCore().byId("headerListItem");
	temp3.destroy();
	var temp4 = sap.ui.getCore().byId("itemdata");
	temp4.destroy();
	var temp5 = sap.ui.getCore().byId("ItemTemplate");
	temp5.destroy();
	}
	
		

	if(accn != null)
	{
	accn.destroy();
	var accn1 = sap.ui.getCore().byId("dealerListDialog");
	accn1.destroy();
	var accn2 = sap.ui.getCore().byId("dealerList");
	accn2.destroy();
	var accn3 = sap.ui.getCore().byId("ItemTemplate").destroy();
//	var accn4 = sap.ui.getCore().byId("appId").destroy();
	var accn5 = sap.ui.getCore().byId("orderListtemplate").destroy();
//	var accn6 = sap.ui.getCore().byId("oBusyDialog").destroy();
	}


//	destroy: function () {
		 
//		sap.ui.core.UIComponent.prototype.destroy.apply(this, temp);
//		 
		}
	


function onAfterNavigate(){
	
	var headerBar = sap.ui.getCore().byId("shell");
	
	console.log("headerBar",headerBar);
	
	var currentPage = sap.ui.getCore().byId("appSubNavContainer").getCurrentPage();
	
	console.log("currentPage",currentPage.sId);
	
	var menuContext = headerBar.getHeadItems();
	
	console.log("menuContext",menuContext);
	
	for(i=0; i<menuContext.length; i++){
		
		var oMenu = menuContext[i].sId;
		
		
		
		if(currentPage.sId === "Dashboard" ){
			
			console.log("oMenu",oMenu);
			
			if(oMenu === "home"){
				
				headerBar.destroyHeadItems();
				headerBar.insertHeadItem(new sap.ui.unified.ShellHeadItem("menu",{icon:"sap-icon://menu2",press:onClick}));
				
				}
			
		}		
		else{
			headerBar.destroyHeadItems();
			headerBar.insertHeadItem(new sap.ui.unified.ShellHeadItem("home",{icon:"sap-icon://home",press:onHomeClick}));
		}
		
	}
	
}
	

function onUserNameClick(oEvent){
	
	var popOver = sap.ui.getCore().byId("userpopOver");
	var userDrpdwn = sap.ui.getCore().byId("userDrpdwn");;
	if(popOver.isOpen()){
		popOver.close();
	}else{
		popOver.openBy(userDrpdwn);
	}
}

function onMenuItemClick(oEvent){
	
	console.log("oEvent",oEvent);
	var oSource = oEvent.getSource().getTitle();
	console.log("source",oSource);
}
function onitemClick(oEvent){
	debugger;
	var item1 = oEvent.oSource.getBindingContext().sPath;
	var sel1 = parseInt(item1.split('/')[2]);
	console.log("sel",sel1);
	
// y = oEvent.oSource.getModel().oData.data[sel1];
// var LogOut= y.Log out;
	if(sel1 == 2)
		{
//		var oLogoutShell = sap.ui.getCore().byId("shell");
//		var Z_DMA_Login = sap.ui.view({id:"Login", viewName:"com.vikalp.dealermgmt.view.Login", type:sap.ui.core.mvc.ViewType.JS});
//		appCon.addPage(Z_DMA_Login);
//		oLogoutShell.fireLogout();
		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
		router.navTo("Login");
		sap.ui.getCore().byId("subContainer").destroy();
		sap.ui.getCore().byId("customerListItem").destroy();
//		sap.ui.getCore().byId("appSubNavContainer").destroy();   
		sap.ui.getCore().byId("menuListItem").destroy();
		sap.ui.getCore().byId("userpopOver").destroy();
//		sap.ui.getCore().byId("Dashboard").destroy();
		sap.ui.getCore().byId("visitTimeKPI").destroy();
		sap.ui.getCore().byId("visitLocationKPI").destroy();
		sap.ui.getCore().byId("visitsKPIWrapper").destroy();
		}
// console.log("SalesOrder",SalesOrder);	
}
function onToolbarClick(){
	
	var dealerListDialog = sap.ui.getCore().byId("dealerListDialog")
	dealerListDialog.open();
	console.log("dealerListDialog",dealerListDialog);
}

function dealerListClick(oEvent){
	alert("dealer List click");
	var text = oEvent.getSource().getTitle();
	alert("text"+text);
	sap.ui.getCore().byId("dealerButton").setText(text);
	
	
}

function onSuccessLogin(oData,response){

	loginResult = oData;console.log("loginResult",loginResult);
	
}



