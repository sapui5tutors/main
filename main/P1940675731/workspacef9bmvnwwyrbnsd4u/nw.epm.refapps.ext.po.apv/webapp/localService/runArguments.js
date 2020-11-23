sap.ui.define([], function() {
	var oMockPathCollection = {
		"_default": "nw.epm.refapps.purchaseorders.approve.localService.mockdata",
		"emptyPOList": "nw.epm.refapps.purchaseorders.approve.localService.mockdata.EmptyPOList",
		"specialSuppliers": "nw.epm.refapps.purchaseorders.approve.localService.mockdata.SpecialSuppliers",
		"largeAmount": "nw.epm.refapps.purchaseorders.approve.localService.mockdata.LargeAmount"
	};
	var sMetaDataFolder = jQuery.sap.getUriParameters().get("MetaDataFolder") || "_default";
	
	return {
		mockPath: oMockPathCollection[sMetaDataFolder]
	};
});