/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/demo/app/project1/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
