sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.app.project1.controller.View2", {
        onInit() {
        },
        onpiche(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        }
    });
});