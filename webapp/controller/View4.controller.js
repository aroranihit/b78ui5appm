sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.app.project1.controller.View4", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView4").attachPatternMatched(this.onPatterMatched, this);
        },
        onPatterMatched: function (oEvent) {
            var empId = oEvent.getParameter("arguments").empId;
            this.getView().bindElement("oModel>/EmployeeSet('" + empId + "')");

        },
        onpiche(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        onSave:function(){
          var empId = this.byId("uempId").getValue();
            var name = this.byId("uempName").getValue();
            var desig = this.byId("uempDesignation").getValue();
            var skill = this.byId("uempSkill").getValue();
            var email = this.byId("uempEmail").getValue();
            var salary = this.byId("uempSalary").getValue();
            var status = this.byId("uempStatus").getValue();
            var rating = this.byId("uempRating").getValue();

            var payload = {
                Empid: empId,
                Name: name,
                Desig: desig,
                Skill: skill,
                Email: email,
                Salary: salary,
                Status: status,
                Rating: parseInt(rating)
            };
            // this will trigger a post call to backend Employee_create_entity
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.update("/EmployeeSet('" + empId + "')", payload, {
                success: function () {
                  
                        MessageBox.success("Employee updated successfully");
                    
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });


        }
    });
});