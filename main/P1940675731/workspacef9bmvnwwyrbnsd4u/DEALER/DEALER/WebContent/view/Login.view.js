sap.ui.jsview("com.vikalp.dealermgmt.view.Login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Login
	*/ 
	getControllerName : function() {
		return "com.vikalp.dealermgmt.view.Login";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Login
	*/ 
	createContent : function(oController) {
		
		var oClientLogo = new sap.m.Image("logo",{
			width:"100px",
			height:"50px",
			src:"{/loginData/0/logo}"			
		}).addStyleClass("logo");
		
		var oUsername = new sap.m.Input("userId",{
			
			width:"15rem",
			placeholder:"User Id",
			change:oController.onUserIdChange,
			liveChange:oController.onUserIdChange
			
		}).addStyleClass("userIdInput");
		
		var oPassword = new sap.m.Input("psswrd",{
			
			width:"15rem",
			placeholder:"Password",
			type:"Password",
			change:oController.onPsswdChange,
			liveChange:oController.onPsswdChange
		}).addStyleClass("psswdInput");
		
		var oLoginButton = new sap.m.Button("loginButton",{
			
			text:"Login",
			press:oController.onLoginClick
		}).addStyleClass("loginButton");
		
		var ologoWrapper = new sap.m.FlexBox("logoWrapper",{
			
			width:"100%",
			direction:"Column",
			items:[oClientLogo]
			
		}).addStyleClass("logoWrapper");
		
		var oinputWrapper = new sap.m.FlexBox("inputWrapper",{
			
			width:"100%",
			direction:"Column",
			items:[oUsername, oPassword, oLoginButton]
			
		}).addStyleClass("inputWrapper");
		
		var mainLoginWrapper = new sap.m.FlexBox("loginWrapper",{
			
			width:"50%",
			direction:"Column",
			items:[ologoWrapper, oinputWrapper]
			
		}).addStyleClass("loginWrapper");
		
 		return mainLoginWrapper;
	}

});