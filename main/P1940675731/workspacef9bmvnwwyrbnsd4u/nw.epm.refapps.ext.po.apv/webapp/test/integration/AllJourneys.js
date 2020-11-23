jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.require("sap.ui.test.Opa5");
//Load the Page Objects
jQuery.sap.require("nw.epm.refapps.purchaseorders.approve.test.integration.pages.Common");
jQuery.sap.require("nw.epm.refapps.purchaseorders.approve.test.integration.pages.S2");
jQuery.sap.require("nw.epm.refapps.purchaseorders.approve.test.integration.pages.S3");

sap.ui.test.Opa5.extendConfig({
	arrangements: new nw.epm.refapps.purchaseorders.approve.test.integration.pages.Common(),
	viewNamespace: "nw.epm.refapps.purchaseorders.approve.view."
});
//Load the journeys
jQuery.sap.require("nw.epm.refapps.purchaseorders.approve.test.integration.POApprovalJourney");
jQuery.sap.require("nw.epm.refapps.purchaseorders.approve.test.integration.PORejectJourney");