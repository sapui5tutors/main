sap.ui.controller("com.vikalp.dealermgmt.view.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Login
*/
//	onInit: function() {
////		 this.oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
////		this.router.attachRoutePatternMatched(this.handleRouteMatched, this);
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Login
*/
//	onExit: function() {
//
//	}
	
	onLoginClick:function(){
		debugger;
		try{
			
			var userId = sap.ui.getCore().byId("userId").getValue();
			var password = sap.ui.getCore().byId("psswrd").getValue();
			
			if(userId === ""){			
		
				sap.ui.getCore().byId("userId").fireLiveChange();
				sap.ui.getCore().byId("userId").focus();
				return;			
			}
			
			if(password === ""){	
				
				sap.ui.getCore().byId("psswrd").fireLiveChange();
				sap.ui.getCore().byId("psswrd").focus();
				return;			
			}		
			
			oDataModel = new sap.ui.model.odata.ODataModel("http://vecc.vikalpsolutions.com:8000/sap/opu/odata/sap/ZDMA_UI5_SRV/", true,userId,password);
			
			//console.log("oModel",oModel);
			oDataModel.read("/UserRolesSet?$filter=ImUsername eq '"+userId+"'and ImPassword eq'"+password+"'",null,null,false,onSuccessLogin,function(oError){console.log("error",oError);});
	
				
				if(loginResult.results[0].Message === "1"){
					
					var roles = [];
					var viewDate = {};
					
					for(i in loginResult){
						
						var key = loginResult[i];
						
						for(j in key){
							
							var secondKey = key[j];
							roles.push(secondKey.RolesU);
							
						}
					}
					debugger;
//					var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//					router.navTo("Dashboard");
					var imageResult;
					
					oDataModel.read("/UserLoginSet(ImUsername='"+userId+"',ImPassword='"+password+"')", null,null,false,function(res){ imageResult = res;},function(res){console.log("error",res);});
					
					var image = imageResult.ImageUrl;
					
//					console.log("image",image);
					
					var navCon = sap.ui.getCore().byId("appNavContainer");
					console.log("navCon",navCon);
					
					var Z_DMA_SubContainer = new  sap.ui.view({id:"subContainer", viewName:"com.vikalp.dealermgmt.view.subContainer", viewData:{"Role":roles,"Image":image, "userName":loginResult.results[0].ImUsername,"Name":loginResult.results[0].Firstname+" "+loginResult.results[0].Lastname}, type:sap.ui.core.mvc.ViewType.JS});
					
//					var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//					 var oHashChanger = new sap.ui.core.routing.HashChanger();
//		                oHashChanger.setHash(oRouter.getURL("Dashboard"));
//		                router.navTo("subContainer");
						navCon.addPage(Z_DMA_SubContainer);
						navCon.to(Z_DMA_SubContainer);
//		                  var usernm = loginResult.results[0].ImUsername;
//						var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//						router.navTo("subContainer"); 
//						router.navTo("Dashboard");
					
				}else{
					
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("Invalid Credentials!! Please Try Again");
				}
			}
		
		catch(e){
			
			console.log("DealerMgmtApp:LoginController.onLoginClick",e.message);
		}	
		
	},
	
	onUserIdChange:function(){
		
		var userIdValue = sap.ui.getCore().byId("userId").getValue();		
		
		if(userIdValue === ""){
			sap.ui.getCore().byId("userId").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("userId").setValueStateText("UserId can not be left blank");
			
		}
		
		else{
			sap.ui.getCore().byId("userId").setValueState(sap.ui.core.ValueState.Success);
		}
	},
	
	onPsswdChange:function(){
		
		var psswrdValue = sap.ui.getCore().byId("psswrd").getValue();		
		
		if(psswrdValue === ""){
			sap.ui.getCore().byId("psswrd").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("psswrd").setValueStateText("Password can not be left blank");
			
		}
		
		else{
			sap.ui.getCore().byId("psswrd").setValueState(sap.ui.core.ValueState.Success);
		}
		
	},

});