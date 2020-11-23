sap.ui.controller("com.vikalp.dealermgmt.view.subContainer", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.subContainer
*/
	onInit: function() {
		debugger;
		var menuItem;
		var menuItemData = [];
		var roles = data.Role;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("config/configData.json",false);
		setTimeout(function(){ 
			
			menuItem = oModel.getProperty("/menuItem");
			
			
			
			for(i=0; i<=data.Role.length;i++){
				
				console.log("rolesss",roles[i]);
				
				switch(roles[i]){
				
				case 'ZDMA_MYVISIT':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name==="My Visits"){
							console.log("keyname",key.name);
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon;
							menuItemData.push(menuData);
							}
						}
						break;
				case 'ZDMA_ACCOUNTS':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name==="Accounts"){
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon;
							menuItemData.push(menuData);
							}
						}
						break;
				case 'ZDMA_ORDERS':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name ==="Orders"){
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon;
							menuItemData.push(menuData);
							}
						}
						break;
				case 'ZDMA_PAYMENTS':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name==="Payments"){
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon; 
							menuItemData.push(menuData);
							}
						}
						break;
				case 'ZDMA_PRODUCTS':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name==="Products"){
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon;
							menuItemData.push(menuData);}
						}
						break;
				case 'ZDMA_MYTASKS':
					for (j in menuItem){						
						var key = menuItem[j];
						if(key.name==="My Tasks"){
							var menuData = {};
							menuData.name = key.name;
							menuData.icon = key.icon;
							menuItemData.push(menuData);}
						}
						break;
				default:break;
			
				
				}
					
			}
			
			console.log("oMenuItemData",menuItemData);
			oModel.setProperty("/menuItem",menuItemData);
			
			var oMenuList = new sap.m.List("menuList",{
				
				inset:false
			});
			
			var oMenuItem = new sap.m.StandardListItem("menuListItem",{
				
				title : "{name}",
				icon:"{icon}",
		        iconInset: true,
		        type:"Active",
		        press:onMenuItemClick
			}).addStyleClass("menuList");		
			
		
			oMenuList.setModel(oModel);
			oMenuList.bindAggregation("items","/menuItem", oMenuItem);
			oShell.addPaneContent(oMenuList).addStyleClass("paneContent");
		
		},1000)
		
		
		var oShell = sap.ui.getCore().byId("shell");
		
		oShell.insertHeadItem(new sap.ui.unified.ShellHeadItem("menu",{icon:"sap-icon://menu2",press:onClick}));
		
		var ouserdrpdwnList = new sap.m.List({
			
			inset:false
		});
		
		var ouserdrpdwnItem = new sap.m.StandardListItem({
			
			title : "{name}",
			icon:"{icon}",
			type: "Active",
	        iconInset: true,
	        press:onitemClick
		});
		
	
		setTimeout(function(){
			
			ouserdrpdwnList.setModel(oModel);
			ouserdrpdwnList.bindAggregation("items","/userdrpdwnItem", ouserdrpdwnItem);
			
		},1000);
		
		
		var oPopOver = new sap.m.Popover("userpopOver",{
			placement:sap.m.PlacementType.Bottom,
			showHeader:false,
			content:[ouserdrpdwnList]
		});
		
		if(!data.Image){
			
			oShell.setUser(new sap.ui.unified.ShellHeadUserItem("userDrpdwn",{username:data.Name,image:"sap-icon://account",press:onUserNameClick}));
			
		}else{
			
			oShell.setUser(new sap.ui.unified.ShellHeadUserItem("userDrpdwn",{username:data.Name,image:"data:image/png;base64,"+data.Image,press:onUserNameClick}));
			
		}
//		var router = sap.ui.core.routing.Router.getRouter("appRouter"); // Get instance of router  
//		router.navTo("Dashboard");

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.subContainer
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.subContainer
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.subContainer
*/
//	onExit: function() {
//
//	}

});