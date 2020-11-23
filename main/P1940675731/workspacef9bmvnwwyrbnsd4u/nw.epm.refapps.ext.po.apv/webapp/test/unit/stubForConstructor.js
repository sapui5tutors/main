jQuery.sap.declare("test.unit.stubForConstructor");

(function() {
	var fnDefineStore = sap.ui.define;
	var aPreparedForStub = ["nw.epm.refapps.purchaseorders.approve.model.Approver"];
	var mConstructors = {};

	function fnPrepare(sName, fnConstructor) {
		mConstructors[sName] = fnConstructor;
		return function() {
			mConstructors[sName].apply(this, arguments);
		};
	}

	sap.ui.define = function() {
		var iFactory = 0;
		if (arguments.length > iFactory && typeof arguments[iFactory] === "string") { // ignore optional module name
			iFactory++;
		}
		if (arguments.length > iFactory && Array.isArray(arguments[iFactory])) { // ignore optional dependencies
			iFactory++;
		}
		if (arguments.length > iFactory && typeof arguments[iFactory] === "function") { // check that factory is indeed a function and not a static object
			var fnDefinition = arguments[iFactory];
			var fnWrapper = function() {
				var oRet = fnDefinition.apply(this, arguments);
				if (oRet.getMetadata) {
					var sName = oRet.getMetadata().getName();
					for (var i = 0; i < aPreparedForStub.length; i++) {
						if (sName === aPreparedForStub[i]) {
							return fnPrepare(sName, oRet);
						}
					}
				}
				return oRet;
			};
			arguments[iFactory] = fnWrapper;
			fnDefineStore.apply(this, arguments);
		}
	};

	test.unit.stubForConstructor = {

		spy: function(sClass) {
			return sinon.spy(mConstructors, sClass);
		},

		stub: function(sClass, fnFunction) {
			return sinon.stub(mConstructors, sClass, fnFunction);
		},

		restore: function() {
			sap.ui.define = fnDefineStore;
		}
	};
}());