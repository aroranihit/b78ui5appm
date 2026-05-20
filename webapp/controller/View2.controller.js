sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.app.project1.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatterMatched, this);
        },
        onPatterMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").empId;
            this.getView().bindElement("oModel>/EmployeeSet('" + empId + "')");

        },
        onpiche(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        }
    });
});